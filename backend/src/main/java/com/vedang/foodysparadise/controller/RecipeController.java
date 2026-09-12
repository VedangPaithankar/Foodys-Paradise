package com.vedang.foodysparadise.controller;

import com.vedang.foodysparadise.dto.RecipeDetailDto;
import com.vedang.foodysparadise.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    // Returns the raw (unwrapped) detail object, matching the old
    // Node backend's behavior -- unlike search/cuisine/myfridge, which
    // are wrapped in {recipes, totalPages}.
    @GetMapping("/api/recipe/{recipeName}")
    public RecipeDetailDto byName(@PathVariable String recipeName) {
        return recipeService.byName(recipeName);
    }
}
