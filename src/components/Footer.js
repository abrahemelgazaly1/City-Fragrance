import React from 'react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-[#02173A] py-12 mt-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-4">City Fragrance</h3>
        <p className="text-gray-600 mb-6">We're here on these platforms</p>
        <div className="flex justify-center gap-6 mb-6">
          <a 
            href="https://www.instagram.com/city_fragrance_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#02173A] hover:text-pink-500 transition transform hover:scale-110">
            <FaInstagram size={28} />
          </a>
          <a 
            href="https://www.tiktok.com/@city_fragrance?_r=1&_t=ZS-95IkblDMbOZ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#02173A] hover:text-gray-600 transition transform hover:scale-110">
            <FaTiktok size={28} />
          </a>
          <a 
            href="https://wa.me/201092748940" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#02173A] hover:text-green-500 transition transform hover:scale-110">
            <FaWhatsapp size={28} />
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          Contact us: <a href="https://wa.me/201092748940" className="text-green-600 hover:underline font-semibold">+20 10 92748940</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
