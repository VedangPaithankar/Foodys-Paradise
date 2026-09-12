import React from 'react';

const FormattedIngredients = ({ stepsString }) => {
  const [ingredientsString] = stepsString.split('\n').map(item => item.trim()).filter(item => item !== '');
  const ingredients = (ingredientsString || '').split(',').map(item => item.trim()).filter(Boolean);

  return (
    <ul className="space-y-2.5">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-start gap-3 font-sans text-ink text-[15px] md:text-base">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-paprika shrink-0" aria-hidden="true" />
          {ingredient}
        </li>
      ))}
    </ul>
  );
};

export default FormattedIngredients;
