import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Dumbbell,
  Shield,
  Eye,
  EyeOff,
  Zap,
  Crown,
  Flame,
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center p-4 relative overflow-hidden py-24">
      {/* Animated Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,0,0.3),transparent_50%)] animate-pulse"></div>
        <div
          className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.2),transparent_50%)] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40%_90%,rgba(255,69,0,0.2),transparent_50%)] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 left-10 opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <Dumbbell className="w-16 h-16 text-red-500" />
        </div>
        <div
          className="absolute top-20 right-20 opacity-30 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          <Shield className="w-14 h-14 text-yellow-500" />
        </div>
        <div
          className="absolute bottom-20 left-20 opacity-25 animate-spin"
          style={{ animationDuration: "8s" }}
        >
          <Zap className="w-12 h-12 text-orange-500" />
        </div>
        <div
          className="absolute bottom-32 right-32 opacity-30 animate-bounce"
          style={{ animationDelay: "2.5s" }}
        >
          <Crown className="w-10 h-10 text-yellow-400" />
        </div>
        <div
          className="absolute top-1/2 left-8 opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          <Flame className="w-8 h-8 text-red-600" />
        </div>
        <div
          className="absolute top-1/3 right-8 opacity-25 animate-bounce"
          style={{ animationDelay: "4s" }}
        >
          <Flame className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      {/* Moving Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Main Form Container with Dramatic Entrance */}
      <div
        className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${
          isLoaded
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-full opacity-0 scale-75"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl border-2 border-red-500/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-red-400/60 transition-all duration-500">
          {/* Animated Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-red-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

          {/* Inner Glow Effect */}
          <div className="absolute inset-2 bg-gradient-to-br from-red-500/10 to-transparent rounded-2xl opacity-50"></div>

          {/* Header with Enhanced Animations */}
          <div
            className={`text-center mb-8 transform transition-all duration-700 delay-300 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4 group">
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 rounded-full shadow-lg animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
              <div className="relative bg-black rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                <Dumbbell className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent mb-2 tracking-wider animate-pulse">
              IRON THRONE
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <p className="text-gray-300 text-sm font-bold tracking-widest">
                ELITE GYM DOMINION
              </p>
              <Flame
                className="w-4 h-4 text-orange-500 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
            <p className="text-xs text-red-400 font-medium animate-pulse">
              ⚡ MEMBERS ONLY ACCESS ⚡
            </p>
          </div>

          {/* Enhanced Form */}
          <div
            className={`space-y-6 transform transition-all duration-700 delay-500 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Email Field with Enhanced Effects */}
            <div className="relative group">
              <label className="block text-sm font-black text-gray-200 mb-3 tracking-widest flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>BOSS EMAIL</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-red-500/30 to-yellow-500/30 rounded-xl blur-sm transition-opacity duration-300 ${
                    focusedField === "email" ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
                <User
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 transition-all duration-300 ${
                    focusedField === "email"
                      ? "text-yellow-400 scale-110"
                      : "text-red-500"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className={`relative w-full pl-12 pr-4 py-4 bg-gray-900/70 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-500 font-medium ${
                    errors.email
                      ? "border-red-500 focus:border-red-400 shadow-red-500/50 shadow-lg"
                      : focusedField === "email"
                      ? "border-yellow-400 shadow-yellow-500/50 shadow-lg transform scale-105"
                      : "border-gray-600 hover:border-red-500"
                  }`}
                  placeholder="kingpin@ironthrone.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-2 font-bold animate-bounce flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field with Enhanced Effects */}
            <div className="relative group">
              <label className="block text-sm font-black text-gray-200 mb-3 tracking-widest flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span>SECRET CODE</span>
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-red-500/30 to-yellow-500/30 rounded-xl blur-sm transition-opacity duration-300 ${
                    focusedField === "password" ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
                <Lock
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 transition-all duration-300 ${
                    focusedField === "password"
                      ? "text-yellow-400 scale-110"
                      : "text-red-500"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  className={`relative w-full pl-12 pr-12 py-4 bg-gray-900/70 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-500 font-medium ${
                    errors.password
                      ? "border-red-500 focus:border-red-400 shadow-red-500/50 shadow-lg"
                      : focusedField === "password"
                      ? "border-yellow-400 shadow-yellow-500/50 shadow-lg transform scale-105"
                      : "border-gray-600 hover:border-red-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-125"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-2 font-bold animate-bounce flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Epic Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-5 px-6 rounded-xl font-black text-white text-lg tracking-widest transition-all duration-500 transform relative overflow-hidden group ${
                isSubmitting
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/70 hover:scale-105 hover:-translate-y-1"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="animate-pulse">ACCESSING THRONE...</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="w-5 h-5 animate-pulse" />
                  <span>CLAIM THE THRONE</span>
                  <Crown className="w-5 h-5 animate-pulse" />
                </div>
              )}
            </button>
          </div>

          {/* Enhanced Footer */}
          <div
            className={`mt-8 text-center transform transition-all duration-700 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
              <p className="text-gray-400 text-xs font-bold tracking-wider">
                FORGED IN IRON • BUILT FOR LEGENDS
              </p>
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-xs">
              © 2025 Iron Throne Gym Empire • Elite Access Protocol
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
