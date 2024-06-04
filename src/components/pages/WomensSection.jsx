import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';
import Card from './Card';
import { useCart } from '../../context/CartContext';
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function WomenSection() {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('category', '==', 'women'));
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

  const handleAddToCart = (item, size) => {
    addToCart({ ...item, size });
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

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
            <div key={index}>
              <Card
                mainImage={item.mainImage}
                title={item.title}
                price={item.price}
                sizes={item.sizes}
                onAddToCart={(size) => handleAddToCart(item, size)}
                showWishlist={false} // Disable wishlist hearts
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WomenSection;
