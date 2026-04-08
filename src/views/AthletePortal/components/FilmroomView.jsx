import React, { useState, useRef } from 'react';
import { Film, Play, Download, Lock, Upload, Edit, LayoutTemplate, Share2, Sparkles, Wand2, Plus, MoreVertical, CheckCircle2 } from 'lucide-react';

export const FilmroomView = ({ userPlan, type }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [actionLabel, setActionLabel] = useState("");

  const fileInputRef = useRef(null);

  const handleSimulateAction = (action, time = 2000) => {
    setUploading(true);
    setActionLabel(action);
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
      setTimeout(() => setUploadComplete(false), 3000);
    }, time);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleSimulateAction(`Successfully uploaded ${file.name}!`, 3000);
      // Reset input so the same file can be selected again
      e.target.value = '';
    }
  };

  // Toast component
  const ActionToast = () => (
    uploadComplete && (
      <div className="absolute top-4 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
        <div className="bg-[#111827] text-[#f9fafb] px-5 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 border border-white/[0.06]">
          <CheckCircle2 size={18} className="text-[#22c55e]" />
          <span className="text-sm font-bold">{actionLabel}</span>
        </div>
      </div>
    )
  );

  // Check strict access for Pro tier
  if (type === "pro" && userPlan !== "Pro") {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Filmroom+</h1>
            <p className="text-[#9ca3af] text-sm font-medium">Advanced editing, templates, and recruiting-ready exports</p>
          </div>
          <span className="bg-[#6366f1]/10 text-[#818cf8] text-xs px-3 py-1.5 rounded-full font-bold border border-[#6366f1]/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">Pro</span>
        </div>
        <div className="animate-fade-up animate-fade-up-delay-1 bg-[#111827] rounded-3xl p-16 border border-white/[0.06] text-center flex flex-col items-center justify-center min-h-[500px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
            <Lock size={24} className="text-[#6b7280]" />
          </div>
          <h2 className="text-2xl font-black text-[#f9fafb] mb-4">Unlock Filmroom+</h2>
          <p className="text-[#9ca3af] text-sm mb-8 font-medium max-w-md">Upgrade to Pro to access advanced timeline editing, professional overlays, templated packages, and one-click coach sharing.</p>
          <button className="btn-glow-indigo text-white font-bold px-8 py-3 rounded-xl text-sm transition-all active:scale-[0.97] mb-4">Upgrade to Pro</button>
        </div>
      </div>
    );
  }

  // Check access for Base tier (Needs Verified or Pro)
  if (type === "base" && userPlan === "Basic") {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Filmroom Base</h1>
            <p className="text-[#9ca3af] text-sm font-medium">Create professional highlights from your game footage</p>
          </div>
          <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] text-xs px-3 py-1.5 rounded-full font-bold border border-[#0ea5e9]/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">Verified</span>
        </div>
        <div className="animate-fade-up animate-fade-up-delay-1 bg-[#111827] rounded-3xl p-16 border border-white/[0.06] text-center flex flex-col items-center justify-center min-h-[500px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 bg-white/[0.04] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
            <Lock size={24} className="text-[#6b7280]" />
          </div>
          <h2 className="text-2xl font-black text-[#f9fafb] mb-4">Unlock Filmroom</h2>
          <p className="text-[#9ca3af] text-sm mb-8 font-medium max-w-md">Upgrade to Verified to access game film uploads, AI-assisted clipping, and basic highlight reel generation.</p>
          <button className="btn-glow-blue text-white font-bold px-8 py-3 rounded-xl text-sm transition-all active:scale-[0.97] mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  if (type === "pro") {
    return (
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <ActionToast />
        <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight flex items-center gap-3">
                Filmroom+ <span className="bg-[#6366f1]/10 text-[#818cf8] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px] border border-[#6366f1]/20">Pro</span>
              </h1>
              <p className="text-[#9ca3af] text-sm font-medium">Advanced editing, templates, and recruiting-ready exports</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-1 premium-card-glow-indigo rounded-[1.5rem] p-12 flex flex-col items-center justify-center text-center mb-6 bg-[#111827]">
          <div className="w-20 h-20 bg-[#6366f1]/10 rounded-full flex items-center justify-center mb-8 border border-[#6366f1]/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-10 h-10 text-[#818cf8]" />
          </div>
          <h2 className="text-3xl font-black text-[#f9fafb] mb-4">Welcome to Filmroom+</h2>
          <p className="text-[#9ca3af] font-medium text-[15px] mb-10 max-w-lg leading-relaxed">
            You have access to all premium editing features. Create professional recruiting packages and coach-ready highlights.
          </p>
          <button 
            disabled={uploading}
            onClick={() => handleSimulateAction("Editor environment loaded!")}
            className="btn-glow-indigo text-white font-bold py-4 px-32 rounded-xl text-sm transition-all w-full max-w-2xl disabled:opacity-75 flex justify-center items-center gap-3 active:scale-[0.97]"
          >
            {uploading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading Editor...</>
            ) : "Start Creating"}
          </button>
        </div>

        <div className="animate-fade-up animate-fade-up-delay-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => handleSimulateAction("Templates library unlocked!")} className="bg-[#111827] rounded-[1.5rem] p-8 border border-white/[0.06] hover:border-[#6366f1]/20 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center mb-6 border border-[#6366f1]/20 group-hover:scale-110 transition-transform">
              <LayoutTemplate className="w-6 h-6 text-[#818cf8] stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-[#f9fafb] text-lg mb-2">Pro Templates</h3>
            <p className="text-[#9ca3af] text-[13px] font-medium leading-relaxed">Coach Quick Eval, Top Plays, Skills Breakdown, and more recruiting-ready formats</p>
          </div>
          
          <div onClick={() => handleSimulateAction("Timeline editor launched!")} className="bg-[#111827] rounded-[1.5rem] p-8 border border-white/[0.06] hover:border-[#6366f1]/20 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center mb-6 border border-[#6366f1]/20 group-hover:scale-110 transition-transform">
              <Wand2 className="w-6 h-6 text-[#818cf8] stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-[#f9fafb] text-lg mb-2">Advanced Editing</h3>
            <p className="text-[#9ca3af] text-[13px] font-medium leading-relaxed">Multi-clip timeline, transitions, speed control, and professional overlays</p>
          </div>
          
          <div onClick={() => handleSimulateAction("Shareable link copied to clipboard!", 500)} className="bg-[#111827] rounded-[1.5rem] p-8 border border-white/[0.06] hover:border-[#6366f1]/20 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center mb-6 border border-[#6366f1]/20 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6 text-[#818cf8] stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-[#f9fafb] text-lg mb-2">Coach Share</h3>
            <p className="text-[#9ca3af] text-[13px] font-medium leading-relaxed">One-click packages with stats, measurables, and private share links</p>
          </div>
        </div>
      </div>
    );
  }

  // Base Filmroom
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full relative">
      <ActionToast />
      <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight flex items-center gap-3">
              Filmroom <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px] border border-[#0ea5e9]/20">Verified</span>
            </h1>
            <p className="text-[#9ca3af] text-sm font-medium">Create professional highlights from your game footage</p>
          </div>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-glow-blue text-white font-bold py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 transition-all disabled:opacity-75 active:scale-[0.97]"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="video/mp4,video/x-m4v,video/*"
      />

      <div onClick={() => !uploading && fileInputRef.current?.click()} className="animate-fade-up animate-fade-up-delay-1 bg-[#111827] rounded-[1.5rem] p-16 border-2 border-dashed border-white/[0.08] flex flex-col items-center justify-center text-center mb-10 hover:bg-white/[0.02] hover:border-[#0ea5e9]/20 transition-all duration-300 cursor-pointer group shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
        <div className="w-16 h-16 bg-[#0ea5e9]/10 rounded-full flex items-center justify-center mb-6 border border-[#0ea5e9]/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] transition-all duration-300">
          <Upload className="w-8 h-8 text-[#0ea5e9]" />
        </div>
        <h3 className="text-xl font-black text-[#f9fafb] mb-2">Upload Game Film</h3>
        <p className="text-[#9ca3af] font-medium text-sm mb-6 max-w-sm">Upload full game footage to create highlight reels</p>
        <p className="text-[#6b7280] font-bold text-xs mb-6 uppercase tracking-wider">Supports MP4 and MOV files up to 500MB</p>
        <button className="btn-glow-blue text-white font-bold py-3 px-8 rounded-xl text-sm transition-all flex items-center gap-2 disabled:opacity-75 active:scale-[0.97]" disabled={uploading}>
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading (14%)...</>
          ) : (
            <><Upload size={16} /> Upload Video</>
          )}
        </button>
      </div>

      <div className="animate-fade-up animate-fade-up-delay-2 mb-6 flex justify-between items-end">
        <h2 className="text-xl font-bold text-[#f9fafb] tracking-tight">Recent Projects</h2>
        <span className="text-sm font-medium text-[#6b7280]">3 total projects</span>
      </div>

      <div className="animate-fade-up animate-fade-up-delay-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Championship Game Highlights", type: "Highlight Reel", date: "2 days ago", clips: 8 },
          { title: "Season Best Plays", type: "Skills Compilation", date: "1 week ago", clips: 15 },
          { title: "Defense Compilation", type: "Game Breakdown", date: "2 weeks ago", clips: 6 }
        ].map((project, idx) => (
          <div key={idx} className="bg-[#111827] rounded-[1.5rem] border border-white/[0.06] flex flex-col overflow-hidden group hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300" style={{ animationDelay: `${idx * 0.08}s` }}>
            <div className="h-44 bg-[#1f2937] flex items-center justify-center shrink-0 border-b border-white/[0.06] group-hover:bg-[#1f2937]/80 transition-colors relative">
              <Film className="w-12 h-12 text-[#4b5563] stroke-[1.5]" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <div onClick={() => handleSimulateAction(`Playing ${project.title}`)} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-white/20 hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[#f9fafb] leading-tight pr-4">{project.title}</h3>
                <MoreVertical size={16} className="text-[#6b7280] cursor-pointer shrink-0 hover:text-[#9ca3af] transition-colors" />
              </div>
              <p className="text-[11px] text-[#9ca3af] font-bold mb-4">{project.type}</p>
              
              <div className="flex items-center gap-3 text-xs font-medium text-[#6b7280] mb-6 mt-auto">
                <span>{project.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#4b5563]"></span>
                <span>{project.clips} clips</span>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleSimulateAction(`Loading editor for ${project.title}...`, 1500); }}
                className="w-full bg-white/[0.04] border border-white/[0.06] text-[#d1d5db] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-white/[0.08] hover:border-white/[0.1] transition-all active:scale-[0.97]"
              >
                <Edit size={14} /> Edit Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
