import axios from "axios";

const API_URL = 'http://localhost:1337/api/auth/local';

export const register = async (userData) => {
  try {
    const res = await axios.post(API_URL + '/register', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data; 
  } catch (err) {
    console.error('Error registering user:', err.response?.data || err);
    return null;
  }
};
export const login = async (userData) => {
    try {
      const res = await axios.post(API_URL, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = res.data;
  
      localStorage.setItem('jwt', result.jwt);
      localStorage.setItem('user', JSON.stringify(result.user));
  
      return result;
    } catch (err) {
      console.error('Error logging in:', err.response?.data || err);
      return null;
    }
  };
