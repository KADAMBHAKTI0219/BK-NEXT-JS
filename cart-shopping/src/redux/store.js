import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"


export const makestore = ()=>{
  return configureStore({
    reducer:{
        cart:cartReducer
    }
  })
}