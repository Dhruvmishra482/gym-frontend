import React from "react";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Settings,
  Apple,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Member Management",
      description:
        "Complete member profiles, subscription tracking, and renewals.",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Class Scheduling",
      description: "Smart booking system with real-time availability.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Payment Processing",
      description: "Seamless payments, invoices, and billing.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Insights on growth, revenue, and performance.",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Equipment Management",
      description: "Track equipment and optimize resources.",
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: "Nutrition Tracking",
      description: "Personalized diet plans and macro tracking.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-600 hover:border-amber-500/50 transition"
            >
              <div className="text-amber-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
