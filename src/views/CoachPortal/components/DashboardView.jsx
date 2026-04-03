import React from 'react';
import { Users, TrendingUp, Target, Search, ChevronRight } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';

export const DashboardView = () => {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Coach Dashboard</h1>
          <p className="text-gray-500 text-sm font-medium">Welcome back, Coach Thompson. Here's your daily summary.</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Search className="w-4 h-4" /> Find Players
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Recruits</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-black text-gray-900 mt-auto">24</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Messages</span>
            <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</div>
          </div>
          <div className="text-3xl font-black text-gray-900 mt-auto">12 Unread</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">New Highlights</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-black text-gray-900 mt-auto">8</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Offers Sent</span>
            <Target className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-black text-gray-900 mt-auto">5</div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-5 tracking-tight">Recent Activity</h2>
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {featuredAthletes.slice(0, 3).map((ath, idx) => (
          <div key={idx} className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img src={ath.img} alt={ath.name} className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm" />
              <div>
                <h4 className="font-bold text-gray-900 text-base">{ath.name} <span className="text-gray-400 font-medium text-sm">uploaded a new highlight reel</span></h4>
                <p className="text-xs text-gray-500 font-medium mt-1">{ath.info}</p>
              </div>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0">
              View <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
