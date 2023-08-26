const RecipeDB = require("../models/Recipe"); // Import your Recipe model

const searchRecipes = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  try {
    const query = {
      TranslatedRecipeName: { $regex: searchTerm, $options: "i" },
    };
    const Recipe = await RecipeDB.find(query);
    res.json(Recipe);
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ error: `An error occurred while searching. ${searchTerm}` });
  }
};

module.exports = { searchRecipes };