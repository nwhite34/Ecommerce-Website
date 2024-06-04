import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Spinner Component
const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function HomePageSectionThree() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/featured/?woman',
      'https://source.unsplash.com/featured/?man',
      'https://source.unsplash.com/featured/?kids',
    ];

    const loadImages = () => {
      let loadedCount = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount += 1;
          if (loadedCount === images.length) {
            setLoading(false);
          }
        };
      });
    };

    loadImages();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-stretch min-h-[70vh] m-0">
      <div
        className="w-full min-h-[70vh] flex flex-col justify-center bg-cover bg-center text-white p-0 flex-grow"
        style={{ backgroundImage: "url('https://source.unsplash.com/featured/?woman')" }}
        onClick={() => navigate('/womens-section')}
      >
        <h2 className="text-2xl font-bold mb-0 mt-0 p-6">WOMENS</h2>
        <div className="flex justify-center items-center mt-auto mb-6">
          <button className="bg-black bg-opacity-50 text-white py-2 px-4 rounded-full uppercase tracking-wider hover:bg-opacity-70 transition-opacity">Shop Now</button>
        </div>
      </div>
      <div
        className="w-full min-h-[70vh] flex flex-col justify-center bg-cover bg-center text-white p-0 flex-grow"
        style={{ backgroundImage: "url('https://source.unsplash.com/featured/?man')" }}
        onClick={() => navigate('/mens-section')}
      >
        <h2 className="text-2xl font-bold mb-0 mt-0 p-6">MENS</h2>
        <div className="flex justify-center items-center mt-auto mb-6">
          <button className="bg-black bg-opacity-50 text-white py-2 px-4 rounded-full uppercase tracking-wider hover:bg-opacity-70 transition-opacity">Shop Now</button>
        </div>
      </div>
      <div
        className="w-full min-h-[70vh] flex flex-col justify-center bg-cover bg-center text-white p-0 flex-grow"
        style={{ backgroundImage: "url('https://source.unsplash.com/featured/?kids')" }}
        onClick={() => navigate('/kids-section')}
      >
        <h2 className="text-2xl font-bold mb-0 mt-0 p-6">KIDS</h2>
        <div className="flex justify-center items-center mt-auto mb-6">
          <button className="bg-black bg-opacity-50 text-white py-2 px-4 rounded-full uppercase tracking-wider hover:bg-opacity-70 transition-opacity">Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default HomePageSectionThree;
