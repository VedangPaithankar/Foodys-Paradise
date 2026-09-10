"""Read-only access to the Postgres database the Java backend owns.

The ML service never writes here -- Postgres (post-ETL) is the single source
of truth for recipes/ingredients/recipe_ingredients, and a push/export
pipeline from the Java side would just be a second copy of the same data to
keep in sync for no benefit, since this service is a pure read-only consumer.
"""

import os

from sqlalchemy import create_engine, text

DATABASE_URL = os.environ.get(
    "DATABASE_URL", "postgresql://foodys_paradise:foodys_paradise@localhost:5435/foodys_paradise"
)

_engine = create_engine(DATABASE_URL, pool_pre_ping=True)


def load_recipe_corpus() -> dict[int, list[str]]:
    """One join query: recipe_id -> [ingredient names]."""
    query = text(
        """
        SELECT ri.recipe_id, i.name
        FROM recipe_ingredients ri
        JOIN ingredients i ON i.id = ri.ingredient_id
        """
    )

    corpus: dict[int, list[str]] = {}
    with _engine.connect() as conn:
        for recipe_id, ingredient_name in conn.execute(query):
            corpus.setdefault(recipe_id, []).append(ingredient_name)

    return corpus
