import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuthStore } from "./store/AuthStore";
import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "./components/Auth/SignUpForm";
import SignUpPage from "./components/pages/SignUpPage";
import AddMemberPage from "./components/pages/AddMemberPage";
import EditMemberForm from "./components/Member/EditMemberForm";

export default function App() {
  const { checkAuth, loading } = useAuthStore();

  // App load hote hi /auth/me call kare
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Loading state while checking authentication
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<EditMemberForm />} />

        {/* ProtectedRoute for dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
