from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.recommender import recipe_index
from app.schemas import HealthResponse, ReindexResponse, RecommendRequest, RecommendResponse, RecommendedRecipe


@asynccontextmanager
async def lifespan(app: FastAPI):
    recipe_index.build()
    yield


app = FastAPI(title="FoodysParadise ML Recommender", lifespan=lifespan)


@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok", indexedRecipes=recipe_index.indexed_recipes)


@app.post("/reindex", response_model=ReindexResponse)
def reindex():
    """Manually re-run the TF-IDF index build. The recipe corpus is static
    after the one-time ETL, so no scheduler is needed -- this exists purely
    for re-running after a fresh migration or a manual data fix."""
    count = recipe_index.build()
    return ReindexResponse(indexedRecipes=count)


@app.post("/recommend", response_model=RecommendResponse)
def recommend(request: RecommendRequest):
    ranked = recipe_index.recommend(request.ingredients, request.limit)
    return RecommendResponse(
        results=[RecommendedRecipe(recipeId=recipe_id, score=score) for recipe_id, score in ranked]
    )
