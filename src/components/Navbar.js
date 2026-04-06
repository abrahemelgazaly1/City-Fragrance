import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';

const Navbar = ({ cartCount, wishlistCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md' 
        : 'bg-[#02173A]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - User Avatar */}
          <button className="hover:opacity-80 transition">
            <img 
              src="/logo.jpg" 
              alt="City Fragrance Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          
          {/* Center - Logo */}
          <Link 
            to="/" 
            className={`absolute left-1/2 transform -translate-x-1/2 -ml-1 text-lg font-semibold transition whitespace-nowrap ${
              isScrolled 
                ? 'text-[#02173A] hover:text-gray-700' 
                : 'text-white hover:text-gray-200'
            }`}>
            City Fragrance
          </Link>
          
          {/* Right - Wishlist & Cart */}
          <div className="flex items-center gap-3 -mr-1">
            <Link 
              to="/wishlist" 
              className={`relative p-1.5 rounded-full transition ${
                isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/20'
              }`}>
              <FiHeart 
                size={20} 
                className={isScrolled ? 'text-[#02173A]' : 'text-white'} 
              />
              {wishlistCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold ${
                  isScrolled ? 'bg-[#02173A] text-white' : 'bg-white text-[#02173A]'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link 
              to="/cart" 
              className={`relative p-1.5 rounded-full transition ${
                isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/20'
              }`}>
              <FiShoppingBag 
                size={20} 
                className={isScrolled ? 'text-[#02173A]' : 'text-white'} 
              />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold ${
                  isScrolled ? 'bg-[#02173A] text-white' : 'bg-white text-[#02173A]'
                }`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
