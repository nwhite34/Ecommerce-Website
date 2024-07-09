import React from 'react';

const Step4Payment = ({ prevStep, handleOrderProcess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOrderProcess();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded mb-6 mx-4 sm:mx-auto sm:max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">Security Code</label>
            <input
              type="text"
              id="securityCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="123"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="useSameAddress" className="mr-2" />
          <label htmlFor="useSameAddress" className="text-sm text-gray-700">Use the same address for billing</label>
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
            type="submit"
            className="px-4 py-2 text-sm text-white mt-2 rounded-full font-semibold bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
          >
            Confirm & Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Payment;
