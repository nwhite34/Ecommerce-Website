import React from 'react';

const InformationSection = ({ nextStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6 mx-4 sm:mx-auto sm:max-w-md mt-6 md:mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout Faster</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="joinRewards"
            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label htmlFor="joinRewards" className="ml-2 block text-sm text-gray-700">
            Join Nicks Collection Rewards to receive news, offers, and discounts
          </label>
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-full font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          onClick={nextStep}
        >
          Continue As Guest
        </button>
      </form>
    </div>
  );
};

export default InformationSection;
