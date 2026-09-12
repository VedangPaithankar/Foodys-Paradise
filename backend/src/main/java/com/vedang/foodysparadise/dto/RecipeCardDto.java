package com.vedang.foodysparadise.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vedang.foodysparadise.model.Recipe;

// Field names deliberately match the OLD Mongo document's shape
// (TranslatedRecipeName, imageurl, TotalTimeInMins, Cuisine, Ingredientcount)
// via @JsonProperty, even though the DB columns underneath are cleanly named
// -- this is what lets the existing React frontend (RecipeCard.js) keep
// working unmodified against the new backend. `id` is new/additive, needed
// for the favorites feature the old app never had.
public record RecipeCardDto(
        Long id,
        @JsonProperty("TranslatedRecipeName") String name,
        @JsonProperty("imageurl") String imageUrl,
        @JsonProperty("TotalTimeInMins") Integer totalTimeMins,
        @JsonProperty("Cuisine") String cuisine,
        @JsonProperty("Ingredientcount") Integer ingredientCount
) {
    public static RecipeCardDto from(Recipe recipe) {
        return new RecipeCardDto(
                recipe.getId(),
                recipe.getName(),
                recipe.getImageUrl(),
                recipe.getTotalTimeMins(),
                recipe.getCuisine() != null ? recipe.getCuisine().getName() : null,
                recipe.getIngredientCount()
        );
    }
}
