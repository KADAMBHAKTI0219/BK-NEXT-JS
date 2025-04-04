import Product from '@/component/product/product';
import React from 'react'

const page = ({params}) => {
    const { id } = params;
  return (
    <div>
      <Product id={id} />
    </div>
  )
}

export default page
