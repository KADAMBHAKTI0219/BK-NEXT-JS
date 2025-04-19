"use client"
import { removeProduct } from '@/redux/slices/cartSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const {cart,total,discount} = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <div className='max-w-7xl m-auto text-center relative  min-h-screen'>
      <h1>My Cart</h1>
      {
        cart.length === 0 ?
        <p>Cart is empty</p> :
        <div className='grid grid-cols-3'>
          {
             cart.map((item,index)=>(
              <div key={index} className='w-40  bg-white text-black m-auto my-8 p-4 space-y-4 rounded-2xl'>
                <div className='flex justify-between text-xl'>
                  <p className='font-bold'>{item.title}</p>
                  <p>{item.price}</p>
                </div>
                <button onClick={()=>dispatch(removeProduct(item.id))} className='bg-red-700 text-white font-bold p-2 rounded-md'>Remove</button>
              </div>
            ))
          }

          <div className='absolute bottom-0 w-full flex justify-evenly text-2xl my-40'>
            <p>Total: ${total}</p>
            <p>Discount: ${discount}</p>
            <p>Final Price: ${total - discount}</p>
          </div>
        </div>
      }
    </div>
  )
}

export default Cart
