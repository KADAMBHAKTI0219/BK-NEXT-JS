import React from 'react'

const CompHeading = ({text="Top",hoverText='Product'}) => {
  return (
    <div>
      <div className='text-2xl py-10'>
          <div className='flex items-center relative space-x-2'>
          <span className='font-bold'>{text}</span>
          <div className='relative z-50'>
          <span className=' text-primary z-50'>{hoverText}</span>
          <div className='bg-primary/10 h-2 absolute inset-6 left-0 w-full -z-10'></div>     
          </div>
          </div>
        </div>
    </div>
  )
}

export default CompHeading
