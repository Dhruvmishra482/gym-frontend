import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  DollarSign,
  Clock,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Mail,
  MapPin,
  Users,
  Award,
} from "lucide-react";
import { getMemberByPhone, editMember } from "../services/memberService";

const EditMemberForm = () => {
  const { phoneNumber } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    age: "",
    gender: "",
    address: "",
    planDuration: "",
    feesAmount: "",
    nextDueDate: "",
    lastPaidOn: "",
    paymentStatus: "",
    joiningDate: "",
    paymentMethod: "",
    paymentNotes: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles for background animation
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);

    // Fetch member data when component mounts
    fetchMemberData();
  }, [phoneNumber]);

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getMemberByPhone(phoneNumber);

      if (result.success) {
        const member = result.data;

        // Format dates for input fields
        const formatDate = (dateString) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          return date.toISOString().split("T")[0];
        };

        setFormData({
          name: member.name || "",
          email: member.email || "",
          phoneNo: member.phoneNo || phoneNumber,
          age: member.age ? member.age.toString() : "",
          gender: member.gender || "",
          address: member.address || "",
          planDuration: member.planDuration || "",
          feesAmount: member.feesAmount ? member.feesAmount.toString() : "",
          nextDueDate: formatDate(member.nextDueDate),
          lastPaidOn: formatDate(member.lastPaidOn),
          paymentStatus: member.paymentStatus || "",
          joiningDate: formatDate(member.joiningDate),
          paymentMethod: member.paymentMethod || "",
          paymentNotes: member.paymentNotes || "",
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to load member data");
      console.error("Error fetching member:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      // Prepare update data with all editable fields
      const updateData = {};

      // Include all fields that can be updated
      if (formData.name && formData.name.trim() !== "") {
        updateData.name = formData.name.trim();
      }

      if (formData.email && formData.email.trim() !== "") {
        updateData.email = formData.email.trim();
      }

      if (formData.age && formData.age.trim() !== "") {
        updateData.age = parseInt(formData.age);
      }

      if (formData.gender && formData.gender.trim() !== "") {
        updateData.gender = formData.gender;
      }

      if (formData.address && formData.address.trim() !== "") {
        updateData.address = formData.address.trim();
      }

      if (formData.planDuration && formData.planDuration.trim() !== "") {
        updateData.planDuration = formData.planDuration;
      }

      if (formData.feesAmount && formData.feesAmount.trim() !== "") {
        updateData.feesAmount = parseFloat(formData.feesAmount);
      }

      if (formData.nextDueDate && formData.nextDueDate.trim() !== "") {
        updateData.nextDueDate = formData.nextDueDate;
      }

      if (formData.lastPaidOn && formData.lastPaidOn.trim() !== "") {
        updateData.lastPaidOn = formData.lastPaidOn;
      }

      if (formData.paymentStatus && formData.paymentStatus.trim() !== "") {
        updateData.paymentStatus = formData.paymentStatus;
      }

      if (formData.paymentMethod && formData.paymentMethod.trim() !== "") {
        updateData.paymentMethod = formData.paymentMethod;
      }

      if (formData.paymentNotes && formData.paymentNotes.trim() !== "") {
        updateData.paymentNotes = formData.paymentNotes.trim();
      }

      const result = await editMember(phoneNumber, updateData);

      if (result.success) {
        alert("Warrior evolved successfully! 🚀");
        navigate(-1);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to update warrior");
      console.error("Error updating member:", err);
    } finally {
      setSaving(false);
    }
  };

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-30"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );

  // Custom styles as a component to avoid jsx attribute issues
  const CustomStyles = () => (
    <style>
      {`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.2);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        .hover-rotate-y:hover {
          transform: perspective(1000px) rotateY(2deg) translateZ(20px);
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1em;
        }

        .floating-label {
          transition: all 0.3s ease;
        }

        .input-focused .floating-label {
          transform: translateY(-25px) scale(0.85);
          color: #ec4899;
        }

        .input-has-value .floating-label {
          transform: translateY(-25px) scale(0.85);
          color: #a855f7;
        }
      `}
    </style>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <CustomStyles />
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading warrior data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <CustomStyles />
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Error Loading Warrior
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <CustomStyles />
      <FloatingParticles />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-20 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Animated geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-500 opacity-20 transform rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 transform rotate-12 animate-bounce"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 transform -rotate-12 animate-pulse"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4 animate-pulse">
              WARRIOR
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              EVOLUTION CHAMBER
            </h2>
            <p className="text-gray-300 mt-4 text-lg">
              Enhancing:{" "}
              <span className="text-pink-400 font-semibold">
                {formData.name || "Unknown Warrior"}
              </span>
            </p>
          </div>

          {/* 3D Form Container */}
          <div className="relative">
            <div
              className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform-gpu hover-rotate-y transition-all duration-700 hover:shadow-pink-500/25"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl opacity-20 blur-xl animate-pulse"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Name Field */}
                  <div className="group">
                    <label className="block text-pink-300 text-sm font-semibold mb-2 tracking-wider">
                      🏆 WARRIOR NAME
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <User className="absolute left-4 top-4 text-pink-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter warrior name"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                        style={{
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                        }}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wider">
                      📧 COMMUNICATION PORTAL
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <Mail className="absolute left-4 top-4 text-cyan-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="warrior@battle.com"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Age Field */}
                  <div className="group">
                    <label className="block text-orange-300 text-sm font-semibold mb-2 tracking-wider">
                      🎂 WARRIOR AGE
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <User className="absolute left-4 top-4 text-orange-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Years of wisdom"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:shadow-lg focus:shadow-orange-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Gender Field */}
                  <div className="group">
                    <label className="block text-purple-300 text-sm font-semibold mb-2 tracking-wider">
                      ⚡ WARRIOR CLASS
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <Users className="absolute left-4 top-4 text-purple-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="" className="bg-gray-800">
                          Choose warrior class
                        </option>
                        <option value="Male" className="bg-gray-800">
                          ⚔️ Male Warrior
                        </option>
                        <option value="Female" className="bg-gray-800">
                          🛡️ Female Warrior
                        </option>
                        <option value="Others" className="bg-gray-800">
                          🌟 Mystic Warrior
                        </option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="group md:col-span-2">
                    <label className="block text-emerald-300 text-sm font-semibold mb-2 tracking-wider">
                      🏰 FORTRESS LOCATION
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <MapPin className="absolute left-4 top-4 text-emerald-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter fortress coordinates"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Plan Duration Field */}
                  <div className="group">
                    <label className="block text-yellow-300 text-sm font-semibold mb-2 tracking-wider">
                      ⏳ BATTLE DURATION
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <Calendar className="absolute left-4 top-4 text-yellow-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="planDuration"
                        value={formData.planDuration}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="" className="bg-gray-800">
                          Select training period
                        </option>
                        <option value="1 month" className="bg-gray-800">
                          🥉 1 Month - Rookie
                        </option>
                        <option value="3 month" className="bg-gray-800">
                          🥈 3 Months - Fighter
                        </option>
                        <option value="6 month" className="bg-gray-800">
                          🥇 6 Months - Champion
                        </option>
                        <option value="1 year" className="bg-gray-800">
                          👑 1 Year - Legend
                        </option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Fees Amount Field */}
                  <div className="group">
                    <label className="block text-green-300 text-sm font-semibold mb-2 tracking-wider">
                      💰 TRAINING INVESTMENT
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <DollarSign className="absolute left-4 top-4 text-green-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="number"
                        name="feesAmount"
                        value={formData.feesAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Payment Method Field */}
                  <div className="group">
                    <label className="block text-indigo-300 text-sm font-semibold mb-2 tracking-wider">
                      💳 PAYMENT METHOD
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <CreditCard className="absolute left-4 top-4 text-indigo-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="" className="bg-gray-800">
                          Choose payment method
                        </option>
                        <option value="Cash" className="bg-gray-800">
                          💵 Cash
                        </option>
                        <option value="Card" className="bg-gray-800">
                          💳 Card
                        </option>
                        <option value="UPI" className="bg-gray-800">
                          📱 UPI
                        </option>
                        <option value="Bank Transfer" className="bg-gray-800">
                          🏦 Bank Transfer
                        </option>
                        <option value="Other" className="bg-gray-800">
                          🔄 Other
                        </option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Next Due Date Field */}
                  <div className="group">
                    <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wider">
                      📅 NEXT BATTLE DATE
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <Clock className="absolute left-4 top-4 text-cyan-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="date"
                        name="nextDueDate"
                        value={formData.nextDueDate}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Last Paid On Field */}
                  <div className="group">
                    <label className="block text-purple-300 text-sm font-semibold mb-2 tracking-wider">
                      💎 LAST TRIBUTE DATE
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <Award className="absolute left-4 top-4 text-purple-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="date"
                        name="lastPaidOn"
                        value={formData.lastPaidOn}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Payment Status Field */}
                  <div className="group">
                    <label className="block text-red-300 text-sm font-semibold mb-2 tracking-wider">
                      ⚡ PAYMENT STATUS
                    </label>
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <CheckCircle className="absolute left-4 top-4 text-red-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="Paid" className="bg-gray-800">
                          ✅ Tribute Complete
                        </option>
                        <option value="Pending" className="bg-gray-800">
                          ⏳ Awaiting Tribute
                        </option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-12">
                  <button
                    type="submit"
                    disabled={saving}
                    className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-xl rounded-full transform hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                      boxShadow:
                        "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="relative z-10 tracking-wider flex items-center gap-3">
                      {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                      {saving ? "EVOLVING WARRIOR..." : "🚀 EVOLVE WARRIOR 🚀"}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </button>
                </div>

                {/* Read-only Information Section */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <h3 className="text-center text-lg font-semibold text-gray-300 mb-6">
                    🔒 WARRIOR CHRONICLES (Read-Only)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <label className="block text-blue-300 text-xs font-semibold mb-1 tracking-wider">
                        📞 CONTACT FREQUENCY
                      </label>
                      <p className="text-white text-lg font-mono">
                        {formData.phoneNo}
                      </p>
                    </div>

                    {/* Joining Date */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <label className="block text-rose-300 text-xs font-semibold mb-1 tracking-wider">
                        🎯 RECRUITMENT DATE
                      </label>
                      <p className="text-white text-lg">
                        {formData.joiningDate
                          ? new Date(formData.joiningDate).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemberForm;
