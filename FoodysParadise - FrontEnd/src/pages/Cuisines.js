import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import axios from 'axios';
import Footer from '../components/Footer';

const CuisineRecipes = () => {
    const { cuisine } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 10; // Number of recipes per page

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

    const generatePageButtons = () => {
        const buttons = [];
        const isSmallScreen = window.innerWidth < 768;
        const maxVisibleButtons = isSmallScreen ? 2 : 4; // Adjust based on screen size
    
        // Previous button
        if (currentPage > 1) {
            buttons.push(
                <button
                    key="prev"
                    className="button py-1 px-[10px] md:px-4 rounded bg-yellow-300"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Prev
                </button>
            );
        }
    
        // First page button
        if (currentPage > 1) {
            buttons.push(
                <button
                    key="first"
                    className={`button py-1 px-[10px] md:px-4 rounded bg-yellow-300 ${currentPage === 1 ? 'bg-yellow-500' : ''}`}
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            );
    
            if (currentPage > 3) {
                buttons.push(
                    <button
                        key="ellipsis-1"
                        className="button py-1 px-4 rounded bg-yellow-300 cursor-default"
                        disabled
                    >
                        ...
                    </button>
                );
            }
        }
    
        // Page numbers around the current page
        for (let i = Math.max(currentPage - maxVisibleButtons, 2); i <= Math.min(currentPage + maxVisibleButtons, totalPages - 1); i++) {
            buttons.push(
                <button
                    key={i}
                    className={`button py-1 px-[10px] md:px-4 rounded bg-yellow-300 ${currentPage === i ? 'bg-yellow-500' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
    
        // Ellipses and last page button
        if (currentPage < totalPages - 2) {
            buttons.push(
                <button
                    key="ellipsis-2"
                    className="button py-1 px-4 rounded bg-yellow-300 cursor-default"
                    disabled
                >
                    ...
                </button>
            );
        }
    
        // Last page button
        if (totalPages > 1) {
            buttons.push(
                <button
                    key="last"
                    className={`button py-1 px-[10px] md:px-4 rounded bg-yellow-300 ${currentPage === totalPages ? 'bg-yellow-500' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }
    
        // Next button
        if (currentPage < totalPages) {
            buttons.push(
                <button
                    key="next"
                    className="button py-1 px-4 rounded bg-yellow-300"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            );
        }
    
        return buttons;
    };

    return (
        <>
            <div className="mt-[100px] md:mt-[60px]">
                <h2 className='ml-10 mt-4 custom-font'>Recipes for {cuisine} Cuisine</h2>
                {isLoading ? (
                    <div>
                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                            <RecipeCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div>
                        {recipes.map(recipe => (
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))}
                    </div>
                )}
                <div className="flex justify-center gap-2 text-xs md:text-xl my-8">
                    {generatePageButtons()}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CuisineRecipes;