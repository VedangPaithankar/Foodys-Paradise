"""Shared ingredient-name normalization.

Used by both migrate_mongo_to_postgres.py (to populate the canonical
`ingredients` table during the one-time ETL) and recommender.py (to build the
TF-IDF corpus from that same table) -- one shared function instead of
duplicating the same trim/lowercase/dedup logic in two places.
"""

def normalize_ingredient_list(cleaned_ingredients: str) -> list[str]:
    """Split a comma-separated ingredient blob into trimmed, lowercased,
    deduped, non-empty ingredient names, preserving first-seen order."""
    if not cleaned_ingredients:
        return []

    seen: dict[str, None] = {}
    for raw in cleaned_ingredients.split(","):
        name = raw.strip().lower()
        if name:
            seen[name] = None

    return list(seen.keys())
