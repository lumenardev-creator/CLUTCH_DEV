import React, { useState } from 'react';
import { opportunitiesNearYou } from '../../../data/shared';
import { Calendar, MapPin, Tag, Map as MapIcon, ChevronLeft, Filter, Layers, Activity, Users, ShieldCheck, Bookmark, CalendarDays, Eye, TrendingUp } from 'lucide-react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet markers overlapping correctly
import "leaflet/dist/images/marker-shadow.png";

// Helper to render complex HTML markers using Tailwind
const createNodeIcon = ({ value, trend, abbreviation, trendValue, isPurple = false, isSelected = false, isCluster = false }) => {
  const bgColor = isSelected ? 'bg-blue-600' : (isPurple ? 'bg-purple-600' : 'bg-blue-500');
  const glowColor = isSelected ? 'bg-blue-500/30' : (isPurple ? 'bg-purple-500/20' : 'bg-blue-500/20');
  const ring = isSelected ? 'ring-4 ring-blue-500/30' : '';
  const padding = isSelected ? 'border-[3px]' : 'border-2';
  const size = isSelected ? 'w-[72px] h-[72px]' : 'w-[64px] h-[64px]';

  const trendHtml = trend ? `
    <div class="absolute -top-2 -right-3 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white shadow-sm flex items-center gap-0.5 z-20">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
      ${trendValue}%
    </div>
  ` : '';

  let coreHtml = '';
  if (isCluster) {
    coreHtml = `
      <div class="absolute -left-5 -top-3 w-[40px] h-[40px] bg-purple-500 rounded-full shadow-lg border-[1.5px] border-white z-10 flex items-center justify-center">
        <span class="text-white font-black text-xs">8</span>
      </div>
      <div class="absolute left-5 -top-1 w-[30px] h-[30px] bg-pink-500 rounded-full shadow-lg border-2 border-white z-10 flex items-center justify-center">
        <span class="text-white font-black text-[10px]">6</span>
      </div>
      <div class="w-[56px] h-[56px] bg-purple-700 rounded-full shadow-xl flex flex-col items-center justify-center relative border-2 border-white z-20">
        ${trendHtml}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-0.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
        <span class="text-purple-100 text-[10px] font-bold uppercase tracking-wide">12</span>
      </div>
    `;
  } else {
    coreHtml = `
      <div class="absolute -inset-4 ${glowColor} rounded-full blur-md opacity-50 ${isSelected ? 'animate-pulse -inset-6 blur-lg' : ''}"></div>
      <div class="${size} ${bgColor} rounded-full shadow-lg flex flex-col items-center justify-center relative ${padding} border-white z-10 transition-colors hover:scale-105 duration-200 ${ring}">
        ${trendHtml}
        <span class="text-white font-black text-xl leading-none">${value}</span>
        <span class="text-white/80 text-[10px] font-bold uppercase tracking-wider mt-0.5">${abbreviation}</span>
      </div>
    `;
  }

  const html = `
    <div class="relative w-full h-full flex flex-col items-center group cursor-pointer hover:z-50">
      <div class="relative flex items-center justify-center w-full h-full pointer-events-auto bg-transparent">
        ${coreHtml}
      </div>
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'bg-transparent border-none outline-none shadow-none',
    iconSize: isSelected ? [80, 80] : [72, 72],
    iconAnchor: isSelected ? [40, 40] : [36, 36]
  });
};

export const EventsMapView = () => {
  const [showMap, setShowMap] = useState(false);

  // Hardcode US center coordinate
  const mapCenter = [39.8283, -98.5795]; 

  if (showMap) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 mb-6">
          <div>
            <h1 className="text-[28px] font-black text-[#f9fafb] mb-1 flex items-center gap-3 tracking-tight">
              <button 
                onClick={() => setShowMap(false)} 
                className="hover:bg-white/[0.06] p-1.5 rounded-xl transition-colors -ml-2 text-[#6b7280] hover:text-[#f9fafb] z-10 relative"
              >
                <ChevronLeft className="w-7 h-7" strokeWidth={2.5}/>
              </button>
              Talent Intelligence Map
            </h1>
            <p className="text-[#9ca3af] text-[15px] font-medium ml-12">Geographic talent density, growth trends, and event visibility.</p>
          </div>
        </div>

        {/* Layout wrapper */}
        <div className="flex flex-1 min-h-0 gap-6 custom-scrollbar pb-6 relative z-0">
          
          {/* Left Sidebar */}
          <div className="w-[300px] flex flex-col shrink-0 overflow-y-auto pr-2 custom-scrollbar">
            
            <div className="mb-8">
              <h3 className="flex items-center gap-2 font-bold text-[#f9fafb] text-sm mb-4">
                <Layers className="w-4 h-4 text-[#6b7280]" /> Map Layers
              </h3>
              <div className="relative">
                <select className="w-full appearance-none bg-[#111827] border border-white/[0.06] text-[#f9fafb] text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all cursor-pointer">
                  <option>High ClutchScore</option>
                  <option>High Density</option>
                  <option>Recent Growth</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6b7280]">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="mb-8 p-6 bg-[#111827] rounded-2xl border border-white/[0.06]">
              <h3 className="flex items-center gap-2 font-bold text-[#f9fafb] text-sm mb-5">
                <Filter className="w-4 h-4 text-[#6b7280]" /> Filters
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-[#6b7280] mb-2">Position</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white/[0.04] border border-white/[0.06] text-[#f9fafb] text-sm font-bold rounded-xl px-4 py-2.5 pr-10 focus:outline-none cursor-pointer">
                      <option>Shooting Guard</option>
                      <option>Point Guard</option>
                      <option>Any</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6b7280] mb-2">Class Year</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white/[0.04] border border-white/[0.06] text-[#f9fafb] text-sm font-bold rounded-xl px-4 py-2.5 pr-10 focus:outline-none cursor-pointer">
                      <option>All Years</option>
                      <option>2026</option>
                      <option>2027</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6b7280]"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6b7280] mb-2">ClutchScore Range</label>
                  <div className="flex gap-3">
                    <input type="number" defaultValue="0" className="w-full bg-white/[0.04] border border-white/[0.06] text-center text-sm text-[#f9fafb] font-bold rounded-xl py-2 focus:outline-none" />
                    <span className="text-[#6b7280] font-bold self-center">-</span>
                    <input type="number" defaultValue="100" className="w-full bg-white/[0.04] border border-white/[0.06] text-center text-sm text-[#f9fafb] font-bold rounded-xl py-2 focus:outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="text-sm font-bold text-[#d1d5db]">Verified Only</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/[0.1] text-[#3b82f6] focus:ring-[#3b82f6] bg-white/[0.04] cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="flex items-center gap-2 font-bold text-[#f9fafb] text-sm mb-4">
                <Activity className="w-4 h-4 text-[#6b7280]" /> Compare Regions
              </h3>
              <div className="space-y-3">
                <div className="relative">
                  <select className="w-full appearance-none bg-[#111827] border border-white/[0.06] text-[#f9fafb] text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none cursor-pointer">
                    <option>California</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6b7280]"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                </div>
                <div className="relative">
                  <select className="w-full appearance-none bg-white/[0.04] border border-dashed border-white/[0.08] text-[#6b7280] text-sm font-bold rounded-xl px-4 py-3 pr-10 focus:outline-none cursor-pointer">
                    <option>Select Region B</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#6b7280]"><svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
                </div>
                <button className="w-full bg-[#1f2937] text-[#6b7280] font-bold py-3 rounded-xl text-sm cursor-not-allowed border border-white/[0.04]">
                  Compare
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-[#f9fafb] text-sm mb-4">Display Options</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between hover:bg-white/[0.02] p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <label className="text-sm font-bold text-[#d1d5db] cursor-pointer w-full">Show Events</label>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/[0.1] text-[#3b82f6] focus:ring-[#3b82f6] bg-white/[0.04] cursor-pointer" />
                </div>
                <div className="flex items-center justify-between hover:bg-white/[0.02] p-2 -mx-2 rounded-lg cursor-pointer transition-colors">
                  <label className="text-sm font-bold text-[#d1d5db] cursor-pointer w-full">Show My Recruiting Footprint</label>
                  <input type="checkbox" className="w-5 h-5 rounded border-white/[0.1] text-[#3b82f6] focus:ring-[#3b82f6] bg-white/[0.04] cursor-pointer" />
                </div>
              </div>
            </div>

          </div>

          {/* Center Canvas with React Leaflet */}
          <div className="flex-[1.5] bg-[#1f2937] rounded-3xl shadow-inner border border-white/[0.06] relative overflow-hidden h-full min-h-[600px] z-0 isolate block">
            <style dangerouslySetInnerHTML={{__html: `
              .leaflet-container {
                background: #111827;
                border-radius: 1.5rem;
              }
              .leaflet-control-zoom {
                border: none !important;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3) !important;
              }
              .leaflet-control-zoom a {
                color: #f9fafb !important;
                background: #1f2937 !important;
                border-bottom-color: rgba(255,255,255,0.06) !important;
              }
              .leaflet-control-zoom a:hover {
                background: #374151 !important;
              }
            `}} />
            
            <MapContainer 
              center={mapCenter} 
              zoom={4} 
              zoomControl={false}
              style={{ height: '100%', width: '100%' }}
              minZoom={3}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              />
              <ZoomControl position="bottomright" />

              {/* Data Node Markers */}
              <Marker position={[36.7783, -119.4179]} icon={createNodeIcon({ value: 342, abbreviation: 'Cali', trend: true, trendValue: 15 })} />
              <Marker position={[40.6331, -89.3985]} icon={createNodeIcon({ value: 154, abbreviation: 'Illi', trend: false })} />
              <Marker position={[40.4173, -82.9071]} icon={createNodeIcon({ value: 128, abbreviation: 'Ohio', trend: true, trendValue: 6 })} />
              <Marker position={[43.2994, -74.2179]} icon={createNodeIcon({ value: 167, abbreviation: 'NY', trend: true, trendValue: 8, isSelected: true })} />
              <Marker position={[35.7596, -79.0193]} icon={createNodeIcon({ value: 143, abbreviation: 'Nort', trend: true, trendValue: 24 })} />
              <Marker position={[27.7663, -81.6868]} icon={createNodeIcon({ value: 256, abbreviation: 'Flor', trend: true, trendValue: 18, isPurple: true })} />
              
              {/* Event Cluster (Texas) */}
              <Marker position={[31.9686, -99.9018]} icon={createNodeIcon({ value: 0, trend: true, trendValue: 22, isCluster: true })} />
              
            </MapContainer>

            {/* Top Right Label overlay */}
            <div className="absolute top-6 right-6 bg-[#111827]/95 backdrop-blur-sm border border-white/[0.06] shadow-sm rounded-full py-2 px-4 flex items-center gap-2 z-[400] pointer-events-none">
              <Activity className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-sm font-bold text-[#d1d5db]">High ClutchScore</span>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-6 left-6 bg-[#111827]/95 backdrop-blur-sm border border-white/[0.06] shadow-sm rounded-2xl p-4 min-w-[160px] z-[400] pointer-events-none">
              <h4 className="text-[11px] font-black uppercase text-[#6b7280] mb-3 tracking-wider">Legend</h4>
              <div className="space-y-3 test-sm font-medium">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 block shadow-sm border border-[#111827]"></span>
                  <span className="text-[#d1d5db] text-xs font-bold">High Density</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-400 block shadow-sm border border-[#111827]"></span>
                  <span className="text-[#d1d5db] text-xs font-bold">Medium Density</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-600 flex items-center justify-center border border-[#111827] shadow-sm text-white">
                    <CalendarDays className="w-2 h-2" strokeWidth={3} />
                  </span>
                  <span className="text-[#d1d5db] text-xs font-bold">Upcoming Events</span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Sidebar (Region Details) */}
          <div className="w-[320px] flex flex-col shrink-0 overflow-y-auto pb-4 custom-scrollbar">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#f9fafb] tracking-tight">New York</h2>
              <span className="bg-white/[0.06] text-[#9ca3af] text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md border border-white/[0.04]">Region</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#3b82f6]/10 rounded-2xl p-4 border border-[#3b82f6]/20">
                <div className="flex items-center gap-2 text-[#3b82f6] mb-3">
                  <Users className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#3b82f6]">Total Prospects</span>
                </div>
                <div className="text-3xl font-black text-[#3b82f6] tracking-tight">167</div>
              </div>

              <div className="bg-[#111827] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#6b7280]">Verified</span>
                </div>
                <div className="text-2xl font-black text-[#f9fafb] tracking-tight">61%</div>
              </div>

              <div className="bg-[#111827] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                  <Activity className="w-4 h-4 text-[#6366f1]" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#6b7280]">Avg Score</span>
                </div>
                <div className="text-2xl font-black text-[#3b82f6] tracking-tight">8.1</div>
              </div>

              <div className="bg-[#22c55e]/10 rounded-2xl p-4 border border-[#22c55e]/20">
                <div className="flex items-center gap-2 text-[#22c55e] mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#22c55e]">Trend</span>
                </div>
                <div className="text-2xl font-black text-[#22c55e] tracking-tight">+8%</div>
              </div>

              <div className="bg-[#111827] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#6b7280]">Top Position</span>
                </div>
                <div className="text-2xl font-black text-[#f9fafb] tracking-tight">PG</div>
              </div>

              <div className="bg-[#111827] rounded-2xl p-4 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-[#6b7280] mb-3">
                  <CalendarDays className="w-4 h-4 text-[#6366f1]" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#6b7280]">Events</span>
                </div>
                <div className="text-2xl font-black text-[#f9fafb] tracking-tight">11</div>
              </div>
            </div>

            <div className="space-y-3 mt-auto mb-2">
              <button className="w-full bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-[0_4px_15px_rgba(99,102,241,0.2)] flex items-center justify-center gap-2.5 hover:scale-105 active:scale-[0.96] transition-all">
                <Eye size={16} className="text-white/80" /> View Prospects
              </button>
              <button className="w-full bg-white/[0.04] border border-white/[0.06] text-[#d1d5db] font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors">
                <Bookmark size={15} className="text-[#6b7280]" /> Add Region to Watch
              </button>
              <button className="w-full bg-white/[0.04] border border-white/[0.06] text-[#d1d5db] font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors">
                <CalendarDays size={15} className="text-[#6b7280]" /> View Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Events View
  return (
    <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-white/[0.06] shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Events & Map</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Discover tournaments and scouting opportunities</p>
        </div>
        <button 
          onClick={() => setShowMap(true)}
          className="bg-white/[0.04] border border-white/[0.06] text-[#f9fafb] font-bold py-2.5 px-6 rounded-xl text-sm flex items-center gap-2 hover:bg-white/[0.08] transition-all hover:-translate-y-0.5"
        >
          <MapIcon className="w-4 h-4 text-[#3b82f6]" /> View Full Map
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {opportunitiesNearYou.map((opp, i) => (
          <div key={i} className="bg-[#111827] rounded-3xl border border-white/[0.06] overflow-hidden flex flex-col hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 group cursor-pointer">
            <div className="relative h-48 bg-[#1f2937]">
              <img src={opp.img} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/70 to-transparent" />
              <div className="absolute top-4 right-4 bg-[#3b82f6] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">{opp.type}</div>
              <h4 className="absolute bottom-4 left-5 right-5 font-black text-white text-xl leading-tight drop-shadow-md">{opp.title}</h4>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="space-y-3 mb-6 font-bold text-sm">
                <div className="flex items-center text-[#d1d5db] gap-3"><Calendar size={16} className="text-[#6b7280]" /> {opp.date}</div>
                <div className="flex items-center text-[#d1d5db] gap-3"><MapPin size={16} className="text-[#6b7280]" /> {opp.location}</div>
                <div className="flex items-center text-[#d1d5db] gap-3"><Tag size={16} className="text-[#6b7280]" /> {opp.tags}</div>
              </div>
              <p className="text-sm text-[#9ca3af] font-medium leading-relaxed mb-8 flex-grow">{opp.desc}</p>
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white font-bold py-3 rounded-xl hover:from-[#4f46e5] hover:to-[#2563eb] transition-all text-sm shadow-sm hover:scale-105 active:scale-[0.96]">Register</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
