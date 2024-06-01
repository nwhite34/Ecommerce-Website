import React from 'react';

const FulfillmentSection = ({ nextStep, prevStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6">
      <h2 className="text-2xl font-bold mb-4">Where shall we send your stuff?</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="First" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Last" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="+61" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Delivery Address</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Delivery Address" />
        </div>
        <div className="flex justify-between">
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={nextStep}>
            Confirm Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default FulfillmentSection;
