const { default: axios } = require("axios");


const BACKEND_URL = "http://localhost:9090/product";


export const createProduct = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        };
        const createResponse = await axios.post(`${BACKEND_URL}/create`, formData, config);
        console.log("Product created successfully:", createResponse.data);
        return createResponse.data;
    } catch (error) {
        console.error("Product Creation Error:", error.response?.data?.message || error.message);
        throw error; // Re-throw to allow calling code to handle it
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const getResponse = await axios.get(`${BACKEND_URL}/get`);
        console.log("Products retrieved successfully:", getResponse.data);
        return getResponse.data;
    } catch (error) {
        console.error("Product Get Error:", error.response?.data?.message || error.message);
        throw error; // Re-throw to allow calling code to handle it
    }
};

// Get a single product by ID
export const getProductById = async (id) => {
    try {
        const getResponse = await axios.get(`${BACKEND_URL}/get/${id}`);
        console.log("Product retrieved successfully:", getResponse.data);
        return getResponse.data;
    } catch (error) {
        console.error("Product Get Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Update a product (supports file upload via FormData)
export const updateProduct = async (id, formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Required for file uploads
            },
        };
        const updateResponse = await axios.put(`${BACKEND_URL}/update/${id}`, formData, config);
        console.log("Product updated successfully:", updateResponse.data);
        return updateResponse.data;
    } catch (error) {
        console.error("Product Update Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    try {
        const deleteResponse = await axios.delete(`${BACKEND_URL}/delete/${id}`);
        console.log("Product deleted successfully:", deleteResponse.data);
        return deleteResponse.data;
    } catch (error) {
        console.error("Product Delete Error:", error.response?.data?.message || error.message);
        throw error;
    }
};

export default {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};