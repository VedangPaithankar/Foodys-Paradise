package com.vedang.foodysparadise.dto;

import java.util.List;

// Request body sent to the ML microservice's POST /recommend -- matches the
// agreed Java<->Python contract exactly.
public record RecommendRequest(List<String> ingredients, int limit) {
}
