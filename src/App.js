import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasePage from './components/pages/BasePage';
import MyAccount from './components/pages/MyAccount';
import MensSection from './components/pages/MensSection';
import WomenSection from './components/pages/WomensSection';
import ProductPage from './components/pages/ProductPage';
import InitializeProducts from './components/InitializeProducts';
import InitializeWomenProducts from './components/InitializeWomenProducts';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import Checkout from './components/pages/Checkout';
import KidsSection from './components/pages/KidsSection'; // Import the new KidsSection component

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <InitializeProducts />
          <InitializeWomenProducts />
          <Routes>
            <Route path="/" element={<BasePage />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/mens-section" element={<MensSection />} />
            <Route path="/womens-section" element={<WomenSection />} />
            <Route path="/product/:title" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/kids-section" element={<KidsSection />} /> {/* Add the KidsSection route */}
          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
