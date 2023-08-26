import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [recommendedRecipeCards, setRecommendedRecipeCards] = useState([]);

  const handleInputChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async () => {
    try {
      console.log(ingredients);
      const response = await axios.get(`http://localhost:5000/api/myfridge?ingredients=${ingredients}`);
      console.log(response);
      // Assuming response.data contains an array of recipe objects
      const recipeCards = response.data.map((recipe, index) => (
        <RecipeCard key={index} {...recipe} />
      ));
      setRecommendedRecipeCards(recipeCards);
    } catch (error) {
      // Handle errors appropriately
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="p-4 custom-font">
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="mb-4 flex items-center rounded-full border border-gray-300"
        >
          <input
            type="text"
            className="flex-1 rounded-full border-gray-300 p-2 mr-2 ml-3 focus:outline-none"
            placeholder="Enter ingredient"
            value={ingredient}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {index === ingredients.length - 1 && (
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded-full ml-2"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </button>
          )}
          {index !== 0 && (
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-full ml-2"
              onClick={() => handleRemoveIngredient(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="bg-green-500 text-white px-4 py-2 rounded-full"
        onClick={handleSubmit}
        >
        Submit
      </button>
      {recommendedRecipeCards}
    </div>
  );
};

export default MyFridge;