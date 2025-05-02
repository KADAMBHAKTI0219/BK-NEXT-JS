// components/ProductCard.js
'use client';

export default function ProductCard({ product }) {

  return (
    <div className="border rounded-xl shadow-md overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
          {product.title}
        </h2>
        <p className="text-sm text-gray-500 mb-3 capitalize">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}