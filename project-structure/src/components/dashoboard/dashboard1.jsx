'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Dashboard1 = () => {
    const [data,setData] =useState([])
    const getData = ()=>{
        axios.get('https://fakestoreapi.com/products').then(res=>setData(res.data)).catch(err=>console.log(err))
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className='grid grid-cols-3 max-w-7xl mx-auto gap-4 my-10'>
      {
        data.map((items,index)=>(
            <div key={index} className='bg-white text-center shadow-lg text-black py-10 px-6'>
                <img src={items.image} alt={items.title} className='w-40 h-40 mx-auto'/>
                <h1 className='text-3xl '>{items.title}</h1>
                <p className='text-xl '>{items.price}</p>
                <p className='text-lg'>{items.description}</p>
            </div>
        ))
      }
    </div>
  )
}

export default Dashboard1
