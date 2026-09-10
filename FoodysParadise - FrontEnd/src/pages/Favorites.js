import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/RecipeCardSkeleton";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const ITEMS_PER_PAGE = 10;

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
      <div className="custom-font mt-[100px] p-4 mx-auto w-[90%]">
        <p className="md:text-[30px] font-bold">Log in to see your favorite recipes.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-[100px] md:mt-[60px]">
        <h2 className="ml-10 mt-4 custom-font">Your Favorites</h2>
        {isLoading ? (
          <div>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <p className="custom-font ml-10">No favorites yet -- tap the heart on any recipe to save it here.</p>
        ) : (
          <div>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 my-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`py-2 px-4 rounded ${page === currentPage ? "bg-yellow-500" : "bg-yellow-300"} mx-1`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
