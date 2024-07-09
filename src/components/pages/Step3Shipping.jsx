import React from 'react';

const ShippingSection = ({ nextStep, prevStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6 mx-4 sm:mx-auto sm:max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Method</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">
            <input type="radio" name="shipping" value="Standard" className="mr-2" />
            Standard Shipping - A$10.99 (2-7 business days)
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">
            <input type="radio" name="shipping" value="Express" className="mr-2" />
            Express Shipping - A$13.99 (1-3 business days)
          </label>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-800 mt-2 rounded-full font-semibold bg-transparent border border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring focus:bg-gray-800"
            onClick={prevStep}
          >
            Previous
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm text-white mt-2 rounded-full font-semibold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            onClick={nextStep}
          >
            Confirm Shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingSection;
