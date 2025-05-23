import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const PRODUCT_URL = `${BASE_URL}/api/products`;
const UPLOAD_URL = `${BASE_URL}/api/upload`;

const getAuthorization = () => {
  const jwt = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
  return jwt ? { Authorization: `Bearer ${jwt}` } : {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  };
};

export const getProducts = async ({ search = '', category = '', price = '', stock = '' }) => {
  try {
    const response = await axios.get(PRODUCT_URL, {
      params: { search, category, price, stock, populate: 'images,category' },
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Products fetched successfully:', response.data.data);
    return response.data.data.map((item) => ({
      id: item.id,
      documentId: item.documentId,
      name: item.name || '',
      price: item.price || 0,
      stock: item.stock || 0,
      category: item.category || null,
      images: item.images || [],
    }));
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
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

export const deleteProduct = async (id) => {
  try {
    console.log('Sending DELETE request for product ID:', id);
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

    const response = await axios.post(`${UPLOAD_URL}`, formData, {
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

export const updateProduct = async (id, payload) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/products/${id}?populate=*`, payload, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product updated successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message || error.message || 'Failed to update product';
    console.error('Error updating product:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${id}?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthorization(),
      },
    });
    console.log('Product fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch product');
  }
};