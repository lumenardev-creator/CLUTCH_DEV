import React from 'react';
import { opportunitiesNearYou } from '../../../data/shared';
import { Calendar, MapPin, Map as MapIcon, Tag } from 'lucide-react';

export const EventsMapView = () => {
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Events & Map</h1>
          <p className="text-gray-500 text-sm font-medium">Discover tournaments and scouting opportunities</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-900 font-bold py-2.5 px-6 rounded-xl text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <MapIcon className="w-4 h-4" /> View Full Map
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {opportunitiesNearYou.map((opp, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
            <div className="relative h-48 bg-gray-200">
              <img src={opp.img} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">{opp.type}</div>
              <h4 className="absolute bottom-4 left-5 right-5 font-black text-white text-xl leading-tight drop-shadow-md">{opp.title}</h4>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="space-y-3 mb-6 font-bold text-sm">
                <div className="flex items-center text-gray-600 gap-3"><Calendar size={16} className="text-gray-400" /> {opp.date}</div>
                <div className="flex items-center text-gray-600 gap-3"><MapPin size={16} className="text-gray-400" /> {opp.location}</div>
                <div className="flex items-center text-gray-600 gap-3"><Tag size={16} className="text-gray-400" /> {opp.tags}</div>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 flex-grow">{opp.desc}</p>
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors text-sm shadow-sm group-hover:bg-blue-600">Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
