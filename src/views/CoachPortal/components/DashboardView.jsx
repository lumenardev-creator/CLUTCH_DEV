import React from 'react';
import { Users, TrendingUp, Target, Search, ChevronRight, MessageSquare } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';

export const DashboardView = () => {
  return (
    <div className="animate-in fade-in duration-300 w-full mx-auto h-full flex flex-col space-y-[48px]">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Coach Dashboard</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Welcome back, Coach Thompson. Here's your daily summary.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-br from-[#6366f1] to-[#3b82f6] hover:from-[#4f46e5] hover:to-[#2563eb] text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-[0_4px_15px_rgba(99,102,241,0.2)] flex items-center gap-2 transition-all hover:scale-105 active:scale-[0.96]">
          <Search className="w-4 h-4" /> Find Players
        </button>
      </div>

      {/* 2. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Recruits */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/[0.06] flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Active Recruits</span>
            <Users className="w-5 h-5 text-[#3b82f6]" />
          </div>
          <div className="text-3xl font-black text-[#f9fafb] mb-1">24</div>
          <div className="text-xs font-semibold text-[#22c55e] flex items-center gap-1">
            <span className="text-lg leading-none">+</span>2 this week
          </div>
        </div>

        {/* Messages */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/[0.06] flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Messages</span>
            <MessageSquare className="w-5 h-5 text-[#f59e0b]" />
          </div>
          <div className="text-3xl font-black text-[#f9fafb] mb-1">12</div>
          <div className="text-xs font-semibold text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/20 px-2 py-0.5 rounded flex items-center w-max">
            3 Unread
          </div>
        </div>

        {/* New Highlights */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/[0.06] flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">New Highlights</span>
            <TrendingUp className="w-5 h-5 text-[#06b6d4]" />
          </div>
          <div className="text-3xl font-black text-[#f9fafb] mb-1">8</div>
          <div className="text-xs font-semibold text-[#6b7280]">Saved players</div>
        </div>

        {/* Offers Sent */}
        <div className="bg-[#111827] rounded-2xl p-6 border border-white/[0.06] flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider">Offers Sent</span>
            <Target className="w-5 h-5 text-[#6366f1]" />
          </div>
          <div className="text-3xl font-black text-[#f9fafb] mb-1">5</div>
          <div className="text-xs font-semibold text-[#6b7280]">Class of 2025</div>
        </div>
      </div>

      {/* 3. Activity Feed */}
      <div>
        <h2 className="text-xl font-bold text-[#f9fafb] mb-5 tracking-tight flex items-center gap-2">
          Recent Activity
          <span className="text-xs font-bold bg-white/[0.06] text-[#9ca3af] px-2 py-0.5 rounded-md border border-white/[0.04]">Live</span>
        </h2>
        
        <div className="bg-[#111827] rounded-[20px] border border-white/[0.06] flex flex-col">
          {featuredAthletes.slice(0, 3).map((ath, idx) => (
            <div key={idx} className={`px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-white/[0.02] transition-colors ${idx !== 2 ? 'border-b border-white/[0.05]' : ''}`}>
              <div className="flex items-center gap-4">
                <img src={ath.img} alt={ath.name} className="w-10 h-10 rounded-full object-cover border border-white/[0.1] shadow-sm" />
                <div>
                  <h4 className="font-bold text-[#f9fafb] text-sm">
                    {ath.name} <span className="text-[#9ca3af] font-medium ml-1">uploaded a new highlight reel</span>
                  </h4>
                  <p className="text-[11px] text-[#6b7280] font-bold uppercase tracking-wider mt-0.5">{ath.info}</p>
                </div>
              </div>
              <button className="mt-3 sm:mt-0 flex items-center gap-1 text-sm font-bold text-[#0ea5e9] hover:text-[#38bdf8] transition-colors shrink-0 bg-[#0ea5e9]/10 px-3 py-1.5 rounded-lg border border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/20">
                View Player <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom padding safety */}
      <div className="pb-12" />
    </div>
  );
};
