import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import addToCarReducer from "./slice/addToCart";
import toDoListReducer from "./slice/toDoList";

export const makeStore = ()=>{
    return  configureStore({
        reducer: {
            counter:counterReducer,
            addToCart:addToCarReducer,
            toDoList:toDoListReducer,
        }
    })
}