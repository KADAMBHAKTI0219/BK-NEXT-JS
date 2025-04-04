import React from 'react'
import { Categories } from '@/data/home'
import Image from 'next/image'
import CompHeading from './CompHeading'

const CategoryHome = () => {
  return (
    <div className='px-8 w-full my-10 border-b-2 border-grey-100 pb-24'>
        <CompHeading text='Top' hoverText='Categories'/>
      <div className='grid grid-cols-6'>
      {
        Categories.map((cat,index)=>(
            <div key={index} className='border-r-2 border-grey-100 space-y-8 text-center group'>
                <div className='bg-grey-100/50 h-32 w-32 rounded-full mx-auto relative'>
                    <div className='absolute right-0 bg-white h-9 w-9 rounded-full text-primary py-1.5 px-2.5 shadow-lg font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-500'>{cat.quantity}</div>
                    <Image src={cat.image} alt={cat.title} className='mx-auto py-10'></Image>
                </div>
                <div>
                    <h2 className='text-base px-12'>{cat.title}</h2>
                    <h2 className='text-base '>{cat.subTitle}</h2>
                </div>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default CategoryHome
