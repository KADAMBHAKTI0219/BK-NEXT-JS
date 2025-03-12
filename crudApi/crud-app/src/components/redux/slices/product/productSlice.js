import { createSlice } from "@reduxjs/toolkit";
import { getProducts, addProducts, getSingleProductData, deleteProducts, updateProduct } from "./productThunks";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    singleProduct: null, 
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      })
      

      .addCase(addProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); 
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add product";
      })

      .addCase(getSingleProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch product details";
      })

      .addCase(deleteProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete product";
      })

      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); 
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add product";
      })
  },
});

export default productSlice.reducer;
