const RecipeDB = require("../models/Recipe");

const cuisineFinder = async (req, res) => {
    const cuisine = req.params.cuisine; // Use lowercase "cuisine"
    try {
        // Use a regular expression to match similar cuisines
        const query = {
            Cuisine: { $regex: new RegExp(cuisine, "i") } // "i" for case-insensitive search
        };
        const Recipe = await RecipeDB.find(query);
        res.json(Recipe);
    } catch (error) {
        console.log('cuisine');
        console.error("Search error:", error);
        res.status(500).json({ error: `An error occurred while searching. ${cuisine}` });
    }
};

module.exports = { cuisineFinder };