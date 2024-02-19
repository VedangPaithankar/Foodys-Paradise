import React from 'react';

const FormattedSteps = ({ stepsString }) => {
  const [ingredients, ...steps] = stepsString.split('.').map(item => item.trim()).filter(item => item !== '');

  return (
    <div className='custom-font'>
      <div className='custom-font mb-3 text-xs md:text-base'>{ingredients}</div>
      <ol>
        {steps.map((step, index) => (
          <li className='custom-font mb-3 text-xs md:text-base' key={index}>{index + 1}) {step}</li>
        ))}
      </ol>
    </div>
  );
};

export default FormattedSteps;
