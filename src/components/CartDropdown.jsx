import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartDropdown({ toggleSideCart }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-20">
      <h2 className="text-xl font-bold p-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="p-4">Your cart is empty...</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex items-start p-4 border-b border-gray-200">
              <Link to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                <img src={item.mainImage} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
              </Link>
              <div className="flex-grow">
                <Link to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                  <h3 className="font-bold">{item.title}</h3>
                </Link>
                <p className="text-sm text-gray-700">Size: {item.size}</p>
                <p className="text-sm text-gray-700">Price: {item.price}</p>
                <button
                  className="text-red-500 hover:text-red-700 mt-2"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    e.stopPropagation(); // Prevent link navigation
                    removeFromCart(index);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        className="w-full bg-blue-500 text-white py-2 mt-2 border-2 px-6 rounded-md font-semibold hover:bg-blue-700 hover:border-blue-700"
        onClick={toggleSideCart}
      >
        View Your Bag
      </button>
    </div>
  );
}

export default CartDropdown;
