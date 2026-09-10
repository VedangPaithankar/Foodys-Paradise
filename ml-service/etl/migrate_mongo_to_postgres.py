"""One-time ETL: old Mongo `Recipe` documents -> the new normalized Postgres
schema (see backend-java/src/main/resources/db/migration/V1__baseline_schema.sql).

Usage:
    cd ml-service
    python -m etl.migrate_mongo_to_postgres

Env vars (a .env file in ml-service/ is loaded automatically, never commit it):
    MONGO_URI     -- copy by hand from the sibling project's own .env at
                     E:\\Coding - Projects\\Foodys-Paradise\\FoodysParadise - BackEnd\\.env
    DATABASE_URL  -- defaults to the dockerized Postgres on localhost:5435

Safely re-runnable: TRUNCATEs the four populated tables before loading, so a
fresh `docker-compose down -v && up` followed by a re-run always produces the
same result.
"""

import os

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from pymongo import MongoClient

from app.ingredients import normalize_ingredient_list

load_dotenv()

MONGO_URI = os.environ["MONGO_URI"]
DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql://foodys_paradise:foodys_paradise@localhost:5435/foodys_paradise"
)


def main():
    mongo_client = MongoClient(MONGO_URI)
    # Old backend's Mongoose model registers the collection as "Recipes"
    # (see FoodysParadise - BackEnd/models/Recipe.js's mongoose.model("Recipes", ...)).
    mongo_db = mongo_client.get_default_database()
    recipes_collection = mongo_db["recipes"]

    pg_conn = psycopg2.connect(DATABASE_URL)
    pg_conn.autocommit = False

    try:
        with pg_conn.cursor() as cur:
            cur.execute("TRUNCATE recipe_ingredients, recipes, ingredients, cuisines RESTART IDENTITY CASCADE")
        pg_conn.commit()

        documents = list(recipes_collection.find({}))
        print(f"Read {len(documents)} documents from Mongo")

        # --- Pass 1: build the cuisine/ingredient dictionaries ---
        cuisine_names: set[str] = set()
        ingredient_names: set[str] = set()
        empty_ingredient_recipes: list[str] = []

        parsed_ingredients_by_doc: dict[str, list[str]] = {}
        for doc in documents:
            cuisine = (doc.get("Cuisine") or "").strip()
            if cuisine:
                cuisine_names.add(cuisine)

            names = normalize_ingredient_list(doc.get("CleanedIngredients") or "")
            parsed_ingredients_by_doc[str(doc["_id"])] = names
            if names:
                ingredient_names.update(names)
            else:
                empty_ingredient_recipes.append(doc.get("TranslatedRecipeName") or str(doc["_id"]))

        with pg_conn.cursor() as cur:
            psycopg2.extras.execute_values(
                cur,
                "INSERT INTO cuisines (name) VALUES %s ON CONFLICT (name) DO NOTHING",
                [(name,) for name in cuisine_names],
            )
            psycopg2.extras.execute_values(
                cur,
                "INSERT INTO ingredients (name) VALUES %s ON CONFLICT (name) DO NOTHING",
                [(name,) for name in ingredient_names],
            )
        pg_conn.commit()

        with pg_conn.cursor() as cur:
            cur.execute("SELECT id, name FROM cuisines")
            cuisine_id_by_name = {name: cid for cid, name in cur.fetchall()}
            cur.execute("SELECT id, name FROM ingredients")
            ingredient_id_by_name = {name: iid for iid, name in cur.fetchall()}

        # --- Pass 2: load recipes + their recipe_ingredients rows ---
        recipe_ingredient_rows: list[tuple[int, int]] = []
        recipe_count = 0

        with pg_conn.cursor() as cur:
            for doc in documents:
                cuisine = (doc.get("Cuisine") or "").strip()
                cur.execute(
                    """
                    INSERT INTO recipes
                        (name, cuisine_id, total_time_mins, instructions, url,
                         image_url, ingredients_raw, ingredient_count)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    (
                        doc.get("TranslatedRecipeName"),
                        cuisine_id_by_name.get(cuisine),
                        doc.get("TotalTimeInMins"),
                        doc.get("TranslatedInstructions"),
                        doc.get("URL"),
                        doc.get("imageurl"),
                        doc.get("TranslatedIngredients"),
                        doc.get("Ingredientcount"),
                    ),
                )
                recipe_id = cur.fetchone()[0]
                recipe_count += 1

                for name in parsed_ingredients_by_doc[str(doc["_id"])]:
                    ingredient_id = ingredient_id_by_name.get(name)
                    if ingredient_id is not None:
                        recipe_ingredient_rows.append((recipe_id, ingredient_id))

            psycopg2.extras.execute_values(
                cur,
                "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES %s ON CONFLICT DO NOTHING",
                recipe_ingredient_rows,
            )

        pg_conn.commit()

        print(f"Loaded: {recipe_count} recipes, {len(cuisine_names)} cuisines, "
              f"{len(ingredient_names)} ingredients, {len(recipe_ingredient_rows)} recipe_ingredients rows")

        if empty_ingredient_recipes:
            print(f"WARNING: {len(empty_ingredient_recipes)} recipes had no parseable ingredients "
                  f"(shown, not silently dropped): {empty_ingredient_recipes[:20]}"
                  + (" ..." if len(empty_ingredient_recipes) > 20 else ""))

    except Exception:
        pg_conn.rollback()
        raise
    finally:
        pg_conn.close()
        mongo_client.close()


if __name__ == "__main__":
    main()
