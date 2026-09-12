import React from 'react';

const FormattedInstructions = ({ stepsString }) => {
  const [instructions, ...steps] = stepsString.split('.').map(item => item.trim()).filter(item => item !== '');

  return (
    <div>
      {instructions && (
        <p className="font-sans text-ink-light text-[15px] md:text-base mb-6">{instructions}.</p>
      )}
      <ol className="space-y-5">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="font-serif shrink-0 w-8 h-8 rounded-full bg-paprika/10 text-paprika font-semibold flex items-center justify-center text-sm">
              {index + 1}
            </span>
            <span className="font-sans text-ink text-[15px] md:text-base pt-0.5">{step}.</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FormattedInstructions;
