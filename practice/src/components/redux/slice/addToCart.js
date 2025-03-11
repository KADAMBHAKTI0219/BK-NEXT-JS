import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
    name: "addToCart",
    initialState: {
        cart: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProductToCart(state, action) {
            state.cart.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price;
            },
            removeProductFromCart(state, action) {
                state.cart = state.cart.filter(item => item.id !== action.payload.id);
                state.quantity -= 1;
                state.total -= action.payload.price;
            }
    }
})

export const {addProductToCart , removeProductFromCart} = addToCartSlice.actions
export default addToCartSlice.reducer;