import React from 'react';
import { Film, Play, Download, Lock } from 'lucide-react';

export const FilmroomView = ({ userPlan }) => {
  if (userPlan === "Basic") {
    return (
      <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Filmroom</h1>
            <p className="text-gray-500 text-sm font-medium">Advanced video analysis and telestration</p>
          </div>
          <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">Verified/Pro Feature</span>
        </div>
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Lock size={24} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Unlock Filmroom</h2>
          <p className="text-gray-600 text-sm mb-8 font-medium max-w-md">Upgrade to Verified or Pro to access advanced video parsing, marking tools, and deep game analysis.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow-md transition-colors mb-4">View Plans</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Filmroom</h1>
          <p className="text-gray-500 text-sm font-medium">Analyze game footage and build your IQ</p>
        </div>
        <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
          Upload Game Film
        </button>
      </div>

      <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-200">
          <Film className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">No Film Uploaded</h3>
        <p className="text-gray-500 font-medium text-sm mb-6">Upload your first full game to generate automated clipping and analysis.</p>
      </div>
    </div>
  );
};
