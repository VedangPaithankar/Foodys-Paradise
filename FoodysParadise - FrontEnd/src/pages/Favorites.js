import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const ITEMS_PER_PAGE = 12;

const Favorites = () => {
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/favorites`, {
        params: { page: currentPage, limit: ITEMS_PER_PAGE },
      })
      .then((response) => {
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching favorites:", error))
      .finally(() => setIsLoading(false));
  }, [isLoggedIn, currentPage]);

  if (!isLoggedIn) {
    return (
      <div className="pt-[76px] bg-paper min-h-screen flex items-center justify-center text-center px-5">
        <p className="font-serif text-2xl text-ink">Log in to see your favorite recipes.</p>
      </div>
    );
  }

  return (
    <div className="pt-[76px] bg-paper min-h-screen">
      <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8">
        <h1 className="font-serif text-2xl md:text-3xl text-ink mb-6">Your Favorites</h1>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <p className="font-sans text-ink-light">
            No favorites yet &mdash; tap the heart on any recipe to save it here.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} isFavorited />
            ))}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;
