"use client"
import React from 'react'
import { aboutData } from '@/data/about/aboutData'
import Link from 'next/link'

const About1 = () => {
  return (
    <div className='min-h-screen  max-w-7xl mx-auto '>
       <div className='flex gap-4 py-10'>
       {
        aboutData.map((item, index) => (
            <div key={index} className='p-10 border-2'>
                <div><Link href={`about/${item.slug}`}>{item.title}</Link></div>
                <div>{item.description}</div>
            </div>
        ))
       }
       </div>
    </div>
  )
}

export default About1
