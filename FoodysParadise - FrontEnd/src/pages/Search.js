import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generatePageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3;

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="py-1 px-[10px] md:px-4 rounded bg-yellow-300"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
      );
    }

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1) || 
        (i === currentPage - 2 && currentPage > maxVisibleButtons + 1) || 
        (i === currentPage + 2 && currentPage < totalPages - maxVisibleButtons)
      ) {
        buttons.push(
          <button
            key={`page-${i}`}
            className={`py-1 px-[10px] md:px-4 rounded bg-yellow-300 ${currentPage === i ? 'bg-yellow-500' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - maxVisibleButtons - 1 && currentPage > maxVisibleButtons + 2) || 
        (i === currentPage + maxVisibleButtons + 1 && currentPage < totalPages - maxVisibleButtons - 1)
      ) {
        buttons.push(
          <button
            key={`ellipsis-${i}`}
            className="py-1 px-4 rounded bg-yellow-300 cursor-default"
            disabled
          >
            ...
          </button>
        );
      }
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="py-1 px-4 rounded bg-yellow-300"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className='mt-[70px]'>
      <SearchBar onSearch={setSearchTerm} />
      <div>
        {isLoading 
          ? Array.from({ length: 10 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            )) 
          : searchResults.map(recipe => (
              <RecipeCard key={recipe.id || recipe.name} {...recipe} />
            ))
        }
      </div>
      <div className="flex justify-center gap-4 text-xs md:text-xl my-8">
        {generatePageButtons()}
      </div>
      {searchResults.length > 0 && <Footer />}
    </div>
  );
};

export default Search;