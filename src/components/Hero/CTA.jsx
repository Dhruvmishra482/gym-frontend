import React from "react";
import { Link } from "react-router-dom";
import { Rocket, ChevronDown } from "lucide-react"; // ✅ add this

const CTA = () => {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-black text-white mb-8">
            Ready to{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Revolutionize
            </span>{" "}
            Your Gym?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the fitness revolution. Start your free trial today and
            discover why over 10,000 gym owners trust FitForge.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/signup">
              <button className="group bg-gradient-to-r from-orange-400 to-pink-500 text-black px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Free Trial
                  <Rocket className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
            </Link>

            <button className="group border-2 border-white/20 text-white hover:border-white hover:bg-white/10 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 backdrop-blur-lg">
              Watch Demo
              <ChevronDown className="inline w-6 h-6 ml-3 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="mt-16 text-white/60">
            <p>
              ✨ No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
