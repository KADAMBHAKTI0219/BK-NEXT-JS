import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import instagram01 from '../../../public/assets/images/instagram01.jpg'
import instagram02 from '../../../public/assets/images/instagram02.jpg'
import instagram03 from '../../../public/assets/images/instagram03.jpg'
import instagram04 from '../../../public/assets/images/instagram04.jpg'
import instagram05 from '../../../public/assets/images/instagram05.jpg'
import instagram06 from '../../../public/assets/images/instagram06.jpg'
import Image from 'next/image'


const Contact = () => {
    const instagram = [
        {id:1,image:instagram01},
        {id:2,image:instagram02},
        {id:3,image:instagram03},
        {id:4,image:instagram04},
        {id:5,image:instagram05},
        {id:6,image:instagram06},
    ]
  return (
    <div className='px-9 text-center my-24'>
      <h1 className='text-primary text-xl'>Follow On</h1>
      <div className=' font-bold flex items-end mx-auto w-1/6 px-2 space-x-2'>
            <FaInstagram size={38}/>
        <div className='text-3xl'>ninico-shop</div>
      </div>
      <div className='grid grid-cols-6 gap-7 mt-10'>
        {instagram.map((item,index) => (
            <div key={index}>
                <Image src={item.image} alt='images' className='rounded-lg'/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Contact
