import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Award,
  Star,
  ChevronLeft,
  Search,
  Settings,
  Eye,
  EyeOff,
  Crown,
  Shield,
  Flame,
} from "lucide-react";

const MemberCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCard, setShowCard] = useState(false);

  // Sample member data based on your schema
  const memberData = {
    name: "Alexandra Johnson",
    phoneNo: "+1 (555) 123-4567",
    age: 28,
    gender: "Female",
    email: "alexandra.johnson@email.com",
    joiningDate: new Date("2022-03-15"),
    planDuration: "6 month",
    feesAmount: 15000,
    nextDueDate: new Date("2025-09-15"),
    paymentStatus: "Paid",
    lastPaidOn: new Date("2025-03-15"),
    address: "123 Fitness Street, New York, NY 10001",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowCard(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(memberData.nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!showCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background throne elements */}
        <div className="absolute inset-0">
          <Crown className="absolute top-10 left-10 w-16 h-16 text-orange-400/20 animate-pulse" />
          <Shield className="absolute top-20 right-20 w-20 h-20 text-red-400/20 animate-pulse delay-700" />
          <Flame className="absolute bottom-20 left-20 w-18 h-18 text-orange-500/20 animate-pulse delay-1000" />
          <Crown className="absolute bottom-10 right-10 w-14 h-14 text-red-400/20 animate-pulse delay-500" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-20 left-20 w-36 h-36 bg-orange-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div
          className={`bg-gradient-to-b from-orange-900/40 to-red-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-500/30 p-8 w-full max-w-md transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-3 shadow-lg relative">
              <Crown className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Flame className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              IRON THRONE
            </h1>
            <p className="text-orange-300/70 text-sm font-medium tracking-wide">
              🔥 ELITE GYM DOMINION 🔥
            </p>
            <p className="text-orange-400/60 text-xs mt-2">
              ⚡ MEMBERS ONLY ACCESS ⚡
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter member phone or name..."
                className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur-sm border border-orange-500/30 rounded-xl text-orange-100 placeholder-orange-300/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400/50" />
            </div>

            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 uppercase tracking-wider"
            >
              👑 CLAIM THE THRONE 👑
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-orange-400/60 text-xs">
              FORGED IN IRON • BUILT FOR LEGENDS
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 p-4 relative overflow-hidden">
      {/* Background throne elements */}
      <div className="absolute inset-0">
        <Crown className="absolute top-10 left-10 w-12 h-12 text-orange-400/10 animate-pulse" />
        <Shield className="absolute top-40 right-10 w-16 h-16 text-red-400/10 animate-pulse delay-700" />
        <Flame className="absolute bottom-40 left-10 w-14 h-14 text-orange-500/10 animate-pulse delay-1000" />
        <Crown className="absolute bottom-10 right-20 w-10 h-10 text-red-400/10 animate-pulse delay-500" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-orange-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowCard(false)}
            className="flex items-center space-x-2 text-orange-300/70 hover:text-orange-300 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Search</span>
          </button>
          <div className="flex space-x-3">
            <button className="p-3 bg-orange-900/30 backdrop-blur-sm rounded-xl border border-orange-500/20 text-orange-300 hover:bg-orange-800/40 transition-all duration-300">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Member Card 3D */}
        <div className="flex justify-center">
          <div className="perspective-1000">
            <div
              className={`relative w-96 h-72 transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
                cardFlipped ? "rotate-y-180" : ""
              }`}
              onClick={() => setCardFlipped(!cardFlipped)}
            >
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full bg-gradient-to-br from-orange-800 via-red-800 to-slate-800 rounded-2xl shadow-2xl border border-orange-500/30 p-6 relative overflow-hidden">
                  {/* Card background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Crown className="absolute top-4 right-4 w-24 h-24 text-orange-400" />
                    <Flame className="absolute bottom-4 left-4 w-20 h-20 text-red-400" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-orange-300 text-sm font-bold tracking-wide">
                          IRON THRONE
                        </h3>
                        <p className="text-orange-400/80 text-xs">
                          ELITE MEMBER
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-400/30">
                        <Crown className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-300 text-sm font-bold">
                          {memberData.planDuration.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="space-y-3">
                      <h2 className="text-white text-2xl font-bold">
                        {memberData.name}
                      </h2>
                      <p className="text-orange-300/80 text-sm">
                        Phone: {memberData.phoneNo}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-orange-300/70 text-sm">
                          <Award className="w-4 h-4" />
                          <span>₹{memberData.feesAmount.toLocaleString()}</span>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            memberData.paymentStatus === "Paid"
                              ? "bg-green-500/20 text-green-300 border border-green-400/30"
                              : "bg-red-500/20 text-red-300 border border-red-400/30"
                          }`}
                        >
                          {memberData.paymentStatus.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/5 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                </div>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                <div className="w-full h-full bg-gradient-to-br from-red-800 via-orange-800 to-slate-800 rounded-2xl shadow-2xl border border-red-500/30 p-6 relative overflow-hidden">
                  <div className="relative z-10 h-full">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-orange-400/30">
                        <img
                          src={memberData.avatar}
                          alt="Member Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white text-lg font-bold">
                        {memberData.name}
                      </h3>
                      <p className="text-orange-300/70 text-sm">
                        {memberData.age} years • {memberData.gender}
                      </p>
                    </div>

                    <div className="space-y-2 text-orange-200/80 text-sm">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-orange-400" />
                        <span className="truncate">{memberData.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <span className="truncate">{memberData.address}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span>
                          Joined: {formatDate(memberData.joiningDate)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-red-400" />
                        <span>Due: {formatDate(memberData.nextDueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Click to flip hint */}
        <div className="text-center mt-6">
          <p className="text-orange-400/60 text-sm animate-pulse">
            Click the throne card to reveal member secrets
          </p>
        </div>

        {/* Member Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              label: "Plan Amount",
              value: `₹${memberData.feesAmount.toLocaleString()}`,
              icon: Award,
              color: "from-orange-500 to-red-500",
              bg: "from-orange-900/30 to-red-900/30",
            },
            {
              label: "Days Until Due",
              value:
                getDaysUntilDue() > 0 ? `${getDaysUntilDue()} days` : "Overdue",
              icon: Calendar,
              color:
                getDaysUntilDue() > 7
                  ? "from-green-500 to-emerald-500"
                  : getDaysUntilDue() > 0
                  ? "from-yellow-500 to-orange-500"
                  : "from-red-500 to-red-600",
              bg:
                getDaysUntilDue() > 7
                  ? "from-green-900/30 to-emerald-900/30"
                  : getDaysUntilDue() > 0
                  ? "from-yellow-900/30 to-orange-900/30"
                  : "from-red-900/30 to-red-900/30",
            },
            {
              label: "Last Payment",
              value: formatDate(memberData.lastPaidOn).split(",")[0],
              icon: Star,
              color: "from-purple-500 to-pink-500",
              bg: "from-purple-900/30 to-pink-900/30",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bg} backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 transform rotate-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-orange-300/80 text-sm font-medium mb-2">
                {stat.label}
              </h3>
              <p className="text-white text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Payment Status Alert */}
        {getDaysUntilDue() <= 7 && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div
              className={`p-4 rounded-xl border ${
                getDaysUntilDue() <= 0
                  ? "bg-red-900/30 border-red-500/30 text-red-200"
                  : "bg-yellow-900/30 border-yellow-500/30 text-yellow-200"
              } backdrop-blur-md`}
            >
              <div className="flex items-center space-x-3">
                <Flame
                  className={`w-5 h-5 ${
                    getDaysUntilDue() <= 0 ? "text-red-400" : "text-yellow-400"
                  }`}
                />
                <span className="font-medium">
                  {getDaysUntilDue() <= 0
                    ? "Payment Overdue! Throne privileges suspended."
                    : `Payment due in ${getDaysUntilDue()} days. Secure your throne!`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default MemberCard;
