const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  TranslatedRecipeName: String,
  TranslatedIngredients: String,
  TotalTimeInMins: Number,
  Cuisine: String,
  TranslatedInstructions: String,
  URL: String,
  CleanedIngredients: String,
  imageurl: String,
  Ingredientcount: Number
});

// Create a text index on specific fields for full-text search
searchSchema.index({
  TranslatedRecipeName: "text",
  TranslatedIngredients: "text",
  TranslatedInstructions: "text",
  Cuisine: "text",
  CleanedIngredients: String
});

const SearchModel = mongoose.model("Recipes", searchSchema);

module.exports = SearchModel;