package com.vedang.foodysparadise.repository;

import com.vedang.foodysparadise.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    // Preserves the old Mongo findOne({TranslatedRecipeName: name}) "first
    // match wins" behavior -- recipe names were never guaranteed unique in
    // the source data, so this deliberately doesn't assume they are now.
    Optional<Recipe> findFirstByNameIgnoreCaseOrderByIdAsc(String name);

    Page<Recipe> findByNameContainingIgnoreCase(String searchTerm, Pageable pageable);

    Page<Recipe> findByCuisine_NameIgnoreCase(String cuisine, Pageable pageable);

    List<Recipe> findByIdIn(List<Long> ids);
}
