import apiClient from "../../../services/apiClient";

/*
Register new user
*/

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log("Register API error:", error.response?.data || error.message);
    throw error;
  }
};

/*
Send OTP
*/

export const sendOTP = async (email) => {
  try {
    const response = await apiClient.post("/auth/send-otp", {
      email: email   // ✅ FIXED
    });

    return response.data;
  } catch (error) {
    console.log("Send OTP error:", error.response?.data || error.message);
    throw error;
  }
};
/*
Verify OTP
*/

export const verifyOTP = async (email, otp) => {
  try {
    const response = await apiClient.post("/auth/verify-otp", {
      email: email,
      otp: otp
    });

    return response.data;
  } catch (error) {
    console.log("Verify OTP error:", error.response?.data || error.message);
    throw error;
  }
};

/*
Login user
*/

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.log("Login error:", error.response?.data || error.message);
    throw error;
  }
};