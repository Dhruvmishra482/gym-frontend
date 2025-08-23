
import { create } from "zustand";
import { loginService,fetchCurrentUser,logoutService } from "../components/services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

login: async (email, password) => {
  set({ loading: true, error: null });
  try {
    const data = await loginService(email, password);

   
    console.log("Login response:", data);

   
    if (data.user) {
      set({ user: data.user, loading: false });
    } else {
      // fallback: current user fetch karo
      const currentUser = await fetchCurrentUser();
      set({ user: currentUser.user, loading: false });
    }

    return true;
  } catch (err) {
    set({ error: err.message, loading: false });
    return false;
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
