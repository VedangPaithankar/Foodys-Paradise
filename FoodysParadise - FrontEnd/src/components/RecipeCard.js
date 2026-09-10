import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCardSkeleton from './RecipeCardSkeleton';
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
    <Link className="no-underline" to={`/recipe/${TranslatedRecipeName}`}>
      <div className="flex justify-center items-center drop-shadow w-[95%] mx-auto">
        <div className="card mb-3 border-0 rounded-lg overflow-hidden w-full relative">
          {/* Only shown once a recipe has a real id and the viewer is logged
              in -- the Home page's hardcoded sample recipes have no id, and
              favoriting requires an account, same as My Fridge/Favorites. */}
          {id && isLoggedIn && (
            <button
              type="button"
              onClick={toggleFavorite}
              className="absolute top-2 right-2 z-10 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorited ? '❤️' : '🤍'}
            </button>
          )}
          <div className="md:flex">
            <div className="h-110">
              {!isImageLoaded && <RecipeCardSkeleton />}
              <img
                src={imageurl}
                className={`mx-auto w-[800px] h-[300px] md:h-[500px] object-cover rounded-lg ${isImageLoaded ? '' : 'hidden'}`}
                alt={TranslatedRecipeName}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x300?text=Image+Not+Available';
                }}
              />
            </div>
            <div className="p-2 md:ml-10">
              <p className="custom-font font-bold text-xl">
                {TranslatedRecipeName}
              </p>
              <div className="mt-10">
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Cooking Time</p>
                  <p className="custom-font font-light">
                    &#160;-&#160;{TotalTimeInMins}&#160;minutes
                  </p>
                </div>
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Cuisine:</p>
                  <p className="custom-font font-light">
                    &#160;-&#160;{Cuisine}
                  </p>
                </div>
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Ingredient Count</p>
                  <p className="custom-font font-light">
                    &#160;-&#160;{Ingredientcount}&#160;ingredients
                  </p>
                </div>
              </div>
            </div>
          </div>
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
  imageurl: "https://www.archanaskitchen.com/images/archanaskitchen/Ghongura_Chicken_Curry_Recipe-2_1600.jpg",
};

export default RecipeCard;
