package com.vedang.foodysparadise.repository;

import com.vedang.foodysparadise.model.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Page<Favorite> findByUser_IdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    Optional<Favorite> findByUser_IdAndRecipe_Id(Long userId, Long recipeId);

    boolean existsByUser_IdAndRecipe_Id(Long userId, Long recipeId);
}
