import React, { useState } from 'react';
import { BrainCircuit, Clock, Target, FileText, Plus, Lock, CheckCircle2 } from 'lucide-react';

export const PerformanceLabView = ({ userPlan }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      setTimeout(() => setAnalysisComplete(false), 4000);
    }, 2000);
  };

  if (userPlan !== "Pro") {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full">
        <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight flex items-center gap-3">
              Performance Lab <span className="bg-[#6366f1]/10 text-[#818cf8] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px] border border-[#6366f1]/20">Pro</span>
            </h1>
            <p className="text-[#9ca3af] text-sm font-medium">Advanced film breakdown + actionable improvement plan</p>
          </div>
        </div>
        <div className="animate-fade-up animate-fade-up-delay-1 bg-[#111827] rounded-3xl p-16 border border-white/[0.06] text-center flex flex-col items-center justify-center min-h-[500px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
            <Lock size={24} className="text-[#6b7280]" />
          </div>
          <h2 className="text-2xl font-black text-[#f9fafb] mb-4">Unlock Performance Lab</h2>
          <p className="text-[#9ca3af] text-sm mb-8 font-medium max-w-md">Upgrade to the Pro plan to access biometrics tracking, predictive injury analysis, and targeted workout generation.</p>
          <button className="btn-glow-indigo text-white font-bold px-8 py-3 rounded-xl text-sm transition-all active:scale-[0.97] mb-4">Upgrade to Pro</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
      
      {/* Toast Notification */}
      {analysisComplete && (
        <div className="absolute top-0 right-0 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#111827] text-[#f9fafb] px-5 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 border border-white/[0.06]">
            <CheckCircle2 size={18} className="text-[#22c55e]" />
            <span className="text-sm font-bold">Analysis requested successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight flex items-center gap-3">
            Performance Lab <span className="bg-[#6366f1]/10 text-[#818cf8] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px] border border-[#6366f1]/20">Pro</span>
          </h1>
          <p className="text-[#9ca3af] text-sm font-medium">Advanced film breakdown + actionable improvement plan</p>
        </div>
        <button 
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="btn-glow-indigo text-white font-bold flex items-center gap-2 py-3 px-6 rounded-xl text-sm transition-all disabled:opacity-75 active:scale-[0.97]"
        >
          {analyzing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          {analyzing ? "Processing..." : "Run New Analysis"}
        </button>
      </div>

      {/* Main Container */}
      <div className="animate-fade-up animate-fade-up-delay-1 flex-1 pt-4 pb-10 flex justify-center">
        <div className="w-full max-w-4xl premium-card-glow-indigo rounded-[2rem] p-12 lg:p-16 flex flex-col items-center text-center bg-[#111827]">
          
          <div className="w-20 h-20 bg-[#6366f1]/10 rounded-full flex items-center justify-center mb-8 border border-[#6366f1]/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <BrainCircuit className="w-10 h-10 text-[#818cf8]" />
          </div>
          
          <h2 className="text-3xl font-black text-[#f9fafb] mb-4 tracking-tight">Welcome to Performance Lab</h2>
          
          <p className="text-[#9ca3af] font-medium text-[15px] mb-12 max-w-xl leading-relaxed">
            Upload game film to generate AI-powered insights, shot charts, and coach-ready summaries. Your reports will appear here.
          </p>
          
          <button 
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="w-full max-w-2xl btn-glow-indigo text-white font-bold py-4 px-8 rounded-xl text-[15px] transition-all mb-14 flex flex-col sm:flex-row items-center justify-center gap-2 active:scale-[0.97]"
          >
            {analyzing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Video Upload...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus size={18} /> Run Your First Analysis
              </div>
            )}
          </button>
          
          <div className="animate-fade-up animate-fade-up-delay-2 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] rounded-[1.5rem] p-6 text-left border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#6366f1]/10 rounded-xl border border-[#6366f1]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#818cf8]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f9fafb] text-[13px] mb-1 tracking-wide">Timestamped Clips</h4>
                  <p className="text-[#6b7280] font-medium text-xs leading-relaxed">Jump to key moments instantly</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.03] rounded-[1.5rem] p-6 text-left border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#6366f1]/10 rounded-xl border border-[#6366f1]/20 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#818cf8]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f9fafb] text-[13px] mb-1 tracking-wide">Shot Charts</h4>
                  <p className="text-[#6b7280] font-medium text-xs leading-relaxed">Visual breakdown by zone</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/[0.03] rounded-[1.5rem] p-6 text-left border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#6366f1]/10 rounded-xl border border-[#6366f1]/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#818cf8]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#f9fafb] text-[13px] mb-1 tracking-wide">Coach Reports</h4>
                  <p className="text-[#6b7280] font-medium text-xs leading-relaxed">Shareable recruiting summaries</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
