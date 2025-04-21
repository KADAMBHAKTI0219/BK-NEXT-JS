'use client';

export default function ProductDetails({ product }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-gray-500 mb-4">{product.category}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}