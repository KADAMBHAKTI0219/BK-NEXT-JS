'use client'

// product-list.jsx
import React from 'react'

const ProductsList = () => {
  return (
    <div className='flex p-10 bg-gray-200'>
      <div>
        <h1 className='text-3xl font-semibold '>Products List</h1>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-xl font-semibold '>Total Products:</h1>
            <span className='text-2xl font-bold '>100</span>
          </div>
          <button className='  px-4 py-2 rounded-md'>Add Product</button>
        </div>
      </div>
    </div>
  )
}

export default ProductsList
