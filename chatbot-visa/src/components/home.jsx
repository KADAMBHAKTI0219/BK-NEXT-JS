"use client"
import React from 'react'
import Chatbot from './chatbot'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center p-10 h-screen bg-gray-100 text-4xl font-bold text-gray-800'>
      Welcome to Visa Website
      <Chatbot/>
    </div>
  )
}

export default HomePage
