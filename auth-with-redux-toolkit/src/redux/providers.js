"use client"
import React from 'react'
import { makeStore } from './store'
import { Provider } from 'react-redux'

const Providers = ({children}) => {
    const store = makeStore()
  return (
   <Provider store={store}>{children}</Provider>
  )
}

export default Providers
