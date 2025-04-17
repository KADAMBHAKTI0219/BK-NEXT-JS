"use client"
import { registerUserData } from '@/lib/authApi'
import React from 'react'

const Register = () => {
     const handleSubmit=(e)=>{
          e.preventDefault()
          const formData = new FormData(e.target)
          const data = Object.fromEntries(formData.entries())
          registerUserData(data)
        }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <div onSubmit={(e)=>handleSubmit(e)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>
          <button
            type="button"
            onClick={(e)=>handleSubmit(e)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register