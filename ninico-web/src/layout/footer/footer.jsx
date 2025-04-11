import React from 'react'
import logo from '../../../public/assets/images/logo.png'
import fgoogle from '../../../public/assets/images/Footer/fgoogle.jpg'
import fapp from '../../../public/assets/images/Footer/fapp.jpg'
import fbrandicon01 from '../../../public/assets/images/Footer/fbrandicon01.png'
import { FaBehance, FaDribbble, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { BsTelephone } from 'react-icons/bs';

const Footer = () => {
  const footerData = [
    {
      title: "Information",
      links: ["Custom Service", "FAQs", "Ordering Tracking", "Contacts", "Events"],
    },
    {
      title: "My Account",
      links: [
        "Delivery Information",
        "Privacy Policy",
        "Discount",
        "Custom Service",
        "Terms Condition",
      ],
    },
    {
      title: "Social Network",
      links: [
        { name: "Facebook", icon: <FaFacebookF /> },
        { name: "Dribbble", icon: <FaDribbble /> },
        { name: "Twitter", icon: <FaTwitter /> },
        { name: "Behance", icon: <FaBehance /> },
        { name: "Youtube", icon: <FaYoutube /> },
      ],
    },
  ];
  
  return (
    <div className='w-full'>
       <footer className='px-9 bg-grey-600'>
        <div className='flex justify-between border-b border-grey-500 py-10'>
           <div className='w-1/5 space-y-6'>
           <Image src={logo} alt='logo'></Image>
            <div className='text-base text-text-grey'>
            Elegant pink origami design three
            dimensional view and decoration co-exist.
            Great for adding a decorative touch to
            any room’s decor.
            </div>
           </div>
           <div className='grid grid-cols-3 gap-18'>
           {footerData.map((section, index) => (
          <div key={index} >
            <h3 className="font-bold text-base mb-3 underline">{section.title}</h3>
            <ul className="text-gray-600">
              {section.links.map((item, idx) =>
                typeof item === "string" ? (
                  <li key={idx} className="mb-2 hover:text-primary hover:ps-4 transition-all duration-150 cursor-pointer">
                    {item}
                  </li>
                ) : (
                  <li key={idx} className="mb-2 flex items-center gap-3 hover:text-primary hover:ps-4 transition-all duration-150">
                    {item.icon} {item.name}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
           </div>

           <div className='w-1/4'>
          <h3 className="font-bold text-base underline mb-3">Get Newsletter</h3>
          <p className="text-gray-600 mb-3">Get on the list and get 10% off your first order!</p>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full p-4  border border-gray-300 rounded mb-3 text-xs"
          />
          <button className="bg-primary text-white w-1/2 p-2 rounded ">
            Subscribe Now →
          </button>
        </div>
        </div>
        <div className='flex justify-between py-6'>
          <div className='flex items-center space-x-4'>
            <div className='h-12 w-12 bg-white shadow-md rounded-full py-3 px-2'><div><BsTelephone size={24}/></div></div>
            <div><span className='text-xl font-bold'>980. 029. 666 .99</span> <span className='block text-sm text-text-grey'>Working 8:00 - 22:00</span></div>
          </div>
          <div className='flex items-center space-x-4'>
            <div><span className='text-lg font-bold'>Download App on Mobile</span><span className='block text-sm text-text-grey'>15% discount on your first purchase</span></div>
            <div className='flex space-x-2'><Image src={fgoogle} alt='fGoogle'/> <Image src={fapp} alt='fapp'/></div>
          </div>
        </div>
       
        </footer>
      <div className='flex justify-between items-center py-6 bg-grey-700 px-9'>
          <div className='text-text-grey'>Copyright 2025 <span className='font-bold text-black'>©Ninico.</span> All rights reserved. Developed by <span className='font-bold text-black'>AliThemes.</span></div>
          <div>
            <Image src={fbrandicon01} alt='brands'/>
          </div>
        </div>
    </div>
  )
}

export default Footer
