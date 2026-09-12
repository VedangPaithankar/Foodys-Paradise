import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import Pagination from '../components/Pagination';
import Footer from '../components/Footer';
import axios from "axios";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      axios.get(`${process.env.REACT_APP_SERVER}/api/search`, {
        params: { searchTerm, page: currentPage }
      })
      .then(response => {
        setSearchResults(response.data.recipes);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Search error:", error);
        setIsLoading(false);
      });
    }
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-[70px] bg-paper min-h-screen">
      <SearchBar onSearch={handleSearch} />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map(recipe => (
              <RecipeCard key={recipe.id || recipe.name} {...recipe} />
            ))}
          </div>
        ) : searchTerm ? (
          <p className="font-sans text-ink-light text-center py-10">
            No recipes found for &ldquo;{searchTerm}&rdquo;.
          </p>
        ) : null}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {searchResults.length > 0 && <Footer />}
    </div>
  );
};

export default Search;
