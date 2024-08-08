import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCardSkeleton from './RecipeCardSkeleton';

const RecipeCard = ({
  TranslatedRecipeName,
  imageurl,
  TotalTimeInMins,
  Cuisine,
  Ingredientcount
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link className="no-underline" to={`/recipe/${TranslatedRecipeName}`}>
      <div className="flex justify-center items-center drop-shadow w-[95%] mx-auto">
        <div className="card mb-3 border-0 rounded-lg overflow-hidden w-full">
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
