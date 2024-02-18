import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { useState } from 'react';
export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = (results) => {
    setSearchResults(results);
  };
  return (
    <div className='mt-[70px]'>
      <SearchBar onSearch={handleSearch}/>
      <div>
        {searchResults.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe}/>
        ))}
      </div>
    </div>
    );
}