
import axiosInstance from "../../axiosConfig";

export const loginService = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data; // { success, message, user }
  } catch (err) {
    const message = err.response?.data?.message || "Login failed!";
    throw new Error(message); // 👈 Error object
  }
}

export const fetchCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
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
