// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "./store/AuthStore";

import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import DashboardPage from "./components/pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
// import AddMemberPage from "./components/pages/AddMemberPage";
// import EditMemberForm from "./components/Member/EditMemberForm";

export default function App() {
  const { checkAuth, loading, user } = useAuthStore();

  // Check user authentication on app mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loader while checking auth
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/signup" replace />
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/add-member"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <AddMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-member/:id"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <EditMemberForm />
            </ProtectedRoute>
          }
        /> */}

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
