'use client'
import Image from 'next/image'
import React from 'react'
import bg from '../../../public/assests/images/bg.webp'

const Home1 = () => {
  return (
    <div className='min-h-screen bg-amber-900 relative'>
      <Image src={bg}  fill className='object-cover'></Image>
    </div>
  )
}

export default Home1
