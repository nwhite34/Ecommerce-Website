import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

function HomePageSectionSix() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Select 2 random products
        const shuffled = productsData.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        
        setSelectedProducts(selected);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getHeading = (title) => {
    const headings = {
      footwear: "Kick it in Style",
      swim: "Swim is In",
      tops: "Top Notch Tops",
      pants: "Perfect Pants",
      dresses: "Dazzling Dresses",
    };

    for (const key in headings) {
      if (title.toLowerCase().includes(key)) {
        return headings[key];
      }
    }
    return "Trending Now";
  };

  if (selectedProducts.length < 2) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center pt-20 pb-20">
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl">
        {selectedProducts.map((product) => (
          <div key={product.id} className="relative w-full md:w-1/2 p-4">
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-4 py-2 rounded">
              <h2 className="text-3xl font-bold text-white">
                {getHeading(product.title)}
              </h2>
            </div>
            <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`}>
              <img src={product.mainImage} alt={product.title} className="w-full h-96 object-cover" />
            </Link>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 mb-4">
              <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`}>
                <button className="px-6 py-2 bg-black text-white text-lg rounded-full opacity-75 hover:opacity-100 transition-opacity">
                  Shop {product.title}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageSectionSix;
