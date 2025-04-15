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
    <div>
       <form action="" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor='username'>User Name</label>
        <input type='text' id='username' name='username'/><br />
        <label htmlFor='email'>Email</label>
        <input type="email" id='email'  name='email'/><br />
        <label htmlFor='password'>Password</label>
        <input type="password" name="password" id="password" /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
