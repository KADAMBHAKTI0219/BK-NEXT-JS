const PRODUCT_URL = 'http://localhost:1337/api/products';
const UPLOAD_URL = 'http://localhost:1337/api/upload';
import axios from 'axios';

const getAuthorization = () => {
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};

export const getProducts = async ({ search = '', category = '', price = '', stock = '' }) => {
  try {
    const response = await axios.get(PRODUCT_URL, {
      params: { search, category, price, stock, 'populate': 'images,category' },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Products fetched successfully:', response.data.data);
    return response.data.data.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      name: item.attributes?.name || item.name || '',
      price: item.attributes?.price || item.price || 0,
      stock: item.attributes?.stock || item.stock || 0,
      category: item.attributes?.category?.data?.attributes || item.category || null,
      images: item.attributes?.images?.data || item.images || [],
    }));
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_URL}/${id}?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product fetched successfully:', response.data.data);
    
    return response.data.data
  } catch (error) {
    console.error('Error fetching product by ID:', error.response?.data || error.message);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(PRODUCT_URL, { data: productData }, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${PRODUCT_URL}/${id}`, { data: productData }, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product updated successfully:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    console.log('Sending DELETE request for product ID:', id); // Debug ID
    const response = await axios.delete(`${PRODUCT_URL}/${id}`, {
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

export const uploadImages = async (images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('files', image);
    });

    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthorization(),
      },
    });
    console.log('Images uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to upload images');
  }
};