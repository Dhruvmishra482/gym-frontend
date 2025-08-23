import React from "react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-yellow-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-6">
          Ready to Transform Your Gym?
        </h2>
        <p className="text-lg text-black/80 mb-8">
          Join hundreds of gym owners who trust FitForge to manage their
          business
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold">
            Start Free Trial
          </button>
          <button className="border-2 border-black text-black px-8 py-4 rounded-xl font-semibold hover:bg-black hover:text-white">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
