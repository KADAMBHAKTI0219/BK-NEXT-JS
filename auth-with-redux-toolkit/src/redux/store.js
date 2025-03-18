import authReducer from "./slices/authentication/authSlice"

const { configureStore } = require("@reduxjs/toolkit")

export const makeStore = ()=>{
    return configureStore({
        reducer:{
            auth:authReducer
        }
    })
}