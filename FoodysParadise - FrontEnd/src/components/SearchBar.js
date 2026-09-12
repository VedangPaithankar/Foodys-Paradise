import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <div className="bg-sand/50 border-b border-sand">
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-14 text-center">
        <h1 className="font-serif text-3xl md:text-4xl text-ink mb-6">What are you in the mood for?</h1>
        <div className="flex items-center gap-1.5 bg-white rounded-full shadow-sm border border-sand p-1.5">
          <span className="pl-3 text-ink-light" aria-hidden="true">&#128269;</span>
          <input
            type="search"
            className="flex-1 bg-transparent border-none outline-none px-2 py-2.5 font-sans text-ink placeholder:text-ink-light/60"
            placeholder="Try butter chicken, tacos, ramen..."
            aria-label="Search recipes"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-paprika hover:bg-paprika-dark text-white font-sans font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
