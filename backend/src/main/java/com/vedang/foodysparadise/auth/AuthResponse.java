package com.vedang.foodysparadise.auth;

public record AuthResponse(UserSummary user, String token) {
}
