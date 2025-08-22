

import { create } from "zustand";
import { loginService,fetchCurrentUser,logoutService } from "../components/services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email,password) =>
  {
    set({ loading: true,error: null });
    try
    {
      const data = await loginService(email,password);
      set({ user: data.user,loading: false });
      return true; // successful login
    } catch (err)
    {
      set({ error: err.message,loading: false });
      return false; // login failed
    }
  },

  checkAuth: async () =>
  {
    set({ loading: true,error: null });
    try
    {
      const data = await fetchCurrentUser();
      set({ user: data.user,loading: false });
    } catch (err)
    {
      set({ user: null,loading: false,error: null });
    }
  },

  logout: async () =>
  {
    try
    {
      await logoutService();
    } catch (err)
    {
      console.log("Logout error:",err);
    }
    set({ user: null });
  },
}));
