import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Crown,
  Flame,
  Shield,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";

const SignUpForm = () => {
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
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center p-4">
      {/* Ultra Dynamic Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x * 0.1}px ${
              mousePosition.y * 0.1
            }px, rgba(255, 69, 0, 0.4), transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x * 0.08}px ${
              100 - mousePosition.y * 0.08
            }px, rgba(255, 140, 0, 0.3), transparent 50%),
              linear-gradient(45deg, rgba(220, 20, 60, 0.3), rgba(255, 69, 0, 0.2), rgba(255, 140, 0, 0.3))
            `,
          }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-orange-500/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-red-500/40 rotate-12 animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 border border-orange-400/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 border-2 border-red-600/30 -rotate-12 animate-spin-reverse"></div>

        {/* Particle System */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-orange-500/60 rounded-full animate-float-${
              i % 3
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container with Incredible 3D Effects */}
      <div
        className={`relative z-10 w-full max-w-lg transform transition-all duration-1000 ${
          mounted
            ? "scale-100 rotate-0 opacity-100"
            : "scale-75 rotate-3 opacity-0"
        }`}
      >
        {/* Holographic Container */}
        <div className="relative">
          {/* Glowing Border Animation */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 via-orange-400 to-red-500 rounded-3xl blur-sm opacity-60 animate-gradient-shift"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-3xl animate-pulse"></div>

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/50 overflow-hidden">
            {/* Top Glow Effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>

            <div className="p-8 space-y-8">
              {/* Epic Header */}
              <div className="text-center relative">
                <div className="relative inline-block mb-6">
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 w-24 h-24 border-4 border-orange-500/30 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-2 w-20 h-20 border-2 border-red-500/40 rounded-full animate-spin-reverse"></div>

                  {/* Center Icon */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <Crown className="w-12 h-12 text-white animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-red-500 via-yellow-500 to-orange-400 bg-clip-text text-transparent mb-4 animate-gradient-text tracking-tight">
                  IRON THRONE
                </h1>
                <div className="space-y-2">
                  <p className="text-orange-300 font-bold text-lg tracking-widest">
                    ELITE GYM DOMINION
                  </p>
                  <p className="text-orange-400/70 text-sm">
                    🔥 FORGE YOUR EMPIRE 🔥
                  </p>
                </div>
              </div>

              {/* Ultra Premium Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 blur transition-all duration-300 ${
                        activeField === "firstName"
                          ? "opacity-100"
                          : "group-hover:opacity-60"
                      }`}
                    ></div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        onFocus={() => setActiveField("firstName")}
                        onBlur={() => setActiveField("")}
                        placeholder="First Name"
                        className="w-full px-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-orange-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-orange-400 focus:shadow-lg focus:shadow-orange-500/25 transition-all duration-300"
                      />
                      <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400/60" />
                    </div>
                  </div>

                  <div className="relative group">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl opacity-0 blur transition-all duration-300 ${
                        activeField === "lastName"
                          ? "opacity-100"
                          : "group-hover:opacity-60"
                      }`}
                    ></div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        onFocus={() => setActiveField("lastName")}
                        onBlur={() => setActiveField("")}
                        placeholder="Last Name"
                        className="w-full px-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-red-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-500/25 transition-all duration-300"
                      />
                      <User className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400/60" />
                    </div>
                  </div>
                </div>

                {/* Mobile Field */}
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 blur transition-all duration-300 ${
                      activeField === "mobile"
                        ? "opacity-100"
                        : "group-hover:opacity-60"
                    }`}
                  ></div>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        handleInputChange("mobileNumber", e.target.value)
                      }
                      onFocus={() => setActiveField("mobile")}
                      onBlur={() => setActiveField("")}
                      placeholder="Mobile Number"
                      className="w-full px-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/25 transition-all duration-300"
                    />
                    <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400/60" />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 blur transition-all duration-300 ${
                      activeField === "email"
                        ? "opacity-100"
                        : "group-hover:opacity-60"
                    }`}
                  ></div>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField("")}
                      placeholder="Email Address"
                      className="w-full px-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/25 transition-all duration-300"
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400/60" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-0 blur transition-all duration-300 ${
                      activeField === "password"
                        ? "opacity-100"
                        : "group-hover:opacity-60"
                    }`}
                  ></div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      onFocus={() => setActiveField("password")}
                      onBlur={() => setActiveField("")}
                      placeholder="Create Password"
                      className="w-full px-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl text-white placeholder-orange-300/60 focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-500/25 transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-yellow-400/60 hover:text-yellow-400 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      <Lock className="w-5 h-5 text-yellow-400/60" />
                    </div>
                  </div>
                </div>

                {/* Epic Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 p-1 transition-all duration-300 hover:scale-105 focus:scale-105 active:scale-95 disabled:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-lg px-6 py-4 text-white font-black text-lg tracking-widest">
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>FORGING THRONE...</span>
                        <Flame className="w-6 h-6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Crown className="w-6 h-6" />
                        <span>CLAIM THE THRONE</span>
                        <Crown className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                </button>

                {/* Elite Features */}
                <div className="bg-gradient-to-r from-orange-900/30 via-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-xl p-4 border border-orange-500/20">
                  <div className="text-center">
                    <h4 className="text-orange-300 font-bold text-sm mb-3">
                      👑 THRONE PRIVILEGES 👑
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs text-orange-200/80">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-orange-400" />
                        <span>Complete Control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-red-400" />
                        <span>Elite Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span>Member Management</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-orange-400" />
                        <span>Revenue Tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-orange-500/20">
                <p className="text-orange-400/60 text-xs font-medium tracking-widest">
                  FORGED IN IRON • BUILT FOR LEGENDS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes gradient-text {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(-10px) rotate(240deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
          }
          75% {
            transform: translateY(-25px) rotate(270deg);
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 4s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-float-0 {
          animation: float-0 6s ease-in-out infinite;
        }
        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
