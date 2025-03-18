const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        discount:0,
        total:0
    },
    reducers:{
        addProduct : (state,{payload})=>{
          const existingItems = state.cart.find((item)=>item.id === payload.id)
          if(existingItems){
            existingItems.quantity += payload.quantity
            }
            else{
                state.cart.push(payload)
            }
            state.total += payload.price;
            state.discount= state.total >100 ? state.total * 0.1 : 0;
        },

        removeProduct :(state,{payload})=>{
            const index = state.cart.findIndex((item)=>item.id === payload.id)
            if(index !== -1){
                const items = state.cart[index]
                state.total = state.total - (items.price * items.quantity);
                state.cart.splice(index,1)
            }
            state.discount= state.total >100 ? state.total * 0.1 : 0;
        }
    }
})

export const {addProduct,removeProduct} = cartSlice.actions
export default cartSlice.reducer