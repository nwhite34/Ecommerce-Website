import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';

function MyAccount() {
  const { wishlist, removeFromWishlist, addToWishlist } = useWishlist();

  const handleWishlistClick = (item) => {
    if (wishlist.some((wishlistItem) => wishlistItem.title === item.title)) {
      removeFromWishlist(item.title);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <>
      <NavBar />
      <PromoBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>
        <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {wishlist.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-md p-4 relative">
                <Link to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-4" />
                </Link>
                <button
                  onClick={() => handleWishlistClick(item)}
                  className="absolute top-2 right-2"
                >
                  {wishlist.some((wishlistItem) => wishlistItem.title === item.title) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-gray-700">{item.price}</p>
                <button
                  className="text-red-500 mt-2"
                  onClick={() => removeFromWishlist(item.title)}
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyAccount;
