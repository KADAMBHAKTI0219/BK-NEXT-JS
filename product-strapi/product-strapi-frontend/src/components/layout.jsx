// components/Layout.js
'use client';
import React from 'react';
import Header from './header';
import HeaderNav from './headerNav';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        <HeaderNav />
        <div className="mt-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
