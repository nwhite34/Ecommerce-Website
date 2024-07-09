import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function SideCart({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  useEffect(() => {
    console.log("Promo Code Applied: ", isPromoApplied);
  }, [isPromoApplied]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleApplyPromoCode = () => {
    if (promoCode === 'EXTRA20') {
      setIsPromoApplied(true);
      console.log("Promo code applied successfully!");
    } else {
      alert('Invalid promo code');
      console.log("Invalid promo code entered.");
    }
  };

  // Ensure item.price is a number by removing non-numeric characters
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    return total + price;
  }, 0);

  const discountedPrice = isPromoApplied ? totalPrice * 0.8 : totalPrice;
  const shippingCost = 10.99; // assuming a flat shipping cost for simplicity

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end z-50">
      <div className="bg-white h-full w-80 p-6 relative">
        <FaTimes className="cursor-pointer text-gray-600 absolute top-4 right-4" onClick={onClose} />
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty...</p>
        ) : (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <img src={item.mainImage} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: {item.price}</p>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 mt-2">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter Your Promo Code"
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleApplyPromoCode}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
            <div className="border-t mt-4 pt-4">
              <h3 className="text-lg font-bold">Order Summary</h3>
              <div className="flex justify-between mt-2">
                <span>Sub Total</span>
                <span>AUD${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                <span>AUD${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 font-bold">
                <span>Total (Inc. GST)</span>
                <span>AUD${(discountedPrice + shippingCost).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
                >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideCart;
