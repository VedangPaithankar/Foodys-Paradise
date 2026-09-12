package com.vedang.foodysparadise.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vedang.foodysparadise.model.Recipe;

// Same field-name-compatibility rationale as RecipeCardDto. TranslatedIngredients
// maps to ingredientsRaw -- the ORIGINAL comma-separated, quantity-included text
// (FormattedIngredients.js on the frontend needs this verbatim, not the
// canonicalized/deduped ingredient list used for search and the ML recommender).
public record RecipeDetailDto(
        Long id,
        @JsonProperty("TranslatedRecipeName") String name,
        @JsonProperty("imageurl") String imageUrl,
        @JsonProperty("TotalTimeInMins") Integer totalTimeMins,
        @JsonProperty("Cuisine") String cuisine,
        @JsonProperty("Ingredientcount") Integer ingredientCount,
        @JsonProperty("TranslatedIngredients") String ingredientsRaw,
        @JsonProperty("TranslatedInstructions") String instructions,
        @JsonProperty("URL") String url
) {
    public static RecipeDetailDto from(Recipe recipe) {
        return new RecipeDetailDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getImageUrl(),
                recipe.getTotalTimeMins(),
                recipe.getCuisine() != null ? recipe.getCuisine().getName() : null,
                recipe.getIngredientCount(),
                recipe.getIngredientsRaw(),
                recipe.getInstructions(),
                recipe.getUrl()
        );
    }
}
