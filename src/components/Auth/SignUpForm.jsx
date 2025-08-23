// import {
//   User,
//   Mail,
//   Phone,
//   Lock,
//   Eye,
//   EyeOff,
//   Crown,
//   Flame,
//   Shield,
//   Zap,
//   Star,
// } from "lucide-react";

// const SignUpForm = ({
//   mounted,
//   showPassword,
//   setShowPassword,
//   activeField,
//   setActiveField,
//   formData,
//   handleInputChange,
//   handleSubmit,
//   isSubmitting,
//   mousePosition,
// }) => {
//   return (
//     <div className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center p-4">
//       {/* Background Effects */}
//       <div className="absolute inset-0">
//         <div
//           className="absolute inset-0 opacity-70"
//           style={{
//             background: `
//               radial-gradient(circle at ${mousePosition.x * 0.1}px ${
//               mousePosition.y * 0.1
//             }px, rgba(255, 69, 0, 0.4), transparent 50%),
//               radial-gradient(circle at ${100 - mousePosition.x * 0.08}px ${
//               100 - mousePosition.y * 0.08
//             }px, rgba(255, 140, 0, 0.3), transparent 50%),
//               linear-gradient(45deg, rgba(220, 20, 60, 0.3), rgba(255, 69, 0, 0.2), rgba(255, 140, 0.3))
//             `,
//           }}
//         />
//         {/* floating shapes & particles (same as before) */}
//       </div>

//       {/* Main Card */}
//       <div
//         className={`relative z-10 w-full max-w-lg transform transition-all duration-1000 ${
//           mounted
//             ? "scale-100 rotate-0 opacity-100"
//             : "scale-75 rotate-3 opacity-0"
//         }`}
//       >
//         {/* Glow Border */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 rounded-3xl blur-sm opacity-60 animate-gradient-shift"></div>

//         <div className="relative bg-gradient-to-br from-slate-900/90 via-gray-900/95 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-500/50 overflow-hidden">
//           <div className="p-8 space-y-8">
//             {/* Header */}
//             <div className="text-center relative">
//               <div className="relative inline-block mb-6">
//                 <div className="relative w-24 h-24 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-full flex items-center justify-center shadow-2xl">
//                   <Crown className="w-12 h-12 text-white animate-pulse" />
//                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
//                     <Star className="w-4 h-4 text-white" />
//                   </div>
//                 </div>
// //               </div>
// //               <h1 className="text-5xl font-black bg-gradient-to-r from-orange-400 via-red-500 via-yellow-500 to-orange-400 bg-clip-text text-transparent mb-4 animate-gradient-text">
// //                 IRON THRONE
// //               </h1>
// //               <p className="text-orange-300 font-bold text-lg">
// //                 ELITE GYM DOMINION
// //               </p>
// //               <p className="text-orange-400/70 text-sm">
// //                 🔥 FORGE YOUR EMPIRE 🔥
// //               </p>
// //             </div>

// //             {/* Form */}
// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {/* First & Last Name */}
// //               <div className="grid grid-cols-2 gap-4">
// //                 <input
// //                   type="text"
// //                   value={formData.firstName}
// //                   onChange={(e) =>
// //                     handleInputChange("firstName", e.target.value)
// //                   }
// //                   onFocus={() => setActiveField("firstName")}
// //                   onBlur={() => setActiveField("")}
// //                   placeholder="First Name"
// //                   className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
// //                 />
// //                 <input
// //                   type="text"
// //                   value={formData.lastName}
// //                   onChange={(e) =>
// //                     handleInputChange("lastName", e.target.value)
// //                   }
// //                   onFocus={() => setActiveField("lastName")}
// //                   onBlur={() => setActiveField("")}
// //                   placeholder="Last Name"
// //                   className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
// //                 />
// //               </div>

// //               {/* Mobile */}
// //               <input
// //                 type="tel"
// //                 value={formData.mobileNumber}
// //                 onChange={(e) =>
// //                   handleInputChange("mobileNumber", e.target.value)
// //                 }
// //                 onFocus={() => setActiveField("mobile")}
// //                 onBlur={() => setActiveField("")}
// //                 placeholder="Mobile Number"
// //                 className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
// //               />

// //               {/* Email */}
// //               <input
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={(e) => handleInputChange("email", e.target.value)}
// //                 onFocus={() => setActiveField("email")}
// //                 onBlur={() => setActiveField("")}
// //                 placeholder="Email Address"
// //                 className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
// //               />

// //               {/* Password */}
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   value={formData.password}
// //                   onChange={(e) =>
// //                     handleInputChange("password", e.target.value)
// //                   }
// //                   onFocus={() => setActiveField("password")}
// //                   onBlur={() => setActiveField("")}
// //                   placeholder="Create Password"
// //                   className="w-full px-4 py-4 bg-slate-800/80 rounded-xl text-white"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400"
// //                 >
// //                   {showPassword ? <EyeOff /> : <Eye />}
// //                 </button>
// //               </div>

// //               {/* Submit */}
// //               <button
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl text-white font-bold"
// //               >
// //                 {isSubmitting ? "FORGING THRONE..." : "CLAIM THE THRONE"}
// //               </button>
// //             </form>

// //             {/* Privileges */}
// //             <div className="text-center">
// //               <h4 className="text-orange-300 font-bold text-sm">
// //                 👑 THRONE PRIVILEGES 👑
// //               </h4>
// //               <div className="grid grid-cols-2 gap-3 text-xs text-orange-200/80 mt-3">
// //                 <div className="flex items-center gap-2">
// //                   <Shield className="w-4 h-4 text-orange-400" /> Complete
// //                   Control
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Zap className="w-4 h-4 text-red-400" /> Elite Dashboard
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Crown className="w-4 h-4 text-yellow-400" /> Member
// //                   Management
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <Star className="w-4 h-4 text-orange-400" /> Revenue Tracking
// //                 </div>
// //               </div>
// //             </div>

// //             <p className="text-center text-orange-400/60 text-xs font-medium">
// //               FORGED IN IRON • BUILT FOR LEGENDS
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignUpForm;


// import { useState, useEffect } from "react";
// import { Eye, EyeOff, Crown, Sword, Shield, Flame, User, Mail, Phone, Lock, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./SignUpForm.css";


// const SignUpForm = ({
//   mounted,
//   showPassword,
//   setShowPassword,
//   activeField,
//   setActiveField,
//   formData,
//   handleInputChange,
//   handleSubmit,
//   isSubmitting,
//   mousePosition
// }) => {
//   const [particles, setParticles] = useState([]);
//   const [flames, setFlames] = useState([]);
//    const navigate = useNavigate();

 

//   useEffect(() => {
//     // Generate floating particles
//     const newParticles = Array.from({ length: 50 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 3 + 1,
//       speed: Math.random() * 3 + 1,
//       delay: Math.random() * 5
//     }));
//     setParticles(newParticles);

//     // Generate flame effects
//     const newFlames = Array.from({ length: 20 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 2 + 1,
//       delay: Math.random() * 3
//     }));
//     setFlames(newFlames);
//   }, []);

//   const getFieldIcon = (field) => {
//     switch (field) {
//       case 'firstName': return <User className="w-5 h-5" />;
//       case 'lastName': return <Shield className="w-5 h-5" />;
//       case 'mobileNumber': return <Phone className="w-5 h-5" />;
//       case 'email': return <Mail className="w-5 h-5" />;
//       case 'password': return <Lock className="w-5 h-5" />;
//       default: return null;
//     }
//   };

//   const getFieldPlaceholder = (field) => {
//     switch (field) {
//       case 'firstName': return 'First Name';
//       case 'lastName': return 'Last Name';
//       case 'mobileNumber': return 'Mobile Number';
//       case 'email': return 'Email Address';
//       case 'password': return 'Password';
//        case 'confirmpassword': return 'Confirm Password';
     
//       default: return '';
//     }
//   };


//     const navigateToLogin = () => {
//      navigate("/login") 
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Epic Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950 via-amber-950 to-black"></div>
      
//       {/* Animated Background Layers */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-amber-600/5 to-red-600/10 animate-pulse"></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
//       </div>

//       {/* Floating Particles */}
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute rounded-full opacity-60 animate-pulse"
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             backgroundColor: Math.random() > 0.5 ? '#fbbf24' : '#ef4444',
//             animation: `floatParticle ${particle.speed + 4}s ease-in-out infinite ${particle.delay}s alternate`,
//           }}
//         ></div>
//       ))}

//       {/* Flame Effects */}
//       {flames.map((flame) => (
//         <div
//           key={flame.id}
//           className="absolute opacity-20"
//           style={{
//             left: `${flame.x}%`,
//             top: `${flame.y}%`,
//             width: `${flame.size * 8}px`,
//             height: `${flame.size * 12}px`,
//             background: 'linear-gradient(0deg, #ef4444, #fbbf24, transparent)',
//             borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
//             animation: `flicker ${2 + flame.delay}s ease-in-out infinite ${flame.delay}s`,
//           }}
//         ></div>
//       ))}

//       {/* Dynamic Mouse Effect */}
//       <div
//         className="fixed pointer-events-none transition-all duration-500 ease-out"
//         style={{
//           left: mousePosition.x - 200,
//           top: mousePosition.y - 200,
//           width: '400px',
//           height: '400px',
//           background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(251, 191, 36, 0.1) 30%, transparent 70%)',
//           borderRadius: '50%',
//         }}
//       ></div>

//       {/* Main Container */}
//       <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
//         <div 
//           className={`
//             relative max-w-lg w-full transform transition-all duration-1000 
//             ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
//           `}
//           style={{
//             transform: `perspective(1200px) rotateX(${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 500) / 2) / 50}deg) rotateY(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 500) / 2) / 50}deg) translateZ(20px)`,
//             transformStyle: 'preserve-3d'
//           }}
//         >
//           {/* Glass Card with Epic Styling */}
//           <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/60 via-red-900/20 to-black/60 border border-amber-400/30 rounded-3xl p-10 shadow-2xl overflow-hidden">
            
//             {/* Glowing Border Animation */}
//             <div className="absolute inset-0 rounded-3xl">
//               <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/30 via-red-500/30 to-amber-400/30 blur-sm animate-pulse"></div>
//               <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-black/80 via-red-950/50 to-black/80"></div>
//             </div>
            
//             <div className="relative z-10">
//               {/* Epic Header */}
//               <div className="text-center mb-10">
//                 <div className="relative inline-block mb-6">
//                   <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-red-500 to-amber-600 rounded-full flex items-center justify-center relative overflow-hidden">
//                     <Crown className="w-12 h-12 text-black z-10 animate-pulse" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-red-500/50 rounded-full animate-spin"></div>
//                     <div className="absolute inset-2 bg-gradient-to-br from-amber-500 to-red-600 rounded-full animate-pulse"></div>
//                   </div>
//                   <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
//                 </div>
                
//                 <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 bg-clip-text text-transparent animate-pulse">
//                   CLAIM THE THRONE
//                 </h1>
//                 <p className="text-gray-300 text-lg font-medium mb-2">
//                   "Power resides where men believe it resides"
//                 </p>
//                 <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
//               </div>

//               {/* Form Fields */}
//               <div className="space-y-6 mb-8">
//                 {Object.keys(formData).map((field, index) => (
//                   <div key={field} className="relative group">
//                     <div 
//                       className="relative"
//                       style={{
//                         transform: `translateZ(${activeField === field ? '10px' : '0px'})`,
//                         transition: 'transform 0.3s ease'
//                       }}
//                     >
//                       <input
//                         type={
//                           field === 'email' ? 'email' : 
//                           field === 'mobileNumber' ? 'tel' :
//                           field === 'password' && !showPassword ? 'password' : 'text'
//                         }
//                         value={formData[field]}
//                         onChange={(e) => handleInputChange(field, e.target.value)}
//                         onFocus={() => setActiveField(field)}
//                         onBlur={() => setActiveField('')}
//                         placeholder={getFieldPlaceholder(field)}
//                         className={`
//                           w-full px-14 py-5 bg-black/40 border-2 rounded-2xl 
//                           text-white placeholder-gray-400 transition-all duration-300 text-lg
//                           focus:outline-none focus:bg-black/60 backdrop-blur-sm
//                           ${activeField === field ? 
//                             'border-amber-400 shadow-lg shadow-amber-400/25 transform scale-105' : 
//                             'border-gray-600/50 hover:border-gray-500/70'
//                           }
//                         `}
//                         style={{
//                           animation: activeField === field ? 'glow 2s ease-in-out infinite alternate' : 'none'
//                         }}
//                       />
                      
//                       {/* Icon */}
//                       <div className={`
//                         absolute left-5 top-1/2 transform -translate-y-1/2 transition-all duration-300
//                         ${activeField === field ? 'text-amber-400 scale-125' : 'text-gray-400'}
//                       `}>
//                         {getFieldIcon(field)}
//                       </div>

//                       {/* Password Toggle */}
//                       {field === 'password' && (
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-300 p-1"
//                         >
//                           {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                         </button>
//                       )}

//                       {/* Active Field Glow */}
//                       {activeField === field && (
//                         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 via-red-500/10 to-amber-400/10 animate-pulse pointer-events-none"></div>
//                       )}
//                     </div>

//                     {/* Field Animation */}
//                     {formData[field] && (
//                       <div className="absolute -top-3 left-12 px-3 py-1 bg-gradient-to-r from-amber-400 to-red-500 text-black text-sm font-bold rounded-full transform scale-90 animate-bounce">
//                         ✓
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Epic Submit Button */}
//               <div
//                 onClick={handleSubmit}
//                 className={`
//                   w-full py-6 rounded-2xl font-bold text-xl relative overflow-hidden cursor-pointer group
//                   transition-all duration-500 transform hover:scale-105 active:scale-95
//                   ${isSubmitting ? 
//                     'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed' : 
//                     'bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 hover:from-amber-300 hover:via-red-400 hover:to-amber-300 shadow-2xl shadow-amber-500/30'
//                   }
//                 `}
//                 style={{
//                   transform: isSubmitting ? 'none' : 'translateZ(5px)',
//                 }}
//               >
//                 <div className="relative z-10 flex items-center justify-center space-x-3">
//                   {isSubmitting ? (
//                     <>
//                       <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span className="text-white">FORGING YOUR DESTINY...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Crown className="w-7 h-7 text-black animate-pulse" />
//                       <span className="text-black">ASCEND THE IRON THRONE</span>
//                       <Sword className="w-7 h-7 text-black animate-pulse" />
//                     </>
//                   )}
//                 </div>

//                 {/* Button Effects */}
//                 {!isSubmitting && (
//                   <>
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-400/60 to-red-500/60 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                   </>
//                 )}
//               </div>

//               {/* Login Navigation */}
//               <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
//                 <p className="text-gray-400 mb-4">Already sworn to a house?</p>
//                 <div
//                   onClick={navigateToLogin}
//                   className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 cursor-pointer transition-all duration-300 group font-medium text-lg"
//                 >
//                   <span>Login to Your Realm</span>
//                   <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
//                 </div>
//               </div>

//               {/* Footer Quote */}
//               <div className="text-center mt-6 text-sm text-gray-500 italic">
//                 "When you play the game of thrones, you win or you die"
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// {/* 
//       <style jsx>{`
//         @keyframes floatParticle {
//           0%, 100% { 
//             transform: translateY(0px) rotate(0deg); 
//             opacity: 0.6; 
//           }
//           50% { 
//             transform: translateY(-30px) rotate(180deg); 
//             opacity: 1; 
//           }
//         }
        
//         @keyframes flicker {
//           0%, 100% { 
//             transform: scaleY(1) rotate(-2deg); 
//             opacity: 0.2; 
//           }
//           50% { 
//             transform: scaleY(1.2) rotate(2deg); 
//             opacity: 0.4; 
//           }
//         }
        
//         @keyframes glow {
//           0%, 100% { 
//             box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
//           }
//           50% { 
//             box-shadow: 0 0 30px rgba(251, 191, 36, 0.6), 0 0 40px rgba(239, 68, 68, 0.3);
//           }
//         }
//       `}</style> */}
//     </div>
//   );
// };

// export default SignUpForm;

import { useState, useEffect } from "react";
import { Eye, EyeOff, Crown, Sword, Shield, Flame, User, Mail, Phone, Lock, ChevronRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm = ({
  mounted,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  activeField,
  setActiveField,
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  mousePosition
}) => {
  const [particles, setParticles] = useState([]);
  const [flames, setFlames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 3 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    // Generate flame effects
    const newFlames = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }));
    setFlames(newFlames);
  }, []);

  const getFieldIcon = (field) => {
    switch (field) {
      case 'firstName': return <User className="w-5 h-5" />;
      case 'lastName': return <Shield className="w-5 h-5" />;
      case 'mobileNumber': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'password': return <Lock className="w-5 h-5" />;
      case 'confirmPassword': return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  const getFieldPlaceholder = (field) => {
    switch (field) {
      case 'firstName': return 'First Name';
      case 'lastName': return 'Last Name';
      case 'mobileNumber': return 'Mobile Number';
      case 'email': return 'Email Address';
      case 'password': return 'Password';
      case 'confirmPassword': return 'Confirm Password';
      default: return '';
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Epic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950 via-amber-950 to-black"></div>
      
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-amber-600/5 to-red-600/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: Math.random() > 0.5 ? '#fbbf24' : '#ef4444',
            animation: `floatParticle ${particle.speed + 4}s ease-in-out infinite ${particle.delay}s alternate`,
          }}
        ></div>
      ))}

      {/* Flame Effects */}
      {flames.map((flame) => (
        <div
          key={flame.id}
          className="absolute opacity-20"
          style={{
            left: `${flame.x}%`,
            top: `${flame.y}%`,
            width: `${flame.size * 8}px`,
            height: `${flame.size * 12}px`,
            background: 'linear-gradient(0deg, #ef4444, #fbbf24, transparent)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            animation: `flicker ${2 + flame.delay}s ease-in-out infinite ${flame.delay}s`,
          }}
        ></div>
      ))}

      {/* Dynamic Mouse Effect */}
      <div
        className="fixed pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(251, 191, 36, 0.1) 30%, transparent 70%)',
          borderRadius: '50%',
        }}
      ></div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div 
          className={`
            relative max-w-lg w-full transform transition-all duration-1000 
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          `}
          style={{
            transform: `perspective(1200px) rotateX(${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 500) / 2) / 50}deg) rotateY(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 500) / 2) / 50}deg) translateZ(20px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Glass Card with Epic Styling */}
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-black/60 via-red-900/20 to-black/60 border border-amber-400/30 rounded-3xl p-10 shadow-2xl overflow-hidden">
            
            {/* Glowing Border Animation */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/30 via-red-500/30 to-amber-400/30 blur-sm animate-pulse"></div>
              <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-black/80 via-red-950/50 to-black/80"></div>
            </div>
            
            <div className="relative z-10">
              {/* Epic Header */}
              <div className="text-center mb-10">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-red-500 to-amber-600 rounded-full flex items-center justify-center relative overflow-hidden">
                    <Crown className="w-12 h-12 text-black z-10 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-red-500/50 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-500 to-red-600 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 bg-clip-text text-transparent animate-pulse">
                  CLAIM THE THRONE
                </h1>
                <p className="text-gray-300 text-lg font-medium mb-2">
                  "Power resides where men believe it resides"
                </p>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full"></div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6 mb-8">
                {Object.keys(formData).map((field, index) => (
                  <div key={field} className="relative group">
                    <div 
                      className="relative"
                      style={{
                        transform: `translateZ(${activeField === field ? '10px' : '0px'})`,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <input
                        type={
                          field === 'email' ? 'email' : 
                          field === 'mobileNumber' ? 'tel' :
                          field === 'password' && !showPassword ? 'password' :
                          field === 'confirmPassword' && !showConfirmPassword ? 'password' : 'text'
                        }
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onFocus={() => setActiveField(field)}
                        onBlur={() => setActiveField('')}
                        placeholder={getFieldPlaceholder(field)}
                        className={`
                          w-full px-14 py-5 bg-black/40 border-2 rounded-2xl 
                          text-white placeholder-gray-400 transition-all duration-300 text-lg
                          focus:outline-none focus:bg-black/60 backdrop-blur-sm
                          ${activeField === field ? 
                            'border-amber-400 shadow-lg shadow-amber-400/25 transform scale-105' : 
                            'border-gray-600/50 hover:border-gray-500/70'
                          }
                          ${field === 'confirmPassword' && formData[field] && formData.password !== formData.confirmPassword ? 
                            'border-red-500 shadow-lg shadow-red-500/25' : 
                            field === 'confirmPassword' && formData[field] && formData.password === formData.confirmPassword ? 
                            'border-green-500 shadow-lg shadow-green-500/25' : ''
                          }
                        `}
                        style={{
                          animation: activeField === field ? 'glow 2s ease-in-out infinite alternate' : 'none'
                        }}
                      />
                      
                      {/* Icon */}
                      <div className={`
                        absolute left-5 top-1/2 transform -translate-y-1/2 transition-all duration-300
                        ${activeField === field ? 'text-amber-400 scale-125' : 
                          field === 'confirmPassword' && formData[field] && formData.password !== formData.confirmPassword ? 'text-red-500' :
                          field === 'confirmPassword' && formData[field] && formData.password === formData.confirmPassword ? 'text-green-500' :
                          'text-gray-400'
                        }
                      `}>
                        {getFieldIcon(field)}
                      </div>

                      {/* Password Toggle */}
                      {field === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-300 p-1"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      )}

                      {/* Confirm Password Toggle */}
                      {field === 'confirmPassword' && (
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors duration-300 p-1"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      )}

                      {/* Active Field Glow */}
                      {activeField === field && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 via-red-500/10 to-amber-400/10 animate-pulse pointer-events-none"></div>
                      )}
                    </div>

                    {/* Field Validation Animation */}
                    {formData[field] && field !== 'confirmPassword' && (
                      <div className="absolute -top-3 left-12 px-3 py-1 bg-gradient-to-r from-amber-400 to-red-500 text-black text-sm font-bold rounded-full transform scale-90 animate-bounce">
                        ✓
                      </div>
                    )}

                    {/* Confirm Password Validation */}
                    {field === 'confirmPassword' && formData[field] && (
                      <div className={`absolute -top-3 left-12 px-3 py-1 text-white text-sm font-bold rounded-full transform scale-90 animate-bounce ${
                        formData.password === formData.confirmPassword ? 
                        'bg-gradient-to-r from-green-500 to-green-600' : 
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}>
                        {formData.password === formData.confirmPassword ? '✓' : '✗'}
                      </div>
                    )}

                    {/* Password Match Indicator */}
                    {field === 'confirmPassword' && formData[field] && (
                      <div className={`text-sm mt-2 ml-14 transition-all duration-300 ${
                        formData.password === formData.confirmPassword ? 
                        'text-green-400' : 'text-red-400'
                      }`}>
                        {formData.password === formData.confirmPassword ? 
                          '🔒 Passwords match perfectly!' : 
                          '⚠️ Passwords do not match'
                        }
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Epic Submit Button */}
              <div
                onClick={handleSubmit}
                className={`
                  w-full py-6 rounded-2xl font-bold text-xl relative overflow-hidden cursor-pointer group
                  transition-all duration-500 transform hover:scale-105 active:scale-95
                  ${isSubmitting ? 
                    'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed' : 
                    'bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 hover:from-amber-300 hover:via-red-400 hover:to-amber-300 shadow-2xl shadow-amber-500/30'
                  }
                `}
                style={{
                  transform: isSubmitting ? 'none' : 'translateZ(5px)',
                }}
              >
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-white">FORGING YOUR DESTINY...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-7 h-7 text-black animate-pulse" />
                      <span className="text-black">ASCEND THE IRON THRONE</span>
                      <Sword className="w-7 h-7 text-black animate-pulse" />
                    </>
                  )}
                </div>

                {/* Button Effects */}
                {!isSubmitting && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/60 to-red-500/60 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </>
                )}
              </div>

              {/* Login Navigation */}
              <div className="text-center mt-8 pt-6 border-t border-gray-700/50">
                <p className="text-gray-400 mb-4">Already sworn to a house?</p>
                <div
                  onClick={navigateToLogin}
                  className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 cursor-pointer transition-all duration-300 group font-medium text-lg"
                >
                  <span>Login to Your Realm</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Footer Quote */}
              <div className="text-center mt-6 text-sm text-gray-500 italic">
                "When you play the game of thrones, you win or you die"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;