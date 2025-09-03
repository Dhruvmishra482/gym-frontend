import React from "react";
import {
  User,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  UserCheck,
  Calendar,
  Crown,
  Shield,
  Zap,
  Star,
} from "lucide-react";

const MyProfileUI = ({
  // Data
  profile,
  formData,
  errors,

  // States
  isLoading,
  isEditing,
  isSaving,
  error,
  success,

  // Computed values
  fullName,
  profileCompletion,
  hasChanges,

  // Event handlers
  onEditClick,
  onCancel,
  onSave,
  onInputChange,
  onRefresh,
  clearError,
  clearSuccess,
}) => {
  // Loading state with Iron Throne theme
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gradient-to-r from-yellow-400 to-orange-500 border-t-transparent mx-auto mb-6"></div>
            <Crown className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-yellow-400 animate-pulse" />
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              Iron Throne Gym
            </h2>
            <p className="text-gray-300 animate-pulse">
              Loading your royal profile...
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (!profile && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-rose-800 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="text-center max-w-md mx-auto p-8 relative z-10">
          <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-red-500/20 shadow-2xl">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent mb-4">
              Failed to Load Profile
            </h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button
              onClick={onRefresh}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 group-hover:animate-spin" />
                <span>Try Again</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {/* Profile Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="h-3 w-3 text-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        {fullName}
                      </h1>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current animate-pulse"
                            style={{ animationDelay: `${i * 200}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg mb-2">
                      👑 Gym Overlord
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-400 font-medium">
                          {profile?.isVerified ? "Elite Member" : "Recruit"}
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400 font-medium">
                          Level 99 Admin
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {!isEditing && (
                    <>
                      <button
                        onClick={onRefresh}
                        className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="h-4 w-4 group-hover:animate-spin" />
                          <span>Refresh</span>
                        </div>
                      </button>
                      <button
                        onClick={onEditClick}
                        className="group relative bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-6 py-2 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        <div className="flex items-center space-x-2">
                          <Edit3 className="h-4 w-4 group-hover:animate-pulse" />
                          <span>Edit Profile</span>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Profile Completion */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-300">
                      Royal Profile Status
                    </span>
                  </div>
                  <span className="text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {profileCompletion}%
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                        profileCompletion === 100
                          ? "from-green-400 to-emerald-500"
                          : profileCompletion >= 75
                          ? "from-blue-400 to-purple-500"
                          : profileCompletion >= 50
                          ? "from-yellow-400 to-orange-500"
                          : "from-red-400 to-rose-500"
                      }`}
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Messages */}
          {success && (
            <div className="mb-6 transform animate-slideInDown">
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-green-300 font-medium">
                      {success}
                    </span>
                  </div>
                  <button
                    onClick={clearSuccess}
                    className="text-green-400 hover:text-green-300 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 transform animate-slideInDown">
              <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-red-300 font-medium">{error}</span>
                  </div>
                  <button
                    onClick={clearError}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl mb-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <User className="h-4 w-4 text-purple-400" />
                  <span>First Name *</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 ${
                        errors.firstName
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <div className="mt-2 flex items-center space-x-2 text-red-400 animate-slideInUp">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{errors.firstName}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 py-3 px-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <User className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-200 font-medium">
                      {profile?.firstName || "Not set"}
                    </span>
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <User className="h-4 w-4 text-purple-400" />
                  <span>Last Name *</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 ${
                        errors.lastName
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <div className="mt-2 flex items-center space-x-2 text-red-400 animate-slideInUp">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 py-3 px-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <User className="h-5 w-5 text-purple-400" />
                    <span className="text-gray-200 font-medium">
                      {profile?.lastName || "Not set"}
                    </span>
                  </div>
                )}
              </div>

              {/* Mobile Number */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-green-400" />
                  <span>Mobile Number *</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 ${
                        errors.mobileNumber
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter 10-digit mobile number"
                    />
                    {errors.mobileNumber && (
                      <div className="mt-2 flex items-center space-x-2 text-red-400 animate-slideInUp">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{errors.mobileNumber}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 py-3 px-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <Phone className="h-5 w-5 text-green-400" />
                    <span className="text-gray-200 font-medium">
                      {profile?.mobileNumber || "Not set"}
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>Email Address *</span>
                </label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onInputChange}
                      className={`w-full px-4 py-3 bg-black/30 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 ${
                        errors.email
                          ? "border-red-500 bg-red-500/10"
                          : "border-white/20 hover:border-white/30"
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <div className="mt-2 flex items-center space-x-2 text-red-400 animate-slideInUp">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{errors.email}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 py-3 px-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-200 font-medium">
                      {profile?.email || "Not set"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons for Editing */}
            {isEditing && (
              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
                <div className="flex space-x-4">
                  <button
                    onClick={onSave}
                    disabled={isSaving || !hasChanges}
                    className="group relative bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:hover:scale-100"
                  >
                    <div className="flex items-center space-x-2">
                      <Save
                        className={`h-5 w-5 ${
                          isSaving
                            ? "animate-spin"
                            : "group-hover:animate-pulse"
                        }`}
                      />
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </div>
                  </button>

                  <button
                    onClick={onCancel}
                    disabled={isSaving}
                    className="group relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <X className="h-5 w-5 group-hover:animate-pulse" />
                      <span>Cancel</span>
                    </div>
                  </button>
                </div>

                {hasChanges && (
                  <div className="flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-orange-500/30 animate-pulse">
                    <AlertCircle className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-orange-300 font-medium">
                      You have unsaved changes
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Account Information */}
          {profile && (
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Account Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span>Account Type</span>
                  </label>
                  <div className="flex items-center space-x-3 py-3 px-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl border border-yellow-500/30">
                    <UserCheck className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-200 font-bold capitalize">
                      {profile.accountType || "Owner"}
                    </span>
                    <div className="ml-auto flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>Member Since</span>
                  </label>
                  <div className="flex items-center space-x-3 py-3 px-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="text-gray-200 font-medium">
                      {profile.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Not available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out;
        }
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyProfileUI;
