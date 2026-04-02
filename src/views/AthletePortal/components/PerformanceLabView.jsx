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
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight flex items-center gap-3">
              Performance Lab <span className="bg-purple-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px]">Pro</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">Advanced film breakdown + actionable improvement plan</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Performance Lab</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to the Pro plan to access biometrics tracking, predictive injury analysis, and targeted workout generation.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">Upgrade to Pro</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full relative">
      
      {/* Toast Notification */}
      {analysisComplete && (
        <div className="absolute top-0 right-0 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="text-sm font-bold">Analysis requested successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight flex items-center gap-3">
            Performance Lab <span className="bg-purple-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px]">Pro</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium">Advanced film breakdown + actionable improvement plan</p>
        </div>
        <button 
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="bg-gray-900 text-white font-bold flex items-center gap-2 py-3 px-6 rounded-xl text-sm shadow-md hover:bg-black transition-colors disabled:opacity-75"
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
      <div className="flex-1 pt-4 pb-10 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-sm border border-gray-100 p-12 lg:p-16 flex flex-col items-center text-center">
          
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <BrainCircuit className="w-10 h-10 text-purple-600" />
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Welcome to Performance Lab</h2>
          
          <p className="text-gray-500 font-medium text-[15px] mb-12 max-w-xl leading-relaxed">
            Upload game film to generate AI-powered insights, shot charts, and coach-ready summaries. Your reports will appear here.
          </p>
          
          <button 
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="w-full max-w-2xl bg-gray-900 text-white font-bold py-4 px-8 rounded-xl text-[15px] shadow-xl hover:bg-black hover:shadow-2xl transition-all transform hover:-translate-y-0.5 mb-14 flex flex-col sm:flex-row items-center justify-center gap-2"
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
          
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50/80 rounded-[1.5rem] p-6 text-left border border-gray-100/50">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[13px] mb-1 tracking-wide">Timestamped Clips</h4>
                  <p className="text-gray-500 font-medium text-xs leading-relaxed">Jump to key moments instantly</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50/80 rounded-[1.5rem] p-6 text-left border border-gray-100/50">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[13px] mb-1 tracking-wide">Shot Charts</h4>
                  <p className="text-gray-500 font-medium text-xs leading-relaxed">Visual breakdown by zone</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50/80 rounded-[1.5rem] p-6 text-left border border-gray-100/50">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[13px] mb-1 tracking-wide">Coach Reports</h4>
                  <p className="text-gray-500 font-medium text-xs leading-relaxed">Shareable recruiting summaries</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
