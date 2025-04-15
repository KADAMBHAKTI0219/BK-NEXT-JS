

import UpdateProducts from '@/components/products/UpdateProducts'
import React from 'react'

const page = ({params}) => {
  const {id} = params
  return (
    <div>
      <UpdateProducts params={{id}}/>
    </div>
  )
}

export default page
