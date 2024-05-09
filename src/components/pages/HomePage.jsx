// src/pages/HomePage.jsx

import React from 'react';

function HomePage() {
  // Mock data for demonstration purposes
  const featuredProducts = [
    { id: 1, name: 'T-shirt', price: '$25.00', imageUrl: '/images/tshirt.jpg' },
    { id: 2, name: 'Jeans', price: '$45.00', imageUrl: '/images/jeans.jpg' },
    { id: 3, name: 'Sneakers', price: '$65.00', imageUrl: '/images/sneakers.jpg' },
  ];

  return (
    <main className="max-w-5xl mx-auto p-4">
      {/* Hero Section */}
      <section className="hero text-center my-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Online Clothing Store</h1>
        <p className="text-lg text-gray-600">Find the best styles and latest trends right here.</p>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                className="w-full h-48 object-cover mb-4 rounded-md"
                src={product.imageUrl}
                alt={product.name}
              />
              <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter p-6 bg-blue-50 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest arrivals and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 p-3 border rounded-md outline-none focus:border-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </main>
  );
}

export default HomePage;
