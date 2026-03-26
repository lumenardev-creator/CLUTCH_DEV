import React, { useState } from 'react';
import { Heart, X, Star, MapPin, TrendingUp, Info } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';

export const ScoutSwipeView = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleSwipe = (direction) => {
    setCurrentIdx(prev => (prev + 1) % featuredAthletes.length);
  };

  const athlete = featuredAthletes[currentIdx];

  return (
    <div className="animate-in fade-in duration-300 w-full h-full flex flex-col items-center max-w-4xl mx-auto overflow-hidden">
      <div className="w-full flex items-end justify-between mb-8 pb-3 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Scout Swipe</h1>
          <p className="text-gray-500 text-sm font-medium">Discover top talent in your region</p>
        </div>
      </div>

      <div className="relative w-full max-w-md h-[550px] bg-white rounded-[2rem] shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="relative h-2/3 bg-gray-900 shrink-0 group">
          <img src={athlete.img} alt={athlete.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-3xl font-black mb-1 drop-shadow-md">{athlete.name}</h2>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-200 drop-shadow-md">
              <MapPin className="w-4 h-4" /> {athlete.location}
            </div>
          </div>
          <button className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/60 transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 flex-1 flex flex-col bg-white">
          <p className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">{athlete.info}</p>
          <div className="flex justify-between items-center mb-6 px-4">
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">{athlete.ppg}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">PPG</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">{athlete.rpg}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">RPG</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-gray-900">{athlete.apg}</div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">APG</div>
            </div>
          </div>
          
          <div className="mt-auto flex justify-center gap-6">
            <button onClick={() => handleSwipe('left')} className="w-16 h-16 bg-white border-2 border-red-100 text-red-500 rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:scale-105 transition-all">
              <X className="w-8 h-8" />
            </button>
            <button onClick={() => handleSwipe('super')} className="w-12 h-12 self-end bg-white border-2 border-blue-100 text-blue-500 rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 hover:scale-105 transition-all mt-4">
              <Star className="w-6 h-6 fill-current" />
            </button>
            <button onClick={() => handleSwipe('right')} className="w-16 h-16 bg-white border-2 border-green-100 text-green-500 rounded-full flex items-center justify-center shadow-sm hover:bg-green-50 hover:scale-105 transition-all">
              <Heart className="w-8 h-8 fill-current" />
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-400 font-bold mt-6 tracking-wide uppercase">Tip: Swipe right to add to Recruiting Board</p>
    </div>
  );
};
