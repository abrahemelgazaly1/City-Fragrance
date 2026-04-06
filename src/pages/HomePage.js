import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { mockCategories } from '../data/mockData';
import API_URL from '../config/api';

const HomePage = ({ addToCart, addToWishlist }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      const allProducts = response.data;
      
      // Get 8 random products for products section
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 8));
      
      // Get first best seller for signature product section
      const bestSeller = allProducts.find(p => p.isBestSeller);
      setBestSellerProduct(bestSeller);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What is the return policy?",
      answer: "Our goal is for every customer to be totally satisfied with their purchase. If this isn't the case, let us know and we'll do our best to work with you to make it right."
    },
    {
      question: "Are any purchases final sale?",
      answer: "We are unable to accept returns on certain items. These will be carefully marked before purchase."
    },
    {
      question: "When will I get my order?",
      answer: "We will work quickly to ship your order as soon as possible. Once your order has shipped, you will receive an email with further information. Delivery times vary depending on your location."
    },
    {
      question: "Where are your products manufactured?",
      answer: "Our products are manufactured both locally and globally. We carefully select our manufacturing partners to ensure our products are high quality and a fair value."
    },
    {
      question: "How much does shipping cost?",
      answer: "Shipping is calculated based on your location and the items in your order. You will always know the shipping price before you purchase."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-end justify-center pb-24 md:pb-32">
        {/* Mobile Image */}
        <img 
          src="/phonehero.jpg" 
          alt="City Fragrance Hero Mobile" 
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        {/* Desktop Image */}
        <img 
          src="/deskhero.jpg" 
          alt="City Fragrance Hero Desktop" 
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />
        {/* Shop All Button */}
        <button 
          onClick={() => navigate('/products')}
          className="relative z-10 text-white text-lg md:text-xl font-semibold hover:scale-110 transition-transform duration-300 drop-shadow-2xl tracking-wide">
          Shop All
        </button>
      </section>

      {/* Categories Section - Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#02173A]">CATEGORIES</h2>
          <p className="text-gray-600 text-lg">Explore our fragrance collection</p>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pl-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {mockCategories.map(category => (
            <div 
              key={category.id} 
              className="min-w-[220px] cursor-pointer group flex-shrink-0"
              onClick={() => navigate(`/category/${category.name}`)}>
              <div className="relative overflow-hidden rounded-lg w-[220px] h-[280px] mb-3 shadow-md">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <p className="text-center font-semibold text-base text-[#02173A]">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section - 8 Random Products */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#02173A]">PRODUCTS</h2>
            <p className="text-gray-600 text-lg">Explore our fragrance collection</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product._id} 
                product={{ ...product, id: product._id, image: product.images[0] }} 
                addToCart={addToCart} 
                addToWishlist={addToWishlist} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller Signature Product Section */}
      {bestSellerProduct && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#02173A]">Our signature product</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Made with care and unconditionally loved by our customers, this signature bestseller exceeds all expectations.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="h-full">
              <img 
                src={bestSellerProduct.images[0]} 
                alt={bestSellerProduct.name}
                className="w-full h-full object-cover min-h-[400px]" 
              />
            </div>
            <div className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#02173A]">{bestSellerProduct.name}</h3>
              <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">{bestSellerProduct.price} EGP</p>
              
              <div className="mb-6">
                <p className="font-semibold mb-3 text-lg text-[#02173A]">Available Sizes:</p>
                <div className="flex gap-2 flex-wrap">
                  {bestSellerProduct.sizes.map(size => (
                    <span key={size} className="px-4 py-2 border-2 border-[#02173A] text-[#02173A] rounded-lg hover:bg-[#02173A] hover:text-white transition font-semibold">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => navigate(`/product/${bestSellerProduct._id}`)}
                className="w-full bg-[#02173A] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#031e47] transition">
                VIEW PRODUCT
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#02173A]">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-[#02173A]">{faq.question}</span>
                  <span className={`text-2xl text-[#02173A] transition-transform ${faqOpen[index] ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {faqOpen[index] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
