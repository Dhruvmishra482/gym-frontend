import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Rocket,
  Users,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Navigation from "../Hero/Navigation";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

  // Get current location
  const location = useLocation();
  const showCTA = location.pathname === "/pricing";

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated number counter
  const AnimatedNumber = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const start = Date.now();
      const end = start + duration;

      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - start) / duration, 1);
        setCount(Math.floor(progress * value));

        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value, duration]);

    return count;
  };

  const plans = [
    {
      name: "Starter",
      tagline: "Launch Your Fitness Empire",
      description:
        "Perfect for boutique studios and personal trainers ready to scale",
      monthlyPrice: 39,
      yearlyPrice: 390,
      icon: <Rocket className="w-8 h-8" />,
      color: "from-cyan-400 via-blue-500 to-purple-600",
      glowColor: "cyan",
      features: [
        { name: "Up to 150 members", included: true, highlight: false },
        { name: "AI-powered member insights", included: true, highlight: true },
        { name: "Smart payment automation", included: true, highlight: false },
        {
          name: "Real-time dashboard analytics",
          included: true,
          highlight: false,
        },
        { name: "24/7 chat support", included: true, highlight: false },
        { name: "Advanced staff management", included: true, highlight: false },
        { name: "Custom workout templates", included: true, highlight: true },
        { name: "Multi-location support", included: false, highlight: false },
        { name: "White-label branding", included: false, highlight: false },
        { name: "Advanced nutrition AI", included: false, highlight: false },
      ],
      popular: false,
      buttonText: "Start Your Journey",
      savings: "Save $78 yearly",
    },
    {
      name: "Professional",
      tagline: "Dominate Your Market",
      description: "For ambitious gym owners ready to revolutionize fitness",
      monthlyPrice: 99,
      yearlyPrice: 990,
      icon: <Crown className="w-8 h-8" />,
      color: "from-orange-400 via-red-500 to-pink-600",
      glowColor: "orange",
      features: [
        { name: "Up to 1000 members", included: true, highlight: false },
        {
          name: "Advanced AI recommendations",
          included: true,
          highlight: true,
        },
        { name: "Complete automation suite", included: true, highlight: true },
        {
          name: "Predictive analytics engine",
          included: true,
          highlight: true,
        },
        {
          name: "Priority phone + chat support",
          included: true,
          highlight: false,
        },
        {
          name: "Unlimited staff & trainers",
          included: true,
          highlight: false,
        },
        { name: "Smart nutrition planning", included: true, highlight: true },
        { name: "Multi-location dashboard", included: true, highlight: true },
        { name: "Custom branding package", included: true, highlight: false },
        {
          name: "Advanced member retention AI",
          included: true,
          highlight: true,
        },
      ],
      popular: true,
      buttonText: "Unleash Your Potential",
      savings: "Save $198 yearly",
    },
    {
      name: "Enterprise",
      tagline: "Industry Leadership",
      description: "For fitness empires that demand the extraordinary",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-purple-400 via-pink-500 to-red-500",
      glowColor: "purple",
      features: [
        { name: "Unlimited everything", included: true, highlight: true },
        { name: "Custom AI model training", included: true, highlight: true },
        {
          name: "White-glove setup & migration",
          included: true,
          highlight: true,
        },
        {
          name: "Real-time business intelligence",
          included: true,
          highlight: true,
        },
        { name: "Dedicated success manager", included: true, highlight: true },
        {
          name: "Global franchise management",
          included: true,
          highlight: true,
        },
        {
          name: "Advanced biometric integration",
          included: true,
          highlight: true,
        },
        { name: "Custom API & webhooks", included: true, highlight: false },
        { name: "Enterprise security suite", included: true, highlight: false },
        {
          name: "Personalized onboarding program",
          included: true,
          highlight: true,
        },
      ],
      popular: false,
      buttonText: "Claim Your Throne",
      savings: "Save $398 yearly",
    },
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description:
        "Machine learning algorithms analyze member behavior to predict churn, optimize pricing, and boost retention rates by up to 40%.",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Predictive Analytics",
      description:
        "Forecast revenue, member growth, and equipment needs with 95% accuracy using our proprietary prediction engine.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, SOC 2 compliance, and advanced threat detection keep your data fortress-secure.",
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-6">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        ></div>
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 inline-flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white/90 font-medium">
                Transform Your Fitness Business in 2025
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Pricing That
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Powers Growth
              </span>
            </h1>

            <p className="text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Revolutionary gym management that grows with your ambition. From
              boutique studios to fitness empires, we've got the perfect plan to
              supercharge your success.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  <AnimatedNumber value={10000} />+
                </div>
                <div className="text-white/70">Gyms Transformed</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  $<AnimatedNumber value={50} />
                  M+
                </div>
                <div className="text-white/70">Revenue Generated</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-pink-400 mb-2">
                  <AnimatedNumber value={95} />%
                </div>
                <div className="text-white/70">Retention Rate</div>
              </div>
            </div>

            {/* Enhanced Billing Toggle */}
            <div className="flex items-center justify-center mb-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
                <div className="flex items-center">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                      billingPeriod === "monthly"
                        ? "bg-gradient-to-r from-orange-400 to-pink-500 text-black shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                      billingPeriod === "yearly"
                        ? "bg-gradient-to-r from-orange-400 to-pink-500 text-black shadow-lg"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-green-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                      20% OFF
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Compact Version */}
      <section className="relative z-10 ">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  plan.popular ? "lg:scale-105 lg:-translate-y-2" : ""
                } ${hoveredCard === index ? "scale-102" : ""}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${plan.color} rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                ></div>

                <div
                  className={`relative bg-black/40 backdrop-blur-2xl rounded-2xl p-6 border transition-all duration-500 ${
                    plan.popular
                      ? "border-orange-400/50 bg-gradient-to-b from-orange-500/20 via-black/40 to-black/40"
                      : "border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-black px-6 py-2 rounded-full font-bold flex items-center shadow-xl text-sm">
                        <Crown className="w-4 h-4 mr-1" />
                        POPULAR
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}
                    >
                      <div className="text-white scale-75">{plan.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2">
                      {plan.tagline}
                    </p>
                    <p className="text-white/60 mb-4 text-sm leading-relaxed">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-center mb-1">
                        <span className="text-4xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                          $
                          {billingPeriod === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice}
                        </span>
                        <span className="text-white/60 ml-2 text-lg">
                          /{billingPeriod === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      {billingPeriod === "yearly" && (
                        <div className="text-green-400 font-semibold text-sm">
                          {plan.savings}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Show only top 5 features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={`flex items-center text-sm transition-all duration-300 ${
                          feature.highlight
                            ? "bg-gradient-to-r from-orange-400/20 to-transparent rounded-lg p-2 -ml-2"
                            : ""
                        }`}
                      >
                        {feature.included ? (
                          <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="w-3 h-3 text-black" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <X className="w-3 h-3 text-gray-400" />
                          </div>
                        )}
                        <span
                          className={`${
                            feature.included ? "text-white" : "text-gray-500"
                          } ${
                            feature.highlight ? "font-semibold" : ""
                          } text-sm`}
                        >
                          {feature.name}
                          {feature.highlight && (
                            <Sparkles className="inline w-3 h-3 ml-1 text-orange-400" />
                          )}
                        </span>
                      </li>
                    ))}
                    <li className="text-center text-white/60 text-sm pt-2">
                      + {plan.features.length - 5} more features
                    </li>
                  </ul>

                  <button
                    className={`group w-full py-3 px-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden ${
                      plan.popular
                        ? "bg-gradient-to-r from-orange-400 to-pink-500 text-black hover:from-orange-500 hover:to-pink-600 shadow-xl shadow-orange-500/30"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative z-10 py-32 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              Why Industry Leaders Choose
              <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                {" "}
                FitForge
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design. Experience the
              future of gym management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-orange-400/50 transition-all duration-500 cursor-pointer hover:scale-105"
                onClick={() => setActiveFeature(index)}
              >
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-black">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show when on /pricing route */}
      {showCTA && (
        <section className="relative z-10 py-32">
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
                  ✨ No credit card required • 14-day free trial • Cancel
                  anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PricingPage;
