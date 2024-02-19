import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCarousel from './components/CustomCarousal';
import PopularCuisines from './components/PopularCuisines';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';
import Search from './pages/Search';
import MyFridge from './pages/MyFridge';
import Recipe from './pages/Recipe';
import Cuisines from './pages/Cuisines';

const Recipesarray = [
  {
    TranslatedRecipeName: "Chettinad Style Chicken Roast Recipe",
    TranslatedIngredients:
      "1/4 teaspoon Kalonji (Onion Nigella Seeds),1 teaspoon Tamarind Paste,1 teaspoon Ghee,1 tablespoon Ghee,1 teaspoon Jaggery,2 teaspoons Coriander (Dhania) Seeds,1 teaspoon Whole Black Peppercorns,1/4 cup Hung Curd (Greek Yogurt),Salt - to taste,1/2 inch Cinnamon Stick (Dalchini),1 Onion - sliced,1/2 teaspoon Mustard seeds,4 cloves Garlic,1/2 inch Ginger,1/4 teaspoon Methi Seeds (Fenugreek Seeds),2 Cloves (Laung),2 tablespoon Fresh coconut - grated,1/2 teaspoon Turmeric powder (Haldi),2 teaspoon Cumin seeds (Jeera),1 Cardamom (Elaichi) Pods/Seeds,1 teaspoon Fennel seeds (Saunf),2 Dry Red Chillies,1 Chicken legs,1 teaspoon Sunflower Oil,1 sprig Curry leaves",
    TotalTimeInMins: 35,
    Cuisine: "Chettinad",
    TranslatedInstructions:
      "To begin making the Chettinad Style Chicken Roast Recipe, thoroughly wash and clean the chicken leg.\n" +
      "Keep it aside.\n" +
      "Heat oil in a heavy bottomed pan, on medium flame.\n" +
      "Add onions, coconut, ginger and garlic and cook till the onions become soft and the coconut turn light brown in colour.Turn off the flame and grind to a coarse paste with a little water in a mixer grinder.The next step is to marinate the chicken.\n" +
      "In a mixing bowl, add the onion coconut paste, yogurt, turmeric powder and chicken legs.Mix everything well and ensure that the chicken is properly quoted with the masala.\n" +
      "Keep it aside for 30 Minutes.For the Chettinad Spice MixHeat a heavy bottomed pan.\n" +
      "Add chettinad spice mix ingredients -  includes cumin seeds, coriander seeds, fenugreek seeds, kalonji, black peppercorn, dry red chillies, fennel seeds, cinnamon stick, cloves, cardamom and mustard seeds.Dry roast them for about 2 minutes.\n" +
      "Once done, let it cool down a bit.\n" +
      "Now, add thes spices into a mixer grinder and grind it into a powder.Heat ghee in the same pan and add this Chettinad spice mix into the ghee.\n" +
      "After 30 seconds, add the chicken along with all the marinade.Mix everything well, add the tamarind pulp, jaggery and 1/4 cup of water.\n" +
      "Cover the pan and cook for about 8 to 10 minutes or till the chicken is 3/4th done.Turn off flame.\n" +
      "Take out the chicken pieces seperatly and keep the masala aside.Heat a grill pan on high heat, until smoking hot and place only the chicken leg on it.Let this get a nice crispy skin by cooking it for about 5-7 minutes on each side.\n" +
      "Once done, turn off the heat and keep the chicken piece on a plate.The final step is to temper the chicken.\n" +
      "To make the tempering, heat ghee in a tadka pan on medium flame.Add mustard seeds, curry leaves and allow it to crackle.\n" +
      "Add the chopped garlic and fry till golden brown.\n" +
      "Turn off the flame.To assemble the Chettinad Style Chicken Roast Recipe, in a serving plate, place the chicken leg, top it with the thick masala and garnish with the tadka.\n" +
      "It is ready to be served.Serve this Chettinad Style Chicken Roast Recipe on its own as a party starter or with Kerala Style Appam Recipe (Without Yeast) or Mangalorean Neer Dosa Recipe (Savory Rice & Coconut Crepe) for a complete meal.",
    URL: "https://www.archanaskitchen.com/chettinad-style-chicken-roast-recipe",
    CleanedIngredients:
      "jaggery,cloves garlic,black peppercorns,curry leaves,coriander (dhania) seeds,onion,cumin seeds (jeera),turmeric powder,chicken legs,sunflower oil,salt,cardamom (elaichi) podsseeds,dry red chillies,tamarind paste,kalonji (onion nigella seeds),coconut,mustard seeds,methi seeds (fenugreek seeds),hung curd (greek yogurt),ginger,ghee,fennel seeds (saunf),cinnamon stick (dalchini),cloves (laung)",
    imageurl:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sneha-archanaskitchen.com/Chettinad_Style_Chicken_Roast_Recipe_semigravy_1600.jpg",
    Ingredientcount: 24,
  },
  {
    TranslatedRecipeName: "Spicy Lemon Chicken Kebab Recipe",
    TranslatedIngredients:
      "2 tablespoon Extra Virgin Olive Oil,1 Red Bell pepper (Capsicum) - cut into squares,Salt - to taste,1 Onion - cut into chunks,1 Chicken breasts - cut into cubes,1 teaspoon Red Chilli flakes,1 Lemon juice,1 teaspoon Black pepper powder,1 teaspoon Dried Thyme Leaves",
    TotalTimeInMins: 90,
    Cuisine: "Indian",
    TranslatedInstructions:
      "To begin making the Spicy Lemon Chicken Kebab Recipe, thoroughly wash and clean the chicken, and cut them into cubes.To marinate the chicken, in a mixing bowl, combine the chicken pieces along with the bell peppers and onions and lemon juice, dried thyme, red chilli flakes, pepper powder, olive oil, salt and mix well.\n" +
      "  Rest it for at least for about 1 hour.\n" +
      " Once it is well coated and marinated, start skewering by first placing the red bell pepper, a chicken cube followed by a onion chunk, repeating the sequence one more time.\n" +
      "Ensure the skewer is not over crowded and packed.\n" +
      "Heat a grill pan, drizzle some oil and place the skewers and cook for at least 25 minutes.\n" +
      "Keep brushing the extra marinade over the chicken and keep turning the skewers so that it is evenly cooked.Serve the Spicy Lemon Chicken Kebab Recipe, along with tzatziki dip, sliced onions and green chutney to make it more interesting.",
    URL: "https://www.archanaskitchen.com/spicy-lemon-chicken-kebab-recipe",
    CleanedIngredients:
      "salt,red bell pepper (capsicum),red chilli flakes,virgin olive oil,onion,lemon,thyme leaves,black pepper powder,chicken breasts",
    imageurl:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sibyl_sunitha/Spicy_Lemon_Chicken_Kebab_Recipe_.jpg",
    Ingredientcount: 9,
  },
  {
    TranslatedRecipeName: "Egg And Spinach Breakfast Pizza Recipe",
    TranslatedIngredients:
      "1 teaspoon Sugar,1/2 cup Caramelized onions,1 cup All Purpose Flour (Maida),1/2 cup Lukewarm Water,1 cup Mozzarella cheese - grated,1 teaspoon Red Chilli flakes,1 teaspoon Dried oregano,1 cup Spinach,1/2 cup Cherry tomatoes - halved lengthwise,1 cup Whole Wheat Flour,1 tablespoon Active dry yeast,4 Whole Eggs,1 teaspoon Salt",
    TotalTimeInMins: 130,
    Cuisine: "Continental",
    TranslatedInstructions:
      "To begin making the Egg And Spinach Breakfast Pizza recipe, get prepped up with all the ingredients first.Start by adding yeast and sugar in a bowl and pour lukewarm water to let it sit for 5-10 minutes until the yeast starts bubbling.In another bowl, add all-purpose flour, wheat flour, salt and mix with your fingers, dig a well in its center and pour in the yeast mixture.\n" +
      "Mix well.\n" +
      "Knead in the same bowl for about 5-10 minutes.Clean thoroughly counter surface, dust with flour, transfer the dough to the counter and start kneading.\n" +
      "Knead until smooth, soft and shiny dough.Place the dough in the bowl used for kneading, and cover it with a damp cloth.\n" +
      "Set it aside for 1 to 1.5 hours, for the dough to prove.\n" +
      "After 1 to 1.5 hours dough would have risen and it would be double the initial size.Cut onions in slices and fry it in oil until it caramelizes.\n" +
      "Remove from pan and keep aside.Chop spinach into small pieces and sauté it too for about a minute or two.\n" +
      "Remove from pan and keep aside.Preheat oven at 180-degree centigrade.\n" +
      "Once the dough is proven, knock down the down (punch it with your fist), this is done to release all the air that would have collected.\n" +
      "Gently knead for another 2 minutes and pizza dough is ready to use.Make two equal portions of the dough.\n" +
      "Take a portion and flatten the pizza base to the shape and size you wish.\n" +
      "Using a fork prick holes on the base to allow it to bake uniform all over the dough.Apply olive oil on the baking tray.\n" +
      "Place the flattened pizza crust on the baking tray.Sprinkle cheese, add spinach, and sprinkle caramelized onions, place cherry tomatoes, sprinkle red chili flakes, oregano.\n" +
      "Finally, break eggs on the top.Bake in preheated oven for 30 to 35 minutes until fully cooked.Serve Egg and Spinach Breakfast Pizza Recipe along with a bowl of fruits and a Espresso Coffee.",
    URL: "https://www.archanaskitchen.com/egg-and-spinach-breakfast-pizza-recipe",
    CleanedIngredients:
      "salt,wheat flour,spinach,mozzarella cheese,water,dry yeast,red chilli flakes,sugar,onion,eggs,flour (maida),cherry tomato,dried oregano",
    imageurl:
      "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Jyothi_Rajesh/Egg_and_Spinach_Breakfast_Pizza.jpg",
    Ingredientcount: 13,
  },
];

export default function App() {
  return (
    <Router>
      <>
        <Navbar title="Foodys Paradise" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/fridge" element={<MyFridge />} />
          <Route path="/recipe/:recipeName" element={<Recipe />} />
          <Route path="/cuisine/:cuisine" element={<Cuisines />} />
        </Routes>
      </>
    </Router>
  );
}

function Home() {
  return (
    <div className="mt-[80px]">
      <CustomCarousel />
      <PopularCuisines />
      <h2 className="custom-font ml-5 md:ml-[75px] mt-10 mb-5">Handpicked Recommendations</h2>
      <div className='mx-auto w-[96%]'>
        <RecipeCard {...Recipesarray[0]} />
        <RecipeCard {...Recipesarray[1]} />
        <RecipeCard {...Recipesarray[2]} />
      </div>
      <Footer />
    </div>
  );
}
