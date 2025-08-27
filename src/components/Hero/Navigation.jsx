import React, { useState, useEffect } from "react";
import { Dumbbell, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="fixed top-[-30px] h-28 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-orange-500/30">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,165,0,0.15) 0%, transparent 50%)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-[70px]">
          <Link to={"/"} className="flex items-center space-x-4 group">
            <div className="relative flex items-center">
              <img
                src="src\Images\WhatsApp_Image_2025-08-28_at_1.26.04_AM-removebg-preview (1).png"
                alt="logo"
                className="w-32 pt-1 object-contain transform group-hover:rotate-12 transition-transform duration-300 shadow-lg rounded-lg"
              />
              <div className="absolute inset-0 blur-lg opacity-30 group-hover:opacity-50 transition-opacity bg-blue-500/20 rounded-lg" />
            </div>
            <span className="text-2xl absolute left-32 top-14 font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:animate-pulse transition-all duration-300">
              FitTracker
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 ">
            {["Home", "Features", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                className="text-lg font-semibold transition-all duration-300 hover:text-orange-400 hover:scale-110 text-slate-300 relative group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          <Link to="/signup" className="relative group inline-block pb-2">
            <span className="relative z-10 flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white px-6 py-2.5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-lg">
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              SignUp
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
