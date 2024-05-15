import React from 'react';

function HomePageSectionSix() {
  const images = {
    footwear: 'https://source.unsplash.com/featured/?footwear', // using Unsplash random image URL
    swim: 'https://source.unsplash.com/featured/?swimwear', // using Unsplash random image URL
  };

  return (
    <div className="flex flex-col items-center  pt-20">
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl">
        <div className="relative w-full md:w-1/2 p-4">
          <h2 className="absolute top-4 left-4 text-white text-3xl font-bold">Kick it in Style</h2>
          <img src={images.footwear} alt="Footwear" className="w-full h-96 object-cover" />
          <div className="absolute bottom-4 left-4 text-white text-lg">Shop Footwear</div>
        </div>
        <div className="relative w-full md:w-1/2 p-4">
          <h2 className="absolute top-4 left-4 text-white text-3xl font-bold">Swim is In</h2>
          <img src={images.swim} alt="Swim" className="w-full h-96 object-cover" />
          <div className="absolute bottom-4 left-4 text-white text-lg">Shop Swim</div>
        </div>
      </div>
      <div className="text-center mt-4 w-full bg-pink-500 p-4 ">
        <h2 className="text-white text-3xl font-bold">2 for DEALS</h2>
        <button className="mt-2 px-4 py-2 bg-white text-pink-500 font-bold">SHOP NOW</button>
      </div>
    </div>
  );
}

export default HomePageSectionSix;
