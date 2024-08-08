import React from 'react';
import './RecipeCardSkeleton.css';

const RecipeCardSkeleton = () => (
  <div className="flex justify-center items-center drop-shadow w-[95%] mx-auto">
    <div className="card mb-3 border-0 rounded-lg overflow-hidden w-full">
      <div className="md:flex">
        <div className="h-110 skeleton-image"></div>
      </div>
    </div>
  </div>
);

export default RecipeCardSkeleton;
