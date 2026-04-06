import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = ({ wishlist, removeFromWishlist }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#02173A]">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#02173A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#031e47] transition">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {wishlist.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-36 overflow-hidden bg-gray-50">
                <img 
                  src={item.images?.[0] || item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base mb-1 text-[#02173A]">{item.name}</h3>
                <p className="text-gray-700 font-bold text-lg mb-2">{item.price} EGP</p>
                <button 
                  onClick={() => navigate(`/product/${item._id || item.id}`)}
                  className="w-full bg-[#02173A] text-white py-2 rounded-lg font-bold mb-2 hover:bg-[#031e47] transition text-sm">
                  VIEW PRODUCT
                </button>
                <button 
                  onClick={() => removeFromWishlist(index)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition text-sm">
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
