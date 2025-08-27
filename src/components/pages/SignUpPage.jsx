// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { signUpService } from "../services/authService";
// import SignUpForm from "../Auth/SignUpForm";

// const SignUpPage = () => {
//   const [mounted, setMounted] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [activeField, setActiveField] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//     email: "",
//     password: "",
//    confirmPassword: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     setMounted(true);
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Form validation
//   const validateForm = () => {
//     const errors = [];
    
//     if (!formData.firstName.trim()) errors.push("First name is required");
//     if (!formData.lastName.trim()) errors.push("Last name is required");
//     if (!formData.email.trim()) errors.push("Email is required");
//     if (!formData.mobileNumber.trim()) errors.push("Mobile number is required");
//     if (!formData.password.trim()) errors.push("Password is required");
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (formData.email && !emailRegex.test(formData.email)) {
//       errors.push("Please enter a valid email address");
//     }
    
//     // Phone validation
//     const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
//     if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
//       errors.push("Please enter a valid mobile number");
//     }
    
//     // Password validation
//     if (formData.password && formData.password.length < 6) {
//       errors.push("Password must be at least 6 characters long");
//     }
    
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     if (e && e.preventDefault) e.preventDefault();
    
//     // Prevent multiple submissions
//     if (isSubmitting) {
//       console.log("Already submitting, ignoring...");
//       return;
//     }
    
//     // Validate form
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       toast.error(validationErrors[0]);
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       console.log("Submitting form with data:", formData);
//       const result = await signUpService(formData);
      
//       toast.success("Account created successfully!");
//       console.log("Signup successful:", result);
      
//       // Redirect to login or dashboard
//       navigate("/login");
      
//     } catch (error) {
//       console.error("Signup failed:", error);
//       toast.error(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <SignUpForm
//       mounted={mounted}
//       showPassword={showPassword}
//       setShowPassword={setShowPassword}
//       activeField={activeField}
//       setActiveField={setActiveField}
//       formData={formData}
//       handleInputChange={handleInputChange}
//       handleSubmit={handleSubmit}
//       isSubmitting={isSubmitting}
//       mousePosition={mousePosition}
//     />
//   );
// };

// export default SignUpPage;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpService } from "../services/authService";
import SignUpForm from "../Auth/SignUpForm";

const SignUpPage = () => {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.mobileNumber.trim()) errors.push("Mobile number is required");
    if (!formData.password.trim()) errors.push("Password is required");
    if (!formData.confirmPassword.trim()) errors.push("Confirm password is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
      errors.push("Please enter a valid mobile number");
    }
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.push("Passwords do not match");
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Already submitting, ignoring...");
      return;
    }
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Submitting form with data:", formData);
      const result = await signUpService(formData);
      
      toast.success("OTP sent to your email!");
      console.log("Signup successful:", result);
      
      // Navigate to OTP verification page with user data
      navigate("/verify-email", { 
        state: { 
          userData: result.userData,
          email: formData.email,
          firstName: formData.firstName
        }
      });
      
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SignUpForm
      mounted={mounted}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      activeField={activeField}
      setActiveField={setActiveField}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      mousePosition={mousePosition}
    />
  );
};

export default SignUpPage;