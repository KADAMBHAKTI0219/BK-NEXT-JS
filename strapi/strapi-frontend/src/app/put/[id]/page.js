import UpdateProduct from '@/component/product/updateProduct';
import React from 'react'

const page = ({params}) => {
    const { id } = params; 
    console.log(id)
    
  return (
    <div>
    <UpdateProduct id={id} />
    </div>
  )
}

export default page
