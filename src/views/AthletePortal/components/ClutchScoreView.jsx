import React, { useState } from 'react';
import { TrendingUp, CircleCheck, Info, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const ClutchScoreView = ({ userPlan, handlePricingClick }) => {
  if (userPlan === "Basic") {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">ClutchScore</h1>
            <p className="text-gray-500 text-sm font-medium">Your statistical performance rating</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-6">ClutchScore</h2>
          <div className="text-7xl font-black text-gray-900 tracking-tighter mb-8 blur-md select-none opacity-30">12.4</div>
          <p className="text-gray-600 text-lg mb-4 font-medium max-w-md">Unlock ClutchScore to access your statistical performance rating.</p>
          <button onClick={handlePricingClick} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-md transition-colors mb-4">Upgrade to Verified</button>
        </div>
      </div>
    );
  }

  const scoreDataAllTime = [
    { name: 'Dec 29', uv: 11.8 }, { name: 'Jan 1', uv: 11.9 }, { name: 'Jan 4', uv: 11.7 },
    { name: 'Jan 7', uv: 11.6 }, { name: 'Jan 10', uv: 11.8 }, { name: 'Jan 13', uv: 11.7 },
    { name: 'Jan 16', uv: 11.6 }, { name: 'Jan 19', uv: 12.3 }, { name: 'Jan 22', uv: 11.5 },
    { name: 'Jan 25', uv: 11.8 }, { name: 'Jan 28', uv: 11.7 }, { name: 'Jan 31', uv: 11.9 },
    { name: 'Feb 3', uv: 12.2 }, { name: 'Feb 6', uv: 11.6 }, { name: 'Feb 9', uv: 12.2 },
    { name: 'Feb 15', uv: 11.6 }, { name: 'Feb 21', uv: 12.0 }, { name: 'Feb 27', uv: 12.4 },
    { name: 'Mar 2', uv: 12.4 }, { name: 'Mar 5', uv: 12.3 }, { name: 'Mar 8', uv: 12.0 },
    { name: 'Mar 14', uv: 12.4 }, { name: 'Mar 20', uv: 12.2 }, { name: 'Mar 26', uv: 12.4 }
  ];

  const last10Games = [12.0, 11.8, 12.4, 12.1, 11.9, 12.6, 12.2, 12.7, 12.3, 12.5];

  const [activeTab, setActiveTab] = useState('90 Days');

  const getScoreData = () => {
    switch(activeTab) {
      case '30 Days': return scoreDataAllTime.slice(-8); // Approx last 30 days
      case '90 Days': return scoreDataAllTime.slice(-16); // Approx last 90 days
      case '1 Year': return scoreDataAllTime;
      case 'All Time': return scoreDataAllTime;
      default: return scoreDataAllTime;
    }
  };

  const scoreData = getScoreData();

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">ClutchScore</h1>
          <p className="text-gray-500 text-sm font-medium">Your statistical performance rating</p>
        </div>
        <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Verified Feature</span>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-[1.5rem] p-12 shadow-sm border border-gray-100 text-center mb-6">
        <div className="text-[100px] leading-none font-black text-blue-600 tracking-tight mb-4">12.4</div>
        <div className="text-xl font-bold text-gray-900 mb-8">ClutchScore</div>
        <div className="space-y-2 mb-8 text-sm font-semibold text-gray-500">
          <p>Top 18% Nationally</p>
          <p>Top 9% In State</p>
          <p>Top 22% Among PGs</p>
        </div>
        <div className="inline-flex items-center text-green-600 bg-green-50 px-4 py-1.5 rounded-lg text-sm font-bold border border-green-100">
          <TrendingUp size={16} className="mr-1.5" /> +0.4 last 90 days
        </div>
      </div>

      {/* Trend Graph */}
      <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 mb-6 flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-8 shrink-0">
          <h3 className="flex-1 text-lg font-bold text-gray-900">Score Trend</h3>
          <div className="flex gap-2">
            {['30 Days', '90 Days', '1 Year', 'All Time'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${tab === activeTab ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} />
              <Line type="monotone" dataKey="uv" stroke="#2563eb" strokeWidth={2.5} dot={false} activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Breakdown and Multiplier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Score Breakdown */}
        <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Score Breakdown</h3>
          <div className="space-y-6 text-sm">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">Performance Production <Info size={14} className="text-gray-400" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-medium">40%</span>
                  <span className="font-black text-gray-900 w-6 text-right">4.8</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">Efficiency Metrics <Info size={14} className="text-gray-400" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-medium">25%</span>
                  <span className="font-black text-gray-900 w-6 text-right">3.2</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">Competition Strength <Info size={14} className="text-gray-400" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-medium">20%</span>
                  <span className="font-black text-gray-900 w-6 text-right">2.9</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-700 flex items-center gap-1.5">Consistency Index <Info size={14} className="text-gray-400" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-gray-400 font-medium">15%</span>
                  <span className="font-black text-gray-900 w-6 text-right">1.5</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-800 h-1.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Competition Strength */}
        <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Competition Strength</h3>
          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-blue-600">1.18x</span>
              <span className="text-sm font-medium text-gray-600">Competition Multiplier</span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed">Stats are weighted by strength of opponent and event tier.</p>
          </div>
          
          <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-4">Competition Tiers</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
              <div>
                <div className="text-sm font-bold text-gray-900 mb-0.5">National Elite</div>
                <div className="text-[11px] text-gray-500 font-medium">Nike EYBL, Adidas 3SSB, Under Armour Circuit</div>
              </div>
              <div className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-200">1.35x</div>
            </div>
            <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
              <div>
                <div className="text-sm font-bold text-gray-900 mb-0.5">Regional Premium</div>
                <div className="text-[11px] text-gray-500 font-medium">Top regional showcases and tournaments</div>
              </div>
              <div className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-200">1.18x</div>
            </div>
            <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
              <div>
                <div className="text-sm font-bold text-gray-900 mb-0.5">State Tier</div>
                <div className="text-[11px] text-gray-500 font-medium">State championships, high-level varsity</div>
              </div>
              <div className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-200">1.08x</div>
            </div>
            <div className="flex justify-between items-center border border-gray-100 p-3 rounded-xl bg-gray-50/50">
              <div>
                <div className="text-sm font-bold text-gray-900 mb-0.5">Standard Competition</div>
                <div className="text-[11px] text-gray-500 font-medium">Regular season varsity games</div>
              </div>
              <div className="text-xs font-bold text-gray-600 bg-white px-2.5 py-1 rounded shadow-sm border border-gray-200">1.00x</div>
            </div>
          </div>
        </div>
      </div>

      {/* How ClutchScore Works */}
      <div className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <Info size={16} />
          </div>
          How ClutchScore Works
        </h3>
        
        <div className="space-y-6 text-sm text-gray-600 font-medium max-w-4xl">
          <div>
            <p className="font-bold text-gray-900 mb-1">ClutchScore is not capped at 100.</p>
            <p>There is no maximum value. The highest performing athletes define the upper range.</p>
          </div>
          
          <div className="border-t border-gray-100 pt-5">
            <p className="font-bold text-gray-900 mb-1">Performance-Based Only</p>
            <p>ClutchScore is calculated from verified game statistics only. No social engagement, likes, or popularity metrics are included.</p>
          </div>
          
          <div className="border-t border-gray-100 pt-5 pb-2">
            <p className="font-bold text-gray-900 mb-4">Score Ranges (Reference)</p>
            <div className="space-y-4 max-w-md">
              <div className="flex justify-between items-center"><span className="text-gray-500">Average varsity athlete</span><span className="font-bold text-gray-900">6–8</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">Strong regional player</span><span className="font-bold text-gray-900">9–11</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500">National prospect</span><span className="font-bold text-gray-900">12–15+</span></div>
            </div>
          </div>
          
          <p className="text-[11px] text-gray-400 mt-6 pt-4 border-t border-gray-100">
            ClutchScore is designed to be objective, transparent, and credible—a legitimate performance index for basketball recruiting.
          </p>
        </div>
      </div>

      {/* Consistency Rating */}
      <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-lg font-bold text-gray-900">Consistency Rating</h3>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">High</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold mb-6 border border-green-100 shadow-sm">
              Low variance across your recent games
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Average</div>
                <div className="text-xl font-black text-gray-900">12.3</div>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">High</div>
                <div className="text-xl font-black text-gray-900">12.7</div>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wide">Low</div>
                <div className="text-xl font-black text-gray-900">11.9</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-5">
              <span className="text-sm font-semibold text-gray-500">Variance</span>
              <span className="font-black text-gray-900">0.8</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 font-medium mb-6 flex justify-end">Last 10 Games</div>
            <div className="flex-1 flex items-end gap-[3px] relative pt-6 mb-2">
              <div className="absolute w-full border-t border-dashed border-gray-300 bottom-[75%] z-0" />
              <div className="absolute w-full border-t border-solid border-gray-100 bottom-[0%] z-0" />
              <div className="absolute bottom-[75%] -left-1 translate-y-[2px] text-[9px] font-bold text-gray-400 bg-white pr-2 z-10 hidden sm:block">— Average: 12.3</div>
              {last10Games.map((score, i) => (
                <div key={i} className="flex-1 bg-blue-500 rounded-sm hover:bg-blue-600 transition-colors z-10" style={{ height: `${(score / 15) * 100}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
