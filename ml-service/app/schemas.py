from pydantic import BaseModel


class RecommendRequest(BaseModel):
    ingredients: list[str]
    limit: int = 20


class RecommendedRecipe(BaseModel):
    recipeId: int
    score: float


class RecommendResponse(BaseModel):
    results: list[RecommendedRecipe]


class HealthResponse(BaseModel):
    status: str
    indexedRecipes: int


class ReindexResponse(BaseModel):
    indexedRecipes: int
