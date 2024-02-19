import React, { useState } from "react";
import axios from "axios";
import image from "../assets/SearchIcon.svg";
import bg from "../assets/Group.svg";

export default function SearchBar({onSearch}) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/search?searchTerm=${searchInput}`);

      onSearch(response.data); // Pass the search results to the parent component
    } catch (error) {
      console.error("Search error:", error);
      console.log('Env',`${process.env.REACT_APP_SERVER}/api/search?searchTerm=${searchInput}`);
      //console.log('Search Term:', searchInput);
    }
  };

  return (
    <div className="search-container">
      <img className="background-image mb-10" src={bg} alt="HEHE" />
      <div className="search-content">
        <div className="input-group">
          <img className="ml-2 mr-4 h-[30px] mt-[4px] md:mt-0" src={image} alt="HEHE" />
          <input
            type="search"
            className="form-control rounded md:mt-1 custom-font"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchInput} // Bind input value to state
            onChange={handleInputChange} // Call the handler when input changes
          />
          <button 
            type="button" className="outline-primary custom-font"
            onClick={handleSearch}>
            See Results
          </button>
        </div>
      </div>
    </div>
  );
}
