import React from 'react'
import ProductDetails from '@/components/product/ProductDetails'

const page = ({params}) => {
    const {id} = params
    console.log(id)
  return (
    <>
     <ProductDetails productId={id} />
    </>
  )
}

export default page
