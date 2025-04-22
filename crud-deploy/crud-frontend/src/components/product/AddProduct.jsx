'use client';

import { useState } from 'react';

export default function AddProduct({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <div className="grid gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" step="0.01" className="border p-2 rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" required />
        <input name="image" type="file" onChange={handleChange} className="border p-2 rounded" />
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    </form>
  );
}