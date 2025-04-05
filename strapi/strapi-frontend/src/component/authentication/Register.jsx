'use client'
import { register } from '@/lib/authApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const Register = () => {
    const registerUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const router = useRouter();

        try {
            const response = register(data)  
            router.push('/login')
            console.log(response); 
        } catch (error) {
            console.error('Error:', error);
        }
    }
  return (
    <div>
        <form onSubmit={registerUser} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black">
        <h1 className="text-center text-3xl py-10">Register</h1>
        <label htmlFor="username" className="block text-gray-700 font-medium">Username:</label>
        <input type="text" name="username" id="username" className="block w-full
    px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

        <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
        <input type="email" name="email" id="email" className="block w-full
        px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

        <label htmlFor="password" className="block text-gray-700 font-medium">Password:</label>
        <input type="password" name="password" id="password" className="block w-full
        px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">Register</button>
        <p className="text-center text-gray-600 mt-4">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
        </form>
    </div>
  )
}

export default Register
