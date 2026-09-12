<img align="center" src="./Footter.png" alt="Foodys Paradise" width="auto" height="auto"/>

# Foodys Paradise 😋

A recipe discovery app with ~6,000 recipes, cuisine browsing, full-text search, and a "what's in my fridge" recommender that ranks recipes by ingredient overlap using a TF-IDF/cosine-similarity model.

Originally built on the MERN stack; the backend and recommendation engine were later rebuilt from scratch as a Java/Spring Boot + PostgreSQL service with a separate Python/FastAPI ML microservice, and the frontend went through a full visual redesign.

## Branches

- **`main`** — the original MERN (MongoDB/Express/React/Node) version, kept as-is for reference/diffing.
- **`java-ml-rebuild`** — the current, actively developed version: Java backend, Postgres, ML microservice, redesigned frontend.

## Architecture

| Piece | Stack | Directory |
|---|---|---|
| Frontend | React, Tailwind CSS | [`frontend/`](./frontend) |
| Backend API | Java 17, Spring Boot, Spring Security (JWT), PostgreSQL, Flyway | [`backend/`](./backend) |
| ML recommender | Python, FastAPI, scikit-learn (TF-IDF + cosine similarity) | [`ml-service/`](./ml-service) |

The original Node/Express/MongoDB backend lived alongside this one on the
`java-ml-rebuild` branch as a reference during the rewrite; it's been
removed from this branch now that the rewrite is complete, but is still
present in full on `main`.

All three services run via `docker-compose.yml` at the repo root:

```bash
docker compose up -d          # postgres (5435), backend (8081), ml-service (8000)
cd frontend && npm install && npm start   # React dev server (3000)
```

## Features

- Full-text recipe search and cuisine browsing, backed by ~6,000 migrated recipes.
- "My Fridge": enter what you have on hand, get ranked recipe recommendations from the ML service.
- JWT-based auth, favorites, and a saved-fridge-contents feature per user.

## Contributing

This is a personal portfolio project, not currently accepting external contributions. Feel free to open an issue if you spot a bug.
