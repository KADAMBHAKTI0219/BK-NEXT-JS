"use client"
import { addProduct } from '@/redux/slices/cartSlice';
import React from 'react'
import { useDispatch } from 'react-redux'

const Product = () => {
  const card = [
    {id:1,title:"Card 1", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 1',price:10},
    {id:2,title:"Card 2", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 2',price:20},
    {id:3,title:"Card 3", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 3',price:30},
    {id:4,title:"Card 4", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 4',price:40},
    {id:5,title:"Card 5", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 5',price:50},
    {id:6,title:"Card 6", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 6',price:60},
    {id:7,title:"Card 7", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 7',price:70},
    {id:8,title:"Card 8", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 8',price:80},
    {id:9,title:"Card 9", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 9',price:90}
  ]
  const dispatch = useDispatch();
  return  (
    <div className='grid grid-cols-3 gap-8 max-w-7xl m-auto my-10 text-center'>
      {
        card.map((item,index)=>(
          <div key={index} className='space-y-2 bg-white text-black p-4 rounded-xl'>
            <h2 className='font-bold text-xl'>{item.title}</h2>
            <h3>$ {item.price}</h3>
            <p>{item.description}</p>
            <button onClick={()=>dispatch(addProduct(item))} className='bg-teal-900 text-white py-2 px-4 rounded-md'>Add To Cart</button>
          </div>
        ))
      }
    </div>
  )
}

export default Product
