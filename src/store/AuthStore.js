



import { create } from "zustand";
import { loginService, fetchCurrentUser, logoutService,forgotPasswordAPI,resetPasswordAPI } from "../components/services/authService";
import { cookieUtils } from "../components/utils/cookieUtils";

const AUTH_COOKIE_NAME = 'user_data';
const IS_AUTHENTICATED_COOKIE = 'is_authenticated';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isInitialized: false,

  // Initialize auth state from cookies on app start
  initializeAuth: () => {
    const userData = cookieUtils.getJSON(AUTH_COOKIE_NAME);
    const isAuthenticated = cookieUtils.get(IS_AUTHENTICATED_COOKIE) === 'true';
    
    if (userData && isAuthenticated) {
      set({ 
        user: userData, 
        isInitialized: true,
        loading: false 
      });
    } else {
      // Clear any stale cookies
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      
      set({ 
        user: null, 
        isInitialized: true,
        loading: false 
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginService(email, password);
      const user = data.user || null;
      
      if (user) {
        // Store user data in secure cookies
        const cookieOptions = {
          days: 7, // 7 days expiry
          secure: window.location.protocol === 'https:',
          sameSite: 'Lax'
        };
        
        cookieUtils.setJSON(AUTH_COOKIE_NAME, user, cookieOptions);
        cookieUtils.set(IS_AUTHENTICATED_COOKIE, 'true', cookieOptions);
      }
      
      set({ 
        user,
        loading: false,
        isInitialized: true 
      });
      return true;
    } catch (err) {
      // Clear any existing cookies on login failure
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      
      set({ 
        error: err?.message || "Login failed", 
        loading: false,
        user: null 
      });
      return false;
    }
  },

  checkAuth: async () => {
    const currentState = get();
    
    // If we already have a user and we're initialized, don't check again
    if (currentState.user && currentState.isInitialized) {
      return;
    }

    // Check if we have authentication cookies first
    const isAuthenticated = cookieUtils.get(IS_AUTHENTICATED_COOKIE) === 'true';
    if (!isAuthenticated) {
      set({ 
        user: null,
        loading: false,
        isInitialized: true 
      });
      return;
    }

    set({ loading: true });
    try {
      const data = await fetchCurrentUser();
      const user = data.user || null;
      
      if (user) {
        // Update cookies with fresh data
        const cookieOptions = {
          days: 7,
          secure: window.location.protocol === 'https:',
          sameSite: 'Lax'
        };
        
        cookieUtils.setJSON(AUTH_COOKIE_NAME, user, cookieOptions);
        cookieUtils.set(IS_AUTHENTICATED_COOKIE, 'true', cookieOptions);
        
        set({ 
          user,
          loading: false,
          isInitialized: true,
          error: null
        });
      } else {
        // Clear cookies if no user returned
        cookieUtils.remove(AUTH_COOKIE_NAME);
        cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
        
        set({ 
          user: null,
          loading: false,
          isInitialized: true,
          error: null
        });
      }
    } catch (error) {
      // Clear cookies on authentication failure
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      
      set({ 
        user: null,
        loading: false,
        isInitialized: true,
        error: null
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutService();
    } catch (err) {
      console.log("Logout error:", err);
    }
    
    // Clear all authentication cookies
    cookieUtils.remove(AUTH_COOKIE_NAME);
    cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
    
    set({ 
      user: null, 
      loading: false,
      error: null,
      isInitialized: true
    });
  },

  // Method to clear auth state
  clearAuth: () => {
    cookieUtils.remove(AUTH_COOKIE_NAME);
    cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
    
    set({ 
      user: null, 
      loading: false, 
      error: null,
      isInitialized: false
    });
  },

  // Method to set user directly
  setUser: (user) => {
    if (user) {
      const cookieOptions = {
        days: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'Lax'
      };
      
      cookieUtils.setJSON(AUTH_COOKIE_NAME, user, cookieOptions);
      cookieUtils.set(IS_AUTHENTICATED_COOKIE, 'true', cookieOptions);
    }
    set({ user, isInitialized: true });
  },

  // Method to refresh user data
  refreshUser: async () => {
    if (!cookieUtils.exists(IS_AUTHENTICATED_COOKIE)) {
      return;
    }

    try {
      const data = await fetchCurrentUser();
      const user = data.user || null;
      
      if (user) {
        const cookieOptions = {
          days: 7,
          secure: window.location.protocol === 'https:',
          sameSite: 'Lax'
        };
        
        cookieUtils.setJSON(AUTH_COOKIE_NAME, user, cookieOptions);
        set({ user });
      }
    } catch (error) {
      console.log("Failed to refresh user data:", error);
    }
  }
}));

 

export const usePasswordResetStore = create((set, get) => ({
  // State
  isLoading: false,
  error: null,
  success: false,
  message: '',
  
  // Reset state
  resetState: () => {
    set({
      isLoading: false,
      error: null,
      success: false,
      message: ''
    });
  },

  // Forgot Password Action
  forgotPassword: async (email) => {
    set({ 
      isLoading: true, 
      error: null, 
      success: false, 
      message: '' 
    });
    
    try {
      const response = await forgotPasswordAPI(email);
      
      if (response.success) {
        set({
          isLoading: false,
          success: true,
          message: response.message || 'Reset link sent to your email',
          error: null
        });
        return { success: true, message: response.message };
      } else {
        set({
          isLoading: false,
          error: response.message || 'Failed to send reset link',
          success: false,
          message: ''
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong. Please try again.';
      set({
        isLoading: false,
        error: errorMessage,
        success: false,
        message: ''
      });
      return { success: false, message: errorMessage };
    }
  },

  // Reset Password Action
  resetPassword: async (token, newPassword, confirmPassword) => {
    set({ 
      isLoading: true, 
      error: null, 
      success: false, 
      message: '' 
    });
    
    try {
      const response = await resetPasswordAPI(token, newPassword, confirmPassword);
      
      if (response.success) {
        set({
          isLoading: false,
          success: true,
          message: response.message || 'Password reset successfully',
          error: null
        });
        return { success: true, message: response.message };
      } else {
        set({
          isLoading: false,
          error: response.message || 'Failed to reset password',
          success: false,
          message: ''
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong. Please try again.';
      set({
        isLoading: false,
        error: errorMessage,
        success: false,
        message: ''
      });
      return { success: false, message: errorMessage };
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Clear success
  clearSuccess: () => {
    set({ success: false, message: '' });
  }
}));