import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import NavBar from '../Navbar';
import PromoBar from '../PromoBar';
import Footer from '../Footer';

const SizeGuidePage = () => {
  const [otherProducts, setOtherProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOtherProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchOtherProducts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % otherProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + otherProducts.length) % otherProducts.length);
  };

  const visibleProducts = otherProducts.slice(currentIndex, currentIndex + 7).concat(otherProducts.slice(0, Math.max(0, (currentIndex + 7) - otherProducts.length)));

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <NavBar />
      <div className="container mx-auto mt-20 pt-20 pb-20 min-h-screen flex flex-col justify-center">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Size Guide</h1>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                  <th className="bg-gray-100 p-2 text-gray-800 font-bold md:border md:border-grey-500 text-left block md:table-cell">Size</th>
                  <th className="bg-gray-100 p-2 text-gray-800 font-bold md:border md:border-grey-500 text-left block md:table-cell">Bust</th>
                  <th className="bg-gray-100 p-2 text-gray-800 font-bold md:border md:border-grey-500 text-left block md:table-cell">Waist</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                <tr className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Small (S)</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">32-34 inches</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">24-26 inches</td>
                </tr>
                <tr className="bg-white border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Medium (M)</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">36-38 inches</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">28-30 inches</td>
                </tr>
                <tr className="bg-gray-100 border border-grey-500 md:border-none block md:table-row">
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">Large (L)</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">40-42 inches</td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">32-34 inches</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-40 mb-40">
        <h2 className="text-2xl font-bold text-left mb-4">OTHER POPULAR PRODUCTS</h2>
        <div className="bg-white py-8 px-4">
          <div className="flex items-center justify-center gap-4">
            <button onClick={handlePrev} className="text-2xl"><FaChevronLeft /></button>
            <div className="flex gap-4 overflow-hidden justify-center w-full">
              {visibleProducts.map((product, index) => (
                <Link to={`/product/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`} key={index} className="flex flex-col items-center gap-2">
                  <div className="w-64 h-64 flex justify-center items-center bg-gray-200 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                    <img src={product.mainImage} alt={product.title} className="object-contain w-full h-full" />
                  </div>
                  <p className="text-lg font-semibold text-center">{product.title.toUpperCase()}</p>
                </Link>
              ))}
            </div>
            <button onClick={handleNext} className="text-2xl"><FaChevronRight /></button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SizeGuidePage;
