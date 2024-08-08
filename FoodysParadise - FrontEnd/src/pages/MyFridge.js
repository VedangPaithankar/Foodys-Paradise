import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import './MyFridge.css';

const ITEMS_PER_PAGE = 10;

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([""]);
  const [recommendedRecipeCards, setRecommendedRecipeCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/myfridge`, {
        params: {
          ingredients: ingredients.join(","),
          page: currentPage,
          limit: ITEMS_PER_PAGE
        }
      });
      const recipes = response.data;
      if (!Array.isArray(recipes)) {
        throw new Error('Invalid response structure');
      }
      const recipeCards = recipes.map((recipe, index) => (
        <RecipeCard key={index} {...recipe} />
      ));
      setRecommendedRecipeCards(recipeCards);
      setTotalPages(1); // Adjust this as needed
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching recipes.");
    } finally {
      setIsLoading(false);
    }
  };  
  
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      handleSubmit(); // Re-fetch recipes for the new page
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`py-2 px-4 rounded ${i === currentPage ? 'bg-yellow-500' : 'bg-yellow-300'} mx-1`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center my-4">
        {pages}
      </div>
    );
  };

  return (
    <div className="custom-font mt-[100px] p-4 mx-auto w-[90%]">
      <p className="md:text-[30px] font-bold">
        Unleash your pantry's secrets, and we'll whip up the perfect recipes just for you!
      </p>
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
      {isLoading ? (
        <div className="skeleton-wrapper my-8">
          <div className="skeleton skeleton-image mb-4"></div>
          <div className="skeleton skeleton-text mb-4"></div>
          <div className="skeleton skeleton-text mb-4"></div>
          <div className="skeleton skeleton-text mb-4"></div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {recommendedRecipeCards}
          {totalPages > 1 && renderPagination()}
        </div>
      )}
    </div>
  );
};

export default MyFridge;