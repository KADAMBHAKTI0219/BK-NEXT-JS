'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from '../components/ItemForm';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [addToggle,setAddToggle] = useState(false)

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      console.log('Fetched items:', response.data); // Debugging log
      setItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items. Please try again.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
     <div>
    <div className='flex justify-between max-w-5xl mx-auto items-center'> 
      <div className='text-3xl font-semibold '>
        Products
      </div>
      <button onClick={()=>setAddToggle(!addToggle)} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Add Products
      </button>
    </div>
      {addToggle && <ItemForm onAdd={fetchItems} />}
     </div>
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
      
      {items.length > 0 ? (
        items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onDelete={fetchItems} // Pass fetchItems as onDelete callback
          />
        ))
      ) : (
        <p className="text-gray-600">No items available.</p>
      )}
    </div>
    </div>
    </div>
  );
}