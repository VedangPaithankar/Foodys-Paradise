# Deploying Foodys Paradise

Three independently-deployed pieces, matching the local architecture in
[README.md](./README.md):

| Piece | Where | Why |
|---|---|---|
| Postgres | [Neon](https://neon.tech) | Free serverless Postgres that doesn't sleep or expire (Render's free Postgres expires after 30 days) |
| Backend + ML service | [Render](https://render.com) | Free Docker web services, one per `Dockerfile` already in the repo |
| Frontend | [Vercel](https://vercel.com) | Free static hosting for the CRA build, global CDN, trivial GitHub integration |

All three have permanent free tiers with no card required. Total cost: $0.
The one tradeoff: Render's free web services spin down after 15 minutes of
inactivity, so the first request after a quiet period takes ~30-50s to wake
up. Fine for a portfolio demo; mention it if a reviewer hits it cold.

## 1. Database (Neon)

1. Sign up at neon.tech, create a project (any region). Grab the connection
   string it gives you — looks like
   `postgres://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require`.
2. Copy the schema **and** the ~6,000 recipes already loaded locally into it.
   The local docker-compose Postgres has everything (schema + data +
   Flyway's own migration-history table), so one dump/restore carries it all
   over — no need to re-run Flyway or the ETL scripts against Neon.

   ```bash
   # from the repo root, with docker compose's postgres running (port 5435)
   pg_dump -h localhost -p 5435 -U foodys_paradise -d foodys_paradise -F c -f foodysparadise.dump

   # restore into Neon (use the connection string Neon gave you)
   pg_restore --no-owner --no-privileges \
     --dbname="postgres://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require" \
     foodysparadise.dump
   ```

   Needs the Postgres client tools (`pg_dump`/`pg_restore`) — already on this
   machine at `C:\Program Files\PostgreSQL\18\bin`, on PATH.

## 2. Backend (Render)

1. New → Web Service → connect the GitHub repo → branch `java-ml-rebuild` →
   **Root Directory: `backend`**. Render auto-detects the `Dockerfile`.
   Instance type: Free.
2. Environment variables (Render's dashboard, not committed anywhere):
   | Key | Value |
   |---|---|
   | `SPRING_DATASOURCE_URL` | `jdbc:postgresql://<host>.neon.tech/<dbname>?sslmode=require` |
   | `SPRING_DATASOURCE_USERNAME` | Neon username |
   | `SPRING_DATASOURCE_PASSWORD` | Neon password |
   | `JWT_SECRET` | a fresh secret — `openssl rand -base64 32` — not the dev one in `application.properties` |
   | `ML_SERVICE_BASE_URL` | filled in after step 3 |
   | `ALLOWED_ORIGINS` | filled in after step 4 |
3. Deploy. Note the resulting URL (`https://foodysparadise-backend.onrender.com`).

## 3. ML service (Render)

1. New → Web Service → same repo → **Root Directory: `ml-service`** → Docker → Free.
2. Environment variable:
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | `postgresql://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require` |
3. Deploy. Note its URL, then go back to the backend service's env vars and
   set `ML_SERVICE_BASE_URL` to it (triggers an automatic redeploy).

## 4. Frontend (Vercel)

1. New Project → import the repo → **Root Directory: `frontend`** →
   Framework preset: Create React App.
2. Environment variable — **must be set before the first build**, since CRA
   bakes `REACT_APP_*` vars into the bundle at build time, not at runtime:
   | Key | Value |
   |---|---|
   | `REACT_APP_SERVER` | the backend URL from step 2 |
3. Deploy. Note the resulting URL (`https://foodysparadise.vercel.app`).

## 5. Close the loop

Back on the Render backend service, set `ALLOWED_ORIGINS` to the Vercel URL
(comma-separate with `http://localhost:3000` if you still want local dev to
work against the same deployed backend) and let it redeploy. Without this,
the browser blocks every request from the deployed frontend at the CORS
preflight stage even though the backend itself is healthy.

## 6. Verify

Visit the Vercel URL and click through: home page (hero image loads),
search, cuisine browse, recipe detail (dish photos load), signup, login,
My Fridge recommender, favorites. Expect one slow (~30-50s) request if
either Render service had spun down.

## Why this stack and not one dashboard

Railway would collapse this into one project, but its free tier is a
trial credit that runs out, not a permanent free tier — not ideal for a
project meant to stay up indefinitely as a portfolio piece. Render (compute)
+ Neon (database) + Vercel (static frontend) are each free with no expiry,
at the cost of three dashboards instead of one.
