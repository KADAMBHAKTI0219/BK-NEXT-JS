'use client'
import About from '@/components/about'
import React, { useEffect, useState } from 'react'

const Loading = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        },6000)
        return () => clearTimeout(timer)
    },[])
    return loading ? <div>Loading...</div> : <About/>
}

export default Loading
