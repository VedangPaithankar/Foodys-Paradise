import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormattedInstructions from '../components/FormattedInstructions';
import FormattedIngredients from '../components/FormattedIngredients';
import Footer from '../components/Footer';

const Recipe = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState({
    TranslatedRecipeName: "Masala Karela Recipe",
    TranslatedIngredients: "1 tablespoon Red Chilli powder,3 tablespoon Gram flour (besan),2 teaspoons Cumin seeds (Jeera),1 tablespoon Coriander Powder (Dhania),2 teaspoons Turmeric powder (Haldi),Salt - to taste,1 tablespoon Amchur (Dry Mango Powder),6 Karela (Bitter Gourd/ Pavakkai) - deseeded,Sunflower Oil - as required,1 Onion - thinly sliced",
    TotalTimeInMins: 45,
    Cuisine: "Indian",
    TranslatedInstructions: "To begin making the Masala Karela Recipe,de-seed the karela and slice.Do not remove the skin as the skin has all the nutrients.Add the karela to the pressure cooker with 3 tablespoon of water, salt and turmeric powder and pressure cook for three whistles.  Release the pressure immediately and open the lids. Keep aside.Heat oil in a heavy bottomed pan or a kadhai.  Add cumin seeds and let it sizzle.Once the cumin seeds have sizzled, add onions and saute them till it turns golden brown in color.Add the karela, red chilli powder, amchur powder, coriander powder and besan.  Stir to combine the masalas into the karela.Drizzle a little extra oil on the top and mix again.  Cover the pan and simmer Masala Karela stirring occasionally until everything comes together well.  Turn off the heat.Transfer Masala Karela into a serving bowl and serve.Serve Masala Karela along with Panchmel Dal and Phulka for a weekday meal with your family.",
    URL: "https://www.archanaskitchen.com/masala-karela-recipe",
    CleanedIngredients: "salt,amchur (dry mango powder),karela (bitter gourd pavakkai),red chilli powder,gram flour (besan),onion,cumin seeds (jeera),coriander powder,turmeric powder,sunflower oil",
    imageurl: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Pooja_Thakur/Karela_Masala_Recipe-4_1600.jpg",
    Ingredientcount: 10,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/api/recipe/${recipeName}`).then(res => {
      setRecipe(res.data);
    });
  }, [recipeName]);

  return (
    <>
      <div className="container my-12">
        <h1 className="mt-[90px] md:mt-[150px] mb-4 custom-font text-2xl md:text-5xl font-bold">{recipe.TranslatedRecipeName}</h1>
        <img className="w-full h-60 md:h-[550px] rounded-xl object-cover mb-10 object-center" src={recipe.imageurl} alt="" />
        
        <div className='md:flex'>
          <section className="mb-12">
            <h2 className="custom-font text-2xl font-bold mb-4">Ingredients</h2>
            <FormattedIngredients stepsString={recipe.TranslatedIngredients} />
          </section>
          
          <section>
            <h2 className="custom-font text-2xl font-bold mb-4">Instructions</h2>
            <FormattedInstructions stepsString={recipe.TranslatedInstructions} />
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Recipe;