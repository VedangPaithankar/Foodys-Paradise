package com.vedang.foodysparadise.repository;

import com.vedang.foodysparadise.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    Optional<Ingredient> findByNameIgnoreCase(String name);

    List<Ingredient> findByNameIgnoreCaseIn(List<String> names);
}
