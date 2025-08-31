import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import Stats from "./Stats";
import MainFeatures from "./MainFeatures";
import CTA from "./CTA";
import PricingPage from "../NavbarNavigation/PricingPage";
import ContactUs from "../NavbarNavigation/ContactUs";

const HeroMain = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Home Section */}
      <div data-section="home">
        <Home />
        <Stats />
      </div>

      {/* Features Section */}
      <div data-section="features">
        <MainFeatures />
      </div>

      {/* Pricing Section */}
      <div data-section="pricing">
        <PricingPage />
      </div>

      {/* Contact Section */}
      <div data-section="contact">
        <ContactUs />
      </div>

      <CTA />
    </div>
  );
};

export default HeroMain;
