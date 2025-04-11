'use client'
import React from 'react'
import HeroSection from './hero'
import CategoryHome from './categoryhome'
import Product from './Product'
import TimerContent from './timerContent'
import Contact from './conatct'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <CategoryHome/>
      <Product/>
      <TimerContent/>
      <Contact/>
    </>
  )
}

export default Home
