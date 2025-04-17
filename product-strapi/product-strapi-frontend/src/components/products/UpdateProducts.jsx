'use client';

import { getCategories } from '@/lib/categoryApi';
import { getProductById, updateProduct } from '@/lib/productsApi';
import { getImageUrl } from '@/lib/utils';
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        console.log('Raw product data:', productData); // Debug
        if (!productData?.data) {
          setError('Product not found');
          setIsInitialized(true);
          return;
        }
        const product = productData.data || {};
        console.log('Fetched product:', product);
        setFormData({
          name: product.name || '',
          price: product.price || '',
          stock: product.stock || '',
          category: product.category?.id || '', // Adjusted for direct category.id
          images: [],
        });
        const images = product.images || [];
        setExistingImages(
          images.map((img) => ({
            id: img.id,
            url: getImageUrl(img, BASE_URL), // Ensure getImageUrl handles direct img.url
            name: img.name || 'Product Image',
          }))
        );

        const categories = await getCategories();
        setCategories(categories);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to load product or categories: ${error.message}`);
        setIsInitialized(true);
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
      const newValue = name === 'price' || name === 'stock' ? Number(value) : value;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
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

    const data = new FormData();
    data.append('data.name', formData.name);
    data.append('data.price', Number(formData.price));
    data.append('data.stock', Number(formData.stock));
    data.append('data.category', Number(formData.category));
    if (deletedImageIds.length > 0) {
      data.append('data.deletedImageIds', JSON.stringify(deletedImageIds));
    }
    formData.images.forEach((image) => {
      data.append('files.images', image);
    });

    try {
      const response = await updateProduct(id, data);
      console.log('Product updated:', response);
      setExistingImages(
        response.images?.map((img) => ({
          id: img.id,
          url: getImageUrl(img, BASE_URL),
          name: img.name || 'Product Image',
        })) || []
      );
      setImagePreviews([]);
      setFormData((prev) => ({ ...prev, images: [] }));
      setDeletedImageIds([]);
      alert('Product updated successfully!');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error?.message || error.message || 'An unexpected error occurred';
      console.error('Submission error:', error);
      setError(`Update failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) return <div style={{ textAlign: 'center' }}>Loading product data...</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Update Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Product:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Existing Images:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {existingImages.map((image, index) => (
              <div key={image.id} style={{ position: 'relative' }}>
                <img
                  src={image.url}
                  alt={image.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, false)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="images">New Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleInputChange}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {imagePreviews.map((preview, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index, true)}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <input
          type="submit"
          value={isLoading ? 'Updating...' : 'Update'}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            background: isLoading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        />
      </form>
    </div>
  );
};

export default UpdateProducts;