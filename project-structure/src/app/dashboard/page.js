import Dashboard from '@/components/dashoboard'
import { Suspense } from 'react'
import Loading from './loading'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loading/>}>
            <Dashboard/>
            </Suspense>
    </div>
  )
}

export default page
