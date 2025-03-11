

import Counter from '@/components/counter'
import Providers from '@/components/redux/providers'
import React from 'react'

const page = () => {
  return (
    <div>
        <Providers>
            <Counter/>
      </Providers>
    </div>
  )
}

export default page
