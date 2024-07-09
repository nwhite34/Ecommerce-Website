import React from 'react';

const ShippingSection = ({ nextStep, prevStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6">
      <h2 className="text-2xl font-bold mb-4">Shipping Method</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Standard Shipping</label>
          <input type="radio" name="shipping" value="Standard" className="mr-2" /> A$10.99 (2-7 business days)
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Express Shipping</label>
          <input type="radio" name="shipping" value="Express" className="mr-2" /> A$13.99 (1-3 business days)
        </div>
        <div className="flex justify-between">
          <button type="button" className="px-4 py-2 text-black  mt-2  border-2 border-black  rounded-full mr-2 font-semibold bg-transparent hover:bg-black hover:text-white" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="px-4 py-2 text-black  mt-2  border-2 border-black  rounded-full mr-2 font-semibold bg-transparent hover:bg-black hover:text-white" onClick={nextStep}>
            Confirm Shipping
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingSection;
