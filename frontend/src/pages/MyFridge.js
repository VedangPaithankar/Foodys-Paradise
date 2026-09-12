import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";

const ITEMS_PER_PAGE = 12;

const MyFridge = () => {
  const { isLoggedIn } = useAuth();
  const [ingredients, setIngredients] = useState([""]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Prefill from the saved fridge when logged in, so ingredients aren't
  // retyped on every visit -- the old app had no accounts, so this is new.
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/fridge`)
      .then((response) => {
        if (response.data.length > 0) {
          setIngredients(response.data);
        }
      })
      .catch((error) => console.error("Error loading saved fridge:", error));
  }, [isLoggedIn]);

  const handleInputChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);

  const handleRemoveIngredient = (index) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  const fetchRecipes = async (page) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/myfridge`, {
        params: {
          ingredients: ingredients.filter((i) => i.trim() !== "").join(","),
          page,
          limit: ITEMS_PER_PAGE
        }
      });
      setResults(response.data.recipes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "An error occurred while fetching recipes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setCurrentPage(1);
    await fetchRecipes(1);
  };

  const handleSaveFridge = async () => {
    setIsSaving(true);
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/api/fridge`, {
        ingredients: ingredients.filter((i) => i.trim() !== ""),
      });
    } catch (error) {
      console.error("Error saving fridge:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchRecipes(page);
    }
  };

  return (
    <div className="pt-[76px] bg-paper min-h-screen">
      <div className="max-w-4xl mx-auto px-5 md:px-10 pt-10 pb-6 text-center">
        <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-saffron mb-3">
          My Fridge
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">
          What's already in your kitchen?
        </h1>
        <p className="font-sans text-ink-light mb-8">
          Add what you've got and we'll rank recipes by how well they match.
        </p>

        <div className="max-w-lg mx-auto space-y-3 text-left">
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white rounded-full border border-sand pl-4 pr-1.5 py-1.5"
            >
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none font-sans text-ink placeholder:text-ink-light/60 py-1"
                placeholder="e.g. chicken, onion, garlic"
                value={ingredient}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {index !== 0 && (
                <button
                  type="button"
                  className="text-ink-light hover:text-brick font-sans text-sm px-2"
                  onClick={() => handleRemoveIngredient(index)}
                  aria-label="Remove ingredient"
                >
                  &times;
                </button>
              )}
              {index === ingredients.length - 1 && (
                <button
                  type="button"
                  className="bg-ink hover:bg-ink/80 text-white font-sans text-sm font-medium px-4 py-2 rounded-full shrink-0 transition-colors"
                  onClick={handleAddIngredient}
                >
                  + Add
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            className="bg-paprika hover:bg-paprika-dark text-white font-sans font-semibold px-7 py-2.5 rounded-full transition-colors"
            onClick={handleSubmit}
          >
            Find recipes
          </button>
          {isLoggedIn && (
            <button
              type="button"
              className="border border-sage text-sage hover:bg-sage hover:text-white font-sans font-semibold px-6 py-2.5 rounded-full transition-colors disabled:opacity-50"
              onClick={handleSaveFridge}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save my fridge"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 pb-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="font-sans text-brick text-center mt-4">{error}</p>
        ) : hasSearched && results.length === 0 ? (
          <p className="font-sans text-ink-light text-center mt-4">
            No matches yet -- try adding a few more ingredients.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default MyFridge;
