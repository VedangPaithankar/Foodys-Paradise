package com.vedang.foodysparadise.dto;

import java.util.List;

// Response body from the ML microservice's POST /recommend.
public record RecommendResponse(List<RecommendedRecipe> results) {
    public record RecommendedRecipe(Long recipeId, double score) {
    }
}
