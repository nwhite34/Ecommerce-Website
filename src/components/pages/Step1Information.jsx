import React from 'react';

const InformationSection = ({ nextStep }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded mb-6">
      <h2 className="text-2xl font-bold mb-4">Checkout Faster</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input type="email" className="w-full p-2 border rounded" placeholder="nick-whiteley@hotmail.com" />
        </div>
        <div className="mb-4 flex items-center">
          <input type="checkbox" className="mr-2" />
          <label className="text-gray-700">
            Join City Beach Rewards to receive the latest news & offers and get a discount on your first order*
          </label>
        </div>
        <button type="button" className="w-full bg-blue-500 text-black py-2 mt-2  border-2 border-black  px-6  rounded-full mr-2 font-semibold bg-transparent hover:bg-black hover:text-white" onClick={nextStep}>
          Continue As Guest
        </button>
      </form>
    </div>
  );
};

export default InformationSection;
