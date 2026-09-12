import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import ImageFallback from './ImageFallback';
import { useAuth } from '../context/AuthContext';

const RecipeCard = ({
  id,
  TranslatedRecipeName,
  imageurl,
  TotalTimeInMins,
  Cuisine,
  Ingredientcount,
  isFavorited = false,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const [favorited, setFavorited] = useState(isFavorited);
  const [isToggling, setIsToggling] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleFavorite = async (e) => {
    e.preventDefault(); // don't follow the card's Link
    if (!id || isToggling) {
      return;
    }
    setIsToggling(true);
    try {
      if (favorited) {
        await axios.delete(`${process.env.REACT_APP_SERVER}/api/favorites/${id}`);
      } else {
        await axios.post(`${process.env.REACT_APP_SERVER}/api/favorites/${id}`);
      }
      setFavorited(!favorited);
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Link
      className="group no-underline block rounded-2xl overflow-hidden bg-white border border-sand shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      to={`/recipe/${TranslatedRecipeName}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {imageErrored ? (
          <ImageFallback />
        ) : (
          <>
            {!isImageLoaded && <RecipeCardSkeleton />}
            <img
              src={imageurl}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isImageLoaded ? '' : 'hidden'}`}
              alt={TranslatedRecipeName}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageErrored(true)}
            />
          </>
        )}
        {/* Only shown once a recipe has a real id and the viewer is logged
            in -- the Home page's hardcoded sample recipes have no id, and
            favoriting requires an account, same as My Fridge/Favorites. */}
        {id && isLoggedIn && (
          <button
            type="button"
            onClick={toggleFavorite}
            className="absolute top-2.5 right-2.5 z-10 bg-white/90 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow text-lg"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorited ? <span className="text-paprika">&#9829;</span> : <span className="text-ink-light">&#9825;</span>}
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="font-serif font-semibold text-ink text-lg leading-snug line-clamp-2 min-h-[3.5rem]">
          {TranslatedRecipeName}
        </p>
        <div className="mt-2 flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-ink-light font-sans">
          <span>&#9200; {TotalTimeInMins} min</span>
          <span className="text-sand">&bull;</span>
          <span>{Cuisine}</span>
          <span className="text-sand">&bull;</span>
          <span>{Ingredientcount} ingredients</span>
        </div>
      </div>
    </Link>
  );
};

RecipeCard.defaultProps = {
  TranslatedRecipeName: "Masala Karela Recipe",
  TotalTimeInMins: 45,
  Cuisine: "Indian",
  Ingredientcount: 10,
  imageurl: "/images/dishes/mixed-indian-food.jpg",
};

export default RecipeCard;
