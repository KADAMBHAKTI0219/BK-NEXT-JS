import axios from "axios";

const AUTH_URL = "http://localhost:1337/api/auth/local";
const PROFILE_URL = "http://localhost:1337/api/users/me";

export const registerUserData = async (userData) => {
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

export const loginUserData = async (userData) => {
  try {
    const loginData = await axios.post(AUTH_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User logged in successfully:", loginData.data);
    localStorage.setItem('jwt', loginData.data.jwt);
    localStorage.setItem('user', JSON.stringify(loginData.data.user));
    return loginData.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const profileUserData = async () => {
  const token = localStorage.getItem("jwt");
  console.log(token)
  try {
    const profileData = await axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    console.log("Profile data fetched successfully:", profileData.data);
    return profileData.data;
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}