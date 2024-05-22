import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTimes } from 'react-icons/fa';

function Cart() {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useCart();

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-end z-50 ${isCartOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white w-80 h-full p-4 shadow-lg relative">
        <button onClick={toggleCart} className="absolute top-4 right-4 text-gray-600">
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm">Price: {item.price}</p>
                <p className="text-sm">Size: {item.size}</p>
                <button className="text-red-500 text-sm mt-2" onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="mt-4">
            <button className="bg-blue-500 text-white w-full py-2 rounded mt-4">View Your Bag</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
