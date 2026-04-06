# City Fragrance - Premium Perfumes E-commerce Platform

A modern, responsive e-commerce platform for premium perfumes built with React.js and Node.js.

## 🌟 Features

### Frontend
- **Modern Design**: Clean, elegant interface with blue (#02173A) and white theme
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Dynamic Navigation**: Color-changing navbar on scroll
- **Product Showcase**: 
  - Hero section with call-to-action
  - Two main categories (Women & Men)
  - Random products display (8 products)
  - Best seller signature product section
  - FAQ section with collapsible answers
- **Shopping Experience**:
  - Product details with size selection
  - Quick order functionality
  - Shopping cart and wishlist
  - Secure checkout process
  - Promo code support

### Backend
- **Product Management**: Full CRUD operations
- **Order Processing**: Complete order management system
- **Image Upload**: Cloudinary integration for image storage
- **Promo Codes**: Discount system with validation
- **Admin Dashboard**: Comprehensive management interface

### Admin Features
- **Product Management**: Add, edit, delete products
- **Category Management**: Women and Men perfume categories
- **Size Management**: Various perfume sizes (30ml, 50ml, 75ml, 100ml, 125ml, 150ml, 200ml)
- **Order Tracking**: View and manage customer orders
- **Promo Code System**: Create and manage discount codes
- **Best Seller Management**: Mark products as bestsellers

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **SweetAlert2** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd city-fragrance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   # Start backend server
   npm run server

   # Start frontend (in another terminal)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Pages & Features

### Public Pages
- **Home Page**: Hero section, categories, products showcase, best seller, FAQ
- **Products Page**: All perfumes with search and filtering (4 products per row)
- **Product Details**: Individual product page with size selection
- **Category Pages**: Women and Men perfume collections
- **Cart**: Shopping cart management
- **Checkout**: Order placement with customer information
- **Wishlist**: Saved products

### Admin Pages
- **Admin Login**: Secure authentication
- **Dashboard**: Overview and navigation
- **Manage Products**: Add, edit, delete products
- **Orders**: View and manage customer orders
- **Promo Codes**: Create and manage discount codes

## 🎨 Design System

### Colors
- **Primary**: #02173A (Deep Blue)
- **Secondary**: #FFFFFF (White)
- **Background**: White with blue accents
- **Text**: #02173A for headings, gray for body text

### Typography
- **Headings**: Bold, #02173A color
- **Body**: Regular weight, gray colors
- **Buttons**: Bold, contrasting colors

### Layout
- **Navigation**: Dynamic color-changing navbar
- **Grid**: 4-column product grid on desktop, responsive on mobile
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadows for depth

## 🛒 Product Categories

### Women Perfumes
- Elegant and sophisticated fragrances
- Various sizes available
- Premium quality ingredients

### Men Perfumes  
- Bold and distinctive scents
- Professional and casual options
- Long-lasting formulations

### Available Sizes
- 30ml - Travel size
- 50ml - Standard size
- 75ml - Popular choice
- 100ml - Best value
- 125ml - Premium size
- 150ml - Luxury option
- 200ml - Maximum size

## 📦 Deployment

### Frontend Deployment (Vercel)
1. Build the project: `npm run build`
2. Deploy to Vercel or your preferred hosting platform

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to Heroku, Railway, or your preferred backend hosting service

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/products/category/:name` - Get products by category

### Promo Codes
- `POST /api/promo-codes/validate` - Validate promo code
- `POST /api/promo-codes/use` - Use promo code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and inquiries:
- WhatsApp: +20 10 44192114
- Instagram: @cityfragrance
- TikTok: @cityfragrance

---

**City Fragrance** - Premium Perfumes Collection 🌸