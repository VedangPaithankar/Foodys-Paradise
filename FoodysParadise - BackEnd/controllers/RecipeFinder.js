const RecipeDB = require("../models/Recipe");

// Function to find recipes by ingredients
const recipeFinderByIngredients = async (req, res) => {
  const { ingredients, page, limit } = req.query;
  try {
    const recipes = await RecipeDB.find({ ingredients: { $in: ingredients.split(',') } })
                                  .limit(parseInt(limit))
                                  .skip((parseInt(page) - 1) * parseInt(limit));
    const total = await RecipeDB.countDocuments({ ingredients: { $in: ingredients.split(',') } });
    res.json({ recipes, total });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
};

// Function to find a recipe by name
const recipeFinderByName = async (req, res) => {
  const { recipeName } = req.params;
  try {
    const recipe = await RecipeDB.findOne({ TranslatedRecipeName: recipeName });
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'An error occurred while fetching the recipe' });
  }
};

module.exports = { recipeFinderByIngredients, recipeFinderByName };