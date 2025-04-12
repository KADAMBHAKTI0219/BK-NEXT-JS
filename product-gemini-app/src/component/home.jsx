'use client'
import React from 'react'
import ChatBot from './chatbot'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';

const HomePage = () => {
   const { data: session } = useSession();
  return (
    <div className='flex flex-col items-center p-10 h-screen bg-gray-100 text-4xl font-bold text-gray-800'>
      Welcome to Home Page
      {session ? (
                <button
                  onClick={() => signOut()}
                  className="text-sm bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm bg-green-500 px-2 py-1 rounded-lg hover:bg-green-600"
                >
                  Login
                </Link>
              )}
      <ChatBot/>
    </div>
  )
}

export default HomePage
