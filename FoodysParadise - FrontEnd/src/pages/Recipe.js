import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormattedInstrustions from '../components/FormattedInstructions';
import FormattedIngredients from '../components/FormattedIngredients';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { recipeName } = useParams(); // Already decoded by useParams()
  const [recipe, setRecipe] = useState({
    TranslatedRecipeName: "Masala Karela Recipe",
    TranslatedIngredients: "1 tablespoon Red Chilli powder,3 tablespoon Gram flour (besan),2 teaspoons Cumin seeds (Jeera),1 tablespoon Coriander Powder (Dhania),2 teaspoons Turmeric powder (Haldi),Salt - to taste,1 tablespoon Amchur (Dry Mango Powder),6 Karela (Bitter Gourd/ Pavakkai) - deseeded,Sunflower Oil - as required,1 Onion - thinly sliced",
    TotalTimeInMins: 45,
    Cuisine: "Indian",
    TranslatedInstructions: "To begin making the Masala Karela Recipe,de-seed the karela and slice.Do not remove the skin as the skin has all the nutrients.Add the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.  Release the pressure immediately and open the lids. Keep aside.Heat oil in a heavy bottomed pan or a kadhai.  Add cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.  Stir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.  Cover the pan and simmer Masala Karela stirring occasionally until everything comes together well.  Turn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family.",
    URL: "https://www.archanaskitchen.com/masala-karela-recipe",
    CleanedIngredients: "salt,amchur (dry mango powder),karela (bitter gourd pavakkai),red chilli powder,gram flour (besan),onion,cumin seeds (jeera),coriander powder,turmeric powder,sunflower oil",
    imageurl: "https://www.archanaskitchen.com/images/archanaskitchen/Ghongura_Chicken_Curry_Recipe-2_1600.jpg",
    Ingredientcount: 10,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/api/recipe/${recipeName}`).then(res => {
      setRecipe(res.data);
      console.log(recipeName);
    });
  }, []);

  return (
    <>
      <div className="container mt-[120px]">
        <h1 className='underline mt-3 mb-8 md:mb-12 custom-font text-[20px] md:text-xl'>{recipe.TranslatedRecipeName}</h1>
        <img className='w-full rounded-3xl object-cover h-40 md:h-[640px] mb-10 md:mb-20 drop-shadow-5xl' src={recipe.imageurl} alt="" />
        <div className="row mb-10">
          <div className="col-md-6">
            <h3 className='custom-font'>Ingredients</h3>
            <ol>
              <FormattedIngredients stepsString={recipe.TranslatedIngredients} />
            </ol>
          </div>
          <div className="col-md-6">
            <h3 className='custom-font'>Instructions</h3>
            <ol className='custom-font'>
              <FormattedInstrustions stepsString={recipe.TranslatedInstructions} />
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recipe;

Recipe.defaultProps = {
  TranslatedRecipeName: "Masala Karela Recipe",
  TranslatedIngredients: "1 tablespoon Red Chilli powder,3 tablespoon Gram flour (besan),2 teaspoons Cumin seeds (Jeera),1 tablespoon Coriander Powder (Dhania),2 teaspoons Turmeric powder (Haldi),Salt - to taste,1 tablespoon Amchur (Dry Mango Powder),6 Karela (Bitter Gourd/ Pavakkai) - deseeded,Sunflower Oil - as required,1 Onion - thinly sliced",
  TotalTimeInMins: 45,
  Cuisine: "Indian",
  TranslatedInstructions: "To begin making the Masala Karela Recipe,de-seed the karela and slice.Do not remove the skin as the skin has all the nutrients.Add the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.  Release the pressure immediately and open the lids. Keep aside.Heat oil in a heavy bottomed pan or a kadhai.  Add cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.  Stir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.  Cover the pan and simmer Masala Karela stirring occasionally until everything comes together well.  Turn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family.",
  URL: "https://www.archanaskitchen.com/masala-karela-recipe",
  CleanedIngredients: "salt,amchur (dry mango powder),karela (bitter gourd pavakkai),red chilli powder,gram flour (besan),onion,cumin seeds (jeera),coriander powder,turmeric powder,sunflower oil",
  imageurl: "https://www.archanaskitchen.com/images/archanaskitchen/Ghongura_Chicken_Curry_Recipe-2_1600.jpg",
  Ingredientcount: 10,
};
