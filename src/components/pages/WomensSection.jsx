import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import Card from './Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function WomenSection() {
  const [items, setItems] = useState([]);
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart(); // Removed toggleCart

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('category', '==', 'women'));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(products);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    // Removed toggleCart
  };

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Women's Section</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Card
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              sizes={item.sizes}
              onAddToCart={handleAddToCart}
              onAddToWishlist={addToWishlist}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WomenSection;
