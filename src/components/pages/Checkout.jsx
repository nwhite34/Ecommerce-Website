// src/pages/Checkout.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';

function Checkout() {
  const { cart } = useCart();
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.slice(2)), 0).toFixed(2);

  return (
    <div className="container mx-auto pt-20 pb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty</p>
      ) : (
        <div className="flex flex-col items-center">
          <ul className="w-full max-w-3xl">
            {cart.map((item, index) => (
              <li key={index} className="flex items-center mb-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <p className="font-bold">{item.title}</p>
                  <p>Price: {item.price}</p>
                  <p>Size: {item.size}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="w-full max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: A${totalPrice}</h2>
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-700">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
