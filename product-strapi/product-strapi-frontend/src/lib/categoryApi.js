const CATEGORY_URL = 'http://localhost:1337/api/categories';
import axios from 'axios';

const getAuthorization = () => {
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};


export const getCategories = async ({ name = '', search = '' }) => {
  try {
    const response = await axios.get(CATEGORY_URL, {
      params: {
        name,
        search,
      },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Categories fetched successfully:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
    try {
        const getCategoryData = await axios.get(`${CATEGORY_URL}/${id}`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthorization(),
            },
        });
        console.log("Category fetched successfully:", getCategoryData.data.data);
        return getCategoryData.data.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;   
    }
}

export const updateCategory = async (id, categoryData) => {
  try {
    const updateCategoryData = await axios.put(`${CATEGORY_URL}/${id}`,categoryData,{
        headers: {
          "Content-Type": "application/json",
          ...getAuthorization(),
        },
      });
    console.log("Category updated successfully:", updateCategoryData.data.data);
    return updateCategoryData.data.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
    try {
        const createCategoryData = await axios.post(CATEGORY_URL, categoryData, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthorization(),
            },
        });
        console.log("Category created successfully:", createCategoryData.data.data);
        return createCategoryData.data.data; 
    } catch (error) {
        console.error("Error creating category:", error);
        throw error; 
    }
}


export const deleteCategory = async (id) => {
  try {
    console.log('Sending DELETE request for product ID:', id); // Debug ID
    const response = await axios.delete(`${CATEGORY_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product deleted successfully:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error;
  }
};
