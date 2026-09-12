package com.vedang.foodysparadise.dto;

import java.util.List;

// Shared response shape for /api/search, /api/cuisine/{cuisine}, and
// /api/myfridge -- matches the old Node backend's {recipes, totalPages}
// (plus currentPage for parity), and fixes /api/myfridge specifically,
// which used to return a raw array with totalPages hardcoded to 1
// client-side.
public record PagedRecipesResponse<T>(List<T> recipes, int totalPages, int currentPage) {
}
