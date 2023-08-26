const RecipeDB = require("../models/Recipe");

const recipeFinder = async (req, res) => {
    const recipeName = req.params.recipeName; // Get the recipe name from the route parameter
    console.log(recipeName);
    try {
      const query = {
        TranslatedRecipeName: recipeName // Use the extracted recipe name in the query
      };
      const Recipe = await RecipeDB.findOne(query);
      console.log(query)
      console.log(Recipe);
      res.json(Recipe);
    } catch (error) {
      console.error("Search error:", error);
      res
        .status(500)
        .json({ error: `An error occurred while searching. ${recipeName}` });
    }
  };

module.exports = { recipeFinder };