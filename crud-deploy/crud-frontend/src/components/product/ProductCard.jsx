'use client';

export default function ProductCard({ product, onDelete, onEdit }) {
  const imageUrl = product.image ? `http://localhost:9090${product.image}` : 'https://via.placeholder.com/150';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img src={imageUrl} alt={product.title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <div className="mt-2 flex space-x-2">
        <button onClick={() => onEdit(product._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
        <button onClick={() => onDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}