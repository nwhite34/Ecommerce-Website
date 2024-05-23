// src/components/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import NavBar from '../Navbar';
import Footer from '../Footer';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.error('No such product!');
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <img src={product.image} alt={product.title} className="w-full sm:w-1/2 h-auto mb-8 sm:mb-0" />
          <div className="text-left ml-0 sm:ml-8">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-800 mb-4">{product.price}</p>
            <div className="flex items-center mb-4">
              {product.sizes.map((size) => (
                <button key={size} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  {size}
                </button>
              ))}
            </div>
            <button className="bg-green-500 text-white px-8 py-2 rounded">Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
