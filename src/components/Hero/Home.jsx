// src/components/Hero/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Rocket,
  Zap,
  Sparkles,
  Target,
  Dumbbell,
  TrendingUp,
} from "lucide-react";

const Home = ({ onOpenAuthModal }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Trigger visibility immediately for hero
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const handleGetStartedClick = () => {
    if (onOpenAuthModal) {
      onOpenAuthModal("signup");
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center min-h-screen py-24 pb-20 overflow-hidden bg-black"
    >
      {/* Animated Background Elements - Same as ContactUs */}
      <div className="absolute inset-0">
        <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-pink-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full top-40 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute w-64 h-64 rounded-full bottom-40 right-10 bg-gradient-to-br from-orange-500/15 to-yellow-500/15 blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute w-48 h-48 rounded-full top-1/3 left-1/2 bg-gradient-to-br from-blue-500/15 to-purple-500/15 blur-3xl animate-pulse delay-4000"></div>
      </div>

      {/* Mouse Interactive Glow */}
      <div
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,135,0,0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 animate-ping opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translateY(${
                Math.sin(scrollY * 0.001 + i) * 20
              }px) translateX(${Math.cos(scrollY * 0.002 + i) * 15}px)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl px-6 mx-auto text-center">
        {/* Hero Badge */}
        <div
          className={`inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600/20 to-pink-600/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Sparkles className="w-5 h-5 text-orange-400" />
          <span className="font-semibold text-orange-300">
            Revolutionary Gym Management
          </span>
          <Zap className="w-5 h-5 text-pink-400" />
        </div>

        {/* Main Title */}
        <h1
          className={`text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <span className="text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 bg-clip-text">
            FitTracker
          </span>
        </h1>

        {/* Subtitle */}
        <div
          className={`max-w-4xl mx-auto mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <p className="mb-4 text-xl text-gray-300">
            Experience the{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text">
              next evolution
            </span>{" "}
            of gym management with
          </p>
          <p className="text-2xl font-bold">
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              AI-powered systems
            </span>{" "}
            <span className="text-gray-300">that seem like magic</span>
          </p>
        </div>

        {/* Feature Pills */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {[
            {
              icon: Target,
              text: "Smart Analytics",
              gradient: "from-orange-400 to-pink-400",
            },
            {
              icon: Dumbbell,
              text: "Equipment AI",
              gradient: "from-cyan-400 to-blue-400",
            },
            {
              icon: TrendingUp,
              text: "Growth Insights",
              gradient: "from-purple-400 to-pink-400",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-xl group-hover:opacity-30 transition-all duration-300`}></div>
                <div className="relative flex items-center px-6 py-3 space-x-2 transition-all duration-300 transform border rounded-full bg-gray-900/50 backdrop-blur-xl border-gray-700/50 hover:border-orange-400/50 hover:-translate-y-1">
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span className={`text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {/* Primary Button */}
          <button
            className="relative px-12 py-4 text-lg font-bold text-white transition-all transform rounded-full group bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
            onMouseEnter={() => setIsHovered("primary")}
            onMouseLeave={() => setIsHovered(null)}
            onClick={handleGetStartedClick}
          >
            <div className="absolute inset-0 transition-opacity rounded-full opacity-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 group-hover:opacity-100 blur-xl"></div>
            <div className="relative flex items-center justify-center space-x-3">
              <Play
                className={`w-5 h-5 transition-all duration-300 ${
                  isHovered === "primary" ? "animate-bounce" : ""
                }`}
              />
              <span>GET STARTED</span>
              <Rocket
                className={`w-5 h-5 transition-all duration-300 ${
                  isHovered === "primary" ? "animate-spin" : ""
                }`}
              />
            </div>
          </button>

          {/* Secondary Button */}
          <button
            className="relative px-12 py-4 text-lg font-bold text-gray-300 transition-all bg-transparent border-2 border-gray-600 rounded-full group hover:border-purple-400 hover:text-purple-300 backdrop-blur-sm"
            onMouseEnter={() => setIsHovered("secondary")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="relative flex items-center justify-center space-x-3">
              <Sparkles
                className={`w-5 h-5 transition-all duration-300 ${
                  isHovered === "secondary" ? "animate-spin" : ""
                }`}
              />
              <span>WATCH DEMO</span>
            </span>
          </button>
        </div>

        {/* Stats or Features Section */}
        <div
          className={`mt-20 grid md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {[
            {
              title: "10+",
              subtitle: "Active Gyms",
              gradient: "from-orange-400 to-pink-400",
            },
            {
              title: "99.9%",
              subtitle: "Uptime",
              gradient: "from-cyan-400 to-blue-400",
            },
            {
              title: "24/7",
              subtitle: "Support",
              gradient: "from-purple-400 to-pink-400",
            },
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-all duration-300`}></div>
              <div className="relative p-8 transition-all duration-300 transform border bg-gray-900/50 backdrop-blur-xl rounded-2xl border-gray-700/50 hover:border-orange-400/50 hover:-translate-y-2">
                <h3 className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.title}
                </h3>
                <p className="font-semibold text-gray-300">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;