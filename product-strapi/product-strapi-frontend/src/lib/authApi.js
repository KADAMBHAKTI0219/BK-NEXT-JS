import axios from "axios";

const AUTH_URL = "http://localhost:1337/api/auth/local";
const PROFILE_URL = "http://localhost:1337/api/users/me";

export const Register = async (userData) => {
  try {
    const registerData = await axios.post(AUTH_URL + "/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User registered successfully:", registerData.data);
    return registerData.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const Login = async (userData) => {
  try {
    const loginData = await axios.post(AUTH_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User logged in successfully:", loginData.data);
    return loginData.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const ProfileData = async (token) => {
  try {
    const profileData = await axios.get(PROFILE_URL, {
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    console.log("Profile data fetched successfully:", profileData.data);
    return profileData.data;
  }
  catch{
    console.error("Error fetching profile data:", error);
    throw error;
  }
}
