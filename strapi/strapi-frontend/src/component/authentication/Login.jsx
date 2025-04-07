'use client';
import { login } from '@/lib/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoLogoGithub } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";

const GITHUB_AUTH_URL = "http://localhost:1337/api/connect/github?redirect_uri=http://localhost:3000/connect/github/redirect";

const GOOGLE_AUTH_URL = 'http://localhost:1337/api/connect/google?redirect_uri=http://localhost:3000/connect/google/redirect';


const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const loginUser = await login(data);
        console.log(loginUser)
        router.push('/product');
    } catch (error) {
      console.error('Error:', error);
      const errorMsg =
        error?.response?.data?.error?.message || 'Login failed. Try again.     ';
      alert(errorMsg); 
    } finally {
      setLoading(false);
    }
  };


  const handleGithubLogin = () => {
    window.location.href = GITHUB_AUTH_URL;
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };


  return (
    <div  className="max-w-md mx-auto mt-30 bg-white p-6 rounded-lg shadow-md space-y-4 text-black">
      <form
        onSubmit={loginUser}
       className='space-y-4'
      >
        <h1 className="text-center text-3xl">Login</h1>

      <div>
      <label htmlFor="identifier" className="block text-gray-700 font-medium">
          Email:
        </label>
        <input
          type="text"   
          name="identifier"
          id="identifier"
          className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

       <div>
       <label htmlFor="password" className="block text-gray-700 font-medium">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
       </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mt-4"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <button onClick={handleGithubLogin} className="w-full border-2  font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2">
      <span className='text-xl'> <IoLogoGithub /></span> <span> Login With Github</span>
        </button>

        <button onClick={handleGoogleLogin}
        className="w-full border-2 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2">
         <span className='text-xl '> <FaGoogle /></span> <span> Login With Google</span>
        </button>
    </div>
  );
};

export default Login;

