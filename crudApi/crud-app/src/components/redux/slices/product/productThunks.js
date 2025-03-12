import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5000/productData"; // Replace with your API

// Async Thunks for CRUD operations

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data.data;
});

// Create a new product
export const createProduct = createAsyncThunk("products/create", async (product) => {
  const response = await axios.post(`${API_URL}/create`, product);
  return response.data.data;
});

// Update a product
export const updateProduct = createAsyncThunk("products/update", async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/update/${id}`, data);
  return response.data.data;
});

// Delete a product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});