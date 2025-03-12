import { createAsyncThunk } from "@reduxjs/toolkit";
import { Base_Url } from "../../../data/constant";
import axios from "axios";


export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Base_Url}/productData/get`);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data || "An error occurred while fetching products.");
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${Base_Url}/productData/delete/${id}`);
      return id; 
    } catch (error) {
      console.error("Error deleting product:", error);
      return rejectWithValue(error.response?.data || "An error occurred while deleting the product.");
    }
  }
);

export const addProducts = createAsyncThunk(
  "product/addProducts",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${Base_Url}/productData/create`, formData);
      return response.data?.data;
    } catch (error) {
      console.error("Error creating product:", error);
      return rejectWithValue(error.response?.data || "An error occurred while creating the product.");
    }
  }
);


export const getSingleProductData = createAsyncThunk(
  "product/getSingleProductData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Base_Url}/productData/get/${id}`);
      return response.data?.data;
    } catch (error) {
      console.error("Error fetching single product:", error);
      return rejectWithValue(error.response?.data || "An error occurred while fetching the product.");
    }
  }
);


export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${Base_Url}/productData/update/${id}`, formData);
      return response.data?.data;
    } catch (error) {
      console.error("Error updating product:", error);
      return rejectWithValue(error.response?.data || "An error occurred while updating the product.");
    }
  }
);
