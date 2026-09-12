package com.vedang.foodysparadise.repository;

import com.vedang.foodysparadise.model.Cuisine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CuisineRepository extends JpaRepository<Cuisine, Long> {
    Optional<Cuisine> findByNameIgnoreCase(String name);
}
