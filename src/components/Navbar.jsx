import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 2);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const clearSearch = () => setSearchValue('');

  return (
    <nav
      className={`flex items-center justify-between mt-9 bg-white-500 text-black p-4 fixed top-0 w-full z-10 h-8 sm:h-6 md:h-8 lg:h-16 xl:h-32 transition-transform duration-0 ${
        isVisible ? '' : '-translate-y-full'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center flex-1 pl-8 pt-2">
        <img src="/path/to/logo.png" alt="Logo" className="h-6 w-auto mr-4" />
      </div>
      {/* Search Bar */}
      <div className="relative flex items-center bg-white border border-gray-300 rounded-md shadow-sm w-1/2">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring focus:border-blue-300 rounded-md"
        />
        {searchValue ? (
          <FaTimes
            onClick={clearSearch}
            className="cursor-pointer text-gray-600 absolute right-8"
          />
        ) : null}
        <FaSearch className="text-gray-600 absolute right-2" />
      </div>
      {/* Login and Cart */}
      <div className="flex items-center flex-1 justify-end pr-8 pt-2">
        <button className="text-black mr-4">Login</button>
        <button className="text-black">Cart</button>
      </div>
    </nav>
  );
}

export default NavBar;
