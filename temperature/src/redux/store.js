import { configureStore } from "@reduxjs/toolkit"
import temperatureReducer from "./slices/temperatureSlice"

export const makestore=()=>{
    return configureStore({
        reducer:{
            temperature:temperatureReducer
        }
    })
}