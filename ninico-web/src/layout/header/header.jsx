"use client"
import Link from 'next/link'
import React from 'react'
import { HiArrowLongRight } from "react-icons/hi2";
import {  CiUser } from "react-icons/ci";
import { FaHandHolding } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaBehance } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import {  IoLogoLinkedin } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import {  GoHeart } from "react-icons/go";
import logo from '../../../public/assets/images/logo.png'
import langflag from '../../../public/assets/images/langflag.png'
import Image from 'next/image';

const Header = () => {
    const socialIcons = [
        {id:1,icon:<FaFacebookF />},
        {id:2,icon:<AiOutlineTwitter />},
        {id:3,icon:<FaBehance />},
        {id:4,icon:<FaYoutube />},
        {id:3,icon:<IoLogoLinkedin />},
    ]

    const icons = [
        {id:1,icon:<BsCart />},
        {id:2,icon:<CiUser />},
        {id:3,icon:<GoHeart />},
    ]


  return (
    <header>
        <div className='bg-theme flex px-11 py-1.5 items-center justify-between'>
           <div className='flex items-center'>
           <h1 className='font-bold font-sans text-base'>Welcome to our international shop! Enjoy free shipping on orders $100 up.</h1>
            <div className='text-primary font-bold border-b '>
            <Link href='/' className='flex items-center  space-x-4'><span className='text-lg'>Shop Now</span><span className='text-xl'><HiArrowLongRight /></span></Link>
           </div>
            </div>

            <div className='flex items-center space-x-8'>
                <div className='flex items-center space-x-2'><span><CiUser /></span><span className='font-bold text-[13px]'>Account</span></div>
                <div className='flex items-center space-x-2'><span className='border-b pb-1'><FaHandHolding /></span><span className='font-bold text-[13px]'>Track Your Order</span></div>
                <div className='flex items-center space-x-2 text-base'>
                    {
                        socialIcons.map((icon, index) => (
                            <div key={index}>{icon.icon}</div>
                        ))
                    }
                </div>
            </div>
        </div>

        <div className='flex items-center justify-between py-8 px-11'>
            <Image src={logo} alt='logo' />
            <div className='relative w-[53%] ms-20' >
                <input type="text" className='w-full h-full bg-grey px-13 py-3 rounded-lg text-lg' placeholder='Search Products...'/>
                <div className='absolute inset-0 py-3 left-5 text-2xl'><IoIosSearch /></div>
            </div>
            <div className='flex space-x-4 items-center'>
                <div className='flex space-x-2 border border-gray-200 p-1 rounded-md items-center'>
                    <Image src={langflag} alt='langFlag'/>
                    <h1 className=''>English</h1>
                    <div className='text-gray-500 text-xs pe-2'><IoIosArrowDown /></div>
                </div>
                <div className='flex space-x-2 border border-gray-200 p-2 rounded-md items-center'>
                    <h1 className='text-xl ps-2'>USD</h1>
                    <div className='text-gray-500 text-xs'><IoIosArrowDown /></div>
                </div>
            </div>
            <div className='flex space-x-5'>
                {
                    icons.map((icon, index) => (
                       <div key={index}>
                         {index == 1 ? <div key={index} className='text-2xl'>{icon.icon}</div> :<div className='relative'>
                            <div className='h-4 w-4 text-center rounded-full bg-primary text-xs absolute -right-2 -top-1 text-white'>0</div>
                            <div key={index} className='text-2xl'>{icon.icon}</div>
                        </div>}
                       </div>
                    ))
                }
            </div>
        </div>
    </header>
  )
}

export default Header
