"use client"

import { configureStore } from "@reduxjs/toolkit"
import productReducer from './slices/product/productSlice'
import themeReducer from './slices/themeSwitcher/themeSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        theme:themeReducer,
    }
});


export default store;
