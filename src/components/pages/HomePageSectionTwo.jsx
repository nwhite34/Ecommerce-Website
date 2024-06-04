import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const HomePageSectionTwo = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 7).concat(products.slice(0, Math.max(0, (currentIndex + 7) - products.length)));

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="bg-white py-8 px-4 pt-20 pb-20">
      <h2 className="text-2xl font-bold text-left mb-4">SEE WHAT'S TRENDING</h2>
      <div {...handlers} className="flex items-center justify-center gap-4">
        <button onClick={handlePrev} className="text-2xl"><FaChevronLeft /></button>
        <div className="flex gap-4 overflow-hidden justify-center w-full">
          {visibleProducts.map((product, index) => (
            <Link
              to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`}
              key={index}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-64 h-64 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                <img src={product.mainImage} alt={product.title} className="object-cover w-full h-full" />
              </div>
              <p className="text-lg font-semibold text-center">{product.title.toUpperCase()}</p>
            </Link>
          ))}
        </div>
        <button onClick={handleNext} className="text-2xl"><FaChevronRight /></button>
      </div>
    </div>
  );
};

export default HomePageSectionTwo;
