"use client"
import React from 'react'

const Dashboard = () => {
    const cardData = [
        {id:1,title:'Card 1',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:2,title:'Card 2',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}, 
        {id:3,title:'Card 3',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:4,title:'Card 4',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:5,title:'Card 5',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:6,title:'Card 6',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:7,title:'Card 7',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:8,title:'Card 8',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:9,title:'Card 9',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:10,title:'Card 10',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:11,title:'Card 11',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
        {id:12,title:'Card 12',description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},

    ]
  return (
    <div>
      {
        cardData.map((item,index)=>(
            <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </div>
        ))
      }
    </div>
  )
}

export default Dashboard
