// PopularCuisines.js
import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

export default function PopularCuisines() {
  return (
    <div>
      <h2 className='mt-10 ml-5 mb-10 custom-font'>Popular Cuisines</h2>
      <div className='flex flex-row justify-center drop-shadow-xl'>
      <Link className='recipe-card-link' to="/cuisine/Italian">
          <Card title="Italian Cuisine" image="https://www.tastingtable.com/img/gallery/20-italian-dishes-you-need-to-try-at-least-once/l-intro-1643403830.jpg" />
      </Link>
      <Link Link className='recipe-card-link' to="/cuisine/Mexican">
          <Card title="Mexican Cuisine" image="https://media.istockphoto.com/id/1213818930/photo/traditional-mexican-food.jpg?s=612x612&w=0&k=20&c=oWZyaXOiPkwUF8ehSDYZvdDCcJNkdxz2qXNFeQg111A=" />
      </Link>
      <Link Link className='recipe-card-link' to="/cuisine/Chinese">
          <Card title="Chinese Cuisine" image="https://media.istockphoto.com/id/545286388/photo/chinese-food-blank-background.jpg?s=612x612&w=0&k=20&c=pqOIy07YKO5PlU5VxjscwTGRrrZ8PluKMUjSOz-II60=" />
      </Link>
      <Link Link className='recipe-card-link' to="/cuisine/Indian">
          <Card title="Indian Cuisine" image="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=612x612&w=0&k=20&c=p8DepvymWfC5j7c6En2UsQ6sUM794SQMwceeBW3yQ9M=" />
      </Link>
      <Link Link className='recipe-card-link' to="/cuisine/Thai">
          <Card title="Thai Cuisine" image="https://mobile-cuisine.com/wp-content/uploads/2021/07/pinoythaiyo-lolas-kitchen-3-1024x768-1.jpg" />
      </Link>
      </div>
    </div>
  );
}