import React, { useState } from 'react';
import { User, Bell, Lock, MapPin, BarChart, CreditCard, LogOut, Code, ChevronRight } from 'lucide-react';

export const Settings = ({ portal }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState(portal === 'athlete' ? 'Marcus Johnson' : 'Coach Mike Thompson');
  const [email, setEmail] = useState(`${portal}@example.com`);
  const [showLocation, setShowLocation] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  const tabs = [
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="w-4 h-4" /> }
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300 w-full max-w-4xl mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm font-medium">Manage your {portal} account and preferences</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 pb-12">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white shadow-sm border border-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 border border-transparent'}`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-gray-400" />}
            </button>
          ))}
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 border border-transparent transition-all">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            {activeTab === 'account' && (
              <div className="animate-in fade-in duration-300 space-y-6 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm shadow-black/5" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm shadow-black/5" 
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  <label className="text-sm font-bold text-gray-700 block">Change Password</label>
                  <button className="bg-white border text-gray-700 border-gray-200 font-bold py-2.5 px-6 rounded-xl text-sm shadow-sm hover:bg-gray-50 transition-colors w-max">
                    Update Password
                  </button>
                </div>

                <div className="pt-6 mt-6 flex gap-3">
                  <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md hover:bg-gray-800 transition-colors w-max">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="animate-in fade-in duration-300 space-y-8 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Profile Visibility</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-medium focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm shadow-black/5 appearance-none">
                      <option value="public">Public - Anyone can see</option>
                      <option value="verified">Verified Coaches Only</option>
                      <option value="private">Private - Invite Only</option>
                    </select>
                    <p className="text-xs text-gray-400 font-medium mt-2">Control who can view your profile and highlights.</p>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shrink-0">
                        <MapPin className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Show Location</div>
                        <div className="text-xs text-gray-500 font-medium mt-0.5">Display your city and state publicly</div>
                      </div>
                    </div>
                    {/* Simplified switch logic for pure tailwind without radical UI libs */}
                    <button 
                      onClick={() => setShowLocation(!showLocation)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${showLocation ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showLocation ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shrink-0">
                        <BarChart className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Show Stats</div>
                        <div className="text-xs text-gray-500 font-medium mt-0.5">Display your statistics publicly</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowStats(!showStats)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${showStats ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showStats ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-blue-50">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-800 font-bold leading-relaxed">
                    Your data is protected and NCAA-compliant. We never share your information without explicit permission.
                  </p>
                </div>

                <div className="pt-6 flex gap-3">
                  <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md hover:bg-gray-800 transition-colors w-max">
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in duration-300 space-y-8 relative z-10">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-gray-900">Email Notifications</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Receive updates via email</div>
                    </div>
                    <button 
                      onClick={() => setEmailNotifs(!emailNotifs)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${emailNotifs ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-gray-900">Push Notifications</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">Get instant alerts on your device</div>
                    </div>
                    <button 
                      onClick={() => setPushNotifs(!pushNotifs)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${pushNotifs ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${pushNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md hover:bg-gray-800 transition-colors w-max">
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-12 text-center relative z-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                  <CreditCard className="w-8 h-8 text-gray-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Basic Plan</h2>
                <p className="text-gray-500 font-medium text-sm mb-8 max-w-sm">
                  You are currently on the basic plan. Upgrade to unlock verified stars, ClutchScore, and Filmroom integrations.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 w-max">
                  Upgrade to Verified
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
