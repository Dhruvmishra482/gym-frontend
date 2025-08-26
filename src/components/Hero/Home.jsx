import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Rocket,
  Zap,
  Sparkles,
  Target,
  Dumbbell,
  TrendingUp,
} from "lucide-react";
import GymEquipment3D from "./GymEquipment3D";

const Home = () => {
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

  return (
    <section
      ref={containerRef}
      className="relative py-24 pb-20 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800"
    >
      {/* Animated Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
        <div
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,165,0,0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Floating Orbs */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl animate-pulse opacity-20"
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, rgba(${Math.floor(
                Math.random() * 255
              )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                Math.random() * 255
              )}, 0.3), rgba(255, 165, 0, 0.2))`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              transform: `translateY(${
                Math.sin(scrollY * 0.001 + i) * 30
              }px) translateX(${Math.cos(scrollY * 0.002 + i) * 20}px)`,
            }}
          />
        ))}

        {/* Geometric Patterns */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className="absolute border border-amber-500/10 rotate-45 animate-spin"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 10}%`,
              top: `${10 + i * 8}%`,
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Equipment Background */}
      <GymEquipment3D />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Hero Badge */}
        <div
          className={`inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
          <span className="text-amber-300 font-semibold">
            Ultimate Gym Management
          </span>
          <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1
          className={`text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent animate-pulse relative">
            FitForge
            {/* Title Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 blur-3xl opacity-30 animate-pulse" />
          </span>
        </h1>

        {/* Subtitle */}
        <div
          className={`text-2xl md:text-4xl mb-8 font-light transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <span className="text-gray-300">Transform your gym into a </span>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-black animate-bounce">
            POWERHOUSE
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          The ultimate gym management system with{" "}
          <span className="text-amber-400 font-bold">AI-powered features</span>{" "}
          that revolutionize how you manage members, trainers, and operations
        </p>

        {/* Feature Pills */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {[
            {
              icon: Target,
              text: "AI Analytics",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Dumbbell,
              text: "Smart Equipment",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: TrendingUp,
              text: "Growth Tracking",
              color: "from-green-500 to-teal-500",
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color}/20 border border-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white text-sm font-semibold">
                  {feature.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {/* Primary Button */}
          <button
            className="group relative bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-400 text-black px-12 py-6 rounded-xl font-black text-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl hover:shadow-amber-500/50"
            onMouseEnter={() => setIsHovered("primary")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="relative z-10 flex items-center justify-center">
              <Link
                to="/signup"
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                <Play
                  className={`w-6 h-6 mr-3 transition-all duration-300 ${
                    isHovered === "primary" ? "animate-bounce" : ""
                  }`}
                />
                GET STARTED
                <Rocket
                  className={`w-6 h-6 ml-3 transition-all duration-300 ${
                    isHovered === "primary" ? "animate-spin" : ""
                  }`}
                />
              </Link>
            </span>

            {/* Button Glow */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-xl blur-xl opacity-50 transition-all duration-300 ${
                isHovered === "primary" ? "opacity-100 scale-110" : ""
              }`}
            />

            {/* Animated Border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Secondary Button */}
          <button
            className="group relative border-2 border-amber-500 text-amber-400 hover:text-black hover:bg-amber-500 px-12 py-6 rounded-xl font-black text-xl transition-all duration-500 transform hover:scale-110 hover:-rotate-1 backdrop-blur-sm"
            onMouseEnter={() => setIsHovered("secondary")}
            onMouseLeave={() => setIsHovered(null)}
          >
            <span className="relative z-10 flex items-center justify-center">
              <Sparkles
                className={`w-6 h-6 mr-3 transition-all duration-300 ${
                  isHovered === "secondary" ? "animate-spin" : ""
                }`}
              />
              WATCH DEMO
            </span>
          </button>
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-ping opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
