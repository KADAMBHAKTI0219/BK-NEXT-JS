'use client';
import { login } from '@/lib/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const GITHUB_AUTH_URL = "http://localhost:1337/api/connect/github/redirect";
const GOOGLE_AUTH_URL = 'http://localhost:1337/api/connect/google/redirect';

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
    <div>
      <form
        onSubmit={loginUser}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black"
      >
        <h1 className="text-center text-3xl py-10">Login</h1>

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

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <button onClick={handleGithubLogin} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
        Login with GitHub
        </button>

        <button onClick={handleGoogleLogin}
        className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
         Login With  Google
        </button>
      </form>
    </div>
  );
};

export default Login;

