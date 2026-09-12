import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import axios from 'axios';

const CuisineRecipes = () => {
    const { cuisine } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 12;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_SERVER}/api/cuisine/${cuisine}`, {
            params: { page: currentPage, limit: itemsPerPage }
        })
        .then(response => {
            setRecipes(response.data.recipes);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            setIsLoading(false);
        });
    }, [cuisine, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-[76px] bg-paper min-h-screen">
            <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8">
                <h1 className="font-serif text-2xl md:text-3xl text-ink mb-6">Recipes for {cuisine}</h1>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                            <RecipeCardSkeleton key={index} />
                        ))}
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))}
                    </div>
                ) : (
                    <p className="font-sans text-ink-light text-center py-10">
                        No {cuisine} recipes found yet.
                    </p>
                )}
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <Footer />
        </div>
    );
};

export default CuisineRecipes;
