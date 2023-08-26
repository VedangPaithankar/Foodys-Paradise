const Recipe = require("../models/Recipe");

const recommendRecipes = async (req, res) => {
  try {
    const { ingredients } = req.query;
    console.log(ingredients);

    // Split the comma-separated string of ingredients into an array
    const ingredientArray = ingredients.split(",").map(ingredient => ingredient.trim());

    const ingredientRegexArray = ingredientArray.map(ingredient => {
      return `(?=.*\\b${ingredient}\\b)`; // Use positive lookahead for each ingredient
    });

    const ingredientRegex = ingredientRegexArray.join("");

    const query = {
      CleanedIngredients: {
        $regex: new RegExp(ingredientRegex, "i"), // Match recipes containing all ingredients
      },
    };

    console.log("query", query);
    const RecipeArray = await Recipe.find(query);
    console.log(RecipeArray);
    res.json(RecipeArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { recommendRecipes };
