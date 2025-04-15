const CATEGORY_URL = "http://localhost:1337/api/categories";
import axios from "axios";

export const getCategories = async () => {
  try {
    const getCategoriesData = await axios.get(CATEGORY_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Categories fetched successfully:", getCategoriesData.data.data);
    return getCategoriesData.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
    try {
        const getCategoryData = await axios.get(`${CATEGORY_URL}/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Category fetched successfully:", getCategoryData.data);
        return getCategoryData.data;
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
        },
      });
    console.log("Category updated successfully:", updateCategoryData.data);
    return updateCategoryData.data;
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
            },
        });
        console.log("Category created successfully:", createCategoryData.data);
        return createCategoryData.data; 
    } catch (error) {
        console.error("Error creating category:", error);
        throw error; 
    }
}


export const deleteCategory = async (id) => {
  try {
    const deleteCategoryData = await axios.delete(`${CATEGORY_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Category deleted successfully:", deleteCategoryData.data);
    return deleteCategoryData.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};