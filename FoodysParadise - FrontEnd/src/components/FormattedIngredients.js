import React from 'react';

const FormattedIngredients = ({ stepsString }) => {
  const [ingredientsString, ...steps] = stepsString.split('\n').map(item => item.trim()).filter(item => item !== '');

  return (
    <div className='custom-font'>
      <ol>
        {ingredientsString.split(',').map((ingredient, index) => (
          <li className='custom-font text-xs md:text-base mb-2' key={index}>
            {ingredient.trim()}
          </li>
        ))}
      </ol>
      <ol>
        {steps.map((step, index) => (
          <li className='custom-font' key={index}>
            {index + 1}) {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FormattedIngredients;