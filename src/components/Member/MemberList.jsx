import React, { useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

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
  Edit,
  ChevronDown,
  LogOut,
  Users,
  Settings,
} from "lucide-react";

const MemberList = ({
  members,
  stats,
  searchTerm,
  setSearchTerm,
  mousePosition,
  selectedMember,
  setSelectedMember,
  isModalOpen,
  setIsModalOpen,
  profileProps,
}) => {
  const navigate = useNavigate();
  const profileRef = useRef(null);
  
  // Destructure profile props
  const {
    user,
    isProfileOpen,
    setIsProfileOpen,
    getOwnerDisplayName,
    getOwnerInitials,
    handleLogout,
    handleProfileClick,
    handleMembersClick,
  } = profileProps;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsProfileOpen]);

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

  // Fallback image generator for error cases
  const getFallbackImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=f97316&color=fff&size=80&rounded=true`;
  };

  const handleEditMember = (member) => {
    console.log("Edit member:", member);
    setIsModalOpen(false);
    navigate(`/edit-member/${member.id}`);
  };

  const handleAddMember = () => {
    console.log("Add new member");
    navigate("/add-member");
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

      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-orange-500/30"
        style={{
          transform: `perspective(1000px) rotateX(${
            mousePosition.y * 0.1
          }deg) rotateY(${mousePosition.x * 0.1}deg)`,
        }}
      >
        <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold tracking-wider">IRON THRONE</h1>
          </div>

          {/* Center Section - Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search warriors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all w-80"
            />
          </div>

          {/* Right Section - Stats and Profile */}
          <div className="flex items-center gap-6">
            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">
                  {stats.totalMembers}
                </div>
                <div className="text-sm text-gray-400">Warriors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {stats.dueToday}
                </div>
                <div className="text-sm text-gray-400">Due Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {stats.monthlyRevenue}
                </div>
                <div className="text-sm text-gray-400">Revenue</div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 transition-all duration-300 group"
              >
                {/* Profile Image/Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500/30 group-hover:border-orange-500/50 transition-all">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={getOwnerDisplayName()}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm ${user?.profileImage ? 'hidden' : 'flex'}`}
                  >
                    {getOwnerInitials()}
                  </div>
                </div>

                {/* Name and Chevron */}
                <div className="flex items-center gap-2">
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">
                      {getOwnerDisplayName()}
                    </div>
                    <div className="text-xs text-gray-400">Owner</div>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  {/* User Info Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/30">
                        {user?.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={getOwnerDisplayName()}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold ${user?.profileImage ? 'hidden' : 'flex'}`}
                        >
                          {getOwnerInitials()}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {getOwnerDisplayName()}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user?.email || 'owner@gym.com'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <User className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                      <span className="text-gray-300 group-hover:text-white">My Profile</span>
                    </button>

                    <button
                      onClick={handleMembersClick}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <Users className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                      <span className="text-gray-300 group-hover:text-white">My Members</span>
                    </button>

                    <div className="border-t border-white/10 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-500/10 transition-colors duration-200 group"
                    >
                      <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                      <span className="text-gray-300 group-hover:text-red-300">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Members Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-center mb-12">Elite Warriors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000">
          {members.map((member, index) => {
            const isDueToday = isDateToday(member.nextDueDate);
            const isPending = member.paymentStatus.toLowerCase() === "pending";
            return (
              <div
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer transform-gpu transition-all duration-500 preserve-3d group hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateX(${
                    mousePosition.y * 0.02
                  }deg) rotateY(${mousePosition.x * 0.02}deg) translateZ(${
                    index * 2
                  }px)`,
                }}
              >
                <div
                  className={`relative bg-white/5 backdrop-blur-2xl border rounded-3xl p-6 h-full transition-all overflow-hidden ${
                    isPending
                      ? "ring-2 ring-red-500/50 border-red-500/30"
                      : "border-white/10"
                  } group-hover:bg-white/10 group-hover:border-orange-500/50`}
                >
                  {/* Status Indicator */}
                  {isDueToday && (
                    <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}

                  {/* Card Content - Flex Layout */}
                  <div className="flex gap-4 h-full">
                    {/* Left Side - Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white truncate">
                          {member.name}
                        </h3>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span>{member.planDuration}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <Phone className="w-4 h-4 text-orange-400" />
                            <span className="truncate">{member.phone}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <CreditCard className="w-4 h-4 text-orange-400" />
                            <span>{member.feesAmount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <div
                          className={`text-sm font-medium ${
                            isDueToday ? "text-red-400" : "text-gray-300"
                          }`}
                        >
                          Due: {formatDate(member.nextDueDate)}
                        </div>

                        <div
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            isPending
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-green-500/20 text-green-400 border border-green-500/30"
                          }`}
                        >
                          {member.paymentStatus}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-500/30 group-hover:border-orange-500/50 transition-all">
                        <img
                          src={member.photoUrl || getFallbackImage(member.name)}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = getFallbackImage(member.name);
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={() => handleEditMember(selectedMember)}
                className="p-2 bg-blue-500/20 rounded-full hover:bg-blue-500/30 transition-colors group"
                title="Edit Member"
              >
                <Edit className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors group"
                title="Close"
              >
                <X className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-500/50 flex-shrink-0">
                <img
                  src={
                    selectedMember.photoUrl ||
                    getFallbackImage(selectedMember.name)
                  }
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = getFallbackImage(selectedMember.name);
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  {selectedMember.name}
                </h2>
                <div className="text-gray-300">
                  <p className="flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4 text-orange-400" />
                    {selectedMember.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-400" />
                    {selectedMember.gender}, {selectedMember.age} years
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Joined Date</label>
                  <p className="font-medium">
                    {formatDate(selectedMember.joiningDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Plan Duration</label>
                  <p className="font-medium">{selectedMember.planDuration}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Fees Amount</label>
                  <p className="font-medium text-green-400">
                    {selectedMember.feesAmount}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">
                    Payment Status
                  </label>
                  <p
                    className={`font-medium ${
                      selectedMember.paymentStatus.toLowerCase() === "pending"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {selectedMember.paymentStatus}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Next Due Date</label>
                  <p className="font-medium">
                    {formatDate(selectedMember.nextDueDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Address</label>
                  <p className="font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    {selectedMember.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={handleAddMember}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        title="Add New Member"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default MemberList;