import React, { useState } from 'react'
import CompHeading from './CompHeading'
import { products } from '@/data/home'
import Image from 'next/image'
import { GrBasket } from "react-icons/gr";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { TfiEye } from "react-icons/tfi";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegStar, FaStar } from 'react-icons/fa';
import Link from 'next/link';


const Product = () => {
const [filter,setFilter] = useState('all')
const filteredProducts = products.filter(product =>  product.cat === filter);


  return (
    <div className='my-24 px-10'>
      <div className='flex items-center justify-between'>
        <CompHeading text='Popular' hoverText='Products'/>
        <div className="space-x-12 font-bold">
            <button onClick={() => setFilter("all")} className='hover:text-primary hover:underline underline-offset-2'>All</button>
            <button onClick={() => setFilter("popular")} className='hover:text-primary hover:underline underline-offset-2'>Popular</button>
            <button className='hover:text-primary hover:underline underline-offset-2'>On Sale</button>
            <button className='hover:text-primary hover:underline underline-offset-2'>Best Rated</button>
        </div>
        </div>
             <div className='grid grid-cols-5 gap-7'>
             {
                 filteredProducts.map((product,index)=>(
                     <div  key={index} className='relative group hover:p-4 hover:shadow-lg rounded-lg overflow-hidden hover:scale-110 transition-all duration-100'>
                         <div className='relative rounded-lg'>
                            <Image src={product.image} alt={product.title} className='object-cover rounded-lg'/>
                            <div className='opacity-0 hover:opacity-100'>
                            <Image src={product.imageHover} alt={product.title} className='absolute top-0  transition-all duration-500 rounded-md' />
                             <div className='  flex items-center text-text-grey space-x-3 text-lg bg-white py-4 px-3 rounded-md mx-17 absolute bottom-24 -right-4 transition-all duration-300'>
                                 <span><GrBasket /></span>
                                 <span><HiArrowsRightLeft /></span>
                                 <span><TfiEye /></span>
                                 <span><IoIosHeartEmpty /></span>
                             </div>
                            </div>
                         </div>
                         <div className='py-4 space-y-1'>
                             <div className='text-text-grey text-base'><Link className='' href={`/product/${product.id}`}>{product.title}</Link></div>
                             <div className='font-bold text-lg'>{product.price}</div>
                         </div>
                         <div className='flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300'>
                             <div className='flex items-center space-x-1'>
                                 <div className='w-3 h-3 rounded-full bg-blue-300'></div>
                                     <div className='w-3 h-3 rounded-full bg-primary'></div>
                                     <div className='w-3 h-3 rounded-full bg-red-300'></div>
                                     <div className='w-3 h-3 rounded-full bg-purple-300'></div>
                             </div>
                             <div className='flex items-center'>
                                 <FaStar className='text-primary text-xs' />
                                 <FaStar className='text-primary text-xs' />
                                 <FaStar className='text-primary text-xs' />
                                 <FaStar className='text-primary text-xs' />
                                 <FaRegStar className='text-primary text-xs' />
                                 <span className='text-xs'>(81)</span>
                             </div>
                         </div>
                             
                     </div>
                 ))
     
             }
            </div>
    </div>
  )
}

export default Product
