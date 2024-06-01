import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

function HomePageSectionTwo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Select 5 random products
        const shuffled = productsData.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 5);
        
        setProducts(selectedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white py-8 px-4 pt-20 pb-20">
      <h2 className="text-2xl font-bold text-left mb-4">SEE WHAT'S POPULAR</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {products.map((product) => (
          <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`} key={product.id} className="flex flex-col items-center gap-2">
            <div className="w-44 h-44 flex justify-center items-center bg-gray-200 rounded-full overflow-hidden transition-transform duration-300 transform hover:scale-105">
              <img src={product.mainImage} alt={product.title} className="object-cover rounded-full w-full h-full" />
            </div>
            <p className="text-lg font-semibold">{product.title.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePageSectionTwo;
