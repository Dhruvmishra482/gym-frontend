import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/Hero/Navigation";
import DashboardPage from "./components/pages/DashboardPage";
import HeroMain from "./components/Hero/HeroMain";
import Features from "./components/NavbarNavigation/Features";
import PricingPage from "./components/NavbarNavigation/PricingPage";
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
import DueMembersPage from "./components/pages/DueMembersPage";
import MyProfile from "./components/pages/MyProfilePage";
import ContactUs from "./components/NavbarNavigation/ContactUs";

// Payment related imports
import PaymentPage from "./components/pages/PaymentPage";
import PaymentSuccessPage from "./components/pages/PaymentSuccessPage";
import PaymentFailedPage from "./components/pages/PaymentFailedPage";

import MySubscription from "./components/pages/MySubscription";
import BasicAnalyticsReports from "./components/Member/BasicAnalyticsReports";
import MyAnalyticsPage from "./components/pages/AnalyticsPage";

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
  const hideNavPaths = [
    "/dashboard",
    "/search-member", 
    "/add-member",
    "/due-members",
    "/my-profile",
    "/payment",
    "/payment/success",
    "/payment/failed",
    "/my-subscription",
    "/my-analytics"
  ];
  
  const isEditMemberPath = location.pathname.startsWith("/edit-member");
  const isPaymentPath = location.pathname.startsWith("/payment");

  const shouldHideNav =
    hideNavPaths.includes(location.pathname) || isEditMemberPath || isPaymentPath;

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
        <Route path="/book-slot" element={<SlotBookingPage />} />
        
        {/* Protected routes */}
        <Route
          path="/edit-member/:phoneNumber"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <EditMemberForm />
            </ProtectedRoute>
          }
        />
        <Route
  path="/crowd-dashboard"
  element={
    <ProtectedRoute allowedRoles={["owner"]}>
      <CrowdManagementPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/search-member"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <ContactUs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/due-members"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <DueMembersPage dueMembersData={location.state?.dueMembersData} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MyProfile />
            </ProtectedRoute>
          }
        />
       <Route
          path="/my-analytics"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MyAnalyticsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/add-member"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <AddMemberPage />
            </ProtectedRoute>
          }
        />

        {/* Payment routes - All require authentication */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <PaymentSuccessPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/payment/failed"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <PaymentFailedPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/my-subscription"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
            <MySubscription/>
            </ProtectedRoute>
          }
        />

        {/* Keep these auth routes for direct URL access and password reset functionality */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Redirect old auth routes to home - AuthModal will handle login/signup */}
        <Route
          path="/login"
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={<Navigate to="/" replace />}
        />

        {/* Fallback routes */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;