package com.vedang.foodysparadise.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "recipes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Deliberately not unique -- the old Mongo data has no uniqueness
    // guarantee on recipe names either, and RecipeRepository.findFirstByName*
    // preserves the old findOne() "first match wins" behavior instead of
    // assuming the migration made names unique.
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuisine_id")
    private Cuisine cuisine;

    private Integer totalTimeMins;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    private String url;

    private String imageUrl;

    // Original comma-separated, quantity-included ingredient text -- what
    // FormattedIngredients.js on the frontend actually renders. Kept
    // separate from the normalized `ingredients` join below.
    @Column(columnDefinition = "TEXT")
    private String ingredientsRaw;

    // Original value from the source data, not recomputed from
    // recipeIngredients (canonicalization/dedup can shrink that count).
    private Integer ingredientCount;

    @ManyToMany
    @JoinTable(
            name = "recipe_ingredients",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();
}
