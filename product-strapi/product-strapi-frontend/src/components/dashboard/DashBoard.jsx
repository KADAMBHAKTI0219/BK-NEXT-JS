"use client"
import { getDashboard } from '@/lib/dashboardApi'
import React, { useEffect, useState } from 'react'

const DashBoard = () => {
  const [dashboard,setDashboard] = useState([])
  useEffect(()=>{
   getDashboard().then(res=>setDashboard(res)).catch(err=>console.log(err))
  },[])
  return (
   <div>
    <div className='text-3xl bg-gray-200 w-md text-center p-5'>
      Product Count
      {dashboard.productCount}
    </div>
    <div className='text-3xl bg-gray-200 w-md text-center p-5'>
      Category Count
      {dashboard.categoryCount}
    </div>
    <div className='text-3xl bg-gray-200 w-md text-center p-5'>
     Low Stock Alert
      {dashboard.stockCountless10}
    </div>
   </div>
  )
}

export default DashBoard
