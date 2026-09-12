package com.vedang.foodysparadise.controller;

import com.vedang.foodysparadise.auth.CurrentUser;
import com.vedang.foodysparadise.dto.PagedRecipesResponse;
import com.vedang.foodysparadise.dto.RecipeCardDto;
import com.vedang.foodysparadise.exception.AuthenticationException;
import com.vedang.foodysparadise.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FavoriteController {

    private static final int DEFAULT_LIMIT = 20;

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("/api/favorites")
    public PagedRecipesResponse<RecipeCardDto> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(required = false) Integer limit
    ) {
        return favoriteService.list(requireUserId(), page, limit != null ? limit : DEFAULT_LIMIT);
    }

    @PostMapping("/api/favorites/{recipeId}")
    public ResponseEntity<Void> add(@PathVariable Long recipeId) {
        favoriteService.add(requireUserId(), recipeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/api/favorites/{recipeId}")
    public ResponseEntity<Void> remove(@PathVariable Long recipeId) {
        favoriteService.remove(requireUserId(), recipeId);
        return ResponseEntity.noContent().build();
    }

    private Long requireUserId() {
        Long userId = CurrentUser.id();
        if (userId == null) {
            throw new AuthenticationException("Login required");
        }
        return userId;
    }
}
