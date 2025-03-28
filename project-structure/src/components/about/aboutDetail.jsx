"use client"
import React from 'react'
import Image from 'next/image'

const AboutDetail = ({aboutData}) => { 
  return (
    <div className='flex justify-center my-10'>
            <div key={aboutData.id} className='w-1/2 border-2 rounded-lg p-4 space-y-4 text-center'>
                <Image src={aboutData.image} alt={aboutData.title} className='object-cover w-full'></Image>
                <div className='font-semibold text-xl'>{aboutData.title}</div>
                <div>{aboutData.description}</div>
            </div>
    </div>
  )
}

export default AboutDetail
