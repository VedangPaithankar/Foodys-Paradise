const RecipeDB = require("../models/Recipe");

const searchRecipes = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const page = parseInt(req.query.page) || 1;
  const limit = 20;

  try {
    const query = {
      TranslatedRecipeName: { $regex: searchTerm, $options: "i" },
    };
    const recipesCount = await RecipeDB.countDocuments(query);
    const totalPages = Math.ceil(recipesCount / limit);
    const offset = (page - 1) * limit;

    const recipes = await RecipeDB.find(query)
      .skip(offset)
      .limit(limit);

    res.json({
      recipes,
      totalPages, // Make sure totalPages is returned
      currentPage: page
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: `An error occurred while searching. ${searchTerm}` });
  }
};

module.exports = { searchRecipes };