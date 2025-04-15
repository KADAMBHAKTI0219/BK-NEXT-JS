const PRODUCTS_API_URL = "http://localhost:1337/api/products";
import axios from "axios";

export const getProducts = async () => {
  try {
    const getProductsData = await axios.get(`${PRODUCTS_API_URL}?populate=*`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Products fetched successfully:", getProductsData.data.data);
    return getProductsData.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const getProductData = await axios.get(
      `${PRODUCTS_API_URL}/${id}?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Product fetched successfully:", getProductData.data);
    return getProductData.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    console.log('Posting to:', PRODUCTS_API_URL );
    const token = localStorage.getItem('jwt')
    console.log(token)
    // Debug FormData to verify structure
    for (const [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value instanceof File ? value.name : value);
    }
    const response = await axios.post(PRODUCTS_API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is set
        // Let axios set Content-Type automatically for FormData
      },
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error response:', error.response?.data);
    throw new Error(error.response?.data?.error?.message || 'Failed to create product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const updateProductData = await axios.put(
      `${PRODUCTS_API_URL}/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Product updated successfully:", updateProductData.data);
    return updateProductData.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const deleteProductData = await axios.delete(`${PRODUCTS_API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Product deleted successfully:", deleteProductData.data);
    return deleteProductData.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};