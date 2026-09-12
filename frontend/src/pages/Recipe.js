import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormattedInstructions from '../components/FormattedInstructions';
import FormattedIngredients from '../components/FormattedIngredients';
import ImageFallback from '../components/ImageFallback';
import Footer from '../components/Footer';

const Recipe = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrored, setImageErrored] = useState(false);

  useEffect(() => {
    setImageErrored(false);
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
    <div className="pt-[100px] md:pt-[130px] max-w-5xl mx-auto px-5 md:px-10 bg-paper min-h-screen">
      <div className="shimmer-bg animate-shimmer h-8 w-2/3 rounded mb-6" />
      <div className="shimmer-bg animate-shimmer h-64 md:h-[420px] w-full rounded-2xl mb-10" />
      <div className="shimmer-bg animate-shimmer h-5 w-1/3 rounded mb-4" />
      <div className="shimmer-bg animate-shimmer h-5 w-1/2 rounded" />
    </div>
  );

  if (error) return <p className="pt-[110px] text-center font-sans text-brick">{error}</p>;

  if (!recipe) return <p className="pt-[110px] text-center font-sans text-ink-light">No recipe found.</p>;

  const {
    TranslatedRecipeName,
    TranslatedIngredients,
    TranslatedInstructions,
    Cuisine,
    TotalTimeInMins,
    imageurl,
  } = recipe;

  return (
    <div className="bg-paper min-h-screen">
      <div className="max-w-5xl mx-auto px-5 md:px-10 pt-[100px] md:pt-[130px] pb-16">
        <h1 className="font-serif text-3xl md:text-5xl text-ink mb-4 leading-tight">
          {TranslatedRecipeName}
        </h1>
        <div className="flex items-center gap-3 font-sans text-ink-light mb-6">
          {TotalTimeInMins && <span>&#9200; {TotalTimeInMins} min</span>}
          {Cuisine && (
            <>
              <span className="text-sand">&bull;</span>
              <span>{Cuisine}</span>
            </>
          )}
        </div>
        {imageErrored ? (
          <div className="w-full h-60 md:h-[460px] rounded-2xl mb-12 shadow-sm overflow-hidden">
            <ImageFallback />
          </div>
        ) : (
          <img
            className="w-full h-60 md:h-[460px] rounded-2xl object-cover mb-12 shadow-sm"
            src={imageurl}
            alt={TranslatedRecipeName}
            onError={() => setImageErrored(true)}
          />
        )}

        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 md:gap-14">
          <section className="bg-white rounded-2xl border border-sand p-6 md:p-7 h-fit">
            <h2 className="font-serif text-xl md:text-2xl text-ink mb-5">Ingredients</h2>
            <FormattedIngredients stepsString={TranslatedIngredients} />
          </section>

          <section>
            <h2 className="font-serif text-xl md:text-2xl text-ink mb-5">Instructions</h2>
            <FormattedInstructions stepsString={TranslatedInstructions} />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Recipe;
