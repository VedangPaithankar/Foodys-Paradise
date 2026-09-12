package com.vedang.foodysparadise.controller;

import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    private static final int DEFAULT_LIMIT = 20;

    private final RecipeService recipeService;

    public SearchController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/api/search")
    public PagedRecipesResponse<RecipeCardDto> search(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Integer limit
    ) {
        return recipeService.search(searchTerm, page, limit != null ? limit : DEFAULT_LIMIT);
    }
}
