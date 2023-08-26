import React from 'react';

const FormattedSteps = ({ stepsString }) => {
  const stepsAndIngredients = stepsString.split('\n').map(item => item.trim()).filter(item => item !== '');
  
  const ingredients = stepsAndIngredients[0];
  const steps = stepsAndIngredients.slice(1);

  return (
    <div>
      <ol>
        {ingredients.split(',').map((ingredient, index) => (
          <li className='custom-font mb-3' key={index}>{ingredient.trim()}</li>
        ))}
      </ol>
      <ol>
        {steps.map((step, index) => (
          <li className='custom-font mb-3' key={index}>{index + 1}) {step}</li>
        ))}
      </ol>
    </div>
  );
};

export default FormattedSteps;