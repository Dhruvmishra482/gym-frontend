import React, { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Users,
  Shield,
  Headphones,
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "general",
    message: "",
  });

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
          <p className="text-sm text-gray-400">
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
          <p className="text-sm text-orange-400">
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
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security for your gym's data",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Technical Support",
      description: "Round-the-clock assistance when you need it",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your gym management? Get in touch with our team
            and discover how FitForge can revolutionize your fitness business
            operations.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10"
            >
              <div className="text-orange-400 mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">
                {info.title}
              </h3>
              <div className="text-gray-300 text-sm">{info.content}</div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-orange-500/10 mb-12">
          <h2 className="text-3xl font-bold text-orange-400 text-center mb-8">
            Send Us a Message
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-orange-400 font-semibold">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-orange-400 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-orange-400 font-semibold">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-orange-400 font-semibold">
                Inquiry Type
              </label>
              <select
                name="inquiry"
                value={formData.inquiry}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
              >
                <option value="general" className="bg-slate-800">
                  General Inquiry
                </option>
                <option value="sales" className="bg-slate-800">
                  Sales & Pricing
                </option>
                <option value="support" className="bg-slate-800">
                  Technical Support
                </option>
                <option value="demo" className="bg-slate-800">
                  Request Demo
                </option>
                <option value="partnership" className="bg-slate-800">
                  Partnership
                </option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-orange-400 font-semibold">Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all"
                placeholder="Brief subject of your inquiry"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-orange-400 font-semibold">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                className="w-full bg-white/10 border border-orange-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all resize-none"
                placeholder="Please provide details about your inquiry, gym size, current challenges, or specific requirements..."
              />
            </div>

            <div className="md:col-span-2 text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:from-orange-400 hover:to-orange-500 transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/20 inline-flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose FitForge Support?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-orange-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl p-8 text-center border border-orange-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of gyms worldwide who trust FitForge to manage their
            operations efficiently. Schedule a personalized demo today and see
            the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold hover:from-orange-400 hover:to-orange-500 transition-all transform hover:-translate-y-1">
              Schedule Demo
            </button>
            <button className="border-2 border-orange-400 text-orange-400 px-8 py-3 rounded-full font-bold hover:bg-orange-400 hover:text-black transition-all">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
