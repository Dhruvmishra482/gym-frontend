import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Dumbbell,
} from "lucide-react";

const AddMemberForm = () {
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Member data:", formData);
      alert("Member added successfully!");
      setIsSubmitting(false);
      // Reset form
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
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-600 rounded-full opacity-5 animate-spin duration-20000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full mb-6 shadow-2xl transform hover:rotate-12 transition-transform duration-500">
            <Dumbbell className="w-10 h-10 text-white animate-bounce" />
          </div>
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mb-4 tracking-wider">
            BEAST MODE
          </h1>
          <p className="text-xl text-gray-300 font-light tracking-wide">
            Register New Warrior
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-black/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/30 overflow-hidden transform hover:scale-105 transition-all duration-700 hover:shadow-red-900/50">
          <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 h-2 animate-pulse"></div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <User className="w-5 h-5 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                  placeholder="Enter warrior name"
                />
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                  placeholder="Contact number"
                />
              </div>

              {/* Age Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Users className="w-5 h-5 mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                  placeholder="Age"
                />
              </div>

              {/* Gender Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <User className="w-5 h-5 mr-2" />
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                  placeholder="email@example.com"
                />
              </div>

              {/* Joining Date Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                />
              </div>

              {/* Plan Duration Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Plan Duration
                </label>
                <select
                  name="planDuration"
                  value={formData.planDuration}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                >
                  <option value="">Select Plan</option>
                  <option value="1 month">1 Month - Quick Start</option>
                  <option value="3 month">3 Months - Power Pack</option>
                  <option value="6 month">6 Months - Beast Mode</option>
                  <option value="1 year">1 Year - Ultimate Warrior</option>
                </select>
              </div>

              {/* Fees Amount Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Fees Amount *
                </label>
                <input
                  type="number"
                  name="feesAmount"
                  value={formData.feesAmount}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                  placeholder="Amount in ₹"
                />
              </div>

              {/* Next Due Date Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Next Due Date
                </label>
                <input
                  type="date"
                  name="nextDueDate"
                  value={formData.nextDueDate}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                />
              </div>

              {/* Payment Status Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                >
                  <option value="Paid">Paid ✓</option>
                  <option value="Pending">Pending ⏳</option>
                </select>
              </div>

              {/* Last Paid On Field */}
              <div className="group">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <Calendar className="w-5 h-5 mr-2" />
                  Last Paid On
                </label>
                <input
                  type="date"
                  name="lastPaidOn"
                  value={formData.lastPaidOn}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                />
              </div>

              {/* Address Field - Full width */}
              <div className="group md:col-span-2">
                <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                  <MapPin className="w-5 h-5 mr-2" />
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 resize-none"
                  placeholder="Full address"
                />
              </div>

              {/* Submit Button - Full width */}
              <div className="md:col-span-2 mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-6 px-8 text-xl font-bold text-white rounded-xl transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 shadow-2xl hover:shadow-red-900/50"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      REGISTERING WARRIOR...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 mr-3 animate-pulse" />
                      FORGE THE WARRIOR
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberForm;