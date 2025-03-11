import { createSlice } from "@reduxjs/toolkit";

const savedCount = typeof window !== "undefined" ? localStorage.getItem("count") : null;
export const counterSlice = createSlice({
    name: 'counter',
    initialState:{
        value: savedCount ? savedCount : 0,
    },
    reducers:{
        increment:(state)=>{
           if(state.value){
            state.value++;
            localStorage.setItem("count", state.value);
           }
           else{
            state.value=1;
           }

        },
        decrement:(state)=>{
            state.value -=1;
            if(state.value< 0){
                state.value = 0;
                alert('negative value')
            }
            else{
                localStorage.setItem("count",state.value);
            }
        }
    }
})

export const {increment,decrement} = counterSlice.actions
export default counterSlice.reducer;