// src/components/pages/MyAccount.jsx
import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';

function MyAccount() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <> 
    <NavBar/ >
    <PromoBar/ >
   
    <div className="container mx-auto mt-20 pt-20 pb-20">
      <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-700">{item.price}</p>
              <button
                className="text-red-500 mt-2"
                onClick={() => removeFromWishlist(item.title)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default MyAccount;
