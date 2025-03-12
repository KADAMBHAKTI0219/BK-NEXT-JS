"use client"

import { configureStore } from "@reduxjs/toolkit"
import productReducer from './slices/product/productSlice'

export const store = configureStore({
    reducer: {
        product: productReducer
    }
});


export default store;
