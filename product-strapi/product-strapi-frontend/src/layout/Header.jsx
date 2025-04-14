'use client';

import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';
import { MdDashboardCustomize, MdShoppingCart } from 'react-icons/md';
import ProductsList from '@/components/products/ProductsList';
import CategoryList from '@/components/category/CategoryList';
import DashBoard from '@/components/dashboard/DashBoard';
import Link from 'next/link';

const Header = () => {
  const linksData = [
    { id: 1, name: 'Dashboard', path: '/dashboard', icon: <FaHouseChimney /> },
    { id: 2, name: 'Products', path: '/product', icon: <MdShoppingCart /> },
    { id: 3, name: 'Category', path: '/category', icon: <MdDashboardCustomize /> },
    { id: 4, name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  const [activeLink, setActiveLink] = useState('dashboard');


  const renderContent = () => {
    switch (activeLink) {
      case '/product':
        return <ProductsList />;
      case '/category':
        return <CategoryList />;
      case '/dashboard':
        return <DashBoard />;
      case '/profile':
        return <div>Profile Component (Placeholder)</div>; // Replace with actual Profile component if available
      default:
        return <DashBoard />;
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className='w-64 bg-gray-100 p-6'>
        <h1 className='text-2xl font-semibold mb-6'>Navigation Bar</h1>
        <nav className='flex flex-col space-y-4'>
          {linksData.map((link) => (
            <Link
              key={link.id}
              href={setActiveLink(link.path)}
              className={`flex items-center space-x-4 text-xl font-semibold p-2 rounded-md ${
                activeLink === link.path ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
              }`}
            >
              <span className='text-2xl'>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex flex-col w-full'>
        {/* Top Header */}
        <div className='h-20 bg-gray-200 px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>DashBoard</h1>
          <div className='flex items-center space-x-4'>
            <img
              src='https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg'
              alt='Profile'
              className='h-12 w-12 rounded-full'
            />
            <h1 className='text-xl font-semibold'>Kadam Bhakti</h1>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className='p-6'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Header;