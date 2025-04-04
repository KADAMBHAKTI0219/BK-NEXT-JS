import Image from 'next/image'
import React from 'react'

const ProductDetail = ({data}) => {
    console.log(data)
  return (
    <div className='max-w-5xl mx-auto p-4 border-2 rounded-lg'>
      <Image src={data.image} alt={data.title} className='object-cover mx-auto'/>
      <h1>{data.title}</h1>
      <h2>{data.price}</h2>
    </div>
  )
}

export default ProductDetail
