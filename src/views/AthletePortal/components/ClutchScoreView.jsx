import React, { useState, useEffect } from 'react';
import { TrendingUp, CircleCheck, Info, Lock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      const easedPercent = easeOutExpo(percent);
      setCount((end * easedPercent).toFixed(1));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(update);
      } else {
        setCount(end.toFixed(1));
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count}</span>;
};

export const ClutchScoreView = ({ userPlan, handlePricingClick }) => {
  if (userPlan === "Basic") {
    return (
      <div>
        <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">ClutchScore</h1>
            <p className="text-[#9ca3af] text-sm font-medium">Your statistical performance rating</p>
          </div>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-1 bg-[#111827] rounded-3xl p-16 border border-white/[0.06] text-center flex flex-col items-center justify-center min-h-[500px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
            <Lock size={24} className="text-[#6b7280]" />
          </div>
          <h2 className="text-4xl font-black text-[#f9fafb] mb-6">ClutchScore</h2>
          <div className="text-7xl font-black text-[#0ea5e9] tracking-tighter mb-8 blur-md select-none opacity-30">12.4</div>
          <p className="text-[#9ca3af] text-lg mb-4 font-medium max-w-md">Unlock ClutchScore to access your statistical performance rating.</p>
          <button onClick={handlePricingClick} className="btn-glow-blue text-white font-bold px-10 py-4 rounded-xl text-lg transition-all active:scale-[0.97] mb-4">Upgrade to Verified</button>
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
      case '30 Days': return scoreDataAllTime.slice(-8);
      case '90 Days': return scoreDataAllTime.slice(-16);
      case '1 Year': return scoreDataAllTime;
      case 'All Time': return scoreDataAllTime;
      default: return scoreDataAllTime;
    }
  };

  const scoreData = getScoreData();

  return (
    <div>
      <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">ClutchScore</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Your statistical performance rating</p>
        </div>
        <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs px-3 py-1.5 rounded-full font-bold border border-[#0ea5e9]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">Verified Feature</span>
      </div>

      {/* Main Score Card */}
      <div className="animate-fade-up animate-fade-up-delay-1 premium-card-glow-blue rounded-[1.5rem] p-12 text-center mb-6 focus-card float-idle surface-mid">
        <div className="relative inline-block mb-4">
          <div className="score-aura" />
          <div className="text-[100px] leading-none font-black text-gradient-premium tracking-tight relative z-10" style={{ textShadow: '0 0 60px rgba(14,165,233,0.3)' }}>
            <CountUp end={12.4} duration={2500} />
          </div>
        </div>
        <div className="text-xl font-bold text-[#f9fafb] mb-8">ClutchScore</div>
        <div className="space-y-2 mb-8 text-sm font-semibold text-[#9ca3af]">
          <p>Top 18% Nationally</p>
          <p>Top 9% In State</p>
          <p>Top 22% Among PGs</p>
        </div>
        <div className="inline-flex items-center text-[#22c55e] bg-[#22c55e]/10 px-4 py-1.5 rounded-lg text-sm font-bold border border-[#22c55e]/20">
          <TrendingUp size={16} className="mr-1.5" /> +0.4 last 90 days
        </div>
      </div>

      {/* Trend Graph */}
      <div className="animate-fade-up animate-fade-up-delay-2 surface-mid rounded-[1.5rem] p-8 border border-white/[0.06] mb-6 flex flex-col h-[400px] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center mb-8 shrink-0">
          <h3 className="flex-1 text-lg font-bold text-[#f9fafb]">Score Trend</h3>
          <div className="flex gap-2">
            {['30 Days', '90 Days', '1 Year', 'All Time'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 ${tab === activeTab ? 'btn-glow-blue text-white' : 'bg-white/[0.04] text-[#9ca3af] hover:bg-white/[0.08] border border-white/[0.06]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} domain={[0, 16]} ticks={[0, 4, 8, 12, 16]} />
              <Line type="monotone" dataKey="uv" stroke="#0ea5e9" strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#111827', strokeWidth: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Breakdown and Multiplier */}
      <div className="animate-fade-up animate-fade-up-delay-3 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Score Breakdown */}
        <div className="surface-mid rounded-[1.5rem] p-8 border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <h3 className="text-lg font-bold text-[#f9fafb] mb-8">Score Breakdown</h3>
          <div className="space-y-6 text-sm">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#d1d5db] flex items-center gap-1.5">Performance Production <Info size={14} className="text-[#6b7280]" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-[#6b7280] font-medium">40%</span>
                  <span className="font-black text-[#f9fafb] w-6 text-right">4.8</span>
                </div>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                <div className="bg-[#0ea5e9] h-1.5 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.4)]" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#d1d5db] flex items-center gap-1.5">Efficiency Metrics <Info size={14} className="text-[#6b7280]" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-[#6b7280] font-medium">25%</span>
                  <span className="font-black text-[#f9fafb] w-6 text-right">3.2</span>
                </div>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                <div className="bg-[#6366f1] h-1.5 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: '25%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#d1d5db] flex items-center gap-1.5">Competition Strength <Info size={14} className="text-[#6b7280]" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-[#6b7280] font-medium">20%</span>
                  <span className="font-black text-[#f9fafb] w-6 text-right">2.9</span>
                </div>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                <div className="bg-[#818cf8] h-1.5 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.4)]" style={{ width: '20%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[#d1d5db] flex items-center gap-1.5">Consistency Index <Info size={14} className="text-[#6b7280]" /></span>
                <div className="flex items-center gap-6">
                  <span className="text-[#6b7280] font-medium">15%</span>
                  <span className="font-black text-[#f9fafb] w-6 text-right">1.5</span>
                </div>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                <div className="bg-[#38bdf8] h-1.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.4)]" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Competition Strength */}
        <div className="surface-mid rounded-[1.5rem] p-8 border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
          <h3 className="text-lg font-bold text-[#f9fafb] mb-8">Competition Strength</h3>
          <div className="mb-8 border-b border-white/[0.06] pb-8">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-[#0ea5e9]" style={{ textShadow: '0 0 20px rgba(14,165,233,0.3)' }}>1.18x</span>
              <span className="text-sm font-medium text-[#9ca3af]">Competition Multiplier</span>
            </div>
            <p className="text-xs text-[#6b7280] font-medium mt-2 leading-relaxed">Stats are weighted by strength of opponent and event tier.</p>
          </div>

          <div className="text-[10px] uppercase font-black tracking-widest text-[#6b7280] mb-4">Competition Tiers</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center border border-white/[0.06] p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div>
                <div className="text-sm font-bold text-[#f9fafb] mb-0.5">National Elite</div>
                <div className="text-[11px] text-[#6b7280] font-medium">Nike EYBL, Adidas 3SSB, Under Armour Circuit</div>
              </div>
              <div className="text-xs font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2.5 py-1 rounded border border-[#0ea5e9]/20">1.35x</div>
            </div>
            <div className="flex justify-between items-center border border-white/[0.06] p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div>
                <div className="text-sm font-bold text-[#f9fafb] mb-0.5">Regional Premium</div>
                <div className="text-[11px] text-[#6b7280] font-medium">Top regional showcases and tournaments</div>
              </div>
              <div className="text-xs font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 px-2.5 py-1 rounded border border-[#0ea5e9]/20">1.18x</div>
            </div>
            <div className="flex justify-between items-center border border-white/[0.06] p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div>
                <div className="text-sm font-bold text-[#f9fafb] mb-0.5">State Tier</div>
                <div className="text-[11px] text-[#6b7280] font-medium">State championships, high-level varsity</div>
              </div>
              <div className="text-xs font-bold text-[#9ca3af] bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]">1.08x</div>
            </div>
            <div className="flex justify-between items-center border border-white/[0.06] p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div>
                <div className="text-sm font-bold text-[#f9fafb] mb-0.5">Standard Competition</div>
                <div className="text-[11px] text-[#6b7280] font-medium">Regular season varsity games</div>
              </div>
              <div className="text-xs font-bold text-[#9ca3af] bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]">1.00x</div>
            </div>
          </div>
        </div>
      </div>

      {/* How ClutchScore Works */}
      <div className="animate-fade-up animate-fade-up-delay-4 bg-[#111827] rounded-[1.5rem] p-8 border border-white/[0.06] mb-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <h3 className="text-lg font-bold text-[#f9fafb] flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20 flex items-center justify-center">
            <Info size={16} />
          </div>
          How ClutchScore Works
        </h3>

        <div className="space-y-6 text-sm text-[#9ca3af] font-medium max-w-4xl">
          <div>
            <p className="font-bold text-[#f9fafb] mb-1">ClutchScore is not capped at 100.</p>
            <p>There is no maximum value. The highest performing athletes define the upper range.</p>
          </div>

          <div className="border-t border-white/[0.06] pt-5">
            <p className="font-bold text-[#f9fafb] mb-1">Performance-Based Only</p>
            <p>ClutchScore is calculated from verified game statistics only. No social engagement, likes, or popularity metrics are included.</p>
          </div>

          <div className="border-t border-white/[0.06] pt-5 pb-2">
            <p className="font-bold text-[#f9fafb] mb-4">Score Ranges (Reference)</p>
            <div className="space-y-4 max-w-md">
              <div className="flex justify-between items-center"><span className="text-[#6b7280]">Average varsity athlete</span><span className="font-bold text-[#f9fafb]">6–8</span></div>
              <div className="flex justify-between items-center"><span className="text-[#6b7280]">Strong regional player</span><span className="font-bold text-[#f9fafb]">9–11</span></div>
              <div className="flex justify-between items-center"><span className="text-[#6b7280]">National prospect</span><span className="font-bold text-[#0ea5e9]">12–15+</span></div>
            </div>
          </div>

          <p className="text-[11px] text-[#4b5563] mt-6 pt-4 border-t border-white/[0.06]">
            ClutchScore is designed to be objective, transparent, and credible—a legitimate performance index for basketball recruiting.
          </p>
        </div>
      </div>

      {/* Consistency Rating */}
      <div className="animate-fade-up animate-fade-up-delay-5 bg-[#111827] rounded-[1.5rem] p-8 border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-lg font-bold text-[#f9fafb]">Consistency Rating</h3>
          <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full text-xs font-bold border border-[#22c55e]/20">High</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-[#22c55e]/10 text-[#22c55e] px-4 py-3 rounded-xl text-sm font-semibold mb-6 border border-[#22c55e]/20">
              Low variance across your recent games
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                <div className="text-xs text-[#6b7280] font-semibold mb-1 uppercase tracking-wide">Average</div>
                <div className="text-xl font-black text-[#f9fafb]">12.3</div>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                <div className="text-xs text-[#6b7280] font-semibold mb-1 uppercase tracking-wide">High</div>
                <div className="text-xl font-black text-[#f9fafb]">12.7</div>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
                <div className="text-xs text-[#6b7280] font-semibold mb-1 uppercase tracking-wide">Low</div>
                <div className="text-xl font-black text-[#f9fafb]">11.9</div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
              <span className="text-sm font-semibold text-[#9ca3af]">Variance</span>
              <span className="font-black text-[#f9fafb]">0.8</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xs text-[#6b7280] font-medium mb-6 flex justify-end">Last 10 Games</div>
            <div className="flex-1 flex items-end gap-[3px] relative pt-6 mb-2">
              <div className="absolute w-full border-t border-dashed border-white/[0.08] bottom-[75%] z-0" />
              <div className="absolute w-full border-t border-solid border-white/[0.04] bottom-[0%] z-0" />
              <div className="absolute bottom-[75%] -left-1 translate-y-[2px] text-[9px] font-bold text-[#6b7280] pr-2 z-10 hidden sm:block">— Average: 12.3</div>
              {last10Games.map((score, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#0ea5e9] to-[#38bdf8] rounded-sm hover:from-[#0284c7] hover:to-[#0ea5e9] transition-colors z-10 shadow-[0_0_8px_rgba(14,165,233,0.2)]" style={{ height: `${(score / 15) * 100}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
