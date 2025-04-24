'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function EditItem() {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items?id=${id}`);
        const items = response.data;
        const item = items.find((item) => item._id === id);
        if (item) {
          setFormData({
            name: item.name,
            quantity: item.quantity.toString(),
            price: item.price.toString(),
            description: item.description || '',
          });
        } else {
          setError('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Failed to load item');
      }
    };
    if (id) fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/items?id=${id}`, formData);
      router.push('/');
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Item
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}