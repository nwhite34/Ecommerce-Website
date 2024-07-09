import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';

function Card({ mainImage, title, price, sizes, showWishlist = true, onAddToCart }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(wishlist.some((item) => item.title === title));

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent
    if (isWishlisted) {
      removeFromWishlist(title);
    } else {
      addToWishlist({ mainImage, title, price });
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 relative">
      <Link to={`/product/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}>
        <img src={mainImage} alt={title} className="w-full h-48 object-cover mb-4" />
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-700">{price}</p>
      </Link>
      {showWishlist && (
        <button onClick={handleWishlistClick} className="absolute top-2 right-2">
          {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
        </button>
      )}
      <div className="mt-4">
        {sizes.map((size) => (
          <button
            key={size}
            className="px-4 py-2 rounded mr-2 mb-2 border-2 border-black text-black  font-semibold bg-transparent hover:bg-black hover:text-white"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from propagating to the parent
              onAddToCart(size);
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
