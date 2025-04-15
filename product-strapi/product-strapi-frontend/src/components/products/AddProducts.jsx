  "use client";
import { createProduct } from '@/lib/productsApi';
import React, { useState } from 'react';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const data = new FormData();
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    data.append('data', JSON.stringify({
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: Number(formData.category), // Fixed to numeric ID
    }));
    formData.images.forEach((image) => {
      data.append('files.images', image);
    });

    // Enhanced debug to verify FormData
    console.log('Raw FormData entries:');
    for (const [key, value] of data.entries()) {
      console.log(`FormData ${key}:`, value instanceof File ? value.name : value);
    }

    try {
      const response = await createProduct(data);
      console.log('Product created:', response);
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('Submission error details:', error);
      setError(`Submission failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2>Add New Product</h2>
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
            <option value="3">Chocolates</option>
            {/* Add more options dynamically via API if needed */}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="images">Images:</label>
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
                  onClick={() => handleRemoveImage(index)}
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
          value={isLoading ? 'Submitting...' : 'Submit'}
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

export default AddProducts;