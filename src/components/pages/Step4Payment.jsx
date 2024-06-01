import React from 'react';

const Step4Payment = ({ prevStep, handleOrderProcess }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleOrderProcess();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded mb-6">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="flex mb-4">
          <div className="mr-2">
            <label className="block text-gray-700">Expiry Date</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
          </div>
          <div>
            <label className="block text-gray-700">Security Code</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="123" />
          </div>
        </div>
        <div className="flex mb-4">
          <input type="checkbox" className="mr-2" />
          <label className="text-gray-700">Use the same address for billing</label>
        </div>
        <div className="flex justify-between">
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={prevStep}>
            Previous
          </button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Confirm & Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4Payment;
