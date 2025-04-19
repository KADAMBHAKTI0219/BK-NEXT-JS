"use client"
import { signup } from '@/redux/slices/authentication/authSlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const router = useRouter();
    const dispatch = useDispatch();
    const onSubmit = (data)=>{
        dispatch(signup(data))
        router.push('/signin')
    }



  return (
    <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
        inventore quaerat mollitia?
        </p>

        <form action="#" className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-lg font-medium">Sign Up to your account</p>

        <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
        <input
        type="email"
        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
        placeholder="Enter email"
        {...register('email',{required:'Email is Required'})  }
        />
         {errors.email && <p className='text-red-700 text-xl'>{errors.email.message}</p>}

        </div>
        </div>

        <div>
        <label htmlFor="password" className="sr-only">Password</label>

        <div className="relative">
        <input
        type="password"
        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
        placeholder="Enter password"
        {...register('password',{required:"Password is Required",minLength:{value:6,message:'Password must be at least 6 characters'}})  }
        />
        {errors.password && <p className='text-red-700 text-xl'>{errors.password.message}</p>}
        </div>
        </div>

        <div>
        <label htmlFor="City" className="sr-only">Email</label>

        <div className="relative">
        <input
        type="text"
        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
        placeholder="Enter City"
        {...register('city',{required:'City is Required'})  }
        />
        </div>
        </div>


        <button
        type="submit"
        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
        Sign in
        </button>

        <p className="text-center text-sm text-gray-500">
        No account?
        <a className="underline" href="#">Sign up</a>
        </p>
        </form>
        </div>
        </div>
    </div>
  )
}

export default SignUp
