const totalPages = async (req, res) => {
  const searchTerm = req.params.searchInput;
  const limit = 20;

  try {
    const query = {
      TranslatedRecipeName: { $regex: searchTerm, $options: "i" },
    };

    const recipesCount = await RecipeDB.countDocuments(query);

    const totalPages = Math.ceil(recipesCount / limit);
    res.json({ totalPages });
  } catch (error) {
    console.error("Error calculating total pages:", error);
    res.status(500).json({ error: "An error occurred while calculating total pages." });
  }
};

module.exports = { totalPages };