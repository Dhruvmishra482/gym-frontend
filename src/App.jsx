import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import EditMemberBySearch from "./components/pages/EditMemberBySearch";

const App = () => {
  const { user, loading, checkAuth, isInitialized } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      const { initializeAuth } = useAuthStore.getState();
      initializeAuth();
    }
    const timeout = setTimeout(() => {
      if (!isInitialized) {
        checkAuth();
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [checkAuth, isInitialized]);

  if (loading && !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Checking authentication...
      </div>
    );
  }

  // Paths where Navigation should be hidden
  const hideNavPaths = ["/dashboard", "/search-member"];
  const isEditMemberPath = location.pathname.startsWith("/edit-member");

  const shouldHideNav =
    hideNavPaths.includes(location.pathname) || isEditMemberPath;

  return (
    <>
      {!shouldHideNav && <Navigation />}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <HeroMain />}
        />
        <Route path="/home" element={<HeroMain />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/edit-member/:phoneNumber" element={<EditMemberForm />} />
        <Route path="/search-member" element={<EditMemberBySearch />} />

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
