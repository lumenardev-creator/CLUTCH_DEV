import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CircleCheck, Star } from 'lucide-react';
import { comparisonRows, faqs } from '../data/shared';

export const PricingView = () => {
  const navigate = useNavigate();
  const [userPlan, setUserPlan] = useState("Basic");

  return (
    <div className="flex-grow flex flex-col bg-[#fafafa] text-gray-900 font-sans pb-24 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto w-full pt-8 px-6">
        <button onClick={() => navigate('/demo')} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-semibold text-sm w-max">
          <ChevronLeft size={16} className="mr-1" /> Back to Athlete Portal
        </button>
      </div>
      
      <div className="text-center mt-12 mb-10 px-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Pricing & Plans</h1>
        <p className="text-gray-500 font-medium">Choose the plan that fits your recruiting goals</p>
      </div>
      
      <div className="flex flex-col items-center mb-12">
        <span className="bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 shadow-sm tracking-wide">
          Current Plan: {userPlan}
        </span>
        <p className="text-gray-500 text-sm font-medium">Upgrade anytime to unlock more features</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full px-6 mb-24 items-start">
        {/* Basic Plan */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col h-full mt-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">Basic</h3>
            <p className="text-gray-500 text-sm font-medium mb-6">Get discovered</p>
            <div className="text-5xl font-black text-gray-900 tracking-tight">Free</div>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Create profile", "Post reels", "Swipe reels", "Messaging (limited)", "Search (limited)"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <CircleCheck size={18} className="text-green-500 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setUserPlan("Basic");
              navigate('/demo');
            }}
            className={`w-full py-3.5 rounded-xl border-2 ${userPlan === "Basic" ? "border-gray-100 text-gray-400 cursor-not-allowed" : "border-blue-600 text-blue-600 hover:bg-blue-50"} font-bold mt-auto transition-colors`}
          >
            {userPlan === "Basic" ? "Current Plan" : "Downgrade to Basic"}
          </button>
        </div>

        {/* Verified Plan */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-500 shadow-xl flex flex-col relative z-10 h-full transform md:-translate-y-4">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md whitespace-nowrap">
            <Star size={12} fill="currentColor" /> Recommended
          </div>
          <div className="text-center mb-8 mt-2">
            <h3 className="text-2xl font-black text-gray-900">Verified</h3>
            <p className="text-gray-500 text-sm font-medium mb-6">Build trust</p>
            <div className="text-5xl font-black text-gray-900 tracking-tight mb-2">$20/mo</div>
            <p className="text-gray-400 text-xs font-medium">per month</p>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Everything in Basic", "Verified badge", "Verified stats", "ClutchScore", "Filmroom (base)", "Coach trust features"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <CircleCheck size={18} className="text-green-500 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setUserPlan("Verified");
              navigate('/demo');
            }}
            className={`w-full py-3.5 rounded-xl font-bold shadow-md transition-colors mt-auto ${userPlan === "Verified" ? "bg-green-500 text-white cursor-default" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {userPlan === "Verified" ? "Current Plan" : userPlan === "Pro" ? "Downgrade to Verified" : "Upgrade to Verified"}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col h-full mt-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">Pro</h3>
            <p className="text-gray-500 text-sm font-medium mb-6">Train + dominate</p>
            <div className="text-5xl font-black text-gray-900 tracking-tight mb-2">$40/mo</div>
            <p className="text-gray-400 text-xs font-medium">per month</p>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            {["Everything in Verified", "Filmroom+ (advanced)", "Performance Lab", "More storage/uploads", "Visibility boosts", "Priority support"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                <CircleCheck size={18} className="text-green-500 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setUserPlan("Pro");
              navigate('/demo');
            }}
            className={`w-full py-3.5 rounded-xl font-bold shadow-md transition-colors mt-auto ${userPlan === "Pro" ? "bg-green-500 text-white cursor-default" : "bg-gray-900 hover:bg-black text-white"}`}
          >
            {userPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 mb-24">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <h2 className="text-2xl font-black text-gray-900 my-8 text-center tracking-tight">Feature Comparison</h2>
          <div className="overflow-x-auto px-2 pb-6">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 text-gray-900 font-bold border-b border-gray-100 w-2/5">Feature</th>
                  <th className="py-4 px-6 text-center text-gray-900 font-bold border-b border-gray-100 w-1/5">Basic</th>
                  <th className="py-4 px-6 text-center text-gray-900 font-bold border-b border-gray-100 bg-blue-50/40 rounded-t-xl w-1/5">Verified</th>
                  <th className="py-4 px-6 text-center text-gray-900 font-bold border-b border-gray-100 w-1/5">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium border-b border-gray-50">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-500 font-medium border-b border-gray-50">{row.basic}</td>
                    <td className="py-4 px-6 text-center text-sm text-gray-900 font-medium border-b border-gray-50 bg-blue-50/40">{row.verified}</td>
                    <td className={`py-4 px-6 text-center text-sm text-gray-900 font-medium border-b border-gray-50 ${row.highlightPro ? "bg-purple-50/40 rounded-xl" : ""}`}>{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 mb-12">
        <h2 className="text-2xl font-black text-gray-900 mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-gray-900 font-bold text-lg mb-3">{faq.q}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
