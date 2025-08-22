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
} from "lucide-react";

const SignUpForm = ({
  mounted,
  showPassword,
  setShowPassword,
  activeField,
  setActiveField,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  mousePosition,
}) => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
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
              linear-gradient(45deg, rgba(220, 20, 60, 0.3), rgba(255, 69, 0, 0.2), rgba(255, 140, 0.3))
            `,
          }}
        />
        {/* floating shapes & particles (same as before) */}
      </div>

      {/* Main Card */}
      <div
        className={`relative z-10 w-full max-w-lg transform transition-all duration-1000 ${
          mounted
            ? "scale-100 rotate-0 opacity-100"
            : "scale-75 rotate-3 opacity-0"
        }`}
      >
        {/* Glow Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 rounded-3xl blur-sm opacity-60 animate-gradient-shift"></div>

        <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/50 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center relative">
              <div className="relative inline-block mb-6">
                <div className="relative w-24 h-24 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl">
                  <Crown className="w-12 h-12 text-white animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-red-500 via-yellow-500 to-orange-400 bg-clip-text text-transparent mb-4 animate-gradient-text">
                IRON THRONE
              </h1>
              <p className="text-orange-300 font-bold text-lg">
                ELITE GYM DOMINION
              </p>
              <p className="text-orange-400/70 text-sm">
                🔥 FORGE YOUR EMPIRE 🔥
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  onFocus={() => setActiveField("firstName")}
                  onBlur={() => setActiveField("")}
                  placeholder="First Name"
                  className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  onFocus={() => setActiveField("lastName")}
                  onBlur={() => setActiveField("")}
                  placeholder="Last Name"
                  className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
                />
              </div>

              {/* Mobile */}
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) =>
                  handleInputChange("mobileNumber", e.target.value)
                }
                onFocus={() => setActiveField("mobile")}
                onBlur={() => setActiveField("")}
                placeholder="Mobile Number"
                className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
              />

              {/* Email */}
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField("")}
                placeholder="Email Address"
                className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
              />

              {/* Password */}
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
                  className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-bold"
              >
                {isSubmitting ? "FORGING THRONE..." : "CLAIM THE THRONE"}
              </button>
            </form>

            {/* Privileges */}
            <div className="text-center">
              <h4 className="text-orange-300 font-bold text-sm">
                👑 THRONE PRIVILEGES 👑
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-orange-200/80 mt-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-400" /> Complete
                  Control
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-400" /> Elite Dashboard
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" /> Member
                  Management
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-400" /> Revenue Tracking
                </div>
              </div>
            </div>

            <p className="text-center text-orange-400/60 text-xs font-medium">
              FORGED IN IRON • BUILT FOR LEGENDS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
