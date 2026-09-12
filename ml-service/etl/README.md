# ETL pipeline

Run in this order against a fresh database:

1. **`migrate_mongo_to_postgres.py`** — one-time migration of the original
   MongoDB recipe data into Postgres (recipes, cuisines, ingredients).
   Requires `MONGO_URI` and `DATABASE_URL` in `.env`.

2. **`01_fetch_dish_images.mjs`** — downloads one real, freely-licensed photo
   per dish-type/cuisine bucket (~64 buckets: biryani, dosa, paneer,
   south-indian-food, etc.) from Wikimedia Commons. No API key needed. Saves
   into `frontend/public/images/dishes/`. This replaced every recipe's
   original `image_url`, which pointed at archanaskitchen.com paths that no
   longer exist on that site.

3. **`02_reassign_recipe_images.sql`** — matches each recipe's name (and, as
   a fallback, its cuisine) against the bucket keyword list and rewrites
   `image_url` to the matching local `/images/dishes/*.jpg` path, most
   specific match first. Run with `psql` piped in, e.g.:
   `docker compose exec -T postgres psql -U foodys_paradise -d foodys_paradise < 02_reassign_recipe_images.sql`

4. **`01b_fetch_image_variants.mjs`** — for the highest-volume buckets
   (150+ recipes sharing one photo), fetches 3 additional photo variants
   each, so a single search-results page doesn't repeat the same image.

5. **`03_distribute_image_variants.sql`** — spreads recipes in those
   high-volume buckets across their variants by `id % 4`.

Note: the `.mjs` scripts hardcode this machine's absolute output path
(`E:/Job Switch - Backend/Phase 5/frontend/public/images/dishes`) — update
`OUT_DIR` before rerunning elsewhere. They were run once to seed the image
set checked into `frontend/public/images/dishes/`; re-running isn't needed
unless the recipe dataset changes.
