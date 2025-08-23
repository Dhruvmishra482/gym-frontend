import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  DollarSign,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";

const EditMemberForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    planDuration: "",
    feesAmount: "",
    nextDueDate: "",
    lastPaidOn: "",
    paymentStatus: "",
  });

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
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here
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
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-30px) rotate(180deg) scale(1.2);
          }
        }
      `}</style>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <FloatingParticles />

      {/* Animated geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-orange-500 opacity-20 transform rotate-45 animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 transform rotate-12 animate-bounce"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 transform -rotate-12 animate-pulse"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4 animate-pulse">
              WARRIOR
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              EVOLUTION
            </h2>
            <p className="text-gray-300 mt-4 text-lg">
              Transform • Upgrade • Dominate
            </p>
          </div>

          {/* 3D Form Container */}
          <div className="relative">
            <div
              className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform-gpu hover:rotate-y-2 transition-all duration-700 hover:shadow-pink-500/25"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl opacity-20 blur-xl animate-pulse"></div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Age Field */}
                  <div className="group">
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <User className="absolute left-4 top-4 text-pink-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Warrior Age"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                        style={{
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                        }}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Plan Duration Field */}
                  <div className="group">
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <Calendar className="absolute left-4 top-4 text-orange-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="planDuration"
                        value={formData.planDuration}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-orange-400 focus:shadow-lg focus:shadow-orange-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="" className="bg-gray-800">
                          Select Battle Duration
                        </option>
                        <option value="1month" className="bg-gray-800">
                          1 Month - Rookie
                        </option>
                        <option value="3months" className="bg-gray-800">
                          3 Months - Fighter
                        </option>
                        <option value="6months" className="bg-gray-800">
                          6 Months - Champion
                        </option>
                        <option value="12months" className="bg-gray-800">
                          12 Months - Legend
                        </option>
                      </select>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Fees Amount Field */}
                  <div className="group">
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <DollarSign className="absolute left-4 top-4 text-green-400 w-6 h-6 group-hover:animate-bounce" />
                      <input
                        type="number"
                        name="feesAmount"
                        value={formData.feesAmount}
                        onChange={handleInputChange}
                        placeholder="Training Investment"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Next Due Date Field */}
                  <div className="group">
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
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
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:rotate-1">
                      <CreditCard className="absolute left-4 top-4 text-purple-400 w-6 h-6 group-hover:animate-bounce" />
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
                    <div className="relative transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
                      <CheckCircle className="absolute left-4 top-4 text-red-400 w-6 h-6 group-hover:animate-bounce" />
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:border-red-400 focus:shadow-lg focus:shadow-red-400/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 appearance-none"
                      >
                        <option value="" className="bg-gray-800">
                          Battle Status
                        </option>
                        <option value="paid" className="bg-gray-800">
                          ✅ Victory Secured
                        </option>
                        <option value="pending" className="bg-gray-800">
                          ⏳ Battle Pending
                        </option>
                        <option value="overdue" className="bg-gray-800">
                          ⚠️ Mission Failed
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
                    className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-xl rounded-full transform hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/50 active:scale-95"
                    style={{
                      textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                      boxShadow:
                        "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <span className="relative z-10 tracking-wider">
                      EVOLVE WARRIOR
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        .hover\\:rotate-y-2:hover {
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
      `}</style>
    </div>
  );
};

export default EditMemberForm;
