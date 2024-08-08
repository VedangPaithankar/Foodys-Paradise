import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import './PopularCuisines.css';

const cuisines = [
    { title: "Italian Cuisine", image: "https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1643403830.jpg", path: "/cuisine/Italian" },
    { title: "Mexican Cuisine", image: "https://media.istockphoto.com/id/1213818930/photo/traditional-mexican-food.jpg?s=612x612&w=0&k=20&c=oWZyaXOiPkwUF8ehSDYZvdDCcJNkdxz2qXNFeQg111A=", path: "/cuisine/Mexican" },
    { title: "Chinese Cuisine", image: "https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60=", path: "/cuisine/Chinese" },
    { title: "Indian Cuisine", image: "https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=", path: "/cuisine/Indian" },
    { title: "Thai Cuisine", image: "https://mobile-cuisine.com/wp-content/uploads/2021/07/pinoythaiyo-lolas-kitchen-3-1024x768-1.jpg", path: "/cuisine/Thai" }
];

const PopularCuisines = () => (
    <div>
        <h2 className='mt-10 ml-5 md:ml-[75px] mb-10 custom-font'>Popular Cuisines</h2>
        <div className='popular-cuisines-container md:flex md:gap-10 w-[90%] ml-[12px] md:mx-auto'>
            {cuisines.map(({ title, image, path }) => (
                <Link to={path} key={title} className='recipe-card-link'>
                    <Card title={title} image={image} />
                </Link>
            ))}
        </div>
    </div>
);

export default PopularCuisines;
