package com.vedang.foodysparadise.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

// No role/name fields here -- unlike Phase 4's order-service, this app has no
// admin/user distinction and no need for a display name yet, so the entity
// stays as lean as the actual feature set (auth + a saved fridge).
// @Table(name = "users"): "user" alone (Hibernate's default) collides with
// the SQL-reserved word in Postgres, which the migration already avoided.
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    // Never serialize the hash out over the wire, even by accident.
    @JsonIgnore
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @CreationTimestamp
    private Instant createdAt;

    // Persisted "my fridge" -- replace-all semantics on save (PUT clears and
    // re-adds the full set), not diffed. Simplest correct behavior for a
    // pantry list with no per-item metadata.
    @ManyToMany
    @JoinTable(
            name = "fridge_items",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> fridgeIngredients = new HashSet<>();
}
