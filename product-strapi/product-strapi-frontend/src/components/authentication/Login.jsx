"use client"
import { loginUserData } from '@/lib/authApi';
import React from 'react'

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    loginUserData(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='identifier'>Email</label>
        <input type="email" id='identifier' name='identifier' required /><br />
        
        <label htmlFor='password'>Password</label>
        <input type="password" name="password" id="password" required /><br />
        
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
