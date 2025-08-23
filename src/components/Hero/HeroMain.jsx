import React from "react";
import Navigation from "./Navigation";
import Hero from "./Home";
import Stats from "./Stats";
import Features from "./Features";
import CTA from "./CTA";

const HeroMain = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <CTA />
    </div>
  );
};

export default HeroMain;
