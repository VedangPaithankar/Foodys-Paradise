import React from 'react';

const FormattedSteps = ({ stepsString }) => {
  const [ingredients, ...steps] = stepsString.split('.').map(item => item.trim()).filter(item => item !== '');

  return (
    <div>
      <div className='custom-font mb-3'>{ingredients}</div>
      <ol>
        {steps.map((step, index) => (
          <li className='custom-font mb-3' key={index}>{index + 1}) {step}</li>
        ))}
      </ol>
    </div>
  );
};

export default FormattedSteps;
