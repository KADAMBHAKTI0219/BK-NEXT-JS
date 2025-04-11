'use client'
import React, { useState } from 'react'
import { CiFaceSmile, CiLocationOn, CiUser } from 'react-icons/ci';
import { FaHandHolding } from 'react-icons/fa';
import { GoGift} from 'react-icons/go';
import { IoChevronDownSharp, IoFootballOutline, IoMenu } from "react-icons/io5";
import { PiCrown, PiFlowerTulip } from 'react-icons/pi';
import { links ,Navbar,HeroCarousel,HeroSideBanner} from '@/data/home';
import Link from 'next/link';
import { BsTelephone } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { HiArrowLongRight} from 'react-icons/hi2';

const HeroSection = () => {

    const [navbarClose,setnavbarClose] = useState(true)
    
    const categoriesIcon = [
        {id:1,icon:<CiUser />,title:'Candles'},
        {id:2,icon:<PiFlowerTulip />,title:'Handmade'},
        {id:3,icon:<FaHandHolding />,title:'Gifts Sets'},
        {id:4,icon:<CiFaceSmile />,title:'Plastic  Gifts'},
        {id:5,icon:<IoFootballOutline />,title:'Handy Cream'},
        {id:6,icon:<PiCrown />,title:'Cosmetics'},
        {id:7,icon:<GoGift />,title:'Silk Accessories'},
    ]

    const contactIcon = [
        {id:1,contact:'908.408.501.89',icon:<BsTelephone/>},
        {id:2,contact:'Find Store',icon:<CiLocationOn />}
    ]
  return (
    <div className='flex px-9 space-x-8'>
        {/* Side Navbar */}
      <div className='w-56 rounded-md'>
        <div className='py-3 bg-primary flex items-center space-x-3 px-6 rounded-t-md'>
            <div className='text-xl text-white' onClick={()=>setnavbarClose(!navbarClose)}><IoMenu /></div>
            <div className='text-base text-white font-semibold'>Categories</div>
        </div>
        {
            navbarClose && (
                <div className='py-2'>
            {categoriesIcon.map((icon, index) => (
                <div key={index} className='flex items-center space-x-3 py-2.5 hover:text-primary px-6'>
                    <div className='text-lg text-primary'>{icon.icon}</div>
                    <div className='text-sm'>{icon.title}</div>
                </div>
            ))}
            <div className='w-full bg-grey px-6 py-4 rounded-b-md'>
                {links.map((links,index)=>(
                    <div key={index} className='space-y-6'>
                        <Link href='/' className='text-xs font-bold hover:text-primary hover:border-b-2 transition-all duration-300'>{links.link}</Link>
                    </div>
                ))}
            </div>
        </div>
            )
        }
      </div>
      <div className='w-7xl'>
        {/* Navbar */}
        <div className='flex justify-between items-end'>
        <div className='flex  space-x-12 items-end'>
            {
                Navbar.map((navbar, index) => (
                    <div className="relative group" key={index}>
                    <div  className="text-sm font-bold hover:text-primary flex items-end pb-2">
                      <Link href={navbar.href}>{navbar.link}</Link>
                      {navbar.subtitle && <span className="text-sm text-grey-500"><IoChevronDownSharp /></span>}
                    </div>
                    {   navbar.subtitle &&
                        <div className="absolute left-0 w-52 bg-white border-t-2 border-t-primary invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 shadow-lg z-50 p-4 rounded-b-md">
                        {navbar.subtitle.map((el,index)=>(
                                <div className="p-2 hover:translate-x-1.5 transition duration-300 hover:text-primary" key={index}>{el.link}</div>  
                            ))
                        }
                       </div>
                    }
                  </div>
                  
                ))
            }
        </div>
        <div className='flex items-center space-x-14'>
        {
                contactIcon.map((contact, index) => (
                    <div className='flex items-center space-x-2' key={index}>
                        <div className='text-primary'>{contact.icon}</div>
                        <div className='text-sm font-bold'>{contact.contact}</div>
                    </div>
                ))
            }
        </div>
        </div>

        {/* Carousel */}
        <div className='flex space-x-6 py-6'>
        <div className='flex items-center relative w-[832px]'>
            <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            pagination={{
            clickable: true,
            }}
            >
                {
                    HeroCarousel.map((carousel,index)=>(
                        <SwiperSlide className='relative' key={index}>
                                <Image src={carousel.image} alt={carousel.title} className='object-cover w-full rounded-md'/>
                                <div className='absolute top-1/4 px-14 '>
                                    <h1 className='text-primary text-lg'>Accessories</h1>
                                    <div className='text-5xl font-bold leading-tight'>
                                        <div className='flex items-center relative space-x-2'>
                                        <span>Up To</span>
                                        <div className='relative z-50'>
                                        <span className=' text-primary z-50'> {carousel.title}</span>
                                        <div className='bg-theme h-2 absolute inset-12 left-0 w-full -z-10'></div>     
                                        </div>
                                        </div>
                                        <span className='block'>latest Creations</span>
                                    </div>
                                    <button className='py-3 px-8 bg-white rounded-md my-4 flex items-center space-x-4'>
                                        <Link href='/' className='text-sm font-semibold'>Shop Now</Link>
                                        <span className='text-xl'><HiArrowLongRight /></span>
                                    </button>
                                </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
           
        </div>
        <div className='space-y-6'>
                {
                    HeroSideBanner.map((banner,index)=>(
                        <div className='relative overflow-hidden rounded-md' key={index}>
                            <Image src={banner.image} alt={banner.title} className='rounded-md hover:scale-105 transition-all duration-300'/>
                            <div className='absolute top-0 px-7 py-7 w-3/4 space-y-1'>
                                <h1 className='text-primary text-base'>{banner.subTitle}</h1>
                                <h2 className='text-xl font-bold'>{banner.title}</h2>
                            </div>
                        </div>
                    ))
                }
        </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
