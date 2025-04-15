'use client'

import { deleteProduct, getProducts } from '@/lib/productsApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProductsList = () => {
  const [productList, setProductsList] = useState([])
  const [cat,setcat] = useState('')

  const handleDelete =async (id)=>{
   try{
    const response = await deleteProduct(id)
    console.log(response)
   }
   catch(error){
    console.error(error)
   }
  }
  useEffect(() => {
    getProducts(cat)
      .then(data => setProductsList(data))
      .catch(err => console.log(err))
  }, [cat])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Products List</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search Products..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>setcat(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="chocolates">Chocolates</option>
              <option value="cakes">Cakes</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Prices</option>
              <option value="below-10">Below 10</option>
              <option value="10-20">Range 10-20</option>
              <option value="20-30">Range 20-30</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Stock</option>
              <option value="below-10">Below 10</option>
              <option value="10-20">Stock 10-20</option>
              <option value="20-30">Stock 20-30</option>
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
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productList.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                  {product.images && product.images.length > 0 ? (
                     <Image src={product.images[0].url} alt={product.name}
                     className="h-10 w-10 rounded-full object-cover object-center" width={100} height={100}/>
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link className="text-blue-600 hover:text-blue-800 mr-4" href={`/update/${product.documentId}`}>
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-800" onClick={(e)=>handleDelete(product.documentId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductsList