"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { makestore } from './store'

const Providers = ({children}) => {
    const store = makestore()
  return (
    <>
        <Provider store={store}>{children}</Provider>
    </>
  )
}

export default Providers
