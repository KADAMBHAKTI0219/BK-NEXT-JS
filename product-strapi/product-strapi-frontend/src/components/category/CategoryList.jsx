"use client"
import { deleteCategory, getCategories } from '@/lib/categoryApi'
import React, { useEffect, useState } from 'react'

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([])
    const handleDelete =async (id)=>{
     try{
      const response = await deleteCategory(id)
      console.log(response)
     }
     catch(error){
      console.error(error)
     }
    }
    useEffect(() => {
      getCategories()
        .then(data => setCategoryList(data))
        .catch(err => console.log(err))
    }, [])
  
  return (
     <div className="min-h-screen bg-gray-50">
          {/* Header Section */}
          <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Category List</h1>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="chocolates">Chocolates</option>
                  <option value="cakes">Cakes</option>
                </select>
              </div>
            </div>
          </div>
    
          {/* Table Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fabric
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                 {
                  categoryList.map((category)=>(
                    <tr key={category.id}>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                        {category.name}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                        {category.fabric}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-800 mr-4">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={(e)=>handleDelete(product.documentId)}>
                        Delete
                      </button>
                    </td>
                    </tr>
                  ))
                 }
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}

export default CategoryList
