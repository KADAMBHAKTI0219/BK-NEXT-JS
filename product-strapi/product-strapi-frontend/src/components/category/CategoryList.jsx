'use client';

import { deleteCategory, getCategories } from '@/lib/categoryApi';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Layout from '../layout';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories({ name: nameFilter, search: searchFilter });
      setCategoryList(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const data = await getCategories({});
      setAllCategories(data);
    } catch (err) {
      console.error('Error fetching all categories:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      console.log('Deleting category with ID:', id);
      await deleteCategory(id);
      alert('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error.response?.data || error.message);
      alert(`Failed to delete category: ${error.response?.data?.error?.message || error.message}`);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchCategories(), 300);
    return () => clearTimeout(timer);
  }, [nameFilter, searchFilter]);

  return (
    <Layout>
       <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Category List</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {allCategories.map((el) => (
                <option value={el.name} key={el.id}>
                  {el.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by Name or Fabric..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full sm:w-64"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          <Link
            href="/create?type=category"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 transform hover:scale-105"
          >
            Add Category
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fabric</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : categoryList.length > 0 ? (
                categoryList.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{category.fabric || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        className="text-blue-600 hover:text-blue-800 mr-4 transition duration-200 hover:underline"
                        href={`/update/${category.documentId}?type=category`}
                      >
                        Edit
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 transition duration-200 hover:underline"
                        onClick={() => handleDelete(category.documentId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CategoryList;