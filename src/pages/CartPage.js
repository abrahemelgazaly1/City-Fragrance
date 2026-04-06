import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();
  const deliveryFee = 120;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + deliveryFee;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#02173A]">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#02173A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#031e47] transition">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 bg-white p-4 rounded-lg shadow">
                <img src={item.images?.[0] || item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-[#02173A]">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="font-bold mt-2">{item.price} EGP</p>
                </div>
                <button 
                  className="text-red-600 hover:text-red-800 font-semibold"
                  onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal} EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{deliveryFee} EGP</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{total} EGP</span>
              </div>
            </div>
            <button 
              className="w-full bg-[#02173A] text-white py-3 rounded-lg font-bold hover:bg-[#031e47] transition"
              onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
