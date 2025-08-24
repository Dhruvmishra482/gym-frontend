// // import { create } from "zustand";
// // import { loginService, fetchCurrentUser, logoutService } from "../components/services/authService";
// // export const useAuthStore = create((set) => ({
// //   user: null,
// //   loading: true, 
// //   error: null,

// //   login: async (email, password) => {
// //     set({ loading: true, error: null });
// //     try {
// //       const data = await loginService(email, password);
// //       set({ user: data.user || null, loading: false });
// //       return true;
// //     } catch (err) {
// //       set({ error: err?.message || "Login failed", loading: false });
// //       return false;
// //     }
// //   },

// //   checkAuth: async () => {
// //     set({ loading: true });
// //     try {
// //       const data = await fetchCurrentUser();
// //       set({ user: data.user || null });
// //     } catch {
// //       set({ user: null });
// //     } finally {
// //       set({ loading: false });
// //     }
// //   },

// //   logout: async () => {
// //     try { await logoutService(); } catch (err) { console.log(err); }
// //     set({ user: null });
// //   },
// // }));


// import { create } from "zustand";
// import { loginService, fetchCurrentUser, logoutService } from "../components/services/authService";

// // Helper function to get cookie value
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// };

// // Helper function to set cookie
// const setCookie = (name, value, days = 7) => {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
// };

// // Helper function to delete cookie
// const deleteCookie = (name) => {
//   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
// };

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   loading: false,
//   error: null,
//   isInitialized: false,

//   // Initialize auth state from cookies on app start
//   initializeAuth: () => {
//     const userCookie = getCookie('user');
//     const isAuthenticatedCookie = getCookie('isAuthenticated');
    
//     if (userCookie && isAuthenticatedCookie === 'true') {
//       try {
//         const user = JSON.parse(decodeURIComponent(userCookie));
//         set({ 
//           user, 
//           isInitialized: true,
//           loading: false 
//         });
//       } catch (error) {
//         // If cookie is corrupted, clear it
//         deleteCookie('user');
//         deleteCookie('isAuthenticated');
//         set({ 
//           user: null, 
//           isInitialized: true,
//           loading: false 
//         });
//       }
//     } else {
//       set({ 
//         user: null, 
//         isInitialized: true,
//         loading: false 
//       });
//     }
//   },

//   login: async (email, password) => {
//     set({ loading: true, error: null });
//     try {
//       const data = await loginService(email, password);
//       const user = data.user || null;
      
//       if (user) {
//         // Store user data in cookie
//         setCookie('user', encodeURIComponent(JSON.stringify(user)), 7); // 7 days
//         setCookie('isAuthenticated', 'true', 7);
//       }
      
//       set({ 
//         user,
//         loading: false,
//         isInitialized: true 
//       });
//       return true;
//     } catch (err) {
//       // Clear any existing cookies on login failure
//       deleteCookie('user');
//       deleteCookie('isAuthenticated');
      
//       set({ 
//         error: err?.message || "Login failed", 
//         loading: false,
//         user: null 
//       });
//       return false;
//     }
//   },

//   checkAuth: async () => {
//     const currentState = get();
    
//     // If we already have a user and we're initialized, don't check again
//     if (currentState.user && currentState.isInitialized) {
//       return;
//     }

//     // Check if we have authentication cookies first
//     const isAuthenticatedCookie = getCookie('isAuthenticated');
//     if (!isAuthenticatedCookie) {
//       set({ 
//         user: null,
//         loading: false,
//         isInitialized: true 
//       });
//       return;
//     }

//     set({ loading: true });
//     try {
//       const data = await fetchCurrentUser();
//       const user = data.user || null;
      
//       if (user) {
//         // Update cookies with fresh data
//         setCookie('user', encodeURIComponent(JSON.stringify(user)), 7);
//         setCookie('isAuthenticated', 'true', 7);
        
//         set({ 
//           user,
//           loading: false,
//           isInitialized: true,
//           error: null
//         });
//       } else {
//         // Clear cookies if no user returned
//         deleteCookie('user');
//         deleteCookie('isAuthenticated');
        
//         set({ 
//           user: null,
//           loading: false,
//           isInitialized: true,
//           error: null
//         });
//       }
//     } catch (error) {
//       // Clear cookies on authentication failure
//       deleteCookie('user');
//       deleteCookie('isAuthenticated');
      
//       set({ 
//         user: null,
//         loading: false,
//         isInitialized: true,
//         error: null
//       });
//     }
//   },

//   logout: async () => {
//     set({ loading: true });
//     try {
//       await logoutService();
//     } catch (err) {
//       console.log("Logout error:", err);
//     }
    
//     // Clear all authentication cookies
//     deleteCookie('user');
//     deleteCookie('isAuthenticated');
    
//     set({ 
//       user: null, 
//       loading: false,
//       error: null,
//       isInitialized: true
//     });
//   },

//   // Method to clear auth state
//   clearAuth: () => {
//     deleteCookie('user');
//     deleteCookie('isAuthenticated');
    
//     set({ 
//       user: null, 
//       loading: false, 
//       error: null,
//       isInitialized: false
//     });
//   },

//   // Method to set user directly
//   setUser: (user) => {
//     if (user) {
//       setCookie('user', encodeURIComponent(JSON.stringify(user)), 7);
//       setCookie('isAuthenticated', 'true', 7);
//     }
//     set({ user, isInitialized: true });
//   }
// }));



import { create } from "zustand";
import { loginService, fetchCurrentUser, logoutService } from "../components/services/authService";
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