// Search.js
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import axios from "axios";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      setIsLoading(true);
      axios.get(`${process.env.REACT_APP_SERVER}/api/search?searchTerm=${searchTerm}&page=${currentPage}`)
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset current page when initiating a new search
  };

  // Function to generate page buttons
  const generatePageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 3; // Maximum visible page buttons

    // Display Previous button if not on the first page
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className="py-1 px-[10px] md:px-4 rounded bg-yellow-300"
          onClick={handlePrevPage}
        >
          Prev
        </button>
      );
    }

    // Display page numbers or ellipsis based on the current page and total pages
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // Always display first page
        i === totalPages || // Always display last page
        (i >= currentPage - 1 && i <= currentPage + 1) || // Display current page and adjacent pages
        (i === currentPage - 2 && currentPage > maxVisibleButtons + 1) || // Display ellipsis before current page
        (i === currentPage + 2 && currentPage < totalPages - maxVisibleButtons) // Display ellipsis after current page
      ) {
        buttons.push(
          <button
            key={i}
            className={`py-1 px-[10px] md:px-4 rounded bg-yellow-300 ${currentPage === i ? 'bg-yellow-500' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - maxVisibleButtons - 1 && currentPage > maxVisibleButtons + 2) || // Display first ellipsis
        (i === currentPage + maxVisibleButtons + 1 && currentPage < totalPages - maxVisibleButtons - 1) // Display second ellipsis
      ) {
        buttons.push(
          <button
            key={`ellipsis-${i}`}
            className="py-1 px-4 rounded bg-yellow-300 cursor-default"
            disabled={true}
          >
            ...
          </button>
        );
      }
    }

    // Display Next button if not on the last page
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="py-1 px-4 rounded bg-yellow-300"
          onClick={handleNextPage}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className='mt-[70px]'>
      <SearchBar onSearch={handleSearch} />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {searchResults.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 text-xs md:text-xl my-8">
        {generatePageButtons()}
      </div>
      {searchResults.length !== 0 && (
        <Footer/>
      )}
    </div>
  );
}