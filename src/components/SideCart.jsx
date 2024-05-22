// src/components/SideCart.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function SideCart({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end z-50">
      <div className="bg-white h-full w-80 p-6 relative">
        <FaTimes className="cursor-pointer text-gray-600 absolute top-4 right-4" onClick={onClose} />
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p>Price: {item.price}</p>
                    <p>Size: {item.size}</p>
                    <button onClick={() => removeFromCart(index)} className="text-red-500">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-700"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SideCart;
