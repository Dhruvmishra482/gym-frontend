import React, { useState, useEffect } from 'react';

const SubscriptionUI = ({
  subscription, currentPlan, usage, billing, plans, upgradeCalculation,
  loading, error, refreshing, selectedPlan, selectedBilling, calculatingPrice, processingUpgrade,
  currentPlanFeatures, usageWarnings, daysUntilBilling, hasActiveSubscription,
  onRefresh, onPlanSelect, onUpgrade, onBillingChange, onClearError, onCancelUpgrade
}) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for live stats
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get usage percentage
  const getUsagePercentage = () => {
    if (!usage || !usage.current || !usage.limit) return 0;
    return Math.min((usage.current / usage.limit) * 100, 100);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-green-500 bg-green-100';
      case 'pending': return 'text-yellow-500 bg-yellow-100';
      case 'expired': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="text-white mt-4 text-lg">Loading your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-circle floating-circle-1"></div>
        <div className="floating-circle floating-circle-2"></div>
        <div className="floating-circle floating-circle-3"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center glow-effect">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Subscription Dashboard</h1>
                <p className="text-blue-200">Manage your plan and monitor usage</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right text-white">
                <p className="text-sm text-blue-200">Current Time</p>
                <p className="text-lg font-semibold">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className={`glass-button ${refreshing ? 'opacity-50' : 'hover:scale-105'}`}
              >
                <svg className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="ml-2">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="error-alert slide-in-down">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-200">{error}</span>
                </div>
                <button onClick={onClearError} className="text-red-300 hover:text-red-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Current Plan Stat */}
            <div className="stat-card slide-in-up" style={{ animationDelay: '0ms' }}>
              <div className="stat-header">
                <div className="stat-icon bg-gradient-to-r from-blue-400 to-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Current Plan</p>
                  <p className="stat-value">{currentPlan?.name || 'No Plan'}</p>
                </div>
              </div>
              {currentPlan && (
                <div className="stat-details">
                  <div className="flex justify-between items-center">
                    <span className="stat-price">{formatCurrency(currentPlan.price)}</span>
                    <span className="stat-period">/{currentPlan.billing}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-3">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-1 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Usage Stat */}
            <div className="stat-card slide-in-up" style={{ animationDelay: '100ms' }}>
              <div className="stat-header">
                <div className="stat-icon bg-gradient-to-r from-green-400 to-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">API Usage</p>
                  <p className="stat-value">
                    {usage ? `${(usage.current || 0).toLocaleString()} / ${(usage.limit || 0).toLocaleString()}` : 'No Data'}
                  </p>
                </div>
              </div>
              {usage && (
                <div className="stat-details">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Usage</span>
                    <span className={`text-sm font-semibold ${getUsagePercentage() > 80 ? 'text-red-400' : getUsagePercentage() > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {getUsagePercentage().toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        getUsagePercentage() > 80 ? 'bg-gradient-to-r from-red-400 to-pink-400' :
                        getUsagePercentage() > 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                        'bg-gradient-to-r from-green-400 to-emerald-400'
                      }`}
                      style={{ width: `${getUsagePercentage()}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Status Stat */}
            <div className="stat-card slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="stat-header">
                <div className={`stat-icon ${subscription?.status === 'active' ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-gray-400 to-gray-500'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Status</p>
                  <p className="stat-value capitalize">{subscription?.status || 'Unknown'}</p>
                </div>
              </div>
              {billing && (
                <div className="stat-details">
                  <div className="text-center">
                    <span className="stat-price">{formatCurrency(billing.amount)}</span>
                    <p className="text-xs text-gray-400 mt-1">Next billing amount</p>
                  </div>
                </div>
              )}
            </div>

            {/* Next Billing Stat */}
            <div className="stat-card slide-in-up" style={{ animationDelay: '300ms' }}>
              <div className="stat-header">
                <div className="stat-icon bg-gradient-to-r from-purple-400 to-pink-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="stat-label">Next Billing</p>
                  <p className="stat-value">{daysUntilBilling !== undefined ? `${daysUntilBilling} days` : 'N/A'}</p>
                </div>
              </div>
              {subscription?.nextBillingDate && (
                <div className="stat-details text-center">
                  <p className="text-sm text-gray-300">{formatDate(subscription.nextBillingDate)}</p>
                  <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(0, 100 - (daysUntilBilling || 0) * 3)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <div className="glass-nav">
          {['overview', 'features', 'plans', 'billing'].map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`nav-tab ${activeSection === section ? 'nav-tab-active' : ''}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="capitalize">{section}</span>
              {activeSection === section && <div className="nav-indicator"></div>}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-8 fade-in">
            {/* Usage Warnings */}
            {usageWarnings && usageWarnings.length > 0 && (
              <div className="warning-card slide-in-left">
                <div className="flex items-start">
                  <div className="warning-icon">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.46 0L3.354 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-yellow-200 mb-2">Usage Alerts</h3>
                    <ul className="space-y-1">
                      {usageWarnings.map((warning, index) => (
                        <li key={index} className="text-yellow-100 text-sm">{warning}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Usage Progress */}
              <div className="progress-card slide-in-up" style={{ animationDelay: '0ms' }}>
                <div className="progress-header">
                  <h3 className="text-xl font-bold text-white mb-2">Usage Progress</h3>
                  <p className="text-gray-300 text-sm">Current month activity</p>
                </div>
                <div className="progress-content">
                  <div className="circular-progress">
                    <svg className="progress-ring" width="120" height="120">
                      <circle
                        className="progress-ring-background"
                        stroke="#374151"
                        strokeWidth="8"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                      />
                      <circle
                        className="progress-ring-fill"
                        stroke="url(#gradient1)"
                        strokeWidth="8"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        strokeDasharray={`${2 * Math.PI * 52}`}
                        strokeDashoffset={`${2 * Math.PI * 52 * (1 - getUsagePercentage() / 100)}`}
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#34D399" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="progress-text">
                      <span className="text-2xl font-bold text-white">{getUsagePercentage().toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Health */}
              <div className="health-card slide-in-up" style={{ animationDelay: '100ms' }}>
                <div className="health-header">
                  <h3 className="text-xl font-bold text-white mb-2">Account Health</h3>
                  <p className="text-gray-300 text-sm">Overall status</p>
                </div>
                <div className="health-content">
                  <div className="health-items">
                    <div className="health-item">
                      <div className={`health-dot ${subscription?.status === 'active' ? 'health-dot-green' : 'health-dot-red'}`}></div>
                      <span className="text-gray-200">Subscription Status</span>
                      <span className={`ml-auto font-semibold ${subscription?.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {subscription?.status || 'Unknown'}
                      </span>
                    </div>
                    <div className="health-item">
                      <div className={`health-dot ${getUsagePercentage() < 80 ? 'health-dot-green' : getUsagePercentage() < 95 ? 'health-dot-yellow' : 'health-dot-red'}`}></div>
                      <span className="text-gray-200">Usage Level</span>
                      <span className={`ml-auto font-semibold ${getUsagePercentage() < 80 ? 'text-green-400' : getUsagePercentage() < 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {getUsagePercentage() < 80 ? 'Healthy' : getUsagePercentage() < 95 ? 'High' : 'Critical'}
                      </span>
                    </div>
                    <div className="health-item">
                      <div className={`health-dot ${daysUntilBilling > 7 ? 'health-dot-green' : daysUntilBilling > 3 ? 'health-dot-yellow' : 'health-dot-red'}`}></div>
                      <span className="text-gray-200">Billing Status</span>
                      <span className={`ml-auto font-semibold ${daysUntilBilling > 7 ? 'text-green-400' : daysUntilBilling > 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {daysUntilBilling > 7 ? 'Good' : daysUntilBilling > 3 ? 'Due Soon' : 'Due Now'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="actions-card slide-in-up" style={{ animationDelay: '200ms' }}>
                <div className="actions-header">
                  <h3 className="text-xl font-bold text-white mb-2">Quick Actions</h3>
                  <p className="text-gray-300 text-sm">Manage your subscription</p>
                </div>
                <div className="actions-content">
                  <button
                    onClick={() => setActiveSection('plans')}
                    className="action-button action-button-primary"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Upgrade Plan
                  </button>
                  <button
                    onClick={() => setActiveSection('billing')}
                    className="action-button action-button-secondary"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View Billing
                  </button>
                  <button
                    onClick={onRefresh}
                    className="action-button action-button-outline"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {activeSection === 'features' && (
          <div className="fade-in">
            <div className="features-header text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Current Plan Features</h2>
              <p className="text-xl text-gray-300">Everything included in your {currentPlan?.name || 'current'} plan</p>
            </div>

            {currentPlanFeatures && currentPlanFeatures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPlanFeatures.map((feature, index) => (
                  <div key={index} className="feature-card slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="feature-icon">
                      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="feature-content">
                      <p className="text-white font-medium">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Features Available</h3>
                <p className="text-gray-500">Features will appear here when you have an active subscription.</p>
              </div>
            )}
          </div>
        )}

        {/* Plans Section */}
        {activeSection === 'plans' && (
          <div className="fade-in">
            <div className="plans-header text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
              <p className="text-xl text-gray-300">Select the perfect plan for your needs</p>
              
              {/* Billing Toggle */}
              <div className="billing-toggle">
                <button
                  onClick={() => onBillingChange && onBillingChange('monthly')}
                  className={`toggle-option ${selectedBilling === 'monthly' || !selectedBilling ? 'toggle-active' : ''}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => onBillingChange && onBillingChange('yearly')}
                  className={`toggle-option ${selectedBilling === 'yearly' ? 'toggle-active' : ''}`}
                >
                  Yearly
                  <span className="toggle-badge">Save 20%</span>
                </button>
              </div>
            </div>

            {plans && plans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`plan-card ${plan.popular ? 'plan-card-popular' : ''} slide-in-up`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {plan.popular && (
                      <div className="plan-badge">
                        <span>Most Popular</span>
                      </div>
                    )}
                    
                    <div className="plan-header">
                      <h3 className="plan-name">{plan.name}</h3>
                      <div className="plan-price">
                        <span className="price-amount">
                          {formatCurrency(
                            selectedBilling === 'yearly' && plan.yearlyPrice 
                              ? plan.yearlyPrice / 12 
                              : plan.price
                          )}
                           </span>
                        <span className="price-period">/month</span>
                      </div>
                      {selectedBilling === 'yearly' && plan.yearlyPrice && (
                        <p className="plan-savings">
                          Save {formatCurrency((plan.price * 12) - plan.yearlyPrice)} yearly
                        </p>
                      )}
                    </div>

                    <div className="plan-features">
                      {plan.features && plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="plan-feature">
                          <svg className="w-4 h-4 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        onPlanSelect && onPlanSelect(plan.id, selectedBilling);
                        setShowUpgradeModal(true);
                      }}
                      disabled={calculatingPrice || processingUpgrade || (currentPlan && currentPlan.name === plan.name)}
                      className={`plan-button ${
                        currentPlan && currentPlan.name === plan.name
                          ? 'plan-button-current'
                          : plan.popular
                            ? 'plan-button-popular'
                            : 'plan-button-default'
                      }`}
                    >
                      {calculatingPrice ? 'Calculating...' : 
                       processingUpgrade ? 'Processing...' : 
                       currentPlan && currentPlan.name === plan.name ? 'Current Plan' : 
                       `Choose ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Plans Available</h3>
                <p className="text-gray-500">Plans will be loaded shortly.</p>
              </div>
            )}
          </div>
        )}

        {/* Billing Section */}
        {activeSection === 'billing' && (
          <div className="fade-in">
            <div className="billing-header text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Billing Information</h2>
              <p className="text-xl text-gray-300">Manage your billing and payment history</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Billing Info */}
              <div className="billing-info-card slide-in-left">
                <div className="billing-info-header">
                  <h3 className="text-2xl font-bold text-white mb-6">Current Billing</h3>
                </div>
                <div className="billing-info-content">
                  <div className="billing-item">
                    <span className="billing-label">Plan</span>
                    <span className="billing-value">{currentPlan?.name || 'No Plan'}</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Amount</span>
                    <span className="billing-value">{formatCurrency(billing?.amount || 0)}</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Billing Cycle</span>
                    <span className="billing-value capitalize">{subscription?.billingCycle || 'N/A'}</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Next Payment</span>
                    <span className="billing-value">{formatDate(subscription?.nextBillingDate)}</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Status</span>
                    <span className={`billing-status ${getStatusColor(subscription?.status)}`}>
                      {subscription?.status || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="payment-history-card slide-in-right">
                <div className="payment-history-header">
                  <h3 className="text-2xl font-bold text-white mb-6">Payment History</h3>
                </div>
                <div className="payment-history-content">
                  {billing && billing.history && billing.history.length > 0 ? (
                    <div className="payment-list">
                      {billing.history.slice(0, 5).map((payment, index) => (
                        <div key={payment.id || index} className="payment-item" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="payment-info">
                            <div className="payment-date">{formatDate(payment.date)}</div>
                            <div className="payment-description">{payment.description || 'Subscription Payment'}</div>
                          </div>
                          <div className="payment-details">
                            <div className="payment-amount">{formatCurrency(payment.amount)}</div>
                            <div className={`payment-status ${getStatusColor(payment.status)}`}>
                              {payment.status || 'Unknown'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-payment-history">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-400 text-center">No payment history available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="modal-overlay">
          <div className="upgrade-modal slide-in-up">
            <div className="modal-header">
              <h3 className="text-2xl font-bold text-white">Confirm Upgrade</h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="modal-close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-content">
              <div className="upgrade-summary">
                <div className="upgrade-from">
                  <span className="upgrade-label">From:</span>
                  <span className="upgrade-plan">{currentPlan?.name || 'No Plan'}</span>
                  <span className="upgrade-price">{formatCurrency(currentPlan?.price || 0)}/month</span>
                </div>
                <div className="upgrade-arrow">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div className="upgrade-to">
                  <span className="upgrade-label">To:</span>
                  <span className="upgrade-plan">{plans?.find(p => p.id === selectedPlan)?.name}</span>
                  <span className="upgrade-price">
                    {formatCurrency(
                      selectedBilling === 'yearly' && plans?.find(p => p.id === selectedPlan)?.yearlyPrice
                        ? plans.find(p => p.id === selectedPlan).yearlyPrice / 12
                        : plans?.find(p => p.id === selectedPlan)?.price || 0
                    )}/month
                  </span>
                </div>
              </div>

              {upgradeCalculation && (
                <div className="upgrade-calculation">
                  <div className="calculation-item">
                    <span>Prorated Amount:</span>
                    <span>{formatCurrency(upgradeCalculation.prorationAmount || 0)}</span>
                  </div>
                  <div className="calculation-item total">
                    <span>Total Due Today:</span>
                    <span>{formatCurrency(upgradeCalculation.totalAmount || 0)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="modal-button modal-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpgrade && onUpgrade(selectedPlan, selectedBilling);
                  setShowUpgradeModal(false);
                }}
                disabled={processingUpgrade}
                className="modal-button modal-button-primary"
              >
                {processingUpgrade ? 'Processing...' : 'Confirm Upgrade'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS Styles */}
      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
          animation: float 6s ease-in-out infinite;
        }

        .floating-circle-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .floating-circle-2 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 15%;
          animation-delay: 2s;
        }

        .floating-circle-3 {
          width: 100px;
          height: 100px;
          top: 60%;
          right: 30%;
          animation-delay: 4s;
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px 20px;
          color: white;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .error-alert {
          background: rgba(239, 68, 68, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .stat-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: white;
        }

        .stat-label {
          font-size: 14px;
          color: #9CA3AF;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .stat-details {
          margin-top: 16px;
        }

        .stat-price {
          font-size: 28px;
          font-weight: 800;
          color: white;
        }

        .stat-period {
          color: #9CA3AF;
          font-size: 16px;
        }

        .glass-nav {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 8px;
          display: flex;
          gap: 8px;
        }

        .nav-tab {
          position: relative;
          padding: 12px 24px;
          border-radius: 12px;
          color: #9CA3AF;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          background: transparent;
        }

        .nav-tab-active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(90deg, #8B5CF6, #3B82F6);
          border-radius: 1px;
        }

        .warning-card, .progress-card, .health-card, .actions-card, .feature-card, 
        .plan-card, .billing-info-card, .payment-history-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px;
        }

        .plan-card-popular {
          border: 2px solid #8B5CF6;
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
        }

        .plan-badge {
          background: linear-gradient(90deg, #8B5CF6, #3B82F6);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          margin-bottom: 16px;
        }

        .billing-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 4px;
          margin: 20px auto;
          width: fit-content;
        }

        .toggle-option {
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #9CA3AF;
          font-weight: 500;
          position: relative;
          transition: all 0.3s ease;
        }

        .toggle-active {
          background: white;
          color: #1F2937;
        }

        .toggle-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #10B981;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .upgrade-modal {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px;
          max-width: 500px;
          width: 90%;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-close {
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .modal-button {
          flex: 1;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .modal-button-primary {
          background: linear-gradient(90deg, #8B5CF6, #3B82F6);
          color: white;
          border: none;
        }

        .modal-button-secondary {
          background: transparent;
          color: #9CA3AF;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .slide-in-up {
          animation: slide-in-up 0.8s ease-out forwards;
        }

        .slide-in-down {
          animation: slide-in-down 0.6s ease-out forwards;
        }

        .slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        @media (max-width: 768px) {
          .stat-card {
            padding: 16px;
          }
          
          .glass-nav {
            overflow-x: auto;
          }
          
          .nav-tab {
            white-space: nowrap;
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default SubscriptionUI;