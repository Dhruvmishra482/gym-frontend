import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Hero/Navigation";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import DashboardPage from "./components/pages/DashboardPage";
import HeroMain from "./components/Hero/HeroMain";
import Features from "./components/NavbarNavigation/Features";
import PricingPage from "./components/NavbarNavigation/PricingPage";
import ContactUs from "./components/NavbarNavigation/ContactUs";
import AddMemberPage from "./components/pages/AddMemberPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import VerifyEmailPage from "./components/pages/VerifyEmailPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import EditMemberForm from "./components/Member/EditMemberForm";
const App = () => {
  const { user, loading, checkAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    // Initialize auth from cookies first
    if (!isInitialized) {
      const { initializeAuth } = useAuthStore.getState();
      initializeAuth();
    }

    // Then check with server if we have cookies
    const timeout = setTimeout(() => {
      if (!isInitialized) {
        checkAuth();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [checkAuth, isInitialized]);

  // Show loading only during initial authentication check
  if (loading && !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <ToastContainer />
      <Routes>
        {/* If user is authenticated, redirect to dashboard, otherwise show home */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <HeroMain />}
        />
        <Route path="/home" element={<HeroMain />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/edit-member/:phoneNumber" element={<EditMemberForm />} />


        {/* Redirect authenticated users away from auth pages */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />}
        />

        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route
          path="/add-member"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <AddMemberPage />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

        {/* Catch all route - redirect to home if not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
