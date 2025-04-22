'use client';

import { getProductById } from '@/lib/ProductApi';
import { useEffect, useState } from 'react';

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductById(productId);
        if (response && response.data) {
          setProduct(response.data); // Set the product data from the response
        } else {
          setProduct(null); // Handle case where no data is returned
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  const imageUrl = product.image ? `${baseUrl}${product.image}` : 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg';
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-20">
      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-gray-500 mb-4">{product.category}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}