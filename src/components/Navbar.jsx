// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NicksLogo from '../images/collection.png';
import LoginModal from './LoginModal';
import CartDropdown from './CartDropdown';
import SideCart from './SideCart';
import { useCart } from '../context/CartContext';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import searchProducts from '../services/searchProducts';

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const { cart, toggleCart, isCartOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        setIsVisible(false);
      } else if (currentScrollTop < lastScrollTop) {
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const results = await searchProducts(value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setSearchResults([]);
    setShowSearchBar(false);
  };

  const performSearch = async () => {
    if (showSearchBar && searchValue) {
      const results = await searchProducts(searchValue);
      setSearchResults(results);
    } else {
      setShowSearchBar(!showSearchBar);
    }
  };

  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);
  const switchToSignUp = () => setIsSignUp(true);
  const switchToSignIn = () => setIsSignUp(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleCartDropdown = () => setShowCartDropdown(!showCartDropdown);
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setShowDropdown(false);
    });
  };
  const navigateToMyAccount = () => {
    setShowDropdown(false);
    navigate('/my-account');
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    clearSearch();
  };

  useEffect(() => {
    if (cart.length > 0) {
      setShowCartDropdown(true);
    }
  }, [cart]);

  return (
    <>
      <nav
        className={`flex flex-col sm:flex-row items-start justify-between bg-white text-black fixed top-0 w-full z-10 transition-transform duration-300 ${
          isVisible ? '' : '-translate-y-full'
        } pt-16 sm:pt-20`}
      >
        <div className="flex justify-between items-center w-full px-8 py-2">
          <div className="flex items-center">
            <img 
              src={NicksLogo} 
              alt="Logo" 
              className="h-10 w-auto cursor-pointer" 
              onClick={handleLogoClick} 
            />
          </div>

          <div className="flex items-center justify-end w-full">
            <div className="hidden sm:flex relative mx-auto w-full max-w-md">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                id="search"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search..."
                className={`px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-blue-300 rounded-md ${showSearchBar ? 'block' : 'hidden'}`}
              />
              <FaTimes
                onClick={clearSearch}
                className={`cursor-pointer text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2 ${showSearchBar ? 'block' : 'hidden'}`}
              />
              <FaSearch
                onClick={performSearch}
                className="hidden sm:block cursor-pointer text-gray-600 absolute right-14 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <FaSearch onClick={performSearch} className="text-gray-600 sm:hidden cursor-pointer mr-4" />

            {user ? (
              <div className="relative">
                <button className="text-black mr-4 flex items-center" onClick={toggleDropdown}>
                  <FaUserCircle className="mr-2" /> {capitalizeFirstLetter(user.displayName)}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left" onClick={navigateToMyAccount}>My Account</button>
                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="text-black mr-4" onClick={toggleLoginModal}>Login</button>
            )}

            <div className="relative">
              <button className="text-black relative" onClick={toggleCartDropdown}>
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </button>
              {showCartDropdown && (
                <CartDropdown toggleSideCart={toggleCart} />
              )}
            </div>
          </div>
        </div>
        {showSearchBar && (
          <div className="relative w-full px-8 py-4 sm:hidden">
            <label htmlFor="mobile-search" className="sr-only">Search</label>
            <input
              id="mobile-search"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-blue-300 rounded-md"
            />
            <FaTimes
              onClick={clearSearch}
              className="cursor-pointer text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        )}
      </nav>

      {searchResults.length > 0 && (
        <div className="absolute top-16 sm:top-20 w-full max-w-md mx-auto bg-white shadow-md rounded-md z-20">
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className="p-4 border-b last:border-b-0 flex items-center cursor-pointer" onClick={() => handleResultClick(result.id)}>
                <img src={result.image} alt={result.title} className="w-10 h-10 inline-block mr-4"/>
                <span>{result.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={toggleLoginModal}
        isSignUp={isSignUp}
        switchToSignUp={switchToSignUp}
        switchToSignIn={switchToSignIn}
      />
      <SideCart isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}

export default NavBar;
