'use client'
import { getProducts } from '@/lib/productApi';
import React, { useEffect, useState } from 'react';

const Product = () => {
  const [data, setData] = useState([]);

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
    <div>
      <h1>Products</h1>
      <div>
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id}>
              <h2>{item?.Name}</h2>
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
