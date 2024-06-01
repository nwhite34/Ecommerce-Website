import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ShippingHandlingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
        <FaTimes className="cursor-pointer text-gray-600 absolute top-4 right-4" onClick={onClose} />
        <h1 className="text-2xl font-bold mb-4 text-center">SHIPPING & HANDLING</h1>
        <p className="mb-6">
          Once your order has been placed, we will endeavor to process and ship your order within 24 hours.
          This does not include weekends or public holidays. During busy promotional or holiday periods,
          please allow up to 3 business days for your order to be shipped.
        </p>
        <table className="w-full text-left border-collapse mb-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">Shipping Methods</th>
              <th className="border px-4 py-2">Shipping Times</th>
              <th className="border px-4 py-2">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Express</td>
              <td className="border px-4 py-2">Metro 1-4 business days, Regional/Rural 1-7 business days</td>
              <td className="border px-4 py-2">$13.99</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Standard</td>
              <td className="border px-4 py-2">Metro 2-10 business days, Regional/Rural 2-13 business days</td>
              <td className="border px-4 py-2">$10.99 or $2 for orders over $100</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Click & Ship (Express)</td>
              <td className="border px-4 py-2">Metro 1-4 business days, Regional/Rural 1-7 business days</td>
              <td className="border px-4 py-2">$13.99</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Click & Ship (Standard)</td>
              <td className="border px-4 py-2">Metro 2-10 business days, Regional/Rural 2-13 business days</td>
              <td className="border px-4 py-2">$10.99 or $2 for orders over $100</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Bulky & Flammable</td>
              <td className="border px-4 py-2">Metro 2-10 business days, Regional/Rural 2-17 business days</td>
              <td className="border px-4 py-2">Refer to Bulky & Flammable Shipping</td>
            </tr>
          </tbody>
        </table>
        
     
      </div>
    </div>
  );
};

export default ShippingHandlingModal;
