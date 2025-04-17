"use client"
import { getDashboard } from '@/lib/dashboardApi'
import React, { useEffect, useState } from 'react'
const DashBoard = () => {
  const [dashboard,setDashboard] = useState([])
  useEffect(()=>{
   getDashboard().then(res=>setDashboard(res)).catch(err=>console.log(err))
  },[])
  return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
   <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
     <h3 className="text-xl font-semibold text-gray-800">Product Count</h3>
     <p className="text-3xl text-gray-600">{dashboard.productCount || 0}</p>
   </div>
   <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
     <h3 className="text-xl font-semibold text-gray-800">Category Count</h3>
     <p className="text-3xl text-gray-600">{dashboard.categoryCount || 0}</p>
   </div>
   <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
     <h3 className="text-xl font-semibold text-gray-800">Low Stock Alert</h3>
     <p className="text-3xl text-gray-600">{dashboard.stockCountless10 || 0}</p>
   </div>
     </div>
  )
}

export default DashBoard
