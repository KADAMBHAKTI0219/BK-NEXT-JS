"use client"
import { convertCelsius, convertFahrenheit } from '@/redux/slices/temperatureSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Temperature = () => {
    const { celsius, fahrenheit } = useSelector(state => state.temperature)
    const dispatch = useDispatch()

    // Separate states for Celsius and Fahrenheit inputs
    const [temp, setTemp] = useState(0)

    const handleTemperature = (e) => {
        e.preventDefault()
        dispatch(convertCelsius(temp))
        dispatch(convertFahrenheit(temp))
    }


    return (
        <div className='h-screen w-full text-center'>
            <div className='w-96 m-auto bg-white text-black p-8 rounded-2xl space-y-4 my-50'>
            <h1>Celsius: {celsius}°C</h1>
            <h1>Fahrenheit: {fahrenheit}°F</h1>
            <form onSubmit={handleTemperature} className='space-y-4'>
                <input 
                    type="number" 
                    placeholder="Enter a Temperature" 
                    onChange={(e) => setTemp(parseFloat(e.target.value) || 0)}
                    className='px-4 py-2'
                />
                <button type="submit" className='block bg-blue-700 p-2 rounded-lg m-auto'>Submit</button>
            </form>

            </div>
            
           
        </div>
    )
}

export default Temperature
