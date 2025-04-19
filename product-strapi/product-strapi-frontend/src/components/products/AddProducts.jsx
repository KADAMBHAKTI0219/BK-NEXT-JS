'use client';

import { createProduct, uploadImages } from '@/lib/productsApi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Layout from '../layout';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/categories');
        setCategories(response.data.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const selectedFiles = Array.from(files);
      const validFiles = selectedFiles.filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
      );
      if (validFiles.length !== selectedFiles.length) {
        setError('Only JPEG or PNG images are allowed.');
        return;
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...validFiles] }));
      const previews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      let imageIds = [];

      // Upload images if any
      if (formData.images.length > 0) {
        const uploadedImages = await uploadImages(formData.images);
        imageIds = uploadedImages.map((img) => img.id);
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        category: parseInt(formData.category, 10),
        images: imageIds,
      };

      console.log('Submitting product data:', productData);

      // Create product
      await createProduct(productData);

      // Reset form
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        images: [],
      });
      setImagePreviews([]);
      alert('Product created successfully!');
      router.push('/product')
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      setError(`Failed to create product: ${err.response?.data?.error?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <Layout>
     <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
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
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.attributes?.name || cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="flex flex-wrap gap-4 mt-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="h-24 w-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-md ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  </Layout>
  );
};

export default AddProducts;