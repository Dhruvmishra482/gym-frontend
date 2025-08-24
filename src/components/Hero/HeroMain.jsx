import React from "react";
import Navigation from "./Navigation";
import Home from "./Home";
import Stats from "./Stats";
import MainFeatures from "./MainFeatures";
import CTA from "./CTA";

const HeroMain = () => {
  return (
    <div className="min-h-screen bg-black text-white ">
      <Navigation />
      <Home />
      <Stats />
      <MainFeatures />
      <CTA />
    </div>
  );
};

export default HeroMain;
