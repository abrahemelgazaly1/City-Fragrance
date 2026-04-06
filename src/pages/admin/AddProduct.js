import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../../config/api';

const AddProduct = ({ editProduct = null, onSave = null }) => {
  const categories = ['Women', 'Men'];

  const sizes = ['30ml', '50ml', '75ml', '100ml', '125ml', '150ml', '200ml'];

  const [formData, setFormData] = useState(editProduct || {
    name: '',
    price: '',
    description: '',
    category: '',
    sizes: [],
    images: [],
    soldOutSizes: []
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));

      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData(prev => ({ ...prev, images: [...prev.images, ...response.data.urls] }));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to upload images',
        confirmButtonColor: '#000'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await axios.put(`${API_URL}/api/products/${editProduct._id}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Product updated successfully',
          confirmButtonColor: '#000',
          timer: 2000
        });
        if (onSave) onSave();
      } else {
        await axios.post(`${API_URL}/api/products`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'Product added successfully',
          confirmButtonColor: '#000',
          timer: 2000
        });
        setFormData({
          name: '',
          price: '',
          description: '',
          category: '',
          sizes: [],
          images: [],
          soldOutSizes: []
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save product',
        confirmButtonColor: '#000'
      });
    }
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const array = prev[field];
      const index = array.indexOf(value);
      if (index > -1) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Price (EGP)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-black"
            required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSelection('sizes', size)}
                className={`px-4 py-2 rounded-lg font-bold transition ${
                  formData.sizes.includes(size)
                    ? 'bg-[#02173A] text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sold Out Sizes - Only show if editing and sizes are selected */}
        {editProduct && formData.sizes.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <label className="block font-semibold mb-2 text-red-800">Sold Out Sizes</label>
            <p className="text-sm text-gray-600 mb-2">Select sizes that are sold out:</p>
            <div className="flex flex-wrap gap-2">
              {formData.sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSelection('soldOutSizes', size)}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    formData.soldOutSizes?.includes(size)
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block font-semibold mb-2">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border rounded-lg"
          />
          {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
          {formData.images.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {formData.images.map((img, index) => (
                <img key={index} src={img} alt={`Product ${index + 1}`} className="w-24 h-24 object-cover rounded" />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-[#02173A] text-white py-3 rounded-lg font-bold hover:bg-[#031e47] transition disabled:bg-gray-400">
          {editProduct ? 'SAVE CHANGES' : 'ADD PRODUCT'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
