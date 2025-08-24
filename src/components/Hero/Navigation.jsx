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
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-2xl z-50 border-b border-orange-500/30">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,165,0,0.15) 0%, transparent 50%)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Dumbbell className="w-8 h-8 text-orange-500 transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
              FitForge
            </span>
          </div>

          {/* Links + Login */}
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "Features", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-slate-300 hover:text-orange-400 transition-all duration-300 hover:scale-110 font-semibold"
              >
                {item}
              </Link>
            ))}

            {/* Login Button */}
            <Link
              to="/signup"
              className="relative group bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black px-6 py-2 rounded-full font-bold transition-all duration-300 transform hover:scale-110"
            >
              <span className="relative z-10 flex items-center">
                <Rocket className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Signup
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
