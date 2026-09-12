package com.vedang.foodysparadise.service;

import com.vedang.foodysparadise.exception.NotFoundException;
import com.vedang.foodysparadise.model.Ingredient;
import com.vedang.foodysparadise.model.User;
import com.vedang.foodysparadise.repository.IngredientRepository;
import com.vedang.foodysparadise.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class FridgeService {

    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;

    public FridgeService(UserRepository userRepository, IngredientRepository ingredientRepository) {
        this.userRepository = userRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<String> getFridge(Long userId) {
        User user = requireUser(userId);
        return user.getFridgeIngredients().stream().map(Ingredient::getName).sorted().toList();
    }

    // Replace-all semantics: clears the saved set and re-adds the given
    // names, rather than diffing. Simplest correct behavior for a pantry
    // list with no per-item metadata (see the schema comment on
    // User.fridgeIngredients).
    @Transactional
    public List<String> saveFridge(Long userId, List<String> ingredientNames) {
        User user = requireUser(userId);

        Set<Ingredient> resolved = new HashSet<>();
        for (String rawName : ingredientNames) {
            String name = rawName.trim().toLowerCase();
            if (name.isEmpty()) {
                continue;
            }
            Ingredient ingredient = ingredientRepository.findByNameIgnoreCase(name)
                    .orElseGet(() -> ingredientRepository.save(new Ingredient(null, name)));
            resolved.add(ingredient);
        }

        user.setFridgeIngredients(resolved);
        userRepository.save(user);

        return resolved.stream().map(Ingredient::getName).sorted().toList();
    }

    private User requireUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
