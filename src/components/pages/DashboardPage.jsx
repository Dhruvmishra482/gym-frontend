import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
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
      photoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCANOsVOxAUJSKmcmOvcGhgnCBXY-STyBATw&s",
    },
    {
      id: 4,
      name: "Tyrion Lannister",
      phone: "+91 62390 38301",
      joiningDate: "2024-03-10",
      planDuration: "6 months",
      feesAmount: "₹8,500",
      nextDueDate: "2025-09-10",
      paymentStatus: "Paid",
      gender: "Male",
      age: 32,
      email: "tyrion.lannister@casterlyrock.com",
      address: "Casterly Rock, Westerlands",
      photoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCANOsVOxAUJSKmcmOvcGhgnCBXY-STyBATw&s",
    },
  ]);

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
  const normalizePhone = (phone) => phone.replace(/\D/g, "");

  const filteredMembers = membersData.filter((member) => {
    const normalizedPhone = normalizePhone(member.phone);
    const normalizedSearch = normalizePhone(searchTerm);
    return (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      normalizedPhone.includes(normalizedSearch)
    );
  });

  const stats = {
    totalMembers: membersData.length,
    dueToday: membersData.filter(
      (m) => m.nextDueDate === new Date().toISOString().split("T")[0]
    ).length,
    monthlyRevenue: "₹1.2L",
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