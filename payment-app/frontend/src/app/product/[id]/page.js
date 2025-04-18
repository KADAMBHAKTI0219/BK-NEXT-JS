'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch(() => setError('Product not found'));
  }, [id]);

  const handleBuyNow = () => {
    // Pass product ID as a query parameter
    router.push(`/checkout?productId=${id}`);
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!product) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-4">${product.price}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <button
          onClick={handleBuyNow}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}