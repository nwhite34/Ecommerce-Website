import React from 'react';
import './Stepindicator.css'; // Ensure the CSS file is imported

const StepIndicator = ({ step }) => {
  return (
    <div className="flex justify-center items-center mb-8">
      {['Information', 'Fulfillment', 'Shipping', 'Payment'].map((label, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`step-indicator ${step > index ? 'active' : ''}`}>
              {index + 1}
            </div>
            <div className={`text-sm mt-2 ${step === index + 1 ? 'text-black' : 'text-gray-400'}`}>
              {label}
            </div>
          </div>
          {index < 3 && (
            <div className="flex items-center">
              <div className={`step-line ${step > index + 1 ? 'active' : ''}`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
