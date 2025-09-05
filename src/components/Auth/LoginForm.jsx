import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Dumbbell,
  Shield,
  Eye,
  EyeOff,
  Zap,
  Crown,
  ChevronRight,
} from "lucide-react";

export default function LoginForm({
  formData,
  errors,
  showPassword,
  isSubmitting,
  focusedField,
  handleInputChange,
  handleSubmit,
  togglePassword,
  setFocusedField,
}) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-200/40 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-indigo-200/20 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/30 rounded-full animate-bounce animation-delay-3000"></div>
      </div>

      {/* Main Container */}
      <div className={`
        w-full max-w-md transform transition-all duration-1000 
        ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}
      `}>
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-md border border-blue-100 p-6 mb-6 text-center hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome Back, Owner
          </h1>
          <p className="text-gray-600">Access your gym management dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">Owner Login</h2>
                <p className="text-blue-100 text-sm">Secure access to your business</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Email Field */}
              <div className="group">
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 transition-colors ${
                  focusedField === "email" ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  <User className={`w-4 h-4 transition-all duration-200 ${
                    focusedField === "email" ? 'text-blue-500 scale-110' : 'text-gray-400'
                  }`} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    className={`
                      w-full px-4 py-3 border rounded-lg transition-all duration-300
                      ${errors.email 
                        ? 'border-red-500 ring-2 ring-red-500 ring-opacity-20 bg-red-50' 
                        : focusedField === "email"
                        ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20 shadow-md transform scale-105'
                        : 'border-gray-300 hover:border-blue-400 hover:shadow-sm'
                      }
                      focus:outline-none
                    `}
                    placeholder="Enter your email address"
                  />
                  {formData.email && !errors.email && (
                    <div className="absolute -top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 animate-in slide-in-from-top-1 duration-300">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="group">
                <label className={`flex items-center gap-2 text-sm font-medium mb-2 transition-colors ${
                  focusedField === "password" ? 'text-purple-600' : 'text-gray-700'
                }`}>
                  <Lock className={`w-4 h-4 transition-all duration-200 ${
                    focusedField === "password" ? 'text-purple-500 scale-110' : 'text-gray-400'
                  }`} />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    className={`
                      w-full px-4 py-3 pr-12 border rounded-lg transition-all duration-300
                      ${errors.password 
                        ? 'border-red-500 ring-2 ring-red-500 ring-opacity-20 bg-red-50' 
                        : focusedField === "password"
                        ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20 shadow-md transform scale-105'
                        : 'border-gray-300 hover:border-purple-400 hover:shadow-sm'
                      }
                      focus:outline-none
                    `}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                  {formData.password && !errors.password && (
                    <div className="absolute -top-2 right-10 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 animate-in slide-in-from-top-1 duration-300">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3
                  ${isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Dumbbell className="w-5 h-5" />
                    Access Dashboard
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-2">New gym owner?</p>
                <button
                  onClick={() => navigate("/signup")}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  <span>Create your account</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Card */}
        <div className="mt-6 bg-gradient-to-r from-white to-green-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-all duration-300">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Crown className="w-4 h-4 text-green-600" />
            Owner Dashboard
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Complete member management system</p>
            <p>• Revenue tracking and analytics</p>
            <p>• Payment reminders and notifications</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}