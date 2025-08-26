import { useState } from "react";
import {
  Eye,
  EyeOff,
  Dumbbell,
  Crown,
  Flame,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Camera,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { addMember, validateMemberData } from "../services/memberService";

const IronThroneGymForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    age: "",
    gender: "",
    email: "",
    joiningDate: new Date().toISOString().split("T")[0],
    planDuration: "",
    feesAmount: "",
    nextDueDate: "",
    paymentStatus: "Pending",
    lastPaidOn: "",
    address: "",
    photoUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async () => {
    // Validate data before submission
    const validation = validateMemberData(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      showNotification("error", "Please fix the validation errors below");
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      // Prepare data for API (remove empty fields)
      const memberData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      // Call the API
      const result = await addMember(memberData);

      if (result.success) {
        showNotification(
          "success",
          result.message ||
            "Welcome to the Iron Throne! Member registered successfully!"
        );

        // Reset form after successful submission
        setFormData({
          name: "",
          phoneNo: "",
          age: "",
          gender: "",
          email: "",
          joiningDate: new Date().toISOString().split("T")[0],
          planDuration: "",
          feesAmount: "",
          nextDueDate: "",
          paymentStatus: "Pending",
          lastPaidOn: "",
          address: "",
          photoUrl: "",
        });
      } else {
        showNotification(
          "error",
          result.message || "Failed to register member. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      showNotification(
        "error",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transform transition-all duration-500 ${
            notification.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="fixed top-4 left-4 z-50 bg-red-600 text-white p-4 rounded-xl shadow-2xl max-w-md">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">Validation Errors:</div>
              <ul className="text-sm space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Flames */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Flame className="w-4 h-4 text-orange-500 opacity-40 animate-bounce" />
          </div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full blur-2xl animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-full mb-6 shadow-2xl transform hover:rotate-12 transition-transform duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-red-600 rounded-full animate-ping opacity-20"></div>
              <Crown className="w-12 h-12 text-white relative z-10" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mb-2 tracking-wider drop-shadow-lg">
              IRON THRONE
            </h1>

            <div className="text-2xl font-bold text-amber-300 mb-2 tracking-wide">
              ELITE GYM DOMINION
            </div>

            <div className="flex items-center justify-center text-orange-300 font-semibold tracking-wider">
              <Flame className="w-4 h-4 mr-2 animate-pulse" />
              FORGE YOUR EMPIRE
              <Flame className="w-4 h-4 ml-2 animate-pulse" />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/30 overflow-hidden transform hover:scale-105 transition-all duration-700 hover:shadow-orange-500/50 relative">
            {/* Animated Top Border */}
            <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 animate-pulse"></div>

            {/* 3D Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none rounded-3xl"></div>

            <div className="p-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <User className="w-5 h-5 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter warrior name"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Phone className="w-5 h-5 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    required
                    placeholder="Contact number"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Age */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Users className="w-5 h-5 mr-2" />
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Joining Date */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Joining Date
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Plan Duration */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Plan Duration
                  </label>
                  <select
                    name="planDuration"
                    value={formData.planDuration}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  >
                    <option value="">Select Plan</option>
                    <option value="1 month">1 month</option>
                    <option value="3 month">3 months</option>
                    <option value="6 month">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>

                {/* Fees Amount */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Fees Amount *
                  </label>
                  <input
                    type="number"
                    name="feesAmount"
                    value={formData.feesAmount}
                    onChange={handleChange}
                    required
                    placeholder="Amount"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Next Due Date */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Next Due Date *
                  </label>
                  <input
                    type="date"
                    name="nextDueDate"
                    value={formData.nextDueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Payment Status */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Status
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {/* Last Paid On */}
                <div className="group">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Calendar className="w-5 h-5 mr-2" />
                    Last Paid On
                  </label>
                  <input
                    type="date"
                    name="lastPaidOn"
                    value={formData.lastPaidOn}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Address */}
                <div className="group md:col-span-2">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <MapPin className="w-5 h-5 mr-2" />
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Full address"
                    rows="3"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium resize-none"
                  />
                </div>

                {/* Photo URL */}
                <div className="group md:col-span-2">
                  <label className="flex items-center text-orange-300 font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    <Camera className="w-5 h-5 mr-2" />
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    placeholder="Photo URL (optional)"
                    className="w-full px-4 py-4 bg-slate-800/70 border-2 border-slate-700 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 hover:bg-slate-800/90 font-medium"
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-6 px-8 text-xl font-bold text-white rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 relative overflow-hidden ${
                      isSubmitting
                        ? "bg-slate-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 shadow-2xl hover:shadow-orange-500/50"
                    }`}
                  >
                    {/* Button Glow Effect */}
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-orange-400/20 to-red-400/20 animate-pulse rounded-xl"></div>
                    )}

                    <div className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          FORGING WARRIOR...
                        </>
                      ) : (
                        <>
                          <Dumbbell className="w-6 h-6 mr-3 animate-pulse" />
                          FORGE THE WARRIOR
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-6 text-orange-300/70 text-sm">
            Join the elite. Rule your fitness empire.
          </div>
        </div>
      </div>
    </div>
  );
};

export default IronThroneGymForm;
