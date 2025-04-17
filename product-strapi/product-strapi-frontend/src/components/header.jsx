"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const pathname = usePathname();
  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Product', path: '/product' },
    { name: 'Profile', path: '/profile' },
    { name: 'Category', path: '/category' },
  ];

  return (
    <div className="w-64 bg-gray-100 min-h-screen border-r border-gray-200 py-4 px-3 flex flex-col">
      <h1 className="text-lg font-semibold text-gray-700 mb-6">Navigation</h1>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.path}
            className={`block py-2 px-4 rounded-md transition duration-150 ease-in-out ${
              pathname === link.path
                ? 'bg-gray-200 text-gray-800'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header