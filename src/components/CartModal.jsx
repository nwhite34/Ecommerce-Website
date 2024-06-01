import React from 'react';
import { useCart } from '../context/CartContext';

function CartModal({ isOpen, toggleCartModal }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 flex justify-end ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white w-96 h-full shadow-lg p-6 relative z-50">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex items-center mb-4">
              <img src={item.mainImage} alt={item.title} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-sm text-gray-700">Price: {item.price}</p>
                <p className="text-sm text-gray-700">Size: {item.size}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 ml-4"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
          onClick={toggleCartModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CartModal;
