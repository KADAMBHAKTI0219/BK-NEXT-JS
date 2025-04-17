// components/Layout.js
import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Header />
      <main className="flex-1 bg-gray-50 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;