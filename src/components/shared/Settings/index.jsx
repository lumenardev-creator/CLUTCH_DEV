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
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Settings</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Manage your {portal} account and preferences</p>
        </div>
      </div>

      <div className="animate-fade-up animate-fade-up-delay-1 flex flex-col md:flex-row gap-8 pb-12">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? 'bg-white/[0.06] border border-white/[0.1] text-[#f9fafb] shadow-[0_4px_20px_rgba(0,0,0,0.2)]' : 'text-[#9ca3af] hover:bg-white/[0.03] hover:text-[#d1d5db] border border-transparent'}`}
            >
              <div className="flex items-center gap-3">
                <span className={activeTab === tab.id ? 'text-[#0ea5e9]' : ''}>{tab.icon}</span>
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-[#6b7280]" />}
            </button>
          ))}
          
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 border border-transparent transition-all">
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#111827] rounded-3xl p-8 border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {activeTab === 'account' && (
              <div className="animate-in fade-in duration-300 space-y-6 relative z-10">
                <h2 className="text-xl font-bold text-[#f9fafb] tracking-tight">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-[#9ca3af] block mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-medium focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#9ca3af] block mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-medium focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all" 
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                  <label className="text-sm font-bold text-[#9ca3af] block">Change Password</label>
                  <button className="bg-white/[0.04] border border-white/[0.06] text-[#d1d5db] font-bold py-2.5 px-6 rounded-xl text-sm hover:bg-white/[0.06] hover:border-white/[0.1] transition-all w-max active:scale-[0.97]">
                    Update Password
                  </button>
                </div>

                <div className="pt-6 mt-6 flex gap-3">
                  <button className="btn-glow-blue text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all w-max active:scale-[0.97]">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="animate-in fade-in duration-300 space-y-8 relative z-10">
                <h2 className="text-xl font-bold text-[#f9fafb] tracking-tight">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-[#9ca3af] block mb-2">Profile Visibility</label>
                    <select className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-medium focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all appearance-none">
                      <option value="public">Public - Anyone can see</option>
                      <option value="verified">Verified Coaches Only</option>
                      <option value="private">Private - Invite Only</option>
                    </select>
                    <p className="text-xs text-[#6b7280] font-medium mt-2">Control who can view your profile and highlights.</p>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white/[0.04] rounded-full flex items-center justify-center border border-white/[0.06] shrink-0">
                        <MapPin className="w-5 h-5 text-[#9ca3af]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#f9fafb]">Show Location</div>
                        <div className="text-xs text-[#6b7280] font-medium mt-0.5">Display your city and state publicly</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowLocation(!showLocation)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${showLocation ? 'bg-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.4)]' : 'bg-[#4b5563]'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${showLocation ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white/[0.04] rounded-full flex items-center justify-center border border-white/[0.06] shrink-0">
                        <BarChart className="w-5 h-5 text-[#9ca3af]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#f9fafb]">Show Stats</div>
                        <div className="text-xs text-[#6b7280] font-medium mt-0.5">Display your statistics publicly</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowStats(!showStats)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${showStats ? 'bg-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.4)]' : 'bg-[#4b5563]'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${showStats ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className="bg-[#0ea5e9]/[0.05] border border-[#0ea5e9]/15 rounded-xl p-4 mt-8 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-10 h-10 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center shrink-0 border border-[#0ea5e9]/20">
                    <Lock className="w-4 h-4 text-[#0ea5e9]" />
                  </div>
                  <p className="text-xs text-[#0ea5e9] font-bold leading-relaxed">
                    Your data is protected and NCAA-compliant. We never share your information without explicit permission.
                  </p>
                </div>

                <div className="pt-6 flex gap-3">
                  <button className="btn-glow-blue text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all w-max active:scale-[0.97]">
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-in fade-in duration-300 space-y-8 relative z-10">
                <h2 className="text-xl font-bold text-[#f9fafb] tracking-tight">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-[#f9fafb]">Email Notifications</div>
                      <div className="text-xs text-[#6b7280] font-medium mt-0.5">Receive updates via email</div>
                    </div>
                    <button 
                      onClick={() => setEmailNotifs(!emailNotifs)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${emailNotifs ? 'bg-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.4)]' : 'bg-[#4b5563]'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${emailNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-[#f9fafb]">Push Notifications</div>
                      <div className="text-xs text-[#6b7280] font-medium mt-0.5">Get instant alerts on your device</div>
                    </div>
                    <button 
                      onClick={() => setPushNotifs(!pushNotifs)} 
                      className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${pushNotifs ? 'bg-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.4)]' : 'bg-[#4b5563]'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${pushNotifs ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <div className="pt-6 flex gap-3">
                  <button className="btn-glow-blue text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all w-max active:scale-[0.97]">
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-12 text-center relative z-10">
                <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
                  <CreditCard className="w-8 h-8 text-[#9ca3af]" />
                </div>
                <h2 className="text-2xl font-black text-[#f9fafb] tracking-tight mb-2">Basic Plan</h2>
                <p className="text-[#6b7280] font-medium text-sm mb-8 max-w-sm">
                  You are currently on the basic plan. Upgrade to unlock verified stars, ClutchScore, and Filmroom integrations.
                </p>
                <button className="btn-glow-blue text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all active:scale-[0.97] w-max">
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
