import axios from "axios";

const API_URL = "http://localhost:1337/api/products";

export const getProducts = async () => {
    try {
        const res = await axios.get(API_URL + "?populate=*");
        if (res.status !== 200) {
            throw new Error("Failed to fetch products");
        }
        return res.data.data;
    } catch (err) {
        console.error("Error fetching products:", err);
        return null;
    }
};

export const getProductById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data.data;  
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        return null;
    }
}
export const createProduct = async (productData) => {
    try {
        const res = await axios.post(API_URL, productData, { 
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data.data;
    } catch (err) {
        console.error("❌ Error creating product:", err.response?.data || err);
        return null;
    }
};


export const updateProduct = async (id, productData) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, productData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(" Product updated:", res.data);
        return res.data;
    } catch (err) {
        console.error(" Error updating product:", err.response?.data || err);
        return null;
    }
};


export const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);

        if (res.status === 200 || res.status === 204) { 
            console.log(` Product with ID ${id} deleted successfully.`);
            return true; 
        } else {
            console.error(" Unexpected response:", res);
            return false;
        }
    } catch (err) {
        console.error(" Error deleting product:", err);
        return false; 
    }
};

