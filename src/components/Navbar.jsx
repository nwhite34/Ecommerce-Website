import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const searchBarRef = useRef(null);
  const dropdownRef = useRef(null);

  const { cart, toggleCart, isCartOpen } = useCart();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
      setIsVisible(false);
    } else if (currentScrollTop < lastScrollTop) {
      setIsVisible(true);
    }
    setLastScrollTop(currentScrollTop);
  }, [lastScrollTop]);

  const updateDropdownWidthAndPosition = useCallback(() => {
    if (searchBarRef.current && dropdownRef.current && windowWidth <= 640) {
      const searchBarWidth = searchBarRef.current.offsetWidth;
      dropdownRef.current.style.width = `${searchBarWidth}px`;
    }
  }, [windowWidth]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    updateDropdownWidthAndPosition();
  }, [updateDropdownWidthAndPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

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

  useEffect(() => {
    updateDropdownWidthAndPosition();
  }, [searchValue, showSearchBar, searchResults, windowWidth, updateDropdownWidthAndPosition]);

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

  const performSearch = () => {
    if (searchValue) {
      navigate(`/search/${encodeURIComponent(searchValue)}`);
      clearSearch();
    } else {
      setShowSearchBar(!showSearchBar);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue) {
      performSearch();
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

  const handleResultClick = (category, title) => {
    if (title.toLowerCase() === 'men') {
      navigate('/mens-section');
    } else if (title.toLowerCase() === 'women') {
      navigate('/womens-section');
    } else {
      navigate(`/product/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`);
    }
    clearSearch();
  };

  useEffect(() => {
    if (cart.length > 0) {
      setShowCartDropdown(true);
    }
  }, [cart]);

  const getSearchBarWidth = () => {
    if (windowWidth <= 738 && windowWidth > 640) {
      return 'w-2/3 mx-auto'; // Custom width for 738px to 640px and centered
    }
    return 'w-full'; // Default width
  };

  const getDropdownWidth = () => {
    if (windowWidth <= 640) {
      return 'w-full'; // Full width for smaller screens
    }
    return getSearchBarWidth(); // Match the search bar width for larger screens
  };

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
              <div className={`relative ${getSearchBarWidth()}`}>
                <input
                  id="search"
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="px-6 py-3 w-full text-gray-700 bg-gray-100 border rounded-full focus:outline-none focus:ring-0 focus:border-transparent"
                />
                {searchValue && (
                  <FaTimes
                    onClick={clearSearch}
                    className="cursor-pointer text-gray-600 absolute right-10 top-1/2 transform -translate-y-1/2"
                  />
                )}
                <FaSearch
                  onClick={performSearch}
                  className="cursor-pointer text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
              {searchResults.length > 0 && (
                <div className={`absolute left-0 right-0 mx-auto top-full mt-2 bg-white shadow-lg rounded-md z-20 ${getDropdownWidth()}`}>
                  <ul>
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        className="p-4 border-b last:border-b-0 flex items-center cursor-pointer hover:bg-gray-200"
                        onClick={() => handleResultClick(result.category, result.title)}
                      >
                        <img src={result.mainImage} alt={result.title} className="w-10 h-10 inline-block mr-4" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            <div className="relative w-full max-w-md mx-auto" ref={searchBarRef}>
              <input
                id="mobile-search"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="px-6 py-3 w-full text-gray-700 bg-gray-100 focus:outline-none focus:ring-0 focus:border-transparent rounded-full"
              />
              {searchValue && (
                <FaTimes
                  onClick={clearSearch}
                  className="cursor-pointer text-gray-600 absolute right-3 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md z-20 w-full max-w-md" ref={dropdownRef}>
                <ul>
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-4 border-b last:border-b-0 flex items-center cursor-pointer hover:bg-gray-200"
                      onClick={() => handleResultClick(result.category, result.title)}
                    >
                      <img src={result.mainImage} alt={result.title} className="w-10 h-10 inline-block mr-4" />
                      <span>{result.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>

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
