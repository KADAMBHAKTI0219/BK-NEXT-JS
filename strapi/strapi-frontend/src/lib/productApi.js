import axios from "axios";

const API_URL = "http://localhost:1337/api/products?populate=*";

export const getProducts = async () => {
    try {
        const res = await axios.get(API_URL);
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

