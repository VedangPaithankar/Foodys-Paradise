package com.vedang.foodysparadise.controller;

import com.vedang.foodysparadise.auth.CurrentUser;
import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.exception.AuthenticationException;
import com.vedang.foodysparadise.service.FridgeService;
import com.vedang.foodysparadise.service.RecipeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class FridgeController {

    private static final int DEFAULT_LIMIT = 10;

    private final RecipeService recipeService;
    private final FridgeService fridgeService;

    public FridgeController(RecipeService recipeService, FridgeService fridgeService) {
        this.recipeService = recipeService;
        this.fridgeService = fridgeService;
    }

    // ingredients is optional: if omitted and the caller is logged in, this
    // falls back to their saved fridge (see RecipeService.myFridge). Route is
    // permitAll() in SecurityConfig -- it 400s here instead, via
    // ValidationException, when called anonymously with no ingredients.
    @GetMapping("/api/myfridge")
    public PagedRecipesResponse<RecipeCardDto> myFridge(
            @RequestParam(required = false) String ingredients,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Integer limit
    ) {
        List<String> ingredientList = ingredients == null || ingredients.isBlank()
                ? null
                : Arrays.stream(ingredients.split(",")).map(String::trim).filter(s -> !s.isEmpty()).toList();

        return recipeService.myFridge(ingredientList, CurrentUser.id(), page, limit != null ? limit : DEFAULT_LIMIT);
    }

    @GetMapping("/api/fridge")
    public List<String> getFridge() {
        return fridgeService.getFridge(requireUserId());
    }

    @PutMapping("/api/fridge")
    public List<String> saveFridge(@RequestBody SaveFridgeRequest request) {
        return fridgeService.saveFridge(requireUserId(), request.ingredients());
    }

    private Long requireUserId() {
        Long userId = CurrentUser.id();
        if (userId == null) {
            throw new AuthenticationException("Login required");
        }
        return userId;
    }

    public record SaveFridgeRequest(List<String> ingredients) {
    }
}
