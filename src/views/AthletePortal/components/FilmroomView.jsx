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
        <div className="bg-gray-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-sm font-bold">{actionLabel}</span>
        </div>
      </div>
    )
  );

  // Check strict access for Pro tier
  if (type === "pro" && userPlan !== "Pro") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Filmroom+</h1>
            <p className="text-gray-500 text-sm font-medium">Advanced editing, templates, and recruiting-ready exports</p>
          </div>
          <span className="bg-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Pro</span>
        </div>
        <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Filmroom+</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to Pro to access advanced timeline editing, professional overlays, templated packages, and one-click coach sharing.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">Upgrade to Pro</button>
        </div>
      </div>
    );
  }

  // Check access for Base tier (Needs Verified or Pro)
  if (type === "base" && userPlan === "Basic") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Filmroom Base</h1>
            <p className="text-gray-500 text-sm font-medium">Create professional highlights from your game footage</p>
          </div>
          <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Verified</span>
        </div>
        <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Filmroom</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to Verified to access game film uploads, AI-assisted clipping, and basic highlight reel generation.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  if (type === "pro") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full relative">
        <ActionToast />
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight flex items-center gap-3">
                Filmroom+ <span className="bg-purple-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px]">Pro</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium">Advanced editing, templates, and recruiting-ready exports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center mb-6 border-t-4 border-t-purple-600">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-8 shadow-sm border border-purple-100">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Welcome to Filmroom+</h2>
          <p className="text-gray-500 font-medium text-[15px] mb-10 max-w-lg leading-relaxed">
            You have access to all premium editing features. Create professional recruiting packages and coach-ready highlights.
          </p>
          <button 
            disabled={uploading}
            onClick={() => handleSimulateAction("Editor environment loaded!")}
            className="bg-gray-900 text-white font-bold py-4 px-32 rounded-xl text-sm shadow-xl hover:bg-black hover:shadow-2xl transition-all transform hover:-translate-y-0.5 w-full max-w-2xl disabled:opacity-75 flex justify-center items-center gap-3"
          >
            {uploading ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading Editor...</>
            ) : "Start Creating"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => handleSimulateAction("Templates library unlocked!")} className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-gray-200 shadow-sm group-hover:scale-110 transition-transform">
              <LayoutTemplate className="w-6 h-6 text-purple-600 stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Pro Templates</h3>
            <p className="text-gray-500 text-[13px] font-medium leading-relaxed">Coach Quick Eval, Top Plays, Skills Breakdown, and more recruiting-ready formats</p>
          </div>
          
          <div onClick={() => handleSimulateAction("Timeline editor launched!")} className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-gray-200 shadow-sm group-hover:scale-110 transition-transform">
              <Wand2 className="w-6 h-6 text-purple-600 stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Advanced Editing</h3>
            <p className="text-gray-500 text-[13px] font-medium leading-relaxed">Multi-clip timeline, transitions, speed control, and professional overlays</p>
          </div>
          
          <div onClick={() => handleSimulateAction("Shareable link copied to clipboard!", 500)} className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-gray-200 shadow-sm group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6 text-purple-600 stroke-[2.5]" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Coach Share</h3>
            <p className="text-gray-500 text-[13px] font-medium leading-relaxed">One-click packages with stats, measurables, and private share links</p>
          </div>
        </div>
      </div>
    );
  }

  // Base Filmroom
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full relative">
      <ActionToast />
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight flex items-center gap-3">
              Filmroom <span className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider translate-y-[1px]">Verified</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium">Create professional highlights from your game footage</p>
          </div>
        </div>
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-black transition-colors disabled:opacity-75"
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

      <div onClick={() => !uploading && fileInputRef.current?.click()} className="bg-white rounded-[1.5rem] p-16 shadow-sm border border-gray-100 border-dashed border-2 flex flex-col items-center justify-center text-center mb-10 hover:bg-gray-50/50 transition-colors cursor-pointer group">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">Upload Game Film</h3>
        <p className="text-gray-500 font-medium text-sm mb-6 max-w-sm">Upload full game footage to create highlight reels</p>
        <p className="text-gray-400 font-bold text-xs mb-6 uppercase tracking-wider">Supports MP4 and MOV files up to 500MB</p>
        <button className="bg-gray-900 text-white font-bold py-3 px-8 rounded-xl text-sm shadow-md hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-75" disabled={uploading}>
          {uploading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading (14%)...</>
          ) : (
            <><Upload size={16} /> Upload Video</>
          )}
        </button>
      </div>

      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Projects</h2>
        <span className="text-sm font-medium text-gray-400">3 total projects</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Championship Game Highlights", type: "Highlight Reel", date: "2 days ago", clips: 8 },
          { title: "Season Best Plays", type: "Skills Compilation", date: "1 week ago", clips: 15 },
          { title: "Defense Compilation", type: "Game Breakdown", date: "2 weeks ago", clips: 6 }
        ].map((project, idx) => (
          <div key={idx} className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden group hover:shadow-md transition-shadow">
            <div className="h-44 bg-gray-100 flex items-center justify-center shrink-0 border-b border-gray-100 group-hover:bg-gray-200 transition-colors relative">
              <Film className="w-12 h-12 text-gray-300 stroke-[1.5]" />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                <div onClick={() => handleSimulateAction(`Playing ${project.title}`)} className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 leading-tight pr-4">{project.title}</h3>
                <MoreVertical size={16} className="text-gray-400 cursor-pointer shrink-0" />
              </div>
              <p className="text-[11px] text-gray-500 font-bold mb-4">{project.type}</p>
              
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-6 mt-auto">
                <span>{project.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>{project.clips} clips</span>
              </div>
              
              <button 
                onClick={(e) => { e.stopPropagation(); handleSimulateAction(`Loading editor for ${project.title}...`, 1500); }}
                className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
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
