'use client';

import { getCategoryById, updateCategory } from '@/lib/categoryApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditCategory = ({ id }) => {
  console.log('id', id);
  const [formData, setFormData] = useState({
    name: '',
    fabric: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
  
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const category = await getCategoryById(id); // No .data.data needed
        if (mounted) {
          setFormData({
            name: category.name || '',
            fabric: category.fabric || '',
          });
        }
      } catch (err) {
        console.error('Fetch error:', err.message || err);
        if (mounted) {
          if (err.response?.status === 404) {
            setNotFound(true);
          } else {
            setError('Failed to load category. Please try again.');
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
  
    fetchCategory();
  
    return () => {
      mounted = false;
    };
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const token = localStorage.getItem('jwt');
    if (!token) {
      setError('You must be logged in to update a category.');
      setIsLoading(false);
      return;
    }

    if (!formData.name) {
      setError('Name is required.');
      setIsLoading(false);
      return;
    }

    try {
      await updateCategory(id, {
        data: {
          name: formData.name,
          fabric: formData.fabric || null,
        },
      });
      
      alert('Category updated successfully!'); // Replace with better UX in production
    } catch (err) {
      console.error('Submission error:', err.message || err);
      setError(
        `Failed to update category: ${
          err.response?.data?.error?.message || err.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 text-center text-red-600">
        Category not found.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
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
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;