import React, { useRef, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  Settings,
  RefreshCw,
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

  // Add missing state variables that are referenced in the code
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const ITEMS_PER_PAGE = 30;

  // Destructure profile props
  const {
    user,
    isProfileOpen,
    setIsProfileOpen,
    getOwnerDisplayName,
    getOwnerInitials,
    handleLogout,
    handleProfileClick,
  } = profileProps;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, planFilter]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    const memberDate = new Date(dateString).toISOString().split("T")[0];
    return memberDate === today;
  };

  // Fallback image generator for error cases
  const getFallbackImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=f97316&color=fff&size=80&rounded=true`;
  };

  // Filter and sort members
  const filteredAndSortedMembers = useMemo(() => {
    if (!members || !Array.isArray(members)) return [];

    return members.filter((member) => {
      // Search filter
      const searchMatch = !searchTerm || 
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phoneNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' || 
        member.paymentStatus?.toLowerCase() === statusFilter.toLowerCase();

      // Plan filter
      const planMatch = planFilter === 'all' || 
        member.planDuration?.toLowerCase().includes(planFilter.toLowerCase());

      return searchMatch && statusMatch && planMatch;
    });
  }, [members, searchTerm, statusFilter, planFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredAndSortedMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleEditMember = (member) => {
    console.log("Edit member:", member);
    setIsModalOpen(false);
    navigate(`/edit-member/${member.phoneNo}`);
  };

  const handleAddMember = () => {
    console.log("Add new member");
    navigate("/add-member");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IRON THRONE
                </h1>
                <p className="text-sm text-gray-600">Gym Management</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search members by name, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400 hover:shadow-sm"
                />
              </div>
            </div>

            {/* Actions & Profile */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-200 group-hover:border-blue-400 transition-colors">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={getOwnerDisplayName()}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm ${
                        user?.profileImage ? "hidden" : "flex"
                      }`}
                    >
                      {getOwnerInitials()}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
                          {user?.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={getOwnerDisplayName()}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium ${
                              user?.profileImage ? "hidden" : "flex"
                            }`}
                          >
                            {getOwnerInitials()}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {getOwnerDisplayName()}
                          </div>
                          <div className="text-sm text-gray-500">Owner</div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/my-profile"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/due-members"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        Due Members
                      </Link>
                      <button
                        onClick={() => navigate("/search-member")}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Member
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards with Gradients */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-red-50 rounded-lg p-6 shadow-md border border-red-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Due Today</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{stats.dueToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-lg p-6 shadow-md border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{stats.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Title and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">Members</h2>
              <p className="text-gray-600">Manage your gym members</p>
            </div>
            
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              >
                <option value="all">All Plans</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
              </select>
              
              {(statusFilter !== 'all' || planFilter !== 'all') && (
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setPlanFilter('all');
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 text-gray-600 hover:text-red-600 text-sm underline transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Members Cards Grid */}
        {!members || members.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md border border-blue-100 p-8 text-center">
            <Users className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Found</h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first member.
            </p>
            <button
              onClick={handleAddMember}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
            >
              Add Member
            </button>
          </div>
        ) : filteredAndSortedMembers.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md border border-blue-100 p-8 text-center">
            <Search className="w-16 h-16 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Members Found</h3>
            <p className="text-gray-500 mb-4">
              No members match your search criteria or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPlanFilter('all');
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMembers.map((member, index) => {
                const isDueToday = isDateToday(member.nextDueDate);
                const isPending = member.paymentStatus?.toLowerCase() === "pending";
                
                return (
                  <div
                    key={member._id || member.id || index}
                    onClick={() => {
                      setSelectedMember(member);
                      setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group relative"
                  >
                    {/* Status Indicator */}
                    {isDueToday && (
                      <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}

                    {/* Member Photo and Basic Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-gray-200 group-hover:border-blue-400 transition-colors shadow-md">
                        <img
                          src={member.photoUrl || getFallbackImage(member.name)}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = getFallbackImage(member.name);
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500">{member.gender}, {member.age} years</p>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          isPending ? 'bg-red-100 text-red-800' :
                          isDueToday ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {member.paymentStatus}
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="truncate">{member.phoneNo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Plan</span>
                        <span className="text-sm font-medium text-gray-900">{member.planDuration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Amount</span>
                        <span className="text-sm font-bold text-green-600">₹{member.feesAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Due Date</span>
                        <span className={`text-sm font-medium ${isDueToday ? 'text-red-600' : 'text-gray-900'}`}>
                          {formatDate(member.nextDueDate)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                          setIsModalOpen(true);
                        }}
                        className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditMember(member);
                        }}
                        className="flex-1 bg-gray-50 text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border border-blue-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedMembers.length)} of {filteredAndSortedMembers.length} results
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Summary Footer */}
        {members && members.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border border-blue-100 p-4">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Total: {filteredAndSortedMembers.length} members
                {(statusFilter !== 'all' || planFilter !== 'all' || searchTerm) && (
                  <span className="text-blue-600 ml-1">(filtered from {members.length})</span>
                )}
              </span>
              <button
                onClick={handleAddMember}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex gap-6 mb-6 pr-12">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-3 border-blue-200 flex-shrink-0 shadow-lg">
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
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  {selectedMember.name}
                </h2>
                <div className="space-y-1 text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-500" />
                    {selectedMember.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    {selectedMember.phoneNo}
                  </p>
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    {selectedMember.gender}, {selectedMember.age} years
                  </p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Joined Date</label>
                  <p className="text-gray-900 font-medium">{formatDate(selectedMember.joiningDate)}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Plan Duration</label>
                  <p className="text-gray-900 font-medium">{selectedMember.planDuration}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-green-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Fees Amount</label>
                  <p className="text-green-600 font-bold text-lg">₹{selectedMember.feesAmount}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-red-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Payment Status</label>
                  <p className={`font-bold ${
                    selectedMember.paymentStatus?.toLowerCase() === "pending"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}>
                    {selectedMember.paymentStatus}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-orange-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Next Due Date</label>
                  <p className="text-gray-900 font-medium">{formatDate(selectedMember.nextDueDate)}</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-3 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />
                    {selectedMember.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={() => handleEditMember(selectedMember)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-md"
              >
                <Edit className="w-4 h-4" />
                Edit Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Floating Add Button */}
      <button
        onClick={handleAddMember}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="Add New Member"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default MemberList;