import React from 'react';
import { Target, TrendingUp, AlertCircle, LineChart, Activity } from 'lucide-react';

export const IntelligenceView = () => {
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
