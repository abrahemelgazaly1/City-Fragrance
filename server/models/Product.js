const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  sizes: [{
    type: String,
    required: true,
  }],
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isSoldOut: {
    type: Boolean,
    default: false,
  },
  soldOutSizes: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
