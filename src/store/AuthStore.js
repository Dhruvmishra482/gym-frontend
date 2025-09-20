

import { create } from "zustand";
import { loginService, fetchCurrentUser, logoutService, forgotPasswordAPI, resetPasswordAPI } from "../components/services/authService";
import { getSubscriptionStatus } from "../components/services/paymentService";
import { cookieUtils } from "../components/utils/cookieUtils";

const AUTH_COOKIE_NAME = 'user_data';
const IS_AUTHENTICATED_COOKIE = 'is_authenticated';
const SUBSCRIPTION_COOKIE_NAME = 'subscription_data';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isInitialized: false,
  
  // Subscription state
  subscription: null,
  subscriptionLoading: false,
  subscriptionError: null,
  subscriptionLastUpdated: null,

  // Helper method
  hasActiveSubscription: () => {
    const { subscription } = get();
    return subscription?.isActive && subscription?.plan !== "NONE";
  },

  // Initialize method
  initializeAuth: () => {
    const userData = cookieUtils.getJSON(AUTH_COOKIE_NAME);
    const isAuthenticated = cookieUtils.get(IS_AUTHENTICATED_COOKIE) === 'true';
    const subscriptionData = cookieUtils.getJSON(SUBSCRIPTION_COOKIE_NAME);
    
    if (userData && isAuthenticated) {
      set({ 
        user: userData, 
        subscription: subscriptionData,
        subscriptionLastUpdated: subscriptionData ? Date.now() : null,
        isInitialized: true,
        loading: false 
      });
    } else {
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
      
      set({ 
        user: null, 
        subscription: null,
        isInitialized: true,
        loading: false 
      });
    }
  },

  // Subscription fetch method
  fetchSubscriptionStatus: async (force = false) => {
    const { subscription, subscriptionLastUpdated, subscriptionLoading } = get();
    
    if (subscriptionLoading) return subscription;
    
    const cacheAge = subscriptionLastUpdated ? Date.now() - subscriptionLastUpdated : Infinity;
    if (!force && subscription && cacheAge < 5 * 60 * 1000) {
      return subscription;
    }

    set({ subscriptionLoading: true, subscriptionError: null });
    
    try {
      const response = await getSubscriptionStatus();
      
      if (response.success && response.data?.subscription) {
        const subscriptionData = response.data.subscription;
        
        const cookieOptions = {
          days: 1,
          secure: window.location.protocol === 'https:',
          sameSite: 'Lax'
        };
        cookieUtils.setJSON(SUBSCRIPTION_COOKIE_NAME, subscriptionData, cookieOptions);
        
        set({ 
          subscription: subscriptionData,
          subscriptionLoading: false,
          subscriptionError: null,
          subscriptionLastUpdated: Date.now()
        });
        
        return subscriptionData;
      } else {
        const noSubData = { isActive: false, plan: "NONE", needsSubscription: true };
        
        set({ 
          subscription: noSubData,
          subscriptionLoading: false,
          subscriptionError: response.message || null,
          subscriptionLastUpdated: Date.now()
        });
        
        cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
        return noSubData;
      }
    } catch (error) {
      console.error("Subscription fetch error:", error);
      
      const noSubData = { isActive: false, plan: "NONE", needsSubscription: true };
      
      set({ 
        subscription: noSubData,
        subscriptionLoading: false,
        subscriptionError: error.message,
        subscriptionLastUpdated: Date.now()
      });
      
      cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
      return noSubData;
    }
  },

  // Refresh subscription
  refreshSubscription: async () => {
    return get().fetchSubscriptionStatus(true);
  },

  // Login method
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await loginService(email, password);
      const user = data.user || null;
      
      if (user) {
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
          isInitialized: true 
        });

        get().fetchSubscriptionStatus();
      }
      
      return true;
    } catch (err) {
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
      
      set({ 
        error: err?.message || "Login failed", 
        loading: false,
        user: null,
        subscription: null
      });
      return false;
    }
  },

  // Other methods
  logout: async () => {
    set({ loading: true });
    try {
      await logoutService();
    } catch (err) {
      console.log("Logout error:", err);
    }
    
    cookieUtils.remove(AUTH_COOKIE_NAME);
    cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
    cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
    
    set({ 
      user: null, 
      subscription: null,
      loading: false,
      error: null,
      isInitialized: true
    });
  },

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

  // Check auth method
  checkAuth: async () => {
    const currentState = get();
    
    if (currentState.user && currentState.isInitialized) {
      return;
    }

    const isAuthenticated = cookieUtils.get(IS_AUTHENTICATED_COOKIE) === 'true';
    if (!isAuthenticated) {
      set({ 
        user: null,
        subscription: null,
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

        get().fetchSubscriptionStatus();
      } else {
        cookieUtils.remove(AUTH_COOKIE_NAME);
        cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
        cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
        
        set({ 
          user: null,
          subscription: null,
          loading: false,
          isInitialized: true,
          error: null
        });
      }
    } catch (error) {
      cookieUtils.remove(AUTH_COOKIE_NAME);
      cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
      cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
      
      set({ 
        user: null,
        subscription: null,
        loading: false,
        isInitialized: true,
        error: null
      });
    }
  },

  // Refresh user method
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
        
        get().refreshSubscription();
      }
    } catch (error) {
      console.log("Failed to refresh user data:", error);
    }
  },

  clearAuth: () => {
    cookieUtils.remove(AUTH_COOKIE_NAME);
    cookieUtils.remove(IS_AUTHENTICATED_COOKIE);
    cookieUtils.remove(SUBSCRIPTION_COOKIE_NAME);
    
    set({ 
      user: null, 
      subscription: null,
      loading: false, 
      error: null,
      isInitialized: false
    });
  }
}));

export const usePasswordResetStore = create((set, get) => ({
  isLoading: false,
  error: null,
  success: false,
  message: '',
  
  resetState: () => {
    set({
      isLoading: false,
      error: null,
      success: false,
      message: ''
    });
  },

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

  clearError: () => {
    set({ error: null });
  },

  clearSuccess: () => {
    set({ success: false, message: '' });
  }
}));