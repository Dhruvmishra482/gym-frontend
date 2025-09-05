import React, { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Users,
  Shield,
  Headphones,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLocation } from "react-router-dom";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "general",
    message: "",
  });

  // Get current location
  const location = useLocation();
  const showCTA = location.pathname === "/contact";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiry: "general",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      content: (
        <div>
          <p className="mb-2">
            <strong>General Inquiries:</strong> info@fitforge.com
          </p>
          <p className="mb-2">
            <strong>Technical Support:</strong> support@fitforge.com
          </p>
          <p>
            <strong>Sales:</strong> sales@fitforge.com
          </p>
        </div>
      ),
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      content: (
        <div>
          <p className="mb-2">
            <strong>Main Line:</strong> +1 (555) 123-4567
          </p>
          <p className="mb-2">
            <strong>Support:</strong> +1 (555) 123-4568
          </p>
          <p className="text-sm text-purple-300">
            Available 24/7 for emergencies
          </p>
        </div>
      ),
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Business Hours",
      content: (
        <div>
          <p className="mb-2">
            <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM PST
          </p>
          <p className="mb-2">
            <strong>Saturday:</strong> 10:00 AM - 4:00 PM PST
          </p>
          <p className="mb-2">
            <strong>Sunday:</strong> Closed
          </p>
          <p className="text-sm text-cyan-300">
            Emergency support available 24/7
          </p>
        </div>
      ),
    },
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Account Manager",
      description: "Get personalized support from our expert team",
      gradient: "from-orange-400 to-pink-400",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security for your gym's data",
      gradient: "from-cyan-400 to-blue-400",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Technical Support",
      description: "Round-the-clock assistance when you need it",
      gradient: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600/20 to-pink-600/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300 font-semibold">
              Revolutionary Support
            </span>
            <Zap className="w-5 h-5 text-pink-400" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent">
              CONTACT
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              US
            </span>
          </h1>

          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-xl text-gray-300 mb-4">
              Experience the{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent font-bold">
                next evolution
              </span>{" "}
              of gym management support with
            </p>
            <p className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-powered assistance
              </span>{" "}
              <span className="text-gray-300">that seems like magic</span>
            </p>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {contactInfo.map((info, index) => (
            <div key={index} className="group relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  {info.title}
                </h3>
                <div className="text-gray-300 text-sm flex-grow">
                  {info.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/30">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Send Us a Message
                </span>
              </h2>
              <p className="text-gray-400">
                Let's discuss how we can revolutionize your gym management
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Inquiry Type
                </label>
                <select
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
                >
                  <option value="general" className="bg-gray-800">
                    General Inquiry
                  </option>
                  <option value="sales" className="bg-gray-800">
                    Sales & Pricing
                  </option>
                  <option value="support" className="bg-gray-800">
                    Technical Support
                  </option>
                  <option value="demo" className="bg-gray-800">
                    Request Demo
                  </option>
                  <option value="partnership" className="bg-gray-800">
                    Partnership
                  </option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all"
                  placeholder="Brief subject of your inquiry"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 transition-all resize-none"
                  placeholder="Please provide details about your inquiry, gym size, current challenges, or specific requirements..."
                />
              </div>

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  <div className="relative flex items-center space-x-3">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-8">
            <span className="text-gray-300">Why Choose</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              FitForge Support?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-all duration-300`}
                ></div>
                <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div
                    className={`text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text mb-6 flex justify-center`}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {showCTA && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/30 text-center">
              <h3 className="text-3xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Ready to Get Started?
                </span>
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of gyms worldwide who trust FitForge to manage
                their operations efficiently. Schedule a personalized demo today
                and see the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  <span className="relative">Schedule Demo</span>
                </button>

                <button className="group relative px-10 py-4 bg-transparent border-2 border-gray-600 text-gray-300 rounded-full font-bold text-lg hover:border-purple-400 hover:text-purple-300 transition-all">
                  <span className="relative">View Pricing</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
