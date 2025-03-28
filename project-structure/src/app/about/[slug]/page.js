import AboutDetail from '@/components/about/aboutDetail';
import { aboutData } from '@/data/about/aboutData';
import React from 'react'

const page = async({params}) => {
    const {slug} =await params;
    const project = aboutData.find((el)=>el.slug === slug)
  return (
    <div>
        <AboutDetail aboutData={project}/>
    </div>
  )
}

export default page
