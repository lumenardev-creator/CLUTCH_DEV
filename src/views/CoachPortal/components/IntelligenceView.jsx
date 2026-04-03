import React from 'react';
import { Target, TrendingUp, AlertCircle, LineChart, Activity, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IntelligenceView = ({ userPlan }) => {
  const navigate = useNavigate();

  if (userPlan !== "Pro") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-gray-200 shrink-0">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Recruiting Intelligence</h1>
            <p className="text-gray-500 text-sm font-medium">Data-driven insights for your pipeline</p>
          </div>
          <span className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Pro Feature</span>
        </div>
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Recruiting Intelligence</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to the Pro plan to access advanced metrics, pipeline health tracking, and regional talent distribution maps.</p>
          <button onClick={() => navigate('/pricing', { state: { from: '/coach' } })} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Recruiting Intelligence</h1>
          <p className="text-gray-500 text-sm font-medium">Data-driven insights for your pipeline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <TrendingUp className="absolute right-4 bottom-4 w-32 h-32 text-white/5" />
          <h3 className="font-bold text-blue-100 text-sm tracking-wide uppercase mb-2">Offer Conversion Rate</h3>
          <div className="text-5xl font-black tracking-tighter mb-4">42%</div>
          <p className="text-blue-200 text-sm font-bold">+5% vs last season</p>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-500 text-sm tracking-wide uppercase mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Pipeline Health</h3>
          <div className="text-4xl font-black text-gray-900 tracking-tighter mb-4">Strong</div>
          <p className="text-gray-600 text-sm font-medium">You have enough prospects in the evaluating stage.</p>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-500 text-sm tracking-wide uppercase mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-500" /> Roster Needs</h3>
          <div className="text-4xl font-black text-gray-900 tracking-tighter mb-4">PG, C</div>
          <p className="text-gray-600 text-sm font-medium">Based on expiring eligibility in 2025.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center">
           <LineChart className="w-16 h-16 text-gray-200 mb-4" />
           <h3 className="font-black text-gray-900 text-xl mb-2">ClutchScore Trends</h3>
           <p className="text-sm font-medium text-gray-500 max-w-sm">Graph representation of average ClutchScore across your targets vs national average.</p>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center">
           <Activity className="w-16 h-16 text-gray-200 mb-4" />
           <h3 className="font-black text-gray-900 text-xl mb-2">Regional Heatmap</h3>
           <p className="text-sm font-medium text-gray-500 max-w-sm">Visual distribution of talent density by state or city.</p>
        </div>
      </div>
    </div>
  );
};
