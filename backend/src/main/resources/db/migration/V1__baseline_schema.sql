-- Baseline schema for the FoodysParadise Java rebuild.
--
-- Replaces the old single flat Mongo `Recipe` document with a normalized
-- relational model: cuisines and ingredients are proper lookup tables,
-- recipe<->ingredient is a real many-to-many, and accounts/fridge/favorites
-- are new (the old app had none of these).

CREATE TABLE cuisines (
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE ingredients (
    id   BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id               BIGSERIAL PRIMARY KEY,
    name             VARCHAR(500) NOT NULL,
    cuisine_id       BIGINT REFERENCES cuisines(id),
    total_time_mins  INTEGER,
    instructions     TEXT,
    url              VARCHAR(1000),
    image_url        VARCHAR(1000),
    -- Original comma-separated, quantity-included ingredient text (e.g.
    -- "1/4 teaspoon Kalonji, ..."). The frontend's FormattedIngredients
    -- component needs this verbatim -- it's distinct from the normalized
    -- `ingredients` table below, which only holds canonical/deduped names
    -- used for search and the ML recommender.
    ingredients_raw  TEXT,
    -- Kept as the original value from the source data rather than recomputed
    -- from recipe_ingredients, since canonicalization/dedup can shrink the
    -- count and the frontend displays this number as-is for parity.
    ingredient_count INTEGER
);

CREATE INDEX idx_recipes_name ON recipes (name);
CREATE INDEX idx_recipes_cuisine_id ON recipes (cuisine_id);

CREATE TABLE recipe_ingredients (
    recipe_id     BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_ingredient_id ON recipe_ingredients (ingredient_id);

CREATE TABLE users (
    id            BIGSERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE favorites (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipe_id  BIGINT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, recipe_id)
);

-- Persisted "my fridge" -- a user's saved pantry, so ingredients aren't
-- retyped on every visit. Plain join table, no extra columns needed since
-- there's no quantity/unit being modeled (that only exists as unstructured
-- text in recipes.ingredients_raw).
CREATE TABLE fridge_items (
    user_id       BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ingredient_id BIGINT NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, ingredient_id)
);
