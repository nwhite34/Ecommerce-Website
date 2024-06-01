import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import Card from './Card';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function MensSection() {
  const [items, setItems] = useState([]);
  const { addToWishlist } = useWishlist();
  const { addToCart, toggleCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('category', '==', 'men'));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Products:', products);  // Console log for debugging
        setItems(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toggleCart();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Men's Section</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Link
              to={`/product/${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}
              key={index}
            >
              <Card
                image={item.image}
                title={item.title}
                price={item.price}
                sizes={item.sizes}
                onAddToCart={() => handleAddToCart(item)}
                onAddToWishlist={() => addToWishlist(item)}
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MensSection;
