import axios from "axios";

const API_URL = "http://localhost:1337/api/products";

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");
  console.log("Token:", token);
  if (!token) throw new Error("No JWT token found");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL + "?populate=*");
    if (res.status !== 200) throw new Error("Failed to fetch products");
    return res.data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return null;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}?populate=*`);
    console.log(res.data.data)
    return res.data?.data;
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    return null;
  }
};
export const createProduct = async (productData) => {
  try {
    const authHeaders = getAuthHeaders(); // assumes this adds Bearer token
    const res = await axios.post(`${API_URL}`, productData, {
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    });

    return res.data.data;
  } catch (err) {
    console.error("Error creating product:", err.response?.data || err);
    return null;
  }
};


export const updateProduct = async (id, productData) => {
  try {
    const headers = getAuthHeaders();
    const res = await axios.put(`${API_URL}/${id}`, productData, {
      headers: {
        ...headers,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("Failed to update product:", error.response?.data || error);
    return null;
  }
};


  export const deleteProduct = async (productId) => {
    try {
      const headers = getAuthHeaders();
      const res = await axios.delete(`${API_URL}/${productId}`, { headers });
      return res.status === 200; // true if deleted
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      return false;
    }
  };
  
