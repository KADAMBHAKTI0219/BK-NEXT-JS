"use client"
import React from 'react'
import GetProduct from './product'
import AddProducts from './addProducts'
import EditProduct from './editProducts'

const Product = () => {
  return (
    <div>
      <AddProducts/>
      <GetProduct/>
      <EditProduct/>
    </div>
  )
}

export default Product
