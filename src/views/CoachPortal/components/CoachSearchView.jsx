import React, { useState } from 'react';
import { Search, Filter, MapPin, TrendingUp, CircleCheck } from 'lucide-react';
import { athletesNearYou } from '../../../data/athlete';

export const CoachSearchView = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Player Search</h1>
          <p className="text-gray-500 text-sm font-medium">Advanced filtering and specific player lookup</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pb-12 flex-1">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 shrink-0 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 h-max">
          <div className="flex items-center gap-2 mb-6 text-gray-900 font-black text-lg">
            <Filter className="w-5 h-5" /> Filters
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Position</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow">
                <option>All Positions</option>
                <option>Point Guard</option>
                <option>Shooting Guard</option>
                <option>Small Forward</option>
                <option>Power Forward</option>
                <option>Center</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Graduation Year</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow">
                <option>Any Year</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Min. ClutchScore</label>
              <input type="range" min="0" max="25" defaultValue="10" className="w-full accent-blue-600" />
              <div className="flex justify-between text-xs font-bold text-gray-400 mt-2">
                <span>0</span><span>25.0</span>
              </div>
            </div>
            
            <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl text-sm shadow-md hover:bg-gray-800 transition-colors mt-4">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 min-w-0">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, school, or location..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-base text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {athletesNearYou.map((ath, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all duration-300">
                <div className="relative h-40 bg-gray-200 shrink-0">
                  <img src={ath.img} alt={ath.name} className="w-full h-full object-cover" />
                  {ath.verified && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-[1.5px] border-white shadow-sm">
                      <CircleCheck size={12} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="font-black text-gray-900 mb-1 text-lg leading-tight">{ath.name}</h4>
                  <p className="text-sm text-gray-500 mb-3 font-medium">{ath.info}</p>
                  <div className="flex items-center text-xs text-gray-400 mb-5 font-bold gap-1.5 uppercase">
                    <MapPin size={12} className="text-gray-300" /> {ath.location}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-xs bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    <div className="flex items-center text-blue-600">
                      <TrendingUp size={14} className="mr-1" />
                      <span className="font-black text-gray-900 text-sm">{ath.ppg}</span> <span className="text-gray-400 ml-1 uppercase text-[10px] font-bold">PPG</span>
                    </div>
                    <div>
                      <span className="font-black text-gray-900 text-sm">{ath.rpg}</span> <span className="text-gray-400 ml-1 uppercase text-[10px] font-bold">RPG</span>
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
