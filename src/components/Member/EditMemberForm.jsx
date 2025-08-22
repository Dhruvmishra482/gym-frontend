import { useState, useEffect } from 'react';
import { User, Calendar, DollarSign, Edit3, Save, Search, Zap, Target, Flame, Shield } from 'lucide-react';

const EditMemberForm = () {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [editData, setEditData] = useState({
    age: '',
    planDuration: '',
    feesAmount: '',
    nextDueDate: '',
    lastPaidOn: '',
    paymentStatus: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showParticles, setShowParticles] = useState(true);

  // Mock member data
  const mockMembers = [
    {
      _id: '1',
      name: 'Alex Thunder',
      phoneNo: '+91-9876543210',
      email: 'alex.thunder@gym.com',
      age: 25,
      gender: 'Male',
      planDuration: '6 month',
      feesAmount: 15000,
      nextDueDate: '2025-12-01',
      lastPaidOn: '2025-06-01',
      paymentStatus: 'Paid',
      address: '123 Muscle Street, Beast City'
    },
    {
      _id: '2',
      name: 'Sarah Storm',
      phoneNo: '+91-9876543211',
      email: 'sarah.storm@gym.com',
      age: 28,
      gender: 'Female',
      planDuration: '1 year',
      feesAmount: 25000,
      nextDueDate: '2026-01-15',
      lastPaidOn: '2025-01-15',
      paymentStatus: 'Paid',
      address: '456 Power Avenue, Strength Valley'
    }
  ];

  const allowedToUpdate = ["age", "planDuration", "feesAmount", "nextDueDate", "lastPaidOn", "paymentStatus"];

  const handleSearch = () => {
    const member = mockMembers.find(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phoneNo.includes(searchQuery)
    );
    
    if (member) {
      setSelectedMember(member);
      // Initialize edit data with current values
      const initData = {};
      allowedToUpdate.forEach(field => {
        if (field === 'nextDueDate' || field === 'lastPaidOn') {
          initData[field] = member[field] ? new Date(member[field]).toISOString().split('T')[0] : '';
        } else {
          initData[field] = member[field] || '';
        }
      });
      setEditData(initData);
    } else {
      alert('Member not found!');
    }
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      console.log('Updated data:', editData);
      alert('Member updated successfully!');
      setIsUpdating(false);
    }, 2500);
  };

  // Generate floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 3 + 1,
    color: ['red', 'orange', 'yellow', 'purple'][Math.floor(Math.random() * 4)]
  }));

  return (
    <div className="min-h-screen bg-black overflow-hidden relative perspective-1000">
      {/* Dynamic 3D Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-red-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-900/20 to-transparent"></div>
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 transform rotate-45 opacity-20 animate-spin duration-20000"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-12 opacity-30 animate-pulse"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 transform -rotate-12 opacity-15 animate-bounce duration-3000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-yellow-500 to-red-500 transform rotate-45 opacity-25 animate-ping duration-4000"></div>
      </div>

      {/* Floating Particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full bg-${particle.color}-500 opacity-40 animate-pulse`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${particle.speed}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Epic Header */}
        <div className="text-center mb-16 transform-gpu perspective-1000">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-purple-600 via-red-600 to-orange-600 rounded-full mb-8 shadow-2xl transform hover:rotate-y-180 transition-transform duration-1000 animate-pulse">
            <Edit3 className="w-14 h-14 text-white animate-bounce" />
          </div>
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-red-500 via-orange-500 to-yellow-500 mb-6 tracking-widest animate-pulse transform hover:scale-110 transition-transform duration-500">
            WARRIOR
          </h1>
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4 tracking-wider">
            EVOLUTION
          </h2>
          <p className="text-2xl text-gray-300 font-light tracking-wide animate-fade-in">
            Transform • Upgrade • Dominate
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <div className="bg-black/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-500/30 transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/50">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search warrior by name or phone..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105 text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 via-red-600 to-orange-600 text-white font-bold rounded-xl hover:from-purple-700 hover:via-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110 hover:rotate-2 shadow-xl hover:shadow-2xl flex items-center space-x-2"
              >
                <Zap className="w-5 h-5 animate-pulse" />
                <span>LOCATE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Member Details & Edit Form */}
        {selectedMember && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Member Info Card */}
            <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-500/30 overflow-hidden transform hover:scale-105 transition-all duration-700 hover:shadow-blue-500/50">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-3 animate-pulse"></div>
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 animate-pulse">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {selectedMember.name}
                    </h3>
                    <p className="text-gray-400">Warrior Profile</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-900/50 rounded-xl transform hover:scale-105 transition-all duration-300">
                    <Shield className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-gray-300 font-medium">Phone:</span>
                    <span className="text-white ml-2">{selectedMember.phoneNo}</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-900/50 rounded-xl transform hover:scale-105 transition-all duration-300">
                    <Target className="w-5 h-5 text-green-400 mr-3" />
                    <span className="text-gray-300 font-medium">Email:</span>
                    <span className="text-white ml-2">{selectedMember.email}</span>
                  </div>
                  
                  <div className="flex items-center p-4 bg-gray-900/50 rounded-xl transform hover:scale-105 transition-all duration-300">
                    <Flame className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-gray-300 font-medium">Gender:</span>
                    <span className="text-white ml-2">{selectedMember.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Form Card */}
            <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/30 overflow-hidden transform hover:scale-105 transition-all duration-700 hover:shadow-red-500/50">
              <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 h-3 animate-pulse"></div>
              
              <div className="p-8">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-8 flex items-center">
                  <Edit3 className="w-8 h-8 mr-3 text-red-500 animate-pulse" />
                  MODIFY STATS
                </h3>

                <div className="space-y-6">
                  {/* Age Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-red-400 transition-colors">
                      <User className="w-5 h-5 mr-2" />
                      Battle Age
                    </label>
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                      placeholder="Warrior age"
                    />
                  </div>

                  {/* Plan Duration Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-orange-400 transition-colors">
                      <Calendar className="w-5 h-5 mr-2" />
                      Power Plan
                    </label>
                    <select
                      value={editData.planDuration}
                      onChange={(e) => handleChange('planDuration', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                    >
                      <option value="">Select Power Level</option>
                      <option value="1 month">1 Month - Quick Strike</option>
                      <option value="3 month">3 Months - Thunder Force</option>
                      <option value="6 month">6 Months - Lightning Bolt</option>
                      <option value="1 year">1 Year - Storm Master</option>
                    </select>
                  </div>

                  {/* Fees Amount Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Battle Fund
                    </label>
                    <input
                      type="number"
                      value={editData.feesAmount}
                      onChange={(e) => handleChange('feesAmount', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                      placeholder="Amount in ₹"
                    />
                  </div>

                  {/* Next Due Date Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                      <Calendar className="w-5 h-5 mr-2" />
                      Next Challenge
                    </label>
                    <input
                      type="date"
                      value={editData.nextDueDate}
                      onChange={(e) => handleChange('nextDueDate', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                    />
                  </div>

                  {/* Last Paid On Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-green-400 transition-colors">
                      <Calendar className="w-5 h-5 mr-2" />
                      Last Victory
                    </label>
                    <input
                      type="date"
                      value={editData.lastPaidOn}
                      onChange={(e) => handleChange('lastPaidOn', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                    />
                  </div>

                  {/* Payment Status Field */}
                  <div className="group">
                    <label className="flex items-center text-gray-300 font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Battle Status
                    </label>
                    <select
                      value={editData.paymentStatus}
                      onChange={(e) => handleChange('paymentStatus', e.target.value)}
                      className="w-full px-6 py-4 bg-gray-900/70 border-2 border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 transform hover:scale-105 focus:scale-105"
                    >
                      <option value="Paid">Victory Achieved ⚡</option>
                      <option value="Pending">Battle Pending 🔥</option>
                    </select>
                  </div>
                </div>

                {/* Update Button */}
                <div className="mt-10">
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className={`w-full py-6 px-8 text-xl font-bold text-white rounded-xl transition-all duration-500 transform hover:scale-110 active:scale-95 ${
                      isUpdating
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 via-red-600 to-orange-600 hover:from-purple-700 hover:via-red-700 hover:to-orange-700 shadow-2xl hover:shadow-red-900/50'
                    }`}
                  >
                    {isUpdating ? (
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
                        <div className="text-2xl font-black tracking-wider">EVOLVING WARRIOR...</div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Save className="w-8 h-8 mr-4 animate-pulse" />
                        <div className="text-2xl font-black tracking-wider">UPGRADE WARRIOR</div>
                        <Flame className="w-8 h-8 ml-4 animate-bounce" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={() => setShowParticles(!showParticles)}
            className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 hover:rotate-12 flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-white animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMemberForm;