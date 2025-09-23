// // components/ui/SubscriptionUI.jsx - FIRST HALF
// import React from 'react';

// const SubscriptionUI = ({
//   subscription, currentPlan, usage, billing, plans, upgradeCalculation,
//   loading, error, refreshing, selectedPlan, selectedBilling, calculatingPrice, processingUpgrade,
//   currentPlanFeatures, usageWarnings, daysUntilBilling, hasActiveSubscription,
//   onRefresh, onPlanSelect, onUpgrade, onBillingChange, onClearError, onCancelUpgrade
// }) => {

//   const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
//   const getProgressBarColor = (percentage) => percentage >= 90 ? 'bg-red-500' : percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500';
//   const getPlanColor = (planId) => ({ BASIC: 'bg-blue-500', ADVANCED: 'bg-purple-500', ENTERPRISE: 'bg-green-500' }[planId] || 'bg-gray-500');

//   if (loading) return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//         <p className="mt-4 text-gray-600">Loading subscription details...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
        
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">My Subscription</h1>
//               <p className="text-gray-600 mt-1">Manage your gym management plan and usage</p>
//             </div>
//             <button onClick={onRefresh} disabled={refreshing} className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 hover:bg-gray-50">
//               <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               {refreshing ? 'Refreshing...' : 'Refresh'}
//             </button>
//           </div>

//           {/* Error & Warnings */}
//           {error && (
//             <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
//               <p>{error}</p>
//               <button onClick={onClearError} className="text-red-500 hover:text-red-700">×</button>
//             </div>
//           )}
          
//           {usageWarnings.length > 0 && (
//             <div className="mt-4 space-y-2">
//               {usageWarnings.map((warning, index) => (
//                 <div key={index} className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg">
//                   <p className="font-medium capitalize">{warning.type} Warning</p>
//                   <p className="text-sm">{warning.message}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Current Plan Overview */}
//         <div className="mb-8">
//           <div className="bg-white rounded-xl shadow-sm border p-6">
//             <div className="flex items-start justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <div className={`w-12 h-12 rounded-lg ${getPlanColor(subscription?.plan)} flex items-center justify-center`}>
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">{currentPlan?.name || 'No Plan'} Plan</h2>
//                   <div className="flex items-center gap-4 mt-1">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${hasActiveSubscription ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       {hasActiveSubscription ? 'Active' : 'Inactive'}
//                     </span>
//                     {daysUntilBilling > 0 && <span className="text-gray-600 text-sm">{daysUntilBilling} days left</span>}
//                   </div>
//                 </div>
//               </div>

//               {hasActiveSubscription && (
//                 <div className="text-right">
//                   <p className="text-2xl font-bold text-gray-900">{formatCurrency(billing?.amount || 0)}</p>
//                   <p className="text-gray-600 text-sm">{billing?.cycleInfo?.cycleType === 'yearly' ? 'per year' : 'per month'}</p>
//                   {billing?.nextPayment && <p className="text-gray-500 text-sm mt-1">Next billing: {new Date(billing.nextPayment).toLocaleDateString()}</p>}
//                 </div>
//               )}
//             </div>

//             {/* Features */}
//             {currentPlanFeatures.length > 0 && (
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-3">Current Plan Features</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {currentPlanFeatures.slice(0, 6).map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-sm text-gray-700">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Usage Analytics */}
//         {usage && (
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Analytics</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
//               {/* Members Usage */}
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-medium text-gray-900">Members</h3>
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
//                   </svg>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-2xl font-bold">
//                     <span>{usage.members?.current || 0}</span>
//                     <span className="text-gray-400">/ {usage.members?.limit === -1 ? '∞' : (usage.members?.limit || 0)}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className={`h-2 rounded-full ${getProgressBarColor(usage.members?.percentage || 0)}`} style={{ width: `${Math.min(usage.members?.percentage || 0, 100)}%` }}></div>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>{Math.round(usage.members?.percentage || 0)}% used</span>
//                     <span>{usage.members?.remaining === 'Unlimited' ? '∞' : (usage.members?.remaining || 0)} remaining</span>
//                   </div>
//                 </div>
//               </div>

//               {/* WhatsApp Usage */}
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-medium text-gray-900">WhatsApp Reminders</h3>
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12V9a4 4 0 118 0m-4 8v2" />
//                   </svg>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-2xl font-bold">
//                     <span>{usage.whatsappReminders?.current || 0}</span>
//                     <span className="text-gray-400">/ {usage.whatsappReminders?.limit === -1 ? '∞' : (usage.whatsappReminders?.limit || 0)}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className={`h-2 rounded-full ${getProgressBarColor(usage.whatsappReminders?.percentage || 0)}`} style={{ width: `${Math.min(usage.whatsappReminders?.percentage || 0, 100)}%` }}></div>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>{Math.round(usage.whatsappReminders?.percentage || 0)}% used</span>
//                     <span>{usage.whatsappReminders?.remaining === 'Unlimited' ? '∞' : (usage.whatsappReminders?.remaining || 0)} remaining</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Analytics Usage */}
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-medium text-gray-900">Analytics Views</h3>
//                   <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
//                   </svg>
//                 </div>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-2xl font-bold">
//                     <span>{usage.analyticsViews?.current || 0}</span>
//                     <span className="text-gray-400">/ {usage.analyticsViews?.limit === -1 ? '∞' : (usage.analyticsViews?.limit || 0)}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div className={`h-2 rounded-full ${getProgressBarColor(usage.analyticsViews?.percentage || 0)}`} style={{ width: `${Math.min(usage.analyticsViews?.percentage || 0, 100)}%` }}></div>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>{Math.round(usage.analyticsViews?.percentage || 0)}% used</span>
//                     <span>{usage.analyticsViews?.remaining === 'Unlimited' ? '∞' : (usage.analyticsViews?.remaining || 0)} remaining</span>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}{/* Plan Comparison */}
//         {plans && plans.length > 0 && (
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
//                 <p className="text-gray-600 text-sm mt-1">Compare plans and upgrade your subscription</p>
//               </div>
              
//               {/* Billing Toggle */}
//               <div className="flex bg-gray-100 rounded-lg p-1">
//                 <button onClick={() => onBillingChange('monthly')} className={`px-4 py-2 text-sm rounded-md ${selectedBilling === 'monthly' ? 'bg-white shadow-sm' : 'text-gray-600'}`}>
//                   Monthly
//                 </button>
//                 <button onClick={() => onBillingChange('yearly')} className={`px-4 py-2 text-sm rounded-md ${selectedBilling === 'yearly' ? 'bg-white shadow-sm' : 'text-gray-600'}`}>
//                   Yearly
//                 </button>
//               </div>
//             </div>

//             {/* Plans Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {plans.map((plan) => (
//                 <div key={plan.id} className={`relative bg-white rounded-xl shadow-sm border-2 ${plan.current ? 'border-blue-500 ring-2 ring-blue-100' : selectedPlan === plan.id ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200'}`}>
                  
//                   {plan.current && (
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                       <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">Current Plan</span>
//                     </div>
//                   )}

//                   <div className="p-6">
//                     {/* Plan Header */}
//                     <div className="text-center mb-6">
//                       <div className={`w-12 h-12 rounded-lg ${getPlanColor(plan.id)} mx-auto mb-3 flex items-center justify-center`}>
//                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
//                         </svg>
//                       </div>
//                       <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
//                       <div className="mt-2">
//                         <span className="text-3xl font-bold text-gray-900">
//                           {formatCurrency(selectedBilling === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)}
//                         </span>
//                         <span className="text-gray-600">/{selectedBilling === 'yearly' ? 'year' : 'month'}</span>
//                       </div>
//                       {selectedBilling === 'yearly' && plan.savings && <p className="text-green-600 text-sm mt-1">{plan.savings}</p>}
//                     </div>

//                     {/* Plan Limits */}
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Members</span>
//                         <span className="font-medium">{plan.limits.members === -1 ? 'Unlimited' : plan.limits.members.toLocaleString()}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">WhatsApp Reminders</span>
//                         <span className="font-medium">{plan.limits.whatsappReminders === -1 ? 'Unlimited' : plan.limits.whatsappReminders.toLocaleString()}</span>
//                       </div>
//                       <div className="flex justify-between text-sm">
//                         <span className="text-gray-600">Analytics Views</span>
//                         <span className="font-medium">{plan.limits.analyticsViews === -1 ? 'Unlimited' : plan.limits.analyticsViews.toLocaleString()}</span>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="mb-6">
//                       <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
//                       <ul className="space-y-2">
//                         {plan.features.slice(0, 3).map((feature, index) => (
//                           <li key={index} className="flex items-start gap-2">
//                             <svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             <span className="text-sm text-gray-700">{feature}</span>
//                           </li>
//                         ))}
//                         {plan.features.length > 3 && <li className="text-sm text-gray-500 pl-6">+{plan.features.length - 3} more features</li>}
//                       </ul>
//                     </div>

//                     {/* Action Button */}
//                     <div>
//                       {plan.current ? (
//                         <div className="text-center py-3 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">Current Plan</div>
//                       ) : !plan.canFitUsage ? (
//                         <div className="text-center py-3 bg-red-100 text-red-600 rounded-lg text-sm">Cannot fit current usage</div>
//                       ) : (
//                         <button onClick={() => onPlanSelect(plan.id, selectedBilling)} disabled={calculatingPrice && selectedPlan === plan.id} className={`w-full py-3 rounded-lg text-sm font-medium ${selectedPlan === plan.id ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
//                           {calculatingPrice && selectedPlan === plan.id ? 'Calculating...' : selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Upgrade Calculator */}
//         {selectedPlan && upgradeCalculation && (
//           <div className="mb-8">
//             <div className="bg-white rounded-xl shadow-lg border p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Upgrade to {plans?.find(p => p.id === selectedPlan)?.name} Plan</h3>
//                 <button onClick={onCancelUpgrade} className="text-gray-400 hover:text-gray-600">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Pricing Breakdown */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <h4 className="font-medium text-gray-900 mb-3">Pricing Breakdown</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">{plans?.find(p => p.id === selectedPlan)?.name} Plan ({selectedBilling})</span>
//                     <span className="font-medium">{formatCurrency(upgradeCalculation.pricing.originalPrice)}</span>
//                   </div>
//                   {upgradeCalculation.pricing.proratedDiscount > 0 && (
//                     <div className="flex justify-between text-green-600">
//                       <span>Credit for remaining days ({upgradeCalculation.pricing.daysLeft} days)</span>
//                       <span>-{formatCurrency(upgradeCalculation.pricing.proratedDiscount)}</span>
//                     </div>
//                   )}
//                   <div className="border-t pt-2 mt-2">
//                     <div className="flex justify-between text-lg font-bold">
//                       <span>Total Amount</span>
//                       <span>{formatCurrency(upgradeCalculation.pricing.finalPrice)}</span>
//                     </div>
//                   </div>
//                   {upgradeCalculation.pricing.savings > 0 && (
//                     <p className="text-green-600 text-sm mt-1">You save {formatCurrency(upgradeCalculation.pricing.savings)}!</p>
//                   )}
//                 </div>
//               </div>

//               <button onClick={onUpgrade} disabled={processingUpgrade} className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50">
//                 {processingUpgrade ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </div>
//                 ) : (
//                   `Upgrade Now - Pay ${formatCurrency(upgradeCalculation.pricing.finalPrice)}`
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Help Section */}
//         <div className="mb-8">
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-bold mb-2">Need Help?</h2>
//                 <p className="text-blue-100 mb-4">Contact our support team for assistance with your subscription.</p>
//                 <div className="flex gap-3">
//                   <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm">
//                     Chat Support
//                   </button>
//                   <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm">
//                     Email Support
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <h3 className="font-medium text-gray-900 mb-3">Billing Information</h3>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>Payments processed securely</p>
//                 <p>Auto-renewal enabled</p>
//                 <p>Cancel anytime</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900 mb-3">Plan Benefits</h3>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>24/7 customer support</p>
//                 <p>Regular feature updates</p>
//                 <p>Data backup included</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900 mb-3">Security</h3>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>SSL encrypted</p>
//                 <p>PCI DSS compliant</p>
//                 <p>Regular audits</p>
//               </div>
//             </div>
//           </div>
//           <div className="border-t mt-6 pt-4">
//             <p className="text-center text-sm text-gray-500">
//               Last updated: {new Date().toLocaleDateString()} • Need help? Contact support@gymmanager.com
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SubscriptionUI;

// components/ui/SubscriptionUI.jsx - Part 1/4 (Imports, Loading & Header)
import React, { useState, useEffect } from 'react';

const SubscriptionUI = ({
  subscription, currentPlan, usage, billing, plans, upgradeCalculation,
  loading, error, refreshing, selectedPlan, selectedBilling, calculatingPrice, processingUpgrade,
  currentPlanFeatures, usageWarnings, daysUntilBilling, hasActiveSubscription,
  onRefresh, onPlanSelect, onUpgrade, onBillingChange, onClearError, onCancelUpgrade
}) => {

  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR', 
    maximumFractionDigits: 0 
  }).format(amount);
  
  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return 'from-red-400 to-red-600';
    if (percentage >= 75) return 'from-amber-400 to-orange-500';
    return 'from-emerald-400 to-green-500';
  };

  const getPlanGradient = (planId) => {
    const gradients = {
      'BASIC': 'from-blue-500 via-blue-600 to-indigo-700',
      'ADVANCED': 'from-purple-500 via-purple-600 to-pink-700',
      'ENTERPRISE': 'from-emerald-500 via-teal-600 to-cyan-700'
    };
    return gradients[planId] || 'from-gray-500 to-gray-600';
  };

  const getPlanBorderGradient = (planId) => {
    const gradients = {
      'BASIC': 'from-blue-200 to-indigo-300',
      'ADVANCED': 'from-purple-200 to-pink-300',
      'ENTERPRISE': 'from-emerald-200 to-teal-300'
    };
    return gradients[planId] || 'from-gray-200 to-gray-300';
  };

  // Loading State
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center transform scale-100 animate-pulse">
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
            <div className="absolute inset-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <p className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Loading subscription details...
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-xl animate-bounce"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        
        {/* Enhanced Header */}
        <div className={`mb-8 transform transition-all duration-1000 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    My Subscription
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">Manage your gym management plan and usage</p>
                </div>
              </div>
              
              <button 
                onClick={onRefresh} 
                disabled={refreshing} 
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <svg className={`w-5 h-5 transition-transform duration-500 ${refreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="font-medium">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Error & Warnings */}
          {error && (
            <div className="mt-6 transform animate-pulse">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.349 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="font-medium text-lg">{error}</p>
                  </div>
                  <button 
                    onClick={onClearError} 
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {usageWarnings.length > 0 && (
            <div className="mt-6 space-y-4">
              {usageWarnings.map((warning, index) => (
                <div 
                  key={index} 
                  className="transform animate-pulse bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-lg capitalize">{warning.type} Warning</p>
                      <p className="text-amber-100 mt-1">{warning.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Current Plan Overview */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${getPlanGradient(subscription?.plan)} opacity-5`}></div>
              
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getPlanGradient(subscription?.plan)} flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {currentPlan?.name || 'No Plan'} Plan
                      </h2>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                          hasActiveSubscription 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                            : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                        }`}>
                          {hasActiveSubscription ? '✓ Active' : '✗ Inactive'}
                        </span>
                        {daysUntilBilling > 0 && (
                          <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
                            {daysUntilBilling} days left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {hasActiveSubscription && (
                    <div className="text-right bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-inner">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(billing?.amount || 0)}
                      </p>
                      <p className="text-gray-600 font-medium mt-1">
                        {billing?.cycleInfo?.cycleType === 'yearly' ? 'per year' : 'per month'}
                      </p>
                      {billing?.nextPayment && (
                        <p className="text-gray-500 text-sm mt-2 flex items-center justify-end gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Next: {new Date(billing.nextPayment).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Enhanced Features */}
                {currentPlanFeatures.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-50/80 to-blue-50/80 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Current Plan Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentPlanFeatures.slice(0, 6).map((feature, index) => (
                        <div 
                          key={index} 
                          className="group flex items-center gap-3 p-4 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
{/* Enhanced Usage Analytics */}
        {usage && (
          <div className={`mb-8 transform transition-all duration-1000 delay-400 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
                Usage Analytics
              </h2>
              <p className="text-gray-600 mt-2 ml-11">Monitor your current usage across all features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Enhanced Members Usage */}
              <div 
                className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHoveredCard('members')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-opacity duration-500 ${hoveredCard === 'members' ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Members</h3>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {usage.members?.current || 0}
                      </span>
                      <span className="text-xl font-medium text-gray-400">
                        / {usage.members?.limit === -1 ? '∞' : (usage.members?.limit || 0)}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getProgressBarColor(usage.members?.percentage || 0)} shadow-lg transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${Math.min(usage.members?.percentage || 0, 100)}%`,
                            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                          }}
                        ></div>
                      </div>
                      <div className="absolute -top-8 left-0 text-xs font-medium text-gray-500">
                        {Math.round(usage.members?.percentage || 0)}% used
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">Usage</span>
                      <span className="font-bold text-blue-600">
                        {usage.members?.remaining === 'Unlimited' ? '∞' : (usage.members?.remaining || 0)} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced WhatsApp Usage */}
              <div 
                className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHoveredCard('whatsapp')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
                <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 transition-opacity duration-500 ${hoveredCard === 'whatsapp' ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900">WhatsApp</h3>
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12V9a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {usage.whatsappReminders?.current || 0}
                      </span>
                      <span className="text-xl font-medium text-gray-400">
                        / {usage.whatsappReminders?.limit === -1 ? '∞' : (usage.whatsappReminders?.limit || 0)}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getProgressBarColor(usage.whatsappReminders?.percentage || 0)} shadow-lg transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${Math.min(usage.whatsappReminders?.percentage || 0, 100)}%`,
                            boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
                          }}
                        ></div>
                      </div>
                      <div className="absolute -top-8 left-0 text-xs font-medium text-gray-500">
                        {Math.round(usage.whatsappReminders?.percentage || 0)}% used
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">Reminders</span>
                      <span className="font-bold text-green-600">
                        {usage.whatsappReminders?.remaining === 'Unlimited' ? '∞' : (usage.whatsappReminders?.remaining || 0)} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Analytics Usage */}
              <div 
                className="group relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
                onMouseEnter={() => setHoveredCard('analytics')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5"></div>
                <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transition-opacity duration-500 ${hoveredCard === 'analytics' ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-gray-900">Analytics</h3>
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {usage.analyticsViews?.current || 0}
                      </span>
                      <span className="text-xl font-medium text-gray-400">
                        / {usage.analyticsViews?.limit === -1 ? '∞' : (usage.analyticsViews?.limit || 0)}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${getProgressBarColor(usage.analyticsViews?.percentage || 0)} shadow-lg transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${Math.min(usage.analyticsViews?.percentage || 0, 100)}%`,
                            boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
                          }}
                        ></div>
                      </div>
                      <div className="absolute -top-8 left-0 text-xs font-medium text-gray-500">
                        {Math.round(usage.analyticsViews?.percentage || 0)}% used
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">Views</span>
                      <span className="font-bold text-purple-600">
                        {usage.analyticsViews?.remaining === 'Unlimited' ? '∞' : (usage.analyticsViews?.remaining || 0)} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Continue to Part 3 - Plans Comparison... */}
        {/* Enhanced Plan Comparison */}
        {plans && plans.length > 0 && (
          <div className={`mb-8 transform transition-all duration-1000 delay-600 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
                    </svg>
                  </div>
                  Available Plans
                </h2>
                <p className="text-gray-600 text-lg mt-2 ml-11">Compare plans and upgrade your subscription</p>
              </div>
              
              {/* Enhanced Billing Toggle */}
              <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-1 shadow-inner">
                <div className="flex">
                  <button 
                    onClick={() => onBillingChange('monthly')} 
                    className={`relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                      selectedBilling === 'monthly' 
                        ? 'bg-white text-gray-900 shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => onBillingChange('yearly')} 
                    className={`relative px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                      selectedBilling === 'yearly' 
                        ? 'bg-white text-gray-900 shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                    <span className="ml-2 px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs rounded-full shadow-sm">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={plan.id} 
                  className={`group relative transform transition-all duration-500 hover:scale-105 ${
                    plan.current ? 'scale-105' : ''
                  }`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  {/* Plan Card Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getPlanBorderGradient(plan.id)} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  
                  <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 overflow-hidden ${
                    plan.current 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : selectedPlan === plan.id 
                      ? 'border-purple-500 ring-4 ring-purple-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    
                    {/* Current Plan Badge */}
                    {plan.current && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          Current Plan
                        </span>
                      </div>
                    )}

                    {/* Plan Header with Gradient */}
                    <div className={`bg-gradient-to-br ${getPlanGradient(plan.id)} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full transform -translate-x-10 translate-y-10"></div>
                      
                      <div className="relative text-center">
                        <div className={`w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm`}>
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="mb-3">
                          <span className="text-4xl font-bold">
                            {formatCurrency(selectedBilling === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice)}
                          </span>
                          <span className="text-lg opacity-90">
                            /{selectedBilling === 'yearly' ? 'year' : 'month'}
                          </span>
                        </div>
                        {selectedBilling === 'yearly' && plan.savings && (
                          <p className="text-white/90 text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
                            {plan.savings}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-8">
                      {/* Plan Limits */}
                      <div className="space-y-4 mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          Plan Limits
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                            <span className="text-gray-700 font-medium">Members</span>
                            <span className="font-bold text-blue-600">
                              {plan.limits.members === -1 ? 'Unlimited' : plan.limits.members.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <span className="text-gray-700 font-medium">WhatsApp Reminders</span>
                            <span className="font-bold text-green-600">
                              {plan.limits.whatsappReminders === -1 ? 'Unlimited' : plan.limits.whatsappReminders.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                            <span className="text-gray-700 font-medium">Analytics Views</span>
                            <span className="font-bold text-purple-600">
                              {plan.limits.analyticsViews === -1 ? 'Unlimited' : plan.limits.analyticsViews.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="mb-8">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {plan.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 group/feature">
                              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/feature:scale-110 transition-transform duration-200">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium group-hover/feature:text-gray-900 transition-colors duration-200">
                                {feature}
                              </span>
                            </li>
                          ))}
                          {plan.features.length > 4 && (
                            <li className="text-gray-500 pl-8 text-sm font-medium">
                              +{plan.features.length - 4} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Enhanced Action Button */}
                      <div className="space-y-3">
                        {plan.current ? (
                          <div className="text-center py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 rounded-xl text-lg font-bold">
                            Current Plan
                          </div>
                        ) : !plan.canFitUsage ? (
                          <div className="text-center py-4 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-xl text-sm font-medium">
                            Cannot fit current usage
                          </div>
                        ) : (
                          <button 
                            onClick={() => onPlanSelect(plan.id, selectedBilling)} 
                            disabled={calculatingPrice && selectedPlan === plan.id} 
                            className={`group w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 ${
                              selectedPlan === plan.id 
                                ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-xl' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                            }`}
                          >
                            <div className="flex items-center justify-center gap-3">
                              {calculatingPrice && selectedPlan === plan.id ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Calculating...
                                </>
                              ) : selectedPlan === plan.id ? (
                                <>
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Selected
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                  Select Plan
                                </>
                              )}
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
{/* Continue to Part 4... */}
{/* Enhanced Upgrade Calculator */}
        {selectedPlan && upgradeCalculation && (
          <div className={`mb-8 transform transition-all duration-1000 delay-800 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Upgrade to {plans?.find(p => p.id === selectedPlan)?.name} Plan</h3>
                        <p className="text-white/90">Review your upgrade details and pricing</p>
                      </div>
                    </div>
                    <button 
                      onClick={onCancelUpgrade} 
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="p-8">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      Pricing Breakdown
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                        <div>
                          <span className="text-gray-700 font-medium">{plans?.find(p => p.id === selectedPlan)?.name} Plan</span>
                          <span className="text-gray-500 text-sm ml-2">({selectedBilling})</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                          {formatCurrency(upgradeCalculation.pricing.originalPrice)}
                        </span>
                      </div>
                      
                      {upgradeCalculation.pricing.proratedDiscount > 0 && (
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                          <div>
                            <span className="text-green-700 font-medium">Credit for remaining days</span>
                            <span className="text-green-600 text-sm ml-2">
                              ({upgradeCalculation.pricing.daysLeft} days)
                            </span>
                          </div>
                          <span className="font-bold text-lg text-green-600">
                            -{formatCurrency(upgradeCalculation.pricing.proratedDiscount)}
                          </span>
                        </div>
                      )}
                      
                      <div className="border-t-2 border-dashed border-gray-300 pt-4">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <span className="text-xl font-bold text-gray-900">Total Amount</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {formatCurrency(upgradeCalculation.pricing.finalPrice)}
                          </span>
                        </div>
                      </div>
                      
                      {upgradeCalculation.pricing.savings > 0 && (
                        <div className="text-center">
                          <p className="text-green-600 font-medium bg-green-50 rounded-full px-4 py-2 inline-block">
                            🎉 You save {formatCurrency(upgradeCalculation.pricing.savings)}!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={onUpgrade} 
                    disabled={processingUpgrade} 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {processingUpgrade ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Upgrade Now - Pay {formatCurrency(upgradeCalculation.pricing.finalPrice)}</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Help Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-1000 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full transform -translate-x-16 translate-y-16"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Need Help?</h2>
                    <p className="text-blue-100 text-lg mb-4">Contact our support team for assistance with your subscription.</p>
                    <div className="flex gap-4">
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                        💬 Chat Support
                      </button>
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105">
                        📧 Email Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className={`bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 transform transition-all duration-1000 delay-1200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Billing Information</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Payments processed securely
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Auto-renewal enabled
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Cancel anytime
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Plan Benefits</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  24/7 customer support
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Regular feature updates
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Data backup included
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto md:ml-auto md:mr-0 mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">Security</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center justify-center md:justify-end gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  SSL encrypted
                </p>
                <p className="flex items-center justify-center md:justify-end gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  PCI DSS compliant
                </p>
                <p className="flex items-center justify-center md:justify-end gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Regular audits
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6">
            <p className="text-center text-gray-500 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></span>
              Last updated: {new Date().toLocaleDateString()} • Need help? Contact support@gymmanager.com
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse"></span>
            </p>
          </div>
        </div>

      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionUI;