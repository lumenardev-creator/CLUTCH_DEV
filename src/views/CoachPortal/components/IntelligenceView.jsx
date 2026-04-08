import React from 'react';
import { Target, TrendingUp, AlertCircle, LineChart, Activity, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const IntelligenceView = ({ userPlan }) => {
  const navigate = useNavigate();

  if (userPlan !== "Pro") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-white/[0.06] shrink-0">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Recruiting Intelligence</h1>
            <p className="text-[#9ca3af] text-sm font-medium">Data-driven insights for your pipeline</p>
          </div>
          <span className="bg-[#6366f1] text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Pro Feature</span>
        </div>
        <div className="bg-[#111827] rounded-3xl p-16 border border-white/[0.06] text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-white/[0.04] border border-white/[0.06] rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-[#6b7280]" />
          </div>
          <h2 className="text-2xl font-black text-[#f9fafb] mb-4">Unlock Recruiting Intelligence</h2>
          <p className="text-[#9ca3af] text-sm mb-8 font-medium max-w-md">Upgrade to the Pro plan to access advanced metrics, pipeline health tracking, and regional talent distribution maps.</p>
          <button onClick={() => navigate('/pricing', { state: { from: '/coach' } })} className="bg-gradient-to-br from-[#6366f1] to-[#3b82f6] hover:from-[#4f46e5] hover:to-[#2563eb] text-white font-bold px-8 py-3 rounded-xl text-sm shadow-[0_4px_15px_rgba(99,102,241,0.25)] transition-all hover:scale-105 active:scale-[0.96] mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-white/[0.06] shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Recruiting Intelligence</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Data-driven insights for your pipeline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#6366f1]/20 to-[#3b82f6]/10 rounded-3xl p-6 text-white border border-[#6366f1]/20 relative overflow-hidden">
          <TrendingUp className="absolute right-4 bottom-4 w-32 h-32 text-white/5" />
          <h3 className="font-bold text-[#818cf8] text-sm tracking-wide uppercase mb-2">Offer Conversion Rate</h3>
          <div className="text-5xl font-black tracking-tighter mb-4 text-[#f9fafb]">42%</div>
          <p className="text-[#22c55e] text-sm font-bold">+5% vs last season</p>
        </div>
        
        <div className="bg-[#111827] border border-white/[0.06] rounded-3xl p-6">
          <h3 className="font-bold text-[#6b7280] text-sm tracking-wide uppercase mb-2 flex items-center gap-2"><Target className="w-4 h-4" /> Pipeline Health</h3>
          <div className="text-4xl font-black text-[#f9fafb] tracking-tighter mb-4">Strong</div>
          <p className="text-[#9ca3af] text-sm font-medium">You have enough prospects in the evaluating stage.</p>
        </div>
        
        <div className="bg-[#111827] border border-white/[0.06] rounded-3xl p-6">
          <h3 className="font-bold text-[#6b7280] text-sm tracking-wide uppercase mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-[#f59e0b]" /> Roster Needs</h3>
          <div className="text-4xl font-black text-[#f9fafb] tracking-tighter mb-4">PG, C</div>
          <p className="text-[#9ca3af] text-sm font-medium">Based on expiring eligibility in 2025.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <div className="bg-[#111827] border border-white/[0.06] rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
           <LineChart className="w-16 h-16 text-[#1f2937] mb-4" />
           <h3 className="font-black text-[#f9fafb] text-xl mb-2">ClutchScore Trends</h3>
           <p className="text-sm font-medium text-[#6b7280] max-w-sm">Graph representation of average ClutchScore across your targets vs national average.</p>
        </div>
        
        <div className="bg-[#111827] border border-white/[0.06] rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
           <Activity className="w-16 h-16 text-[#1f2937] mb-4" />
           <h3 className="font-black text-[#f9fafb] text-xl mb-2">Regional Heatmap</h3>
           <p className="text-sm font-medium text-[#6b7280] max-w-sm">Visual distribution of talent density by state or city.</p>
        </div>
      </div>
    </div>
  );
};
