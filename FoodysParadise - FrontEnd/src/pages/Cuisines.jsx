// CuisineRecipes.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import Footer from '../components/Footer';

const CuisineRecipes = () => {
    const { cuisine } = useParams();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Use Axios to fetch recipes for the specific cuisine from your API
        axios.get(`${process.env.REACT_APP_SERVER}/api/cuisine/${cuisine}`)
            .then(response => {
                // Assuming your API returns an array of recipes in response.data
                setRecipes(response.data);
            })
            .catch(error => {
                console.log(cuisine);
                console.error('Error fetching recipes:', error);
            });
    }, [cuisine]); // Fetch recipes whenever cuisine changes

    return (
        <>
        <div>
            <h2 className='ml-10 mt-4 custom-font'>Recipes for {cuisine} Cuisine</h2>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </div>
        <Footer/>
        </>
    );
};

export default CuisineRecipes;