import React, { useState } from 'react';
import { Search, Filter, MapPin, TrendingUp, CircleCheck } from 'lucide-react';
import { athletesNearYou } from '../../../data/athlete';

export const CoachSearchView = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Player Search</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Advanced filtering and specific player lookup</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pb-12 flex-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-[#111827] rounded-[2rem] p-6 border border-white/[0.06] h-max">
          <div className="flex items-center gap-2 mb-6 text-[#f9fafb] font-black text-lg">
            <Filter className="w-5 h-5 text-[#6b7280]" /> Filters
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Position</label>
              <select className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-bold focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-shadow appearance-none">
                <option>All Positions</option>
                <option>Point Guard</option>
                <option>Shooting Guard</option>
                <option>Small Forward</option>
                <option>Power Forward</option>
                <option>Center</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Graduation Year</label>
              <select className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-bold focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-shadow appearance-none">
                <option>Any Year</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-[#6b7280] uppercase tracking-widest block mb-3">Min. ClutchScore</label>
              <input type="range" min="0" max="25" defaultValue="10" className="w-full accent-[#3b82f6]" />
              <div className="flex justify-between text-xs font-bold text-[#6b7280] mt-2">
                <span>0</span><span>25.0</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white font-bold py-3 rounded-xl text-sm shadow-md hover:from-[#4f46e5] hover:to-[#2563eb] transition-all mt-4 hover:scale-105 active:scale-[0.96]">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 min-w-0">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input 
              type="text" 
              placeholder="Search by name, school, or location..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#111827] border border-white/[0.06] rounded-2xl pl-12 pr-4 py-4 text-base text-[#f9fafb] font-medium placeholder:text-[#6b7280] focus:outline-none focus:border-[#3b82f6]/50 focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {athletesNearYou.map((ath, i) => (
              <div key={i} className="bg-[#111827] rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300">
                <div className="relative h-40 bg-[#1f2937] shrink-0">
                  <img src={ath.img} alt={ath.name} className="w-full h-full object-cover" />
                  {ath.verified && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#0ea5e9] rounded-full flex items-center justify-center border-[1.5px] border-[#111827] shadow-sm">
                      <CircleCheck size={12} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-black text-[#f9fafb] mb-1 text-lg leading-tight">{ath.name}</h4>
                  <p className="text-sm text-[#9ca3af] mb-3 font-medium">{ath.info}</p>
                  <div className="flex items-center text-xs text-[#6b7280] mb-5 font-bold gap-1.5 uppercase">
                    <MapPin size={12} className="text-[#6b7280]" /> {ath.location}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs bg-white/[0.04] px-3 py-2 rounded-xl border border-white/[0.06]">
                    <div className="flex items-center text-[#3b82f6]">
                      <TrendingUp size={14} className="mr-1" />
                      <span className="font-black text-[#f9fafb] text-sm">{ath.ppg}</span> <span className="text-[#6b7280] ml-1 uppercase text-[10px] font-bold">PPG</span>
                    </div>
                    <div>
                      <span className="font-black text-[#f9fafb] text-sm">{ath.rpg}</span> <span className="text-[#6b7280] ml-1 uppercase text-[10px] font-bold">RPG</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
