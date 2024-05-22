import React from 'react';
import { useCart } from '../context/CartContext';

function CartDropdown({ toggleSideCart }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-20">
      <h2 className="text-xl font-bold p-4">Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index} className="flex items-center p-4 border-b border-gray-200">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover mr-4" />
            <div className="flex-grow">
              <h3 className="text-lg">{item.title}</h3>
              <p className="text-sm text-gray-700">Price: {item.price}</p>
              <p className="text-sm text-gray-700">Size: {item.size}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700 ml-4"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        className="w-full bg-blue-500 text-white py-2 mt-2 rounded-b-md hover:bg-blue-700"
        onClick={toggleSideCart}
      >
        View Your Bag
      </button>
    </div>
  );
}

export default CartDropdown;
