import React from 'react';

// Sample data for categories with Unsplash images
const categories = [
  { name: 'Footwear', image: 'https://source.unsplash.com/featured/?footwear' },
  { name: 'Tops', image: 'https://source.unsplash.com/featured/?tops' },
  { name: 'Swimwear', image: 'https://source.unsplash.com/featured/?swimwear' },
  { name: 'Pants', image: 'https://source.unsplash.com/featured/?pants' },
  { name: 'Dresses', image: 'https://source.unsplash.com/featured/?dresses' },
  { name: 'Jackets & Coats', image: 'https://source.unsplash.com/featured/?jackets,coats' }
];

function HomePageSectionTwo() {
  return (
    <div className="bg-white py-8 px-4 pt-20 pb-20">
      <h2 className="text-2xl font-bold text-left mb-4">SEE WHAT'S TRENDING</h2>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {categories.map((category) => (
          <a href={`/${category.name.toLowerCase()}`} key={category.name} className="flex flex-col items-center gap-2">
            <div className="w-44 h-44 flex justify-center items-center bg-gray-200 rounded-full overflow-hidden transition-transform duration-300 transform hover:scale-105">
              <img src={category.image} alt={category.name} className="object-cover rounded-full w-full h-full" />
            </div>
            <p className="text-lg font-semibold">{category.name.toUpperCase()}</p>
          </a>
        ))}
      </div>
    </div>
  );
}


export default HomePageSectionTwo;
