package com.vedang.foodysparadise.service;

import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.dto.RecipeDetailDto;
import com.vedang.foodysparadise.dto.RecommendResponse;
import com.vedang.foodysparadise.exception.NotFoundException;
import com.vedang.foodysparadise.exception.ValidationException;
import com.vedang.foodysparadise.model.Ingredient;
import com.vedang.foodysparadise.model.Recipe;
import com.vedang.foodysparadise.model.User;
import com.vedang.foodysparadise.repository.RecipeRepository;
import com.vedang.foodysparadise.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecipeService {

    // Internal cap on how many ranked results we ask the ML service for --
    // the Java layer paginates this in-memory per the caller's page/limit,
    // so the ML service itself never needs an offset/page concept.
    private static final int ML_RESULT_CAP = 200;

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final MlRecommendationClient mlRecommendationClient;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository,
                          MlRecommendationClient mlRecommendationClient) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.mlRecommendationClient = mlRecommendationClient;
    }

    public PagedRecipesResponse<RecipeCardDto> search(String searchTerm, int page, int limit) {
        Page<Recipe> result = recipeRepository.findByNameContainingIgnoreCase(
                searchTerm, PageRequest.of(Math.max(page - 1, 0), limit));

        return toPagedResponse(result, page);
    }

    public PagedRecipesResponse<RecipeCardDto> byCuisine(String cuisine, int page, int limit) {
        Page<Recipe> result = recipeRepository.findByCuisine_NameIgnoreCase(
                cuisine, PageRequest.of(Math.max(page - 1, 0), limit));

        return toPagedResponse(result, page);
    }

    public RecipeDetailDto byName(String name) {
        Recipe recipe = recipeRepository.findFirstByNameIgnoreCaseOrderByIdAsc(name)
                .orElseThrow(() -> new NotFoundException("Recipe not found"));

        return RecipeDetailDto.from(recipe);
    }

    // ingredients: explicit list from the caller, or null/empty to fall back
    // to the authenticated user's saved fridge (the new "default to saved
    // fridge" behavior). userId is null for anonymous callers.
    public PagedRecipesResponse<RecipeCardDto> myFridge(List<String> ingredients, Long userId, int page, int limit) {
        List<String> effectiveIngredients = ingredients;

        if ((effectiveIngredients == null || effectiveIngredients.isEmpty())) {
            if (userId == null) {
                throw new ValidationException("ingredients is required when not logged in");
            }
            effectiveIngredients = loadSavedFridge(userId);
            if (effectiveIngredients.isEmpty()) {
                throw new ValidationException("Your saved fridge is empty -- pass ingredients or save some first");
            }
        }

        List<RecommendResponse.RecommendedRecipe> ranked =
                mlRecommendationClient.recommend(effectiveIngredients, ML_RESULT_CAP);

        List<Long> orderedIds = ranked.stream().map(RecommendResponse.RecommendedRecipe::recipeId).toList();
        Map<Long, Recipe> byId = new HashMap<>();
        for (Recipe recipe : recipeRepository.findByIdIn(orderedIds)) {
            byId.put(recipe.getId(), recipe);
        }

        // findByIdIn doesn't preserve order, so rebuild it from the ML
        // service's ranking, which is the whole point of calling it.
        List<RecipeCardDto> allResults = new ArrayList<>();
        for (Long id : orderedIds) {
            Recipe recipe = byId.get(id);
            if (recipe != null) {
                allResults.add(RecipeCardDto.from(recipe));
            }
        }

        int totalPages = (int) Math.ceil(allResults.size() / (double) limit);
        int fromIndex = Math.min((Math.max(page, 1) - 1) * limit, allResults.size());
        int toIndex = Math.min(fromIndex + limit, allResults.size());

        return new PagedRecipesResponse<>(allResults.subList(fromIndex, toIndex), totalPages, page);
    }

    private List<String> loadSavedFridge(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return user.getFridgeIngredients().stream().map(Ingredient::getName).toList();
    }

    private PagedRecipesResponse<RecipeCardDto> toPagedResponse(Page<Recipe> page, int requestedPage) {
        List<RecipeCardDto> recipes = page.getContent().stream().map(RecipeCardDto::from).toList();
        return new PagedRecipesResponse<>(recipes, page.getTotalPages(), requestedPage);
    }
}
