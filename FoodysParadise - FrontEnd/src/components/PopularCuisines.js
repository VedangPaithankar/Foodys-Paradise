import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

// Titles are display-friendly; paths must match the real cuisine names in
// the (mostly Indian-regional) recipe data exactly -- "Italian" has zero
// matches, "Italian Recipes" has 231. Picked from the actual top cuisine
// counts in the DB so none of these tiles lead to a dead "no recipes found."
const cuisines = [
    { title: "North Indian", image: "https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=", path: "/cuisine/North Indian Recipes" },
    { title: "South Indian", image: "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60=", path: "/cuisine/South Indian Recipes" },
    { title: "Italian", image: "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1643403830.jpg", path: "/cuisine/Italian Recipes" },
    { title: "Continental", image: "https://mobile-cuisine.com/wp-content/uploads/2021/07/pinoythaiyo-lolas-kitchen-3-1024x768-1.jpg", path: "/cuisine/Continental" },
    { title: "Bengali", image: "https://media.istockphoto.com/id/1213818930/photo/traditional-mexican-food.jpg?s=612x612&w=0&k=20&c=oWZyaXOiPkwUF8ehSDYZvdDCcJNkdxz2qXNFeQg111A=", path: "/cuisine/Bengali Recipes" },
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
