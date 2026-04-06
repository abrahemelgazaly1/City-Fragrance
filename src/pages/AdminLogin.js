import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, formData);
      if (response.data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#02173A]">City Fragrance Admin</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-[#02173A]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#02173A]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-[#02173A]">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#02173A]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#02173A] text-white py-3 rounded-lg font-bold hover:bg-[#031e47] transition">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
