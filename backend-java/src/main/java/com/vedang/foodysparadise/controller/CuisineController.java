package com.vedang.foodysparadise.controller;

import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CuisineController {

    private static final int DEFAULT_LIMIT = 10;

    private final RecipeService recipeService;

    public CuisineController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/api/cuisine/{cuisine}")
    public PagedRecipesResponse<RecipeCardDto> byCuisine(
            @PathVariable String cuisine,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Integer limit
    ) {
        return recipeService.byCuisine(cuisine, page, limit != null ? limit : DEFAULT_LIMIT);
    }
}
