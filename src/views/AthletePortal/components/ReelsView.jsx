import React from 'react';
import { Video, Plus, Play, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export const ReelsView = () => {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Reels</h1>
          <p className="text-gray-500 text-sm font-medium">Create and share your highlight tapes</p>
        </div>
        <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Create Reel
        </button>
      </div>

      <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-200">
          <Video className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">No Reels Yet</h3>
        <p className="text-gray-500 font-medium text-sm mb-6">Create your first highlight reel to showcase your talent to coaches.</p>
        <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 px-8 rounded-xl text-sm shadow-md hover:shadow-lg transition-all">
          Upload Highlights
        </button>
      </div>
    </div>
  );
};
