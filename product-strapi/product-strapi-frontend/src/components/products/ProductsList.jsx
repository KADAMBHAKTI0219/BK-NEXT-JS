'use client';

import { deleteProduct, getProducts } from '@/lib/productsApi';
import { getImageUrl } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ProductsList = () => {
  const [productList, setProductsList] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({
        search: searchFilter,
        category: categoryFilter,
        price: priceFilter,
        stock: stockFilter,
      });
      console.log('Fetched products:', data);
      setProductsList(data);
    } catch (err) {
      console.error('Error fetching products:', err.response?.data || err.message);
      alert('Failed to fetch products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(documentId);
    try {
      console.log('Deleting product with documentId:', documentId);
      await deleteProduct(documentId);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      alert(
        `Failed to delete product: ${
          error.response?.data?.error?.message || error.message
        }`
      );
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(timer);
  }, [searchFilter, categoryFilter, priceFilter, stockFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Products List</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by Name or Category..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="chocolates">Chocolates</option>
              <option value="cakes">Cakes</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="below-100">Below 100</option>
              <option value="100-200">Range 100-200</option>
              <option value="200-300">Range 200-300</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="">All Stock</option>
              <option value="below-10">Below 10</option>
              <option value="10-20">Stock 10-20</option>
              <option value="20-30">Stock 20-30</option>
            </select>
          </div>
          <div className="flex gap-4">
            <Link
              href="/create?type=product"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : productList.length > 0 ? (
                productList.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap justify-center gap-3 mb-4">
                        {product.images && Array.isArray(product.images) ? (
                          product.images.map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={getImageUrl(img)}
                              alt={img.name || 'Product Image'}
                              className="w-20 h-20 object-cover rounded border"
                            />
                          ))
                        ) : (
                          <div className="text-gray-400">No images</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category?.name || 'No Category'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/update/${product.documentId}?type=product`} className="text-blue-600 hover:text-blue-800 mr-4">
                        Edit
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(product.documentId)}
                        disabled={deletingId === product.documentId}
                      >
                        {deletingId === product.documentId ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;