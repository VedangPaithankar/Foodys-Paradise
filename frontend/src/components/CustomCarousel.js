import React from 'react';
import { Link } from 'react-router-dom';

// Replaces the old auto-rotating react-bootstrap Carousel (three unrelated
// stock photos, no headline, no call to action -- a slideshow with nothing
// to say). One composed hero instead: an actual message, tied to the app's
// real differentiator (the fridge-based recommender), plus a second path
// for someone who just wants to browse.
export default function CustomCarousel() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-10 pt-10 md:pt-16 pb-6">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-sans text-sm font-semibold tracking-[0.2em] uppercase text-saffron mb-4">
            Home cooking, simplified
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-[1.1] mb-5">
            Cook something worth telling a story about
          </h1>
          <p className="font-sans text-ink-light text-lg leading-relaxed mb-8 max-w-md">
            Tell us what's already in your fridge and we'll find a recipe
            for it &mdash; or browse thousands of dishes from kitchens
            around the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/fridge"
              className="no-underline bg-paprika hover:bg-paprika-dark text-white font-sans font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Find recipes from your fridge
            </Link>
            <Link
              to="/search"
              className="no-underline border border-ink/20 hover:border-ink text-ink font-sans font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Browse recipes
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-full h-full rounded-[2rem] bg-saffron/25 -z-10 hidden md:block" />
          <img
            src="/images/hero.jpg"
            alt="A festive Indian meal, freshly served"
            className="w-full h-[260px] md:h-[440px] object-cover rounded-[2rem] shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
