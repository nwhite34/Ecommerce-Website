import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import NicksLogo from '../images/collection.png'; // Make sure the path is correct based on your file structure

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const clearSearch = () => {
    setSearchValue('');
    setShowSearchBar(false);
  };
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);

  return (
    <nav
      className={`flex flex-col sm:flex-row items-start justify-between bg-white text-black fixed top-0 w-full z-10 transition-transform duration-300 ${
        isVisible ? '' : '-translate-y-full'
      } pt-16 sm:pt-20`}
    >
      <div className="flex justify-between items-center w-full px-8 py-2">
        <div className="flex items-center">
        <img src={NicksLogo} alt="Logo" className="h-10 w-auto" />
        </div>
        
        <div className="flex items-center justify-end w-full">
          {/* Adjusted search bar for desktop sizes */}
          <div className="hidden sm:flex relative mx-auto w-full max-w-md">
            <input
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
              onClick={toggleSearchBar}
              className="hidden sm:block cursor-pointer text-gray-600 absolute right-14 top-1/2 transform -translate-y-1/2"
            />
          </div>
          <FaSearch onClick={toggleSearchBar} className="text-gray-600 sm:hidden cursor-pointer mr-4" />

          <button className="text-black mr-4">Login</button>
          <button className="text-black">Cart</button>
        </div>
      </div>
      {/* Mobile search bar with correct positioning */}
      {showSearchBar && (
        <div className="relative w-full px-8 py-4 sm:hidden">
          <input
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
  );
}

export default NavBar;
