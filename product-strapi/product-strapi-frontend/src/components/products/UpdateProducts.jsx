'use client';
import { getProductById, updateProduct } from '@/lib/productsApi';
import React, { useState, useEffect } from 'react';

const UpdateProducts = ({ params }) => {
  const { id } = params;
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
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        const product = productData?.data || {};
        setFormData({
          name: product.name || '',
          price: product.price || '',
          stock: product.stock || '',
          category: product.category?.data?.id || '',
          images: [],
        });
        const images = product.images?.data || [];
        setExistingImages(
          images.map((img) => ({
            id: img.id,
            url: `${BASE_URL}${img.url.startsWith('/') ? '' : '/'}${img.url}`,
            name: img.name,
          }))
        );
        // Mock fetchCategories
        setCategories([{ id: 3, name: 'Chocolates' }]); // Replace with API call
        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(`Failed to load product: ${error.message}`);
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

    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', Number(formData.price));
    data.append('stock', Number(formData.stock));
    data.append('category', Number(formData.category));
    if (deletedImageIds.length > 0) {
      data.append('deletedImageIds', JSON.stringify(deletedImageIds));
    }
    formData.images.forEach((image) => {
      data.append('files.images', image);
    });

    try {
      const response = await updateProduct(id, data);
      console.log('Product updated:', response);
      setExistingImages(
        response.data.images?.data?.map((img) => ({
          id: img.id,
          url: `${BASE_URL}${img.url}`,
          name: img.name,
        })) || []
      );
      setImagePreviews([]);
      setFormData((prev) => ({ ...prev, images: [] }));
      setDeletedImageIds([]);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Submission error:', error);
      setError(`Update failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) return <div>Loading...</div>;

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