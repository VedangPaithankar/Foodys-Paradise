import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

// Titles are display-friendly; paths must match the real cuisine names in
// the (mostly Indian-regional) recipe data exactly -- "Italian" has zero
// matches, "Italian Recipes" has 231. Picked from the actual top cuisine
// counts in the DB so none of these tiles lead to a dead "no recipes found."
// Images are the same self-hosted dish-bucket photos used to backfill
// recipes.image_url (see reassign_images.sql) -- the old hotlinked stock
// photos here didn't even match their own labels (the "South Indian" tile
// was captioned "chinese food" on istock, "Bengali" was "traditional
// mexican food").
const cuisines = [
    { title: "North Indian", image: "/images/dishes/north-indian-food.jpg", path: "/cuisine/North Indian Recipes" },
    { title: "South Indian", image: "/images/dishes/south-indian-food.jpg", path: "/cuisine/South Indian Recipes" },
    { title: "Italian", image: "/images/dishes/italian-food.jpg", path: "/cuisine/Italian Recipes" },
    { title: "Continental", image: "/images/dishes/continental-food.jpg", path: "/cuisine/Continental" },
    { title: "Bengali", image: "/images/dishes/east-indian-food.jpg", path: "/cuisine/Bengali Recipes" },
];

const PopularCuisines = () => (
    <section className="max-w-6xl mx-auto px-5 md:px-10 py-10">
        <h2 className="font-serif text-2xl md:text-3xl text-ink mb-6">Popular Cuisines</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {cuisines.map(({ title, image, path }) => (
                <Link to={path} key={title} className="no-underline">
                    <Card title={title} image={image} />
                </Link>
            ))}
        </div>
    </section>
);

export default PopularCuisines;
