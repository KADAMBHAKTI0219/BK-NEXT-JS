'use client';

import Link from "next/link";

export default function ProductCard({ product, onDelete, onEdit }) {
  const baseUrl = "https://bk-crud-deploy-production.up.railway.app" || 'http://localhost:8080';
  const imageUrl = product.image ? `${baseUrl}${product.image}` : 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg';
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
      <img src={imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold text-gray-800"><Link href={`/productdetail/${product._id}`}>{product.title}</Link></h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <div className="mt-2 flex space-x-2 justify-center">
        <button onClick={() => onEdit(product._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => onDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}