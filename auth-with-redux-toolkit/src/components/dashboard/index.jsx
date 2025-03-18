"use client"
import React from 'react'

const Dashboard = () => {
    const card = [
        {id:1,title:"Card 1", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 1'},
        {id:2,title:"Card 2", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 2'},
        {id:3,title:"Card 3", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 3'},
        {id:4,title:"Card 4", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 4'},
        {id:5,title:"Card 5", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 5'},
        {id:6,title:"Card 6", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 6'},
        {id:7,title:"Card 7", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 7'},
        {id:8,title:"Card 8", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 8'},
        {id:9,title:"Card 9", description:' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, iste 9'}
    ]
  return (
    <div className='w-full'>
        <div className='text-center text-3xl font-bold'>
            DashBoard
        </div>
        <div className='max-w-7xl py-8  m-auto grid grid-cols-3 gap-8'>
            {
                card.map((items,index)=>(
                    <div
                    className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow"
                    key={index}
                  >
                    <h3 className="text-lg font-semibold text-gray-700">{items.id}</h3>
                    <h2 className="text-xl font-bold text-gray-900">{items.title}</h2>
                    <p className="text-gray-600">{items.description}</p>
                  </div>
                  
                ))
            }
        </div>
        
    </div>
  )
}

export default Dashboard
