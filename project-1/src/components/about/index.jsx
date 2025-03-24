import React from 'react'
import img1 from '../../../public/images/img1.jpg'
import img2 from '../../../public/images/img2.jpg'
import Image from 'next/image'

const About = () => {
  return (
    <div className='mt-24 w-full h-full'>
        <div className='text-center w-3/5 mx-auto flex justify-content-center flex-col'>
            <h1 className='bg-[#F5F6E4] text-[#5b74a7] text-center w-1/6 py-4 mx-auto text-xs font-semibold mb-5'>ABOUT US</h1>
            <div className='text-6xl font-semibold '>CREATE YOUR STORY IN A PLACE <div className='inline relative'>
                <div className='bg-[#e3ef53] w-[95%] h-[22%] absolute bottom-4 left-2 -z-50'></div>
                <span>WHERE DREAMS</span>
                </div> AND REALITY MERGE.</div>
        </div>

        {/* div second to flex the boxes */}
        <div className='flex justify-between mx-28 my-10'>

            {/* box-1 */}
            <div className='relative h-[305px] w-[340px] bg-black text-white p-12'>
                <div className='bg-[#F5F6E4] w-[100px] h-[100px] absolute -top-8 -left-8 -z-50'> </div>
                <div>
                    <h1 className='underline underline-offset-2 text-xl font-semibold'>OUR MISSION :</h1>
                    <p className='pt-4 text-base leading-7'>  <span className='underline underline-offset-2 text-[#e3ef53]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span> do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est ante in nibh mauris cursus mattis molestie a iaculis.</p>
                </div>
            </div>

            {/* box-2 */}
            <div className='w-1/2'>
                <div className='py-5  px-8 bg-[#e3ef53] font-semibold w-1/3 mx-auto text-md text-center'>
                    Contact Our Agent
                </div>
                <div className='mt-24 px-28'>
                    <Image src={img1}  alt='background' className='mx-auto'></Image>
                </div>
            </div>

            {/* box-3 */}
            <div  className='relative h-[305px] w-[340px] p-12  bg-[#F5F6E4]'>
                <div className='absolute -right-25 -top-24 -z-50 '>
                    <Image src={img2}  alt='background'></Image>
                </div>
                <div>
                <h1 className='underline underline-offset-2 text-xl font-semibold'>OUR VISSION :</h1>
                <p className='pt-4 text-base leading-7'>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='underline underline-offset-2 font-semibold'> Est ante in nibh mauris cursus mattis molestie a iaculis.</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
