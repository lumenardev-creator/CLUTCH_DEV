import React from 'react';
import { Activity, Lock, Target, TrendingUp, Zap } from 'lucide-react';

export const PerformanceLabView = ({ userPlan }) => {
  if (userPlan !== "Pro") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Performance Lab</h1>
            <p className="text-gray-500 text-sm font-medium">Comprehensive biometric & athletic tracking</p>
          </div>
          <span className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Pro Feature</span>
        </div>
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Performance Lab</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to the Pro plan to access biometrics tracking, predictive injury analysis, and targeted workout generation.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Performance Lab</h1>
          <p className="text-gray-500 text-sm font-medium">Your personalized training and metrics</p>
        </div>
        <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
          Log Workout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Vertical Jump</h3>
          <div className="text-2xl font-black mb-1">34"</div>
          <div className="text-xs font-bold text-green-500 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +1.5" this month</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mb-4 text-purple-600">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Agility Drill</h3>
          <div className="text-2xl font-black mb-1">10.4s</div>
          <div className="text-xs font-bold text-green-500 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> -0.2s this month</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-600">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Shooting %</h3>
          <div className="text-2xl font-black mb-1">42%</div>
          <div className="text-xs font-bold text-gray-400 flex items-center gap-1">Average</div>
        </div>
      </div>
    </div>
  );
};
