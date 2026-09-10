package com.vedang.foodysparadise.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Canonical, deduped ingredient name -- e.g. "onion", "tomato". Populated by
// the ETL script (ml-service/etl/migrate_mongo_to_postgres.py) from the old
// Mongo data's CleanedIngredients text blobs, and reused as-is by the ML
// service's TF-IDF corpus. Distinct from Recipe.ingredientsRaw, which keeps
// the original, unnormalized per-recipe text the frontend renders.
@Entity
@Table(name = "ingredients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
}
