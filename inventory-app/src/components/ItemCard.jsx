'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ItemCard({ item, onDelete }) {
  const isLowStock = item.quantity < 10;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items?id=${item._id}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Debugging log to verify quantity
  console.log(`Item: ${item.name}, Quantity: ${item.quantity}, Low Stock: ${isLowStock}`);

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${isLowStock ? 'border-2 border-red-500' : ''}`}>
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-gray-600">Quantity: {item.quantity}</p>
      <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
      <p className="text-gray-600">Description: {item.description || 'N/A'}</p>
      {isLowStock && (
        <p className="text-red-500 font-semibold mt-2">Low Stock Alert: Only {item.quantity} units left!</p>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => router.push(`/edit/${item._id}`)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}