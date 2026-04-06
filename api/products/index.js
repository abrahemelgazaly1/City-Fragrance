const express = require('express');
const router = express.Router();
const Product = require('../../server/models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get best sellers
router.get('/bestsellers', async (req, res) => {
  try {
    const products = await Product.find({ isBestSeller: true }).limit(6);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (admin)
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle best seller
router.put('/bestseller/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product.isBestSeller) {
      product.isBestSeller = false;
    } else {
      const bestSellersCount = await Product.countDocuments({ isBestSeller: true });
      if (bestSellersCount >= 8) {
        return res.status(400).json({ message: 'Maximum 8 best sellers allowed' });
      }
      product.isBestSeller = true;
    }
    
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
