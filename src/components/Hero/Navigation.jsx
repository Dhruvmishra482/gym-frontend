import React, { useState, useEffect } from "react";
import { Rocket, Menu, X } from "lucide-react";

const Navigation = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMainPage, setIsMainPage] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if we're on the main page or a separate page
  useEffect(() => {
    const currentPath = window.location.pathname;
    const isOnMainPage = currentPath === "/" || currentPath === "/home";
    setIsMainPage(isOnMainPage);

    if (!isOnMainPage) {
      setActiveSection(""); // Clear active section if not on main page
    } else {
      // Check if there's a hash in the URL and scroll to that section
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          scrollToSection(hash);
          setActiveSection(hash);
        }, 100);
      }
    }
  }, []);

  // Scroll detection to highlight active section (only on main page)
  useEffect(() => {
    if (!isMainPage) return; // Don't run scroll detection on other pages

    const handleScroll = () => {
      const sections = [
        {
          id: "home",
          element: document.querySelector('[data-section="home"]'),
        },
        {
          id: "features",
          element: document.querySelector('[data-section="features"]'),
        },
        {
          id: "pricing",
          element: document.querySelector('[data-section="pricing"]'),
        },
        {
          id: "contact",
          element: document.querySelector('[data-section="contact"]'),
        },
      ];

      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Enhanced smooth scrolling function OR navigate to main page
  const scrollToSection = (sectionId) => {
    // If we're not on the main page, navigate to main page with hash
    if (!isMainPage) {
      window.location.href = `/home#${sectionId}`;
      return;
    }

    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const headerHeight = 120; // Account for fixed header height
      const elementPosition = element.offsetTop - headerHeight;

      // Smooth scroll with enhanced easing
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Update URL hash without triggering page reload
      window.history.replaceState(null, null, `#${sectionId}`);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after click
  };

  // Function to check if a nav item is active
  const isActive = (item) => {
    if (!isMainPage) return false; // No highlighting on other pages
    const itemId = item.toLowerCase();
    return activeSection === itemId;
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-[-30px] left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-orange-500/30 h-20 lg:h-24 xl:h-28">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,165,0,0.15) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-[70px]">
          {/* Logo Section */}
          <button
            onClick={() =>
              isMainPage
                ? scrollToSection("home")
                : (window.location.href = "/home")
            }
            className="flex items-center space-x-2 lg:space-x-4 group relative"
          >
            <div className="relative flex items-center">
              <img
                src="src\Images\WhatsApp_Image_2025-08-28_at_1.26.04_AM-removebg-preview (1).png"
                alt="logo"
                className="w-20 sm:w-24 lg:w-28 xl:w-32 pt-1 object-contain transform group-hover:rotate-12 transition-transform duration-300 shadow-lg rounded-lg"
              />
              <div className="absolute inset-0 blur-lg opacity-30 group-hover:opacity-50 transition-opacity bg-blue-500/20 rounded-lg" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-black bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:animate-pulse transition-all duration-300 hidden sm:block absolute left-20 sm:left-24 lg:left-28 xl:left-32 top-14">
              FitTracker
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg font-semibold transition-all duration-300 hover:scale-110 relative group ${
                  isActive(item.name)
                    ? "text-yellow-400"
                    : "text-slate-300 hover:text-orange-400"
                }`}
              >
                {item.name}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 ${
                    isActive(item.name) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
              </button>
            ))}
          </nav>

          {/* Desktop SignUp Button */}
          <a
            href="/signup"
            className="hidden md:block relative group inline-block pb-2"
          >
            <span className="relative z-10 flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-base lg:text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:rotate-1 shadow-lg">
              <Rocket className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:animate-bounce" />
              SignUp
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative z-50 p-2 text-slate-300 hover:text-orange-400 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`absolute top-20 lg:top-24 xl:top-28 right-0 w-72 sm:w-80 bg-black/95 backdrop-blur-2xl border-l border-orange-500/30 h-screen transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left text-lg font-semibold transition-all duration-300 relative group py-2 border-b hover:border-orange-400/50 ${
                    isActive(item.name)
                      ? "text-yellow-400 border-yellow-400/50"
                      : "text-slate-300 hover:text-orange-400 border-slate-700/50"
                  }`}
                >
                  {item.name}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 transition-all duration-300 ${
                      isActive(item.name) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></div>
                </button>
              ))}
            </nav>

            {/* Mobile Sign Up Button */}
            <a
              href="/signup"
              onClick={toggleMobileMenu}
              className="block relative group mt-8"
            >
              <span className="relative z-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white px-6 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg w-full">
                <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Sign Up Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />
            </a>

            {/* Mobile Menu Decoration */}
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <div className="text-center">
                <img
                  src="src\Images\WhatsApp_Image_2025-08-28_at_1.26.04_AM-removebg-preview (1).png"
                  alt="logo"
                  className="w-12 h-8 mx-auto object-contain opacity-60"
                />
                <p className="text-slate-400 text-sm mt-2">
                  Start your fitness journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
