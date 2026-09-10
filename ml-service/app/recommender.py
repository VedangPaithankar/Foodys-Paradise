"""Small content-based recommender: TF-IDF over each recipe's ingredient
list, ranked against a user-supplied ingredient list by cosine similarity.

Deliberately not a deep-learning project -- the point is a genuine, working
ML component (vectorization + similarity ranking) behind a clean service
boundary, which is what the Java backend actually leans on for the
"recommend from what's in my fridge" feature. The corpus is static after the
one-time ETL, so the index is built once at startup and only rebuilt on an
explicit /reindex call, not on a schedule.
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.db import load_recipe_corpus


class RecipeIndex:
    def __init__(self):
        self.vectorizer: TfidfVectorizer | None = None
        self.matrix = None
        self.recipe_ids: list[int] = []

    def build(self) -> int:
        corpus = load_recipe_corpus()
        self.recipe_ids = list(corpus.keys())
        documents = [" ".join(corpus[recipe_id]) for recipe_id in self.recipe_ids]

        self.vectorizer = TfidfVectorizer()
        self.matrix = self.vectorizer.fit_transform(documents) if documents else None

        return len(self.recipe_ids)

    @property
    def indexed_recipes(self) -> int:
        return len(self.recipe_ids)

    def recommend(self, ingredients: list[str], limit: int) -> list[tuple[int, float]]:
        if not self.vectorizer or self.matrix is None or not self.recipe_ids:
            return []

        query_doc = " ".join(name.strip().lower() for name in ingredients)
        query_vector = self.vectorizer.transform([query_doc])
        scores = cosine_similarity(query_vector, self.matrix)[0]

        ranked = sorted(zip(self.recipe_ids, scores), key=lambda pair: pair[1], reverse=True)
        # Drop zero-similarity recipes -- no ingredient overlap at all isn't
        # a "recommendation," it's just noise.
        ranked = [(recipe_id, float(score)) for recipe_id, score in ranked if score > 0]

        return ranked[:limit]


# Module-level singleton, built once at process startup via the FastAPI
# lifespan handler in main.py, rebuilt on-demand via POST /reindex.
recipe_index = RecipeIndex()
