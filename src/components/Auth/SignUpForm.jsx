import { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Crown,
  User,
  Mail,
  Phone,
  Lock,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Dumbbell,
  Zap,
  Target,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({
  mounted,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  activeField,
  setActiveField,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  mousePosition,
}) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const navigate = useNavigate();

  const slogans = [
    "Transform Your Body, Transform Your Life",
    "Where Champions Are Made",
    "Push Your Limits, Break Your Barriers",
    "Strength Begins Here",
    "Your Journey to Greatness Starts Today"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getFieldIcon = (field) => {
    switch (field) {
      case "firstName":
        return <User className="w-5 h-5" />;
      case "lastName":
        return <User className="w-5 h-5" />;
      case "mobileNumber":
        return <Phone className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "password":
        return <Lock className="w-5 h-5" />;
      case "confirmPassword":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getFieldPlaceholder = (field) => {
    switch (field) {
      case "firstName":
        return "First Name";
      case "lastName":
        return "Last Name";
      case "mobileNumber":
        return "Mobile Number";
      case "email":
        return "Email Address";
      case "password":
        return "Password";
      case "confirmPassword":
        return "Confirm Password";
      default:
        return "";
    }
  };

  const getFieldColor = (field) => {
    switch (field) {
      case "firstName":
        return "blue";
      case "lastName":
        return "purple";
      case "mobileNumber":
        return "green";
      case "email":
        return "orange";
      case "password":
        return "indigo";
      case "confirmPassword":
        return "emerald";
      default:
        return "blue";
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword;

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-400/10 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-40 right-10 w-20 h-20 bg-blue-300/20 rounded-full animate-bounce animation-delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
          {/* Logo */}
          <div className="mb-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-2xl transform group-hover:scale-110 transition-all duration-300">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              IRON THRONE
            </h1>
            <p className="text-blue-200 text-lg font-medium">FITNESS EMPIRE</p>
          </div>

          {/* Animated Slogan */}
          <div className="mb-8 h-16 flex items-center">
            <h2 className="text-2xl font-bold text-center leading-tight animate-in slide-in-from-bottom-3 duration-500" key={currentSlogan}>
              {slogans[currentSlogan]}
            </h2>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 max-w-sm">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Goal Tracking</h3>
                <p className="text-blue-200 text-sm">Track your fitness progress</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Expert Training</h3>
                <p className="text-blue-200 text-sm">Professional guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Achievement System</h3>
                <p className="text-blue-200 text-sm">Celebrate your victories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-white via-blue-50 to-white shadow-sm border-b border-blue-100 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Iron Throne
              </h1>
              <p className="text-sm text-gray-600">Create your account</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-md mx-auto">
            {/* Mobile Logo (visible on small screens) */}
            <div className="lg:hidden text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IRON THRONE GYM
              </h2>
              <p className="text-gray-600 text-sm">Start Your Fitness Journey</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <h3 className="font-semibold">Create Account</h3>
                <p className="text-blue-100 text-sm">Join thousands of fitness enthusiasts</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(formData).map((field, index) => {
                    const color = getFieldColor(field);
                    const isActive = activeField === field;
                    const hasValue = formData[field];
                    const isConfirmField = field === "confirmPassword";
                    const isPasswordField = field === "password";
                    const isFullWidth = field === "email" || field === "password" || field === "confirmPassword";
                    
                    return (
                      <div key={field} className={isFullWidth ? "md:col-span-2" : ""}>
                        <label className={`block text-sm font-medium mb-2 transition-colors ${
                          isActive ? `text-${color}-600` : 'text-gray-700'
                        }`}>
                          <div className="flex items-center gap-2">
                            <span className={`transition-colors ${
                              isActive ? `text-${color}-500` : 'text-gray-400'
                            }`}>
                              {getFieldIcon(field)}
                            </span>
                            {getFieldPlaceholder(field)} {["firstName", "lastName", "email", "mobileNumber"].includes(field) ? "*" : ""}
                          </div>
                        </label>

                        <div className="relative">
                          <input
                            type={
                              field === "email"
                                ? "email"
                                : field === "mobileNumber"
                                ? "tel"
                                : field === "password" && !showPassword
                                ? "password"
                                : field === "confirmPassword" && !showConfirmPassword
                                ? "password"
                                : "text"
                            }
                            value={formData[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            onFocus={() => setActiveField(field)}
                            onBlur={() => setActiveField("")}
                            placeholder={`Enter ${getFieldPlaceholder(field).toLowerCase()}`}
                            className={`
                              w-full px-4 py-3 border rounded-lg transition-all duration-200 text-sm
                              ${isActive 
                                ? `border-${color}-500 ring-2 ring-${color}-500 ring-opacity-20 shadow-sm` 
                                : isConfirmField && formData[field] && !isPasswordMatch
                                ? 'border-red-500 ring-2 ring-red-500 ring-opacity-20'
                                : isConfirmField && isPasswordMatch
                                ? 'border-green-500 ring-2 ring-green-500 ring-opacity-20'
                                : 'border-gray-300 hover:border-gray-400'
                              }
                              focus:outline-none
                            `}
                          />

                          {/* Password Toggle Buttons */}
                          {isPasswordField && (
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          )}

                          {isConfirmField && (
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          )}

                          {/* Field Validation Icons */}
                          {hasValue && !isConfirmField && (
                            <div className="absolute -top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}

                          {isConfirmField && hasValue && (
                            <div className={`absolute -top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200 ${
                              isPasswordMatch ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Password Match Indicator */}
                        {isConfirmField && hasValue && (
                          <div className={`text-xs mt-1 transition-all duration-300 ${
                            isPasswordMatch ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isPasswordMatch ? 'Passwords match' : 'Passwords do not match'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`
                      w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3
                      ${isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:scale-105'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Dumbbell className="w-5 h-5" />
                        Start Your Journey
                      </>
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
                  <button
                    onClick={navigateToLogin}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group text-sm"
                  >
                    <span>Sign in here</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
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
      `}</style>
    </div>
  );
};

export default SignUpForm;