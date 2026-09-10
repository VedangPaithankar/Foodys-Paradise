package com.vedang.foodysparadise.service;

import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.exception.NotFoundException;
import com.vedang.foodysparadise.model.Favorite;
import com.vedang.foodysparadise.model.Recipe;
import com.vedang.foodysparadise.model.User;
import com.vedang.foodysparadise.repository.FavoriteRepository;
import com.vedang.foodysparadise.repository.RecipeRepository;
import com.vedang.foodysparadise.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, RecipeRepository recipeRepository,
                            UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    // Idempotent: favoriting an already-favorited recipe is a no-op success,
    // which is the behavior a toggle button in the UI actually wants.
    public void add(Long userId, Long recipeId) {
        if (favoriteRepository.existsByUser_IdAndRecipe_Id(userId, recipeId)) {
            return;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new NotFoundException("Recipe not found"));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favoriteRepository.save(favorite);
    }

    public void remove(Long userId, Long recipeId) {
        Favorite favorite = favoriteRepository.findByUser_IdAndRecipe_Id(userId, recipeId)
                .orElseThrow(() -> new NotFoundException("Favorite not found"));
        favoriteRepository.delete(favorite);
    }

    public PagedRecipesResponse<RecipeCardDto> list(Long userId, int page, int limit) {
        Page<Favorite> result = favoriteRepository.findByUser_IdOrderByCreatedAtDesc(
                userId, PageRequest.of(Math.max(page - 1, 0), limit));

        var recipes = result.getContent().stream()
                .map(favorite -> RecipeCardDto.from(favorite.getRecipe()))
                .toList();

        return new PagedRecipesResponse<>(recipes, result.getTotalPages(), page);
    }
}
