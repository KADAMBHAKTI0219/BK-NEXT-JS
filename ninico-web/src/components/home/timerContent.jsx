'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import floded01 from '../../../public/assets/images/floded01.png'

const TimerContent = () => {
    const targetDate = new Date("2024-10-20T23:59:59"); // Set your target date here
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference >= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);




  return (
    <div className='mx-9 bg-grey-600 '>
     <div className='flex max-w-7xl mx-auto justify-between py-10 items-center space-x-8'>
     <div className='w-1/2 ps-18 relative'>
        <Image src={floded01} alt='floaded1 relative'></Image>
        <div className='bg-primary h-20 w-20 text-center rounded-full absolute top-20 right-40 text-white text-sm py-4'>From <span className='block text-xl font-bold'>$49</span></div>
      </div>
      <div className='w-3/5 space-y-4'>
      <div className='text-2xl flex font-bold'>
        <h1 className='text-primary'>$49.00</h1>
        <strike className='text-grey-500 '>$59.00</strike>
      </div>
      <div className='text-5xl font-bold'>Pro2 Abstract Folded Pots</div>
      <div className='text-text-grey text-[17px] leading-7'>Elegant pink origami design three-dimensional view and decoration co-exist. Great for adding a decorative touch to any room’s decor. Wonderful accent piece for coffee tables or side tables.</div>
      <div  className='w-full h-1.5 bg-white rounded-lg relative my-8'><div className='bg-primary w-3/4 h-full absolute inset-0 rounded-lg'></div></div>
        <div className='flex items-center py-2'>
            <div className='flex items-center space-x-4'>
                <div className='bg-white text-center h-24 w-20 py-3 rounded'><span className='text-4xl font-bold'>{timeLeft.days}</span><span className='text-base text-text-grey block'>Days</span></div>
                <div className='bg-white text-center h-24 w-20 py-3 rounded px-2'><span className='text-4xl font-bold'>{timeLeft.hours}</span><span className='text-base text-text-grey block'>Hours</span></div>
                <div className='bg-white text-center h-24 w-20 py-3 rounded px-2'><span className='text-4xl font-bold'>{timeLeft.minutes}</span><span className='text-base text-text-grey block'>Minutes</span></div>
                <div className='bg-white text-center h-24 w-20 py-3 rounded px-2'><span className='text-4xl font-bold'>{timeLeft.seconds}</span><span className='text-base text-text-grey block'>Seconds</span></div>

            </div>
            <div className='text-text-grey w-1/3 px-10'>
                Remians until the end of the offer
            </div>
        </div>

      </div>
     </div>
    </div>
  )
}

export default TimerContent
