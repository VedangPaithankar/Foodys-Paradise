<img align="center" src="./Footter.png" alt="Foodys Paradise" width="auto" height="auto"/>

# Foodys Paradise 😋

A recipe discovery app: ~6,000 recipes, cuisine browsing, full-text search, saved favorites, and a "what's in my fridge" recommender that ranks recipes by how well they match the ingredients you actually have.

Originally shipped as a MERN app. This branch is a from-scratch rewrite of the backend and recommendation engine (Java/Spring Boot + PostgreSQL, plus a separate Python ML microservice) and a full visual redesign of the frontend — see [Branches](#branches) and [Rebuild notes](#rebuild-notes) below for why and what changed.

**Live:** [foodys-paradise.vercel.app](https://foodys-paradise.vercel.app) (frontend) · [foodys-paradise.onrender.com](https://foodys-paradise.onrender.com) (backend API, free-tier Render — first request may take a few seconds to wake up) · [foodys-paradise-1.onrender.com/docs](https://foodys-paradise-1.onrender.com/docs) (ML service, FastAPI's own interactive docs)

## Branches

- **`main`** — the original MERN (MongoDB · Express · React · Node) version. Kept exactly as it was, untouched by any of the rebuild work, so it's a clean diff base against everything below.
- **`java-ml-rebuild`** — the current, actively developed version described in this README.

## Architecture

| Piece | Stack | Directory |
|---|---|---|
| Frontend | React 18, React Router 6, Tailwind CSS | [`frontend/`](./frontend) |
| Backend API | Java 17, Spring Boot 4.1, Spring Security (JWT), PostgreSQL, Flyway, Hibernate/JPA | [`backend/`](./backend) |
| ML recommender | Python, FastAPI, scikit-learn (TF-IDF + cosine similarity) | [`ml-service/`](./ml-service) |

```
Browser ─▶ React (CRA dev server, :3000)
             │  REACT_APP_SERVER
             ▼
        Spring Boot API (:8081 → container :8080)
             │  JWT auth, Flyway-migrated schema
             ├─▶ PostgreSQL (:5435 → container :5432)
             └─▶ FastAPI ML service (:8000)  ── TF-IDF over recipe ingredients
```

The backend calls the ML service over plain HTTP (`MlRecommendationClient`, using
the JDK's own `HttpClient` pinned to HTTP/1.1 — see [Rebuild notes](#rebuild-notes)
for why) rather than the frontend calling it directly, so the ML service has no
public surface of its own to secure.

### Running it locally

```bash
docker compose up -d          # postgres (5435), backend (8081), ml-service (8000)
cd frontend && npm install && npm start   # React dev server (3000)
```

`frontend/.env` needs `REACT_APP_SERVER=http://localhost:8081`. `ml-service/.env`
needs `DATABASE_URL` (the compose file supplies this for the containerized
service already) and, only if re-running the Mongo migration, `MONGO_URI`.

### API surface (backend, `/api/**`)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/search?searchTerm=&page=&limit=` | Full-text recipe search |
| GET | `/api/cuisine/{cuisine}?page=&limit=` | Recipes for one cuisine |
| GET | `/api/recipe/{recipeName}` | Single recipe detail |
| GET | `/api/myfridge?ingredients=&limit=` | Ranked recommendations from the ML service |
| GET / PUT | `/api/fridge` | Read/save the logged-in user's fridge contents |
| GET / POST / DELETE | `/api/favorites`, `/api/favorites/{recipeId}` | Favorites list / add / remove |
| POST | `/api/auth/signup`, `/api/auth/login` | JWT issuance |

### Data model

Postgres schema (Flyway `V1__baseline_schema.sql`): `recipes`, `cuisines`,
`ingredients`, `recipe_ingredients` (join table), `users`, `favorites`,
`fridge_items`. Recipe → cuisine is a foreign key, not a free-text field, which
is what makes cuisine browsing and the image-bucket assignment (below) exact
rather than fuzzy string matching.

## Rebuild notes

The original app worked, but the backend was Node/Express/MongoDB with no
recommender at all ("my fridge" didn't exist), and the frontend was an
unstyled default-Tailwind scaffold. This branch is the record of turning that
into something closer to a real, considered product.

**Backend & ML (Java/Spring Boot + Postgres + FastAPI):**
- Migrated ~6,000 recipes from MongoDB into a normalized Postgres schema
  (`ml-service/etl/migrate_mongo_to_postgres.py`).
- Built the "my fridge" feature from nothing: a FastAPI service fits a
  TF-IDF vectorizer over every recipe's ingredient list and ranks by cosine
  similarity against whatever the user typed in.
- Spring Boot 4.1 splits autoconfiguration into far more granular modules
  than 3.x — Flyway, JPA, and a working `ObjectMapper` all needed explicit
  dependencies/wiring that used to come for free.
- The trickiest bug of the rebuild: the backend→ML HTTP call kept arriving
  at FastAPI with an empty body (422 "field required"), even after
  confirming the exact same payload worked via `wget` from inside the same
  container. Root cause was Java's `HttpClient` negotiating HTTP/2 against
  a `uvicorn` server that only speaks HTTP/1.1 — pinning
  `HttpClient.Version.HTTP_1_1` fixed it outright.

**Frontend redesign:**
- Replaced the default Tailwind config and a single do-everything display
  font with a real design system — a warm paper/paprika/saffron/sage
  palette, a serif (Fraunces) for titles paired with Inter for everything
  functional, the original display font (`Mogent`) scoped down to just the
  logo and hero headline.
- Removed Bootstrap entirely; rebuilt the hero, cards, and pagination as
  first-party Tailwind components instead of `react-bootstrap` +
  hand-rolled ad hoc CSS duplicated across several files.
- Consolidated two drifted copies of the recipe-card skeleton and two
  separate hand-rolled pagination implementations into single shared
  components.

**The image problem (the biggest post-rebuild fix):**
Every one of the ~6,000 recipes had an `image_url` pointing at
`archanaskitchen.com`'s old image paths — the site's since been
restructured and every single one 404s now, confirmed directly via `curl`
rather than assumed. With no Kaggle/Pexels/Unsplash API key available:
- Recipes were clustered into ~64 dish-type/cuisine buckets (biryani,
  dosa, paneer, chicken, south-indian-food, …) by keyword-matching real
  recipe titles.
- One real, freely-licensed photo per bucket was pulled from Wikimedia
  Commons (open API, no key needed, URLs that don't rot) and **self-hosted**
  under `frontend/public/images/dishes/` instead of hotlinked — the actual
  fix for a problem that was originally just a broken `<img>` fallback
  pointing at a *second* dead service (`via.placeholder.com`, since
  shut down).
- Every photo was reviewed via contact sheets, not spot-checked — caught
  and re-fetched several outright wrong matches (a wild mushroom growing
  on a tree branch, pasta arranged as the Italian flag, a restaurant
  storefront with no food in frame).
- The 12 highest-volume buckets (150+ recipes sharing one photo) got 3
  extra variants each, distributed by recipe ID, so a single
  search-results page doesn't repeat the same photo over and over.
- The scripts that did all of this are checked into
  [`ml-service/etl/`](./ml-service/etl) (`01_fetch_dish_images.mjs` →
  `02_reassign_recipe_images.sql` → `01b_fetch_image_variants.mjs` →
  `03_distribute_image_variants.sql`), so it's reproducible, not a one-off
  scratch hack.

**Repo hygiene:**
- Renamed `FoodysParadise - FrontEnd` → `frontend` and `backend-java` →
  `backend`, matching a consistent naming scheme instead of mixing
  spaced/capitalized and hyphenated conventions.
- Removed the legacy Node backend and its Caddy deployment config from
  this branch entirely (still fully intact on `main`).
- Untracked a `.env` that had been committed before `.gitignore` covered
  it (contents were never sensitive — just a local dev URL — but fixed
  the hygiene issue regardless).

## Features

- Full-text recipe search and cuisine browsing across ~6,000 recipes.
- **My Fridge**: enter what you have on hand, get ranked recipe
  recommendations from the TF-IDF-based ML service.
- JWT-based auth, favorites, and a saved-fridge-contents feature per user.

## Contributing

This is a personal portfolio project, not currently accepting external contributions. Feel free to open an issue if you spot a bug.
