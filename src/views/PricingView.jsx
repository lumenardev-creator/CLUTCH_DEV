import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { ChevronLeft, CircleCheck, Star } from 'lucide-react';
import { comparisonRows, faqs } from '../data/shared';

export const PricingView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.from || '/';
  const { userPlan, setUserPlan } = useUser();

  return (
    <div className="flex-grow flex flex-col surface-low text-[#f9fafb] font-sans pb-24 animate-in fade-in duration-300 relative z-[1] overflow-hidden">
      <div className="noise" />
      <div className="max-w-6xl mx-auto w-full pt-8 px-6 relative z-10">
        <button onClick={() => navigate(returnPath)} className="flex items-center text-[#9ca3af] hover:text-[#f9fafb] transition-colors font-semibold text-sm w-max">
          <ChevronLeft size={16} className="mr-1" /> Back to Portal
        </button>
      </div>
      
      <div className="text-center mt-12 mb-10 px-6 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black text-[#f9fafb] mb-3 tracking-tight">Pricing & Plans</h1>
        <p className="text-[#9ca3af] font-medium">Choose the plan that fits your recruiting goals</p>
      </div>
      
      <div className="flex flex-col items-center mb-12 relative z-10">
        <span className="bg-[#0ea5e9]/20 text-[#0ea5e9] border border-[#0ea5e9]/30 text-[11px] font-bold px-4 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(14,165,233,0.2)] tracking-wide">
          Current Plan: {userPlan}
        </span>
        <p className="text-[#9ca3af] text-sm font-medium">Upgrade anytime to unlock more features</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-6 mb-24 items-start relative z-10">
        {/* Basic Plan */}
        <div className="surface-mid rounded-3xl p-8 border border-white/[0.06] flex flex-col h-full mt-4 premium-card">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-[#f9fafb]">Basic</h3>
            <p className="text-[#9ca3af] text-sm font-medium mb-6">Get discovered</p>
            <div className="text-5xl font-black text-[#f9fafb] tracking-tight">Free</div>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Create profile", "Post reels", "Swipe reels", "Messaging (limited)", "Search (limited)"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#d1d5db] font-medium">
                <CircleCheck size={18} className="text-[#22c55e] shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setUserPlan("Basic");
              navigate(returnPath);
            }}
            className={`w-full py-3.5 rounded-xl border-2 ${userPlan === "Basic" ? "border-white/[0.1] text-[#9ca3af] cursor-not-allowed" : "border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9]/10"} font-bold mt-auto transition-colors`}
          >
            {userPlan === "Basic" ? "Current Plan" : "Downgrade to Basic"}
          </button>
        </div>

        {/* Verified Plan */}
        <div className="relative z-10 h-full transform md:-translate-y-4 float-idle">
          {/* Badge moved OUTSIDE overflow-hidden */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0ea5e9] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(14,165,233,0.5)] border-2 border-[#1f2937] whitespace-nowrap z-20">
            <Star size={12} fill="currentColor" /> Recommended
          </div>
          <div className="surface-high rounded-3xl p-8 flex flex-col relative h-full focus-card premium-card-glow-blue overflow-hidden mt-0">
            <div className="attention-gradient" />
            <div className="text-center mb-8 mt-2 relative z-10">
              <h3 className="text-2xl font-black text-[#f9fafb]">Verified</h3>
              <p className="text-[#0ea5e9] text-sm font-bold mb-6">Build trust</p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-black text-gradient-premium tracking-tight" style={{ textShadow: '0 0 40px rgba(14,165,233,0.2)' }}>$20</span>
                <span className="text-2xl font-bold text-[#0ea5e9] tracking-tight">/mo</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow relative z-10">
              {["Everything in Basic", "Verified badge", "Verified stats", "ClutchScore", "Filmroom (base)", "Coach trust features"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[#f9fafb] font-medium">
                  <CircleCheck size={18} className="text-[#0ea5e9] shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setUserPlan("Verified");
                navigate(returnPath);
              }}
              className={`w-full py-3.5 rounded-xl font-bold transition-all mt-auto z-10 relative ${userPlan === "Verified" ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 cursor-default" : "btn-glow-blue text-white active:scale-[0.97]"}`}
            >
              {userPlan === "Verified" ? "Current Plan" : userPlan === "Pro" ? "Downgrade to Verified" : "Upgrade to Verified"}
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="surface-mid rounded-3xl p-8 border border-[#6366f1]/30 flex flex-col h-full mt-4 premium-card shadow-[0_0_40px_rgba(99,102,241,0.05)]">
          <div className="text-center mb-8 mt-2">
            <h3 className="text-2xl font-black text-[#f9fafb]">Pro</h3>
            <p className="text-[#6366f1] text-sm font-bold mb-6">Train + dominate</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl font-black text-gradient-indigo tracking-tight" style={{ textShadow: '0 0 30px rgba(99,102,241,0.2)' }}>$40</span>
              <span className="text-2xl font-bold text-[#6366f1] tracking-tight">/mo</span>
            </div>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Everything in Verified", "Filmroom+ (advanced)", "Performance Lab", "More storage/uploads", "Visibility boosts", "Priority support"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#d1d5db] font-medium">
                <CircleCheck size={18} className="text-[#6366f1] shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setUserPlan("Pro");
              navigate(returnPath);
            }}
            className={`w-full py-3.5 rounded-xl font-bold transition-all mt-auto ${userPlan === "Pro" ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 cursor-default" : "btn-glow-indigo text-white active:scale-[0.97]"}`}
          >
            {userPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 mb-24 relative z-10">
        <div className="surface-mid rounded-[2rem] border border-white/[0.06] overflow-hidden premium-card">
          <h2 className="text-2xl font-black text-[#f9fafb] my-8 text-center tracking-tight">Feature Comparison</h2>
          <div className="overflow-x-auto px-2 pb-6">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-[#f9fafb] font-bold border-b border-white/[0.1] w-2/5">Feature</th>
                  <th className="py-4 px-6 text-center text-[#f9fafb] font-bold border-b border-white/[0.1] w-1/5">Basic</th>
                  <th className="py-4 px-6 text-center text-[#f9fafb] font-bold border-b border-white/[0.1] bg-[#0ea5e9]/10 rounded-t-xl w-1/5">Verified</th>
                  <th className="py-4 px-6 text-center text-[#f9fafb] font-bold border-b border-white/[0.1] w-1/5">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 text-sm text-[#9ca3af] font-medium border-b border-white/[0.04]">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm text-[#9ca3af] font-medium border-b border-white/[0.04]">{row.basic === "check-green" ? <CircleCheck size={16} className="mx-auto text-[#22c55e]" /> : row.basic}</td>
                    <td className="py-4 px-6 text-center text-sm text-[#f9fafb] font-bold border-b border-white/[0.04] bg-[#0ea5e9]/10">{row.verified === "check-green" ? <CircleCheck size={16} className="mx-auto text-[#0ea5e9]" /> : row.verified}</td>
                    <td className={`py-4 px-6 text-center text-sm text-[#f9fafb] font-bold border-b border-white/[0.04] ${row.highlightPro ? "bg-[#6366f1]/10 rounded-xl" : ""}`}>{row.pro === "check-green" ? <CircleCheck size={16} className="mx-auto text-[#6366f1]" /> : row.pro === "check-purple" ? <CircleCheck size={16} className="mx-auto text-[#6366f1]" /> : row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 mb-12 relative z-10">
        <h2 className="text-2xl font-black text-[#f9fafb] mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="surface-mid rounded-2xl border border-white/[0.06] p-6 hover:border-white/[0.1] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all">
              <h4 className="text-[#f9fafb] font-bold text-lg mb-3">{faq.q}</h4>
              <p className="text-[#9ca3af] text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
