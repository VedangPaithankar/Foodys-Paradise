import React from 'react';

// Shown in place of a recipe photo when the source image fails to load.
// The dataset's photo URLs point at archanaskitchen.com's old image paths,
// which the site has since restructured -- essentially all of them 404 now,
// not just the occasional broken link -- so this needs to read as an
// intentional "no photo" state, not a leftover broken-image icon. Renders
// entirely locally (no network request), unlike the old via.placeholder.com
// fallback it replaces, which had itself gone offline.
const ImageFallback = ({ className = '' }) => (
  <div className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-sand/60 text-ink-light ${className}`}>
    <span className="text-3xl" aria-hidden="true">&#127860;</span>
    <span className="font-sans text-xs tracking-wide">Photo unavailable</span>
  </div>
);

export default ImageFallback;
