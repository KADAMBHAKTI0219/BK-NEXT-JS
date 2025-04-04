import React from 'react'
import { products } from '@/data/home';
import ProductDetail from '@/components/home/productDetail';

const page = ({params}) => {
    const {id} = params;
    console.log(id)
    console.log(products.filter(z=>z.id ===id))
    const data =  products.filter((z)=>z.id === id) 
  return (
    <div>
      {/* <Home/> */}
      <ProductDetail data={data} />
    </div>
  )
}

export default page
