import React from 'react';

// One shared skeleton for every recipe-card grid (Search/Cuisines/MyFridge/
// Favorites/Home) -- there used to be two components (components/ and
// pages/) that had drifted apart. Shape mirrors RecipeCard.js exactly so a
// loading grid doesn't visibly jump when data arrives.
const RecipeCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-sand">
    <div className="shimmer-bg animate-shimmer aspect-[4/3] w-full" />
    <div className="p-4 space-y-2">
      <div className="shimmer-bg animate-shimmer h-5 w-4/5 rounded" />
      <div className="shimmer-bg animate-shimmer h-4 w-3/5 rounded" />
    </div>
  </div>
);

export default RecipeCardSkeleton;
