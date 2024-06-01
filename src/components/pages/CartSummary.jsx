import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const handleApplyPromoCode = () => {
    if (promoCode === 'EXTRA20') {
      setIsPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    return total + price;
  }, 0);

  const discountedPrice = isPromoApplied ? totalPrice * 0.8 : totalPrice;
  const shippingCost = 10.99; // assuming a flat shipping cost for simplicity

  return (
    <div className="bg-white p-6 shadow-md rounded w-full">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
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
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
