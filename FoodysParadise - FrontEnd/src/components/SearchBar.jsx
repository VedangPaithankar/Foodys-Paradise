import React, { useState } from "react";
import axios from "axios";

export default function SearchBar({onSearch}) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?searchTerm=${searchInput}`);

      onSearch(response.data); // Pass the search results to the parent component
    } catch (error) {
      console.error("Search error:", error);
      console.log('Search Term:', searchInput);
    }
  };

  return (
    <div className="search-container">
      <img className="background-image mb-10" src="./Assets/Group.svg" alt="HEHE" />
      <div className="search-content">
        <div className="input-group">
          <img className="ml-2 mr-4" src="./Assets/SearchIcon.svg" alt="HEHE" />
          <input
            type="search"
            className="form-control rounded mt-1 custom-font"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchInput} // Bind input value to state
            onChange={handleInputChange} // Call the handler when input changes
          />
          <button 
            type="button" className="outline-primary custom-font-white overlap-button"
            onClick={handleSearch}>
            See Results
          </button>
        </div>
      </div>
    </div>
  );
}
