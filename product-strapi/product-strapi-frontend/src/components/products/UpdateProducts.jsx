'use client';

import { getProductById, updateProduct, uploadImages } from '@/lib/productsApi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Layout from '../layout';

const UpdateProducts = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [categories, setCategories] = useState([]);
  const BASE_URL = 'http://localhost:1337';
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productData = await getProductById(id);
        const product = productData?.data?.attributes || productData?.data || {};
        
        setFormData({
          name: product.name || '',
          price: product.price?.toString() || '',
          stock: product.stock?.toString() || '',
          category: product.category?.data?.id || product.category?.id || '',
          images: [],
        });

        // Set existing images
        const images = product.images?.data || product.images || [];
        setExistingImages(
          images.map((img) => ({
            id: img.id,
            url: img.attributes?.url?.includes('http') 
              ? img.attributes.url 
              : `${BASE_URL}${img.attributes?.url || img.url}`,
            name: img.attributes?.name || img.name || 'Product Image',
          }))
        );

        // Fetch categories
        const categoriesResponse = await axios.get(`${BASE_URL}/api/categories`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        setCategories(
          categoriesResponse.data.data.map((cat) => ({
            id: cat.id,
            name: cat.attributes?.name || cat.name,
          }))
        );

        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load product or categories: ${error.message}`);
      }
    };
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const selectedFiles = Array.from(files);
      const validFiles = selectedFiles.filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
      );
      if (validFiles.length !== selectedFiles.length) {
        setError('Only JPEG or PNG images are allowed');
        return;
      }
      setFormData((prev) => ({ ...prev, images: validFiles }));
      const previews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index, isNew = true) => {
    if (isNew) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
      setImagePreviews((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
    } else {
      setDeletedImageIds((prev) => [...prev, existingImages[index].id]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    if (Number(formData.price) <= 0) {
      setError('Price must be greater than 0');
      setIsLoading(false);
      return;
    }
    if (Number(formData.stock) < 0) {
      setError('Stock cannot be negative');
      setIsLoading(false);
      return;
    }

    try {
      // First, upload new images if any
      let uploadedImageIds = [];
      if (formData.images.length > 0) {
        const uploadResponse = await uploadImages(formData.images);
        uploadedImageIds = uploadResponse.data.map((img) => img.id);
      }

      // Prepare payload for product update
      const payload = {
        data: {
          name: formData.name,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: Number(formData.category),
          images: [
            ...existingImages
              .filter((img) => !deletedImageIds.includes(img.id))
              .map((img) => img.id),
            ...uploadedImageIds,
          ],
        },
      };

      // Update product
      const response = await updateProduct(id, payload);
      
      // Update state with new data
      const updatedProduct = response.data?.attributes || response.data;
      setFormData({
        name: updatedProduct.name || '',
        price: updatedProduct.price?.toString() || '',
        stock: updatedProduct.stock?.toString() || '',
        category: updatedProduct.category?.data?.id || updatedProduct.category?.id || '',
        images: [],
      });

      // Update existing images
      const updatedImages = updatedProduct.images?.data || updatedProduct.images || [];
      setExistingImages(
        updatedImages.map((img) => ({
          id: img.id,
          url: img.attributes?.url?.includes('http') 
            ? img.attributes.url 
            : `${BASE_URL}${img.attributes?.url || img.url}`,
          name: img.attributes?.name || img.name || 'Product Image',
        }))
      );

      setImagePreviews([]);
      setDeletedImageIds([]);
      alert('Product updated successfully!');
      router.push('/product')
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
      console.error('Submission error:', error);
      setError(`Update failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) return <div className="text-center text-gray-600">Loading...</div>;

  return (
   <Layout>
     <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Product</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Product:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-gray-700 font-medium mb-1">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Existing Images:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.map((image, index) => (
                <div key={image.id} className="relative">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, false)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200 transform hover:scale-110"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-medium mb-1">New Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition duration-200 transform hover:scale-110"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-200 transform hover:scale-105 ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
   </Layout>
  );
};

export default UpdateProducts;