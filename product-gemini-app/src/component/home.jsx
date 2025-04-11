'use client'
import React from 'react'
import ChatBot from './chatbot'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center p-10 h-screen bg-gray-100 text-4xl font-bold text-gray-800'>
      Welcome to Home Page
      <ChatBot/>
    </div>
  )
}

export default HomePage
