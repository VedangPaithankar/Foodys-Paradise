const RecipeDB = require("../models/Recipe");

const cuisineFinder = async (req, res) => {
    const cuisine = req.params.cuisine; // Use lowercase "cuisine"
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    try {
        // Use a regular expression to match similar cuisines
        const query = {
            Cuisine: { $regex: new RegExp(cuisine, "i") } // "i" for case-insensitive search
        };

        // Fetch the total number of recipes for pagination info
        const totalRecipes = await RecipeDB.countDocuments(query);

        // Fetch the recipes with pagination
        const recipes = await RecipeDB.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        // Calculate total pages
        const totalPages = Math.ceil(totalRecipes / limit);

        res.json({
            recipes,
            totalPages
        });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: `An error occurred while searching for ${cuisine}` });
    }
};

module.exports = { cuisineFinder };