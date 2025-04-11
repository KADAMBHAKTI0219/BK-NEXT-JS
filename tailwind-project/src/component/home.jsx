'use client'
import Image from 'next/image'
import React from 'react'
import orig from '../../public/assets/images/orig.webp'

const Home = () => {
  return (
    <div className='bg-linear-to-r  from-indigo-500 to-teal-400'>
        <h1 className='text-2xl font-boldonse text-avocado-500'>Hello</h1>
        <div className='perspective-distant max-w-xl mx-auto md:max-w-3xl lg:max-w-5xl'>
            <Image src={orig} alt='orig' className='rotate-x-48 rotate-z-20 transform-3d'></Image>
        </div>
    </div>
  )
}

export default Home
