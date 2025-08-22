import { useState, useEffect } from "react";
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Owner Data:", formData);
    setIsSubmitting(false);
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
