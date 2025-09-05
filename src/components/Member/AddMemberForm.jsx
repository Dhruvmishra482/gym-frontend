import {
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Dumbbell,
  CreditCard,
  Camera,
  ArrowLeft,
} from "lucide-react";

const AddMemberForm = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-white shadow-md border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add New Member
              </h1>
              <p className="text-sm text-gray-600">Register a new gym member</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-lg shadow-md border border-blue-100 p-6 mb-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                Welcome New Member
              </h2>
              <p className="text-gray-600">Fill in the details below to register a new gym member</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h3 className="text-lg font-medium">Member Information</h3>
            <p className="text-blue-100 mt-1">Please provide accurate information for the new member</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 hover:shadow-sm"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-green-400 hover:shadow-sm"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4 mr-2 text-purple-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:border-purple-400 hover:shadow-sm"
                />
              </div>

              {/* Age */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-400 hover:shadow-sm"
                />
              </div>

              {/* Gender */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Users className="w-4 h-4 mr-2 text-indigo-500" />
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400 hover:shadow-sm bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Joining Date */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                  Joining Date
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:border-teal-400 hover:shadow-sm"
                />
              </div>

              {/* Plan Duration */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <CreditCard className="w-4 h-4 mr-2 text-pink-500" />
                  Plan Duration
                </label>
                <select
                  name="planDuration"
                  value={formData.planDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 hover:border-pink-400 hover:shadow-sm bg-white"
                >
                  <option value="">Select Plan</option>
                  <option value="1 month">1 month</option>
                  <option value="3 month">3 months</option>
                  <option value="6 month">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>

              {/* Fees Amount */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-emerald-500" />
                  Fees Amount *
                </label>
                <input
                  type="number"
                  name="feesAmount"
                  value={formData.feesAmount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 hover:border-emerald-400 hover:shadow-sm"
                />
              </div>

              {/* Next Due Date */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" />
                  Next Due Date *
                </label>
                <input
                  type="date"
                  name="nextDueDate"
                  value={formData.nextDueDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 hover:border-red-400 hover:shadow-sm"
                />
              </div>

              {/* Payment Status */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <CreditCard className="w-4 h-4 mr-2 text-cyan-500" />
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 hover:border-cyan-400 hover:shadow-sm bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              {/* Last Paid On */}
              <div className="group">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                  Last Paid On
                </label>
                <input
                  type="date"
                  name="lastPaidOn"
                  value={formData.lastPaidOn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-amber-400 hover:shadow-sm"
                />
              </div>

              {/* Address */}
              <div className="group md:col-span-2">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-rose-500" />
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter full address"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 hover:border-rose-400 hover:shadow-sm resize-none"
                />
              </div>

              {/* Photo URL */}
              <div className="group md:col-span-2">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Camera className="w-4 h-4 mr-2 text-violet-500" />
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="Enter photo URL (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-violet-400 hover:shadow-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 text-lg font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    Adding Member...
                  </>
                ) : (
                  <>
                    <Dumbbell className="w-5 h-5" />
                    Add Member
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg p-4 border border-blue-100 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Personal Info</h4>
            <p className="text-sm text-gray-600">Basic member details and contact information</p>
          </div>

          <div className="bg-gradient-to-br from-white to-green-50 rounded-lg p-4 border border-green-100 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Plan & Payment</h4>
            <p className="text-sm text-gray-600">Membership plan and payment details</p>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg p-4 border border-purple-100 text-center hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Gym Access</h4>
            <p className="text-sm text-gray-600">Ready to start their fitness journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;