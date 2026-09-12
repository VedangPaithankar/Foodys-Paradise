package com.vedang.foodysparadise.auth;

import org.springframework.security.core.context.SecurityContextHolder;

// Small static helper so controllers can read "who's making this request" --
// returns null instead of throwing when there's no authenticated user, since
// several routes here (search, cuisine, recipe detail, myfridge with an
// explicit ingredients param) work fine anonymously.
public final class CurrentUser {

    private CurrentUser() {
    }

    public static Long id() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof Long)) {
            return null;
        }

        return (Long) authentication.getPrincipal();
    }
}
