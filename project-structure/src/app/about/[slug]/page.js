
import AboutDetail from '@/components/about/aboutDetail';
import { aboutData } from '@/data/about/aboutData';
import React, { Suspense } from 'react'
import Loading from '../loading';

const page = async({params}) => {
    const {slug} =await params;
    const project = aboutData.find((el)=>el.slug === slug)
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <AboutDetail aboutData={project}/>
        </Suspense>
    </div>
  )
}

export default page
