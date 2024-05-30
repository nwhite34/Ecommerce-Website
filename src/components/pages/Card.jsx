import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

function Card({ image, title, price, sizes }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(wishlist.some((item) => item.title === title));

  const handleAddToCart = (size) => {
    addToCart({ image, title, price, size });
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(title);
    } else {
      addToWishlist({ image, title, price });
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 relative">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
      <button onClick={handleWishlistClick} className="absolute top-2 right-2">
        {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
      </button>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-700">{price}</p>
      <div className="mt-4">
        {sizes.map((size) => (
          <button
            key={size}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
            onClick={() => handleAddToCart(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;
