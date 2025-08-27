

import axiosInstance from "../../axiosConfig";

export const signUpService = async (userData) => {
  try {
    // Clean the data
    const cleanedData = {
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      mobileNumber: userData.mobileNumber.trim(),
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };

    const res = await axiosInstance.post("/auth/signup", cleanedData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err) {
    console.error("Full error:", err.response?.data);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};

export const verifyOTPService = async (otpData) => {
  try {
    const res = await axiosInstance.post("/auth/verify-otp", otpData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err) {
    console.error("OTP verification error:", err.response?.data);
    throw new Error(err.response?.data?.message || "OTP verification failed");
  }
};

export const resendOTPService = async (email, firstName) => {
  try {
    const res = await axiosInstance.post("/auth/resend-otp", {
      email: email.trim().toLowerCase(),
      firstName: firstName?.trim()
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return res.data;
  } catch (err) {
    console.error("Resend OTP error:", err.response?.data);
    throw new Error(err.response?.data?.message || "Failed to resend OTP");
  }
};

export const loginService = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "Login failed!";
    throw new Error(message);
  }
}

export const fetchCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me",{ withCredentials: true });
    return res.data; // { user }
  } catch (err) {
    throw null;
  }
};

export const logoutService = async () => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    return res.data; // { success, message }
  } catch (err) {
    throw err.response?.data?.message || "Logout failed!";
  }
};




// Forgot Password API
export const forgotPasswordAPI = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', {
      email
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { 
      success: false, 
      message: 'Network error occurred' 
    };
  }
};

// Reset Password API
export const resetPasswordAPI = async (token, newPassword, confirmPassword) => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
      newPassword,
      confirmPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { 
      success: false, 
      message: 'Network error occurred' 
    };
  }
};