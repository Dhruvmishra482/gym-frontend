// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/pages/LoginPage";
// import DashboardPage from "./components/pages/DashboardPage";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { ToastContainer } from "react-toastify";
// import { useEffect } from "react";
// import { useAuthStore } from "./store/AuthStore";
// import "react-toastify/dist/ReactToastify.css";
// import SignUpPage from "./components/pages/SignUpPage";
// import AddMemberPage from "./components/pages/AddMemberPage";
// import EditMemberBySearch from "./components/pages/EditMemberBySearch";
// import EditMemberForm from "./components/Member/EditMemberForm";
// import HeroMain from "./components/Hero/HeroMain";
// import ContactUs from "./components/NavbarNavigation/ContactUs";
// import PricingPage from "./components/NavbarNavigation/PricingPage";
// import Features from "./components/NavbarNavigation/Features";

// const App = () => {
//   const { user, loading, checkAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl">
//         Checking authentication...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Navigation />
//       <Routes>
//         {/* Default route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Hero />} />

//         {/* Public pages */}
//         <Route path="/home" element={<Hero />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Auth pages */}
//         <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
//         <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />

//         {/* Protected Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Unauthorized page */}
//         <Route path="/unauthorized" element={<Unauthorized />} />
//       </Routes>
//     </Router>
//   );
// };

// // export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Navigation from "./components/Hero/Navigation";
// import LoginPage from "./components/pages/LoginPage";
// import SignUpPage from "./components/pages/SignUpPage";
// import DashboardPage from "./components/pages/DashboardPage";
// import HeroMain from "./components/Hero/HeroMain";
// import Features from "./components/NavbarNavigation/Features";
// import PricingPage from "./components/NavbarNavigation/PricingPage";
// import ContactUs from "./components/NavbarNavigation/ContactUs";
// // import AddMemberPage from "./components/pages/AddMemberPage";
// // import EditMemberBySearch from "./components/pages/EditMemberBySearch";
// // import EditMemberForm from "./components/Member/EditMemberForm";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { useAuthStore } from "./store/AuthStore";
// import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   const { user, loading, checkAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl">
//         Checking authentication...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <Navigation />
//       <ToastContainer />
//       <Routes>
//         {/* Default route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <HeroMain />} />

//         {/* Public pages */}
//         <Route path="/home" element={<HeroMain />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/pricing" element={<PricingPage />} />
//         <Route path="/contact" element={<ContactUs />} />

//         {/* Auth pages */}
//         <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
//         <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/dashboard" />} />

//         {/* Protected Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Member management
//         <Route
//           path="/add-member"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <AddMemberPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/edit-member-search"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <EditMemberBySearch />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/edit-member/:id"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <EditMemberForm />
//             </ProtectedRoute>
//           }
//         /> */}

//         {/* Unauthorized page */}
//         <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
//       </Routes>
//     </Router>
//   );
// };

// 

// import { Routes, Route, Navigate } from "react-router-dom"; // Router removed here
// import Navigation from "./components/Hero/Navigation";
// import LoginPage from "./components/pages/LoginPage";
// import SignUpPage from "./components/pages/SignUpPage";
// import DashboardPage from "./components/pages/DashboardPage";
// import HeroMain from "./components/Hero/HeroMain";
// import Features from "./components/NavbarNavigation/Features";
// import PricingPage from "./components/NavbarNavigation/PricingPage";
// import ContactUs from "./components/NavbarNavigation/ContactUs";
// import AddMemberPage from "./components/pages/AddMemberPage";
// // import EditMemberBySearch from "./components/pages/EditMemberBySearch";
// // import EditMemberForm from "./components/Member/EditMemberForm";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { useAuthStore } from "./store/AuthStore";
// import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const App = () => {
//   const { user, loading, checkAuth } = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-xl">
//         Checking authentication...
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navigation />
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={!user ? <HeroMain /> : <Navigate to="/dashboard" />} />
//         <Route path="/home" element={<HeroMain />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/pricing" element={<PricingPage />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-member"
//           element={
//             <ProtectedRoute allowedRoles={["owner"]}>
//               <AddMemberPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
//       </Routes>
//     </>
//   );
// };
// export default App;


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
        
        {/* Redirect authenticated users away from auth pages */}
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" replace /> : <SignUpPage />} 
        />
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