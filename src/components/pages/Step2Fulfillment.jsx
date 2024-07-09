import React from 'react';

const FulfillmentSection = ({ nextStep, prevStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6 mx-4 sm:mx-auto sm:max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Where shall we send your stuff?</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Last Name"
          />
        </div>
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            id="mobile"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Mobile Number"
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</label>
          <input
            type="text"
            id="deliveryAddress"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Delivery Address"
          />
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
            Confirm Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default FulfillmentSection;
