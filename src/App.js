// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasePage from './components/pages/BasePage';
import MyAccount from './components/pages/MyAccount';
import MensSection from './components/pages/MensSection';
import WomenSection from './components/pages/WomensSection';
import ProductPage from './components/pages/ProductPage';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Checkout from './components/pages/Checkout';
import KidsSection from './components/pages/KidsSection';
import SizeGuidePage from './components/pages/SizeGuidePage';
import DeliveryGuidePage from './components/pages/DeliveryGuidePage';
import PaymentOptionsPage from './components/pages/PaymentOptionsPage';
import FAQ from './components/pages/FAQ';
import SearchPage from './components/pages/SearchPage';
import ScrollToTop from './components/ScrollToTop';
import { OrderProvider } from './context/OrderContext';


function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
        <OrderProvider>

          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<BasePage />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/mens-section" element={<MensSection />} />
              <Route path="/womens-section" element={<WomenSection />} />
              <Route path="/product/:title" element={<ProductPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/kids-section" element={<KidsSection />} />
              <Route path="/size-guide" element={<SizeGuidePage />} />
              <Route path="/delivery-guide" element={<DeliveryGuidePage />} />
              <Route path="/payment-options" element={<PaymentOptionsPage />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/search/:query" element={<SearchPage />} />
            </Routes>
          </Router>
          </OrderProvider>

        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
