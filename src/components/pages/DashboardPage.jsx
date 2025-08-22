import React, { useState, useEffect } from "react";
import {
  Eye,
  Plus,
  X,
  Crown,
  Flame,
  Shield,
  Zap,
  Calendar,
  Phone,
  CreditCard,
  User,
  Mail,
  MapPin,
  Search,
} from "lucide-react";

const DashboardPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Sample member data
  const [membersData] = useState([
    {
      id: 1,
      name: "Arya Stark",
      phone: "+91 98765 43210",
      joiningDate: "2024-01-15",
      planDuration: "12 months",
      feesAmount: "₹15,000",
      nextDueDate: "2025-08-22",
      paymentStatus: "Pending",
      gender: "Female",
      age: 22,
      email: "arya.stark@winterfell.com",
      address: "House Stark, Winterfell, The North",
    },
    {
      id: 2,
      name: "Jon Snow",
      phone: "+91 98765 43211",
      joiningDate: "2023-12-01",
      planDuration: "6 months",
      feesAmount: "₹8,500",
      nextDueDate: "2025-09-01",
      paymentStatus: "Paid",
      gender: "Male",
      age: 25,
      email: "jon.snow@nightswatch.com",
      address: "Castle Black, The Wall",
    },
    {
      id: 3,
      name: "Daenerys Targaryen",
      phone: "+91 98765 43212",
      joiningDate: "2024-02-20",
      planDuration: "12 months",
      feesAmount: "₹20,000",
      nextDueDate: "2025-08-22",
      paymentStatus: "Pending",
      gender: "Female",
      age: 23,
      email: "khaleesi@dragonstone.com",
      address: "Dragonstone Castle, Blackwater Bay",
    },
    {
      id: 4,
      name: "Tyrion Lannister",
      phone: "+91 98765 43213",
      joiningDate: "2024-01-10",
      planDuration: "6 months",
      feesAmount: "₹12,000",
      nextDueDate: "2025-08-25",
      paymentStatus: "Paid",
      gender: "Male",
      age: 35,
      email: "tyrion@lannister.com",
      address: "Casterly Rock, Westerlands",
    },
    {
      id: 5,
      name: "Sansa Stark",
      phone: "+91 98765 43214",
      joiningDate: "2024-03-05",
      planDuration: "12 months",
      feesAmount: "₹18,000",
      nextDueDate: "2025-09-05",
      paymentStatus: "Paid",
      gender: "Female",
      age: 20,
      email: "sansa@winterfell.com",
      address: "House Stark, Winterfell, The North",
    },
    {
      id: 6,
      name: "Jaime Lannister",
      phone: "+91 98765 43215",
      joiningDate: "2024-01-25",
      planDuration: "6 months",
      feesAmount: "₹10,500",
      nextDueDate: "2025-08-22",
      paymentStatus: "Pending",
      gender: "Male",
      age: 40,
      email: "jaime@kingsguard.com",
      address: "King's Landing, Crownlands",
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isDateToday = (dateString) => {
    const today = new Date().toISOString().split("T")[0];
    return dateString === today;
  };

  const filteredMembers = membersData.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );

  const stats = {
    totalMembers: membersData.length,
    dueToday: membersData.filter((m) => isDateToday(m.nextDueDate)).length,
    monthlyRevenue: "₹1.2L",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white font-sans relative overflow-hidden">
      {/* 3D Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate3d(${mousePosition.x * (i % 3)}px, ${
                mousePosition.y * (i % 2)
              }px, 0px)`,
              transition: "transform 0.3s ease-out",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Header with 3D Effect */}
      <header
        className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-orange-500/30"
        style={{
          transform: `perspective(1000px) rotateX(${
            mousePosition.y * 0.1
          }deg) rotateY(${mousePosition.x * 0.1}deg)`,
        }}
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Clean Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Crown className="w-8 h-8 text-orange-500" />
                <div className="absolute inset-0 blur-lg bg-orange-500/50 rounded-full"></div>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wider">
                IRON THRONE
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search warriors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300 w-80"
              />
            </div>

            {/* Clean Stats */}
            <div className="flex gap-6">
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.totalMembers}
                </div>
                <div className="text-sm text-gray-400">Warriors</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-red-400">
                  {stats.dueToday}
                </div>
                <div className="text-sm text-gray-400">Due Today</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-3xl font-bold text-green-400">
                  {stats.monthlyRevenue}
                </div>
                <div className="text-sm text-gray-400">Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Clean Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Elite Warriors</h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* 3D Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000">
          {filteredMembers.map((member, index) => {
            const isDueToday = isDateToday(member.nextDueDate);
            const isPending = member.paymentStatus.toLowerCase() === "pending";

            return (
              <div
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setIsModalOpen(true);
                }}
                className="group cursor-pointer transform-gpu transition-all duration-500 preserve-3d hover:rotate-y-12 hover:translate-z-20"
                style={{
                  transform: `
                    perspective(1000px) 
                    rotateX(${mousePosition.y * 0.02}deg) 
                    rotateY(${mousePosition.x * 0.02}deg)
                    translateZ(${index * 2}px)
                  `,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card with Glass Morphism */}
                <div
                  className={`
                  relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 h-full
                  transition-all duration-500 group-hover:bg-white/10 group-hover:border-orange-500/50
                  group-hover:shadow-2xl group-hover:shadow-orange-500/20
                  ${
                    isPending
                      ? "ring-2 ring-red-500/50 shadow-lg shadow-red-500/20"
                      : ""
                  }
                `}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`
                      w-4 h-4 rounded-full shadow-lg
                      ${
                        isPending
                          ? "bg-red-500 shadow-red-500/50 animate-pulse"
                          : "bg-green-500 shadow-green-500/50"
                      }
                    `}
                    ></div>
                  </div>

                  {/* Member Name */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>{member.planDuration}</span>
                    </div>
                  </div>

                  {/* Key Info Grid */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Phone</span>
                      <span className="text-white font-medium">
                        {member.phone}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Fees</span>
                      <span className="text-white font-medium">
                        {member.feesAmount}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Next Due</span>
                      <span
                        className={`font-medium flex items-center gap-1 ${
                          isDueToday ? "text-red-400" : "text-white"
                        }`}
                      >
                        {formatDate(member.nextDueDate)}
                        {isDueToday && (
                          <Flame className="w-4 h-4 animate-pulse" />
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Status</span>
                      <span
                        className={`font-medium ${
                          isPending ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {member.paymentStatus}
                      </span>
                    </div>
                  </div>

                  {/* 3D Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Enhanced 3D Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal with 3D Transform */}
          <div
            className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full transform transition-all duration-700 scale-100"
            style={{
              transform: `
                perspective(1000px) 
                rotateX(${mousePosition.y * 0.05}deg) 
                rotateY(${mousePosition.x * 0.05}deg)
                translateZ(50px)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transform hover:rotate-90 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-white">
                  {selectedMember.name}
                </h2>
              </div>
              <div className="text-gray-400">Complete Member Profile</div>
            </div>

            {/* Clean Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Phone, label: "Phone", value: selectedMember.phone },
                { icon: Mail, label: "Email", value: selectedMember.email },
                {
                  icon: User,
                  label: "Details",
                  value: `${selectedMember.gender}, ${selectedMember.age} years`,
                },
                {
                  icon: Calendar,
                  label: "Joined",
                  value: formatDate(selectedMember.joiningDate),
                },
                {
                  icon: Zap,
                  label: "Plan",
                  value: selectedMember.planDuration,
                },
                {
                  icon: CreditCard,
                  label: "Fees",
                  value: selectedMember.feesAmount,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10 transform hover:scale-105 hover:bg-white/10 transition-all duration-300"
                  style={{
                    transform: `translateZ(${index * 5}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-400 text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-white font-semibold">{item.value}</div>
                </div>
              ))}

              {/* Due Date - Special Highlighting */}
              <div
                className={`
                p-4 rounded-2xl border transform hover:scale-105 transition-all duration-300
                ${
                  isDateToday(selectedMember.nextDueDate)
                    ? "bg-red-500/10 border-red-500/50 shadow-red-500/20"
                    : "bg-white/5 border-white/10"
                }
              `}
                style={{
                  transform: "translateZ(30px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400 text-sm font-medium">
                    Next Due
                  </span>
                </div>
                <div
                  className={`font-semibold flex items-center gap-2 ${
                    isDateToday(selectedMember.nextDueDate)
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {formatDate(selectedMember.nextDueDate)}
                  {isDateToday(selectedMember.nextDueDate) && (
                    <Flame className="w-5 h-5 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Address - Full Width */}
              <div
                className="md:col-span-2 bg-white/5 p-4 rounded-2xl border border-white/10 transform hover:scale-105 hover:bg-white/10 transition-all duration-300"
                style={{
                  transform: "translateZ(40px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400 text-sm font-medium">
                    Address
                  </span>
                </div>
                <div className="text-white font-semibold">
                  {selectedMember.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl shadow-orange-500/30 text-white transform hover:scale-110 hover:rotate-180 transition-all duration-500 z-50"
        style={{
          transform: `translateZ(100px) scale(${1 + mousePosition.x * 0.001})`,
          transformStyle: "preserve-3d",
        }}
      >
        <Plus className="w-6 h-6 mx-auto" />
      </button>

      {/* Custom 3D Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .rotate-y-12:hover {
          transform: perspective(1000px) rotateY(12deg) translateZ(20px);
        }

        .translate-z-20 {
          transform: translateZ(20px);
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
