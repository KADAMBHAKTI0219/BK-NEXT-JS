"use client"
import { langContextt } from '@/context/langContext'
import React, { useContext } from 'react'

const ProductDetails = ({product}) => {
    const {getLocalized } = useContext(langContextt)
    console.log("product",product)

  return (
    <div className='flex flex-col items-center justify-center my-24 space-y-10 w-1/2 mx-auto border p-10 rounded-lg shadow-2xl'>
        <h1 className='text-center text-3xl'>Product Details</h1>
        <div className=''>
        <div className="flex flex-wrap justify-center  gap-3 mb-4">
      {product.image && Array.isArray(product.image) ? (
        product.image.map((img, imgIndex) => {
          const imageUrl =
            img?.formats?.medium?.url ||
            img?.formats?.small?.url ||
            img?.formats?.thumbnail?.url ||
            img?.url;

          return (
            <img
              key={imgIndex}
              src={`http://localhost:1337${imageUrl}`} 
              alt={img.name || "Product Image"}
              className="w-44 h-44 object-cover rounded border"
            />
          );
        })
      ) : (
        <div className="text-gray-400">No images</div>
      )}
    </div>
            <h2 className='text-2xl font-bold text-center'>{getLocalized (product,'Name')}</h2>
            <p className='text-lg text-center '>{getLocalized (product,'description')}</p>
            <p className='text-lg text-center'>Price: {getLocalized (product,'price')}</p>
        </div>
    </div>
  )
}

export default ProductDetails
