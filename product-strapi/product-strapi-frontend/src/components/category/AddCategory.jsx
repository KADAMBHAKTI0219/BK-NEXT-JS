'use client';

import axios from 'axios';
import React, { useState } from 'react';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    fabric: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.name) {
      setError('Name is required.');
      setIsLoading(false);    
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/categories', {
        data: {
          name: formData.name,
          fabric: formData.fabric || null,
        },
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Category created:', response.data);
      setFormData({ name: '', fabric: '' });
      alert('Category created successfully!');
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      setError(`Failed to create category: ${err.response?.data?.error?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-32">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fabric (Optional)</label>
          <input
            type="text"
            name="fabric"
            value={formData.fabric}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-md ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;