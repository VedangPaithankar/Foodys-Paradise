import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormattedInstructions from '../components/FormattedInstructions';
import FormattedIngredients from '../components/FormattedIngredients';
import Footer from '../components/Footer';
import './Recipe.css';

const Recipe = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      // Check local storage first
      const cachedRecipe = localStorage.getItem(`recipe-${recipeName}`);
      if (cachedRecipe) {
        setRecipe(JSON.parse(cachedRecipe));
        setIsLoading(false);
        return;
      }

      // Fetch from API if not in local storage
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/recipe/${recipeName}`);
        setRecipe(data);
        localStorage.setItem(`recipe-${recipeName}`, JSON.stringify(data)); // Store in local storage
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("An error occurred while fetching the recipe.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeName]);

  if (isLoading) return (
    <div className="container my-12">
      <div className="skeleton-wrapper">
        <div className="skeleton skeleton-image mb-10"></div>
        <div className="skeleton skeleton-text mb-4"></div>
        <div className="skeleton skeleton-text mb-4"></div>
        <div className="skeleton skeleton-text mb-4"></div>
      </div>
    </div>
  );

  if (error) return <p>{error}</p>;

  if (!recipe) return <p>No recipe found.</p>;

  const {
    TranslatedRecipeName,
    TranslatedIngredients,
    TranslatedInstructions,
    URL,
    imageurl,
  } = recipe;

  return (
    <>
      <div className="container my-12">
        <h1 className="mt-[90px] md:mt-[150px] mb-4 custom-font text-2xl md:text-5xl font-bold">
          {TranslatedRecipeName}
        </h1>
        <img
          className="w-full h-60 md:h-[550px] rounded-xl object-cover mb-10 object-center"
          src={imageurl}
          alt={TranslatedRecipeName}
        />

        <div className="md:flex">
          <section className="mb-12 md:w-1/2">
            <h2 className="custom-font text-2xl font-bold mb-4">Ingredients</h2>
            <FormattedIngredients stepsString={TranslatedIngredients} />
          </section>

          <section className="md:w-1/2">
            <h2 className="custom-font text-2xl font-bold mb-4">Instructions</h2>
            <FormattedInstructions stepsString={TranslatedInstructions} />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Recipe;