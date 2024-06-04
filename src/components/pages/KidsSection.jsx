import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PromoBar from '../PromoBar';
import Header from '../Navbar';
import Footer from '../Footer';

// Spinner Component
const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const KidsSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <PromoBar />
      </div>
      <Header />
      <div className="container mx-auto mt-32 pt-20 pb-20 flex flex-col items-center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8">Coming Soon</h1>
            <div className="flex flex-col items-center">
              <p className="text-2xl mb-8">Explore other sections</p>
              <div className="flex space-x-4">
                <Link to="/womens-section" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">Explore Women's</Link>
                <Link to="/mens-section" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700">Explore Men's</Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default KidsSection;
