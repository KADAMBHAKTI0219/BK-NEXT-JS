'use client'
import { deleteProduct, getProducts } from '@/lib/productApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Product = () => {
  const [data, setData] = useState([]);

 const handleDelete = async (productId) => { 
    const isDeleted = await deleteProduct(productId); 

    if (isDeleted) {
        console.log(`✅ Product ${productId} removed from state.`);
        setData((prevData) => prevData.filter((item) => item.id !== productId));
    } else {
        console.error("❌ Error deleting product:", productId);
    }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts(); 
        setData(products || []); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-3xl'>Products</h1>
      <div className='flex justify-center gap-4 flex-wrap'>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className='border  m-2 p-2 w-1/3 mx-auto space-y-2 '>
              <h2 className='text-2xl'>{item?.Name}</h2>
              <div className='space-x-4'>
              <Link href={`/put/${item.id}`} className='bg-blue-600 text-white p-3 rounded-lg'>Edit</Link>
              <button onClick={() => handleDelete(item?.id)} className='bg-red-500 text-white p-2 rounded-lg'>Delete</button> 
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
