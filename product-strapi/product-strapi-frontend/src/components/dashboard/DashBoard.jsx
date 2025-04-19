"use client"
import { getDashboard } from '@/lib/dashboardApi'
import React, { useEffect, useState } from 'react'
import Layout from '../layout'
const DashBoard = () => {
  const [dashboard,setDashboard] = useState([])
  useEffect(()=>{
   getDashboard().then(res=>setDashboard(res)).catch(err=>console.log(err))
  },[])
  return (
     <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
      <div className="bg-green-700 text-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
        <h3 className="text-xl font-semibold ">Product Count</h3>
        <p className="text-3xl ">{dashboard.productCount || 0}</p>
      </div>
      <div className="bg-blue-700 text-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
        <h3 className="text-xl font-semibold 0">Category Count</h3>
        <p className="text-3xl ">{dashboard.categoryCount || 0}</p>
      </div>
      <div className="bg-red-700 text-white bg-opacity-90 rounded-lg shadow-lg p-6 text-center">
        <h3 className="text-xl font-semibold ">Low Stock Alert</h3>
        <p className="text-3xl">{dashboard.stockCountless10 || 0}</p>
      </div>
     </div>
     </Layout>
  )
}

export default DashBoard
