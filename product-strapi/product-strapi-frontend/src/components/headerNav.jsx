"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profile from '../../public/images/profile.jpg'

const HeaderNav = () => {
    const [name,setname] = useState('')
   useEffect(()=>{
    const user =JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(user){
        const {username} = user
        setname(username)
    }
   },[])
  return (
    <div className='flex justify-between bg-white p-4 shadow-lg'>
      <div>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p className='text-lg font-semibold text-gray-500'>Choc 'n Chuckle</p>
      </div>
      <div className='flex items-center space-x-3'>
        <Image src={profile} alt='profile' height={50} width={50} className='rounded-full'/>
        <p className='text-lg ml-2 font-semibold'>{name}</p>
      </div>
    </div>
  )
}

export default HeaderNav
