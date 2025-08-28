import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import { getAllMembers } from '../services/memberService'

import MemberList from "../Member/MemberList";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Real data states
  const [membersData, setMembersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch members data on component mount
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllMembers();
        
        if (response.success) {
          setMembersData(response.data);
        } else {
          setError(response.message || "Failed to fetch members");
          // If authentication failed, redirect to login
          if (response.message && response.message.includes("Authentication failed")) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("An unexpected error occurred while fetching members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [navigate]);

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

  // Normalize phone numbers to remove spaces, +91, etc.
  const normalizePhone = (phone) => phone?.replace(/\D/g, "") || "";

  const filteredMembers = membersData.filter((member) => {
    const normalizedPhone = normalizePhone(member.phoneNo || member.phone);
    const normalizedSearch = normalizePhone(searchTerm);
    return (
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      normalizedPhone.includes(normalizedSearch)
    );
  });

  // Calculate stats from real data
  const stats = {
    totalMembers: membersData.length,
    dueToday: membersData.filter((member) => {
      const today = new Date().toISOString().split("T")[0];
      const dueDate = member.nextDueDate ? new Date(member.nextDueDate).toISOString().split("T")[0] : null;
      return dueDate === today;
    }).length,
    monthlyRevenue: `₹${membersData.reduce((total, member) => {
      const amount = parseFloat(member.feesAmount?.toString().replace(/[^\d.]/g, "") || 0);
      return total + amount;
    }, 0).toLocaleString("en-IN")}`,
  };

  // Profile functionality
  const getOwnerDisplayName = () => {
    if (!user) return "Owner";
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || "Owner";
  };

  const getOwnerInitials = () => {
    const name = getOwnerDisplayName();
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    // Static view - just close dropdown for now
    setIsProfileOpen(false);
    console.log("My Profile clicked - Static view");
  };

  const handleMembersClick = () => {
    // Static view - just close dropdown for now  
    setIsProfileOpen(false);
    console.log("My Members clicked - Static view");
  };

  // Profile props to pass to MemberList
  const profileProps = {
    user,
    isProfileOpen,
    setIsProfileOpen,
    getOwnerDisplayName,
    getOwnerInitials,
    handleLogout,
    handleProfileClick,
    handleMembersClick,
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading members...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <MemberList
      members={filteredMembers}
      stats={stats}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      mousePosition={mousePosition}
      selectedMember={selectedMember}
      setSelectedMember={setSelectedMember}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      profileProps={profileProps}
    />
  );
};

export default DashboardPage;