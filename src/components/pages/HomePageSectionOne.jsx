import React from 'react';

function HomePageSectionOne() {
  return (
    <div className="bg-yellow-400 flex flex-col items-center justify-center min-h-[50vh] text-black text-center px-4">
      {/* Header text */}
      <h1 className="text-6xl font-bold mb-6 sm:text-5xl md:text-6xl">
        ONE DAY SALE
      </h1>
      <p className="text-4xl mb-6 sm:text-3xl md:text-4xl">
        UP TO 70% OFF 1000s OF STYLES!
      </p>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="bg-black text-white py-3 px-6 rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors">
          Shop Womens
        </button>
        <button className="bg-black text-white py-3 px-6 rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors">
          Shop Girls
        </button>
      </div>
    </div>
  );
}

export default HomePageSectionOne;
