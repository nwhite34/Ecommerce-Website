import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasePage from './components/pages/BasePage';
import MyAccount from './components/pages/MyAccount';
import MensSection from './components/pages/MensSection';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Checkout from './components/pages/Checkout'; // Import Checkout page

function App() {
  return (
    <WishlistProvider>
      <CartProvider> {/* Wrap with CartProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<BasePage />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/mens-section" element={<MensSection />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout route */}

          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
