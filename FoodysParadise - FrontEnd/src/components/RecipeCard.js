import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  return (
    <Link className="no-underline" to={`/recipe/${props.TranslatedRecipeName}`}>
      <div className="flex justify-center items-center drop-shadow w-[95%] mx-auto">
        <div className="card mb-3 border-0 rounded-lg overflow-hidden w-full">
          <div className="md:flex">
            <div className="h-110">
              <img
                src={props.imageurl}
                className="mx-auto w-[800px] h-[300px] md:h-[500px] object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className="p-2 md:ml-10">
              <p className="custom-font font-bold text-xl">
                {props.TranslatedRecipeName}
              </p>
              <div className="mt-10">
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Cooking Time</p>
                  <p className="custom-font font-light">&#160;-&#160;{props.TotalTimeInMins}&#160;minutes</p>
                </div>
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Cuisine:</p>
                  <p className="custom-font font-light">&#160;-&#160;{props.Cuisine}</p>
                </div>
                <div className="flex md:flex-col">
                  <p className="custom-font font-bold">Ingredient Count</p>
                  <p className="custom-font font-light">&#160;-&#160;{props.Ingredientcount}&#160;ingredients</p>
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
  TranslatedIngredients:
    "1 tablespoon Red Chilli powder,3 tablespoon Gram flour (besan),2 teaspoons Cumin seeds (Jeera),1 tablespoon Coriander Powder (Dhania),2 teaspoons Turmeric powder (Haldi),Salt - to taste,1 tablespoon Amchur (Dry Mango Powder),6 Karela (Bitter Gourd/ Pavakkai) - deseeded,Sunflower Oil - as required,1 Onion - thinly sliced",
  TotalTimeInMins: 45,
  Cuisine: "Indian",
  TranslatedInstructions:
    "To begin making the Masala Karela Recipe,de-seed the karela and slice.Do not remove the skin as the skin has all the nutrients.Add the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.  Release the pressure immediately and open the lids. Keep aside.Heat oil in a heavy bottomed pan or a kadhai.  Add cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.  Stir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.  Cover the pan and simmer Masala Karela stirring occasionally until everything comes together well.  Turn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family.",
  URL: "https://www.archanaskitchen.com/masala-karela-recipe",
  CleanedIngredients:
    "salt,amchur (dry mango powder),karela (bitter gourd pavakkai),red chilli powder,gram flour (besan),onion,cumin seeds (jeera),coriander powder,turmeric powder,sunflower oil",
  imageurl:
    "https://www.archanaskitchen.com/images/archanaskitchen/Ghongura_Chicken_Curry_Recipe-2_1600.jpg",
  Ingredientcount: 10,
};

export default RecipeCard;
