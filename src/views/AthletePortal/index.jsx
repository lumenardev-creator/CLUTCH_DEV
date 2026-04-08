import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useCountUp } from '../../hooks/useCountUp';
import { NavItem } from '../../components/common/NavItem';
import { LogoIcon, GradCapIcon, RulerIcon, WeightIcon } from '../../components/common/Icons';
import { featuredAthletes, athletesNearYou, scoreChartData } from '../../data/athlete';
import { coachesList } from '../../data/coach';
import { opportunitiesNearYou } from '../../data/shared';
import {
  Plus, House, Video, ChartNoAxesColumn, Film, Activity, Users, MessageSquare, Bell,
  CircleUser, CreditCard, Settings, Search, ChevronDown, ChevronLeft, ChevronRight,
  TrendingUp, MapPin, Calendar, Tag, Lock, Info, Play, CircleCheck, ArrowUpRight, Briefcase, Target, Star
} from 'lucide-react';
import { Messages } from '../../components/shared/Messages';
import { Notifications } from '../../components/shared/Notifications';
import { Settings as SettingsView } from '../../components/shared/Settings';
import { ReelsView } from './components/ReelsView';
import { FilmroomView } from './components/FilmroomView';
import { PerformanceLabView } from './components/PerformanceLabView';
import { ClutchScoreView } from './components/ClutchScoreView';

export const AthletePortal = () => {
  const navigate = useNavigate();
  const [portalTab, setPortalTab] = useState("home");
  const [myPlayerTab, setMyPlayerTab] = useState("players");
  const { userPlan } = useUser();
  const [currentAthleteIdx, setCurrentAthleteIdx] = useState(0);
  const [isFilmroomOpen, setIsFilmroomOpen] = useState(false);
  const clutchScoreValue = useCountUp(12.4, 1200);

  const handleHomeClick = () => navigate('/');
  const handlePricingClick = () => navigate('/pricing', { state: { from: '/demo' } });
  const handleNextAthlete = () => setCurrentAthleteIdx((prev) => (prev + 1) % featuredAthletes.length);
  const handlePrevAthlete = () => setCurrentAthleteIdx((prev) => (prev - 1 + featuredAthletes.length) % featuredAthletes.length);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full bg-[#0b1220] text-[#f9fafb] font-sans overflow-hidden">
      {/* Noise Texture Layer */}
      <div className="noise" />
      
      {/* Subtle background gradient (kept for portal-specific color) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0ea5e9]/[0.03] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#6366f1]/[0.03] rounded-full blur-[160px]" />
      </div>

      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#111827]/80 backdrop-blur-xl border-r border-white/[0.06] flex flex-col h-full overflow-y-auto shrink-0 z-10 relative">
        <div className="p-6 flex items-center justify-between cursor-pointer group" onClick={handleHomeClick} title="Return to Home">
          <div className="flex items-center cursor-pointer group shrink-0">
            <LogoIcon className="h-9 w-auto group-hover:scale-110 transition-transform -mr-2 brightness-0 invert" />
            <span className="text-xl font-bold tracking-wide text-[#f9fafb]">Clutch</span>
          </div>
        </div>

        <div className="px-6 flex items-center justify-between mb-6">
          <span className="text-xs text-[#9ca3af] font-medium tracking-wider uppercase">Athlete Portal</span>
          <span className="bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold">{userPlan}</span>
        </div>

        <div className="px-6 mb-6">
          <button className="w-full btn-glow-indigo text-white rounded-xl py-3 flex items-center justify-center gap-2 font-bold transition-all hover:scale-[1.02] active:scale-[0.97]">
            <Plus size={18} /> Create Reel
          </button>
        </div>

        <div className="flex-1 px-4 space-y-1">
          <NavItem onClick={() => setPortalTab("home")} icon={<House size={18} />} label="Home" active={portalTab === "home"} />
          <NavItem onClick={() => setPortalTab("reels")} icon={<Video size={18} />} label="Reels" active={portalTab === "reels"} />
          <NavItem onClick={() => setPortalTab("clutchscore")} icon={<ChartNoAxesColumn size={18} />} label="ClutchScore" badge={userPlan === "Basic" ? "Locked" : null} active={portalTab === "clutchscore"} />

          <div className="flex flex-col">
            <NavItem
              onClick={() => { setIsFilmroomOpen(!isFilmroomOpen); setPortalTab(portalTab.startsWith("filmroom") ? portalTab : "filmroom-base"); }}
              icon={<Film size={18} />}
              label="Filmroom"
              badge={userPlan === "Basic" ? "Locked" : null}
              hasDropdown
              active={portalTab.startsWith("filmroom")}
            />
            {isFilmroomOpen && (
              <div className="pl-11 pr-4 py-1 flex flex-col gap-1">
                <div onClick={() => setPortalTab("filmroom-base")} className={`text-sm py-2.5 px-3 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200 ${portalTab === "filmroom-base" || portalTab === "filmroom" ? "bg-white/[0.06] text-[#f9fafb] font-bold" : "text-[#9ca3af] hover:bg-white/[0.03] font-medium"}`}>
                  Filmroom Base
                  <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/20 text-[10px] px-2 py-0.5 rounded-full font-bold">Verified</span>
                </div>
                <div onClick={() => setPortalTab("filmroom-pro")} className={`text-sm py-2.5 px-3 rounded-lg cursor-pointer flex items-center justify-between transition-all duration-200 ${portalTab === "filmroom-pro" ? "bg-white/[0.06] text-[#f9fafb] font-bold" : "text-[#9ca3af] hover:bg-white/[0.03] font-medium"}`}>
                  Filmroom+
                  <span className="bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] text-[10px] px-2 py-0.5 rounded-full font-bold">Pro</span>
                </div>
              </div>
            )}
          </div>

          <NavItem onClick={() => setPortalTab("performancelab")} icon={<Activity size={18} />} label="Performance Lab" badge={userPlan !== "Pro" ? "Pro" : null} active={portalTab === "performancelab"} />
          <NavItem onClick={() => { setPortalTab("myplayer"); setMyPlayerTab("players"); }} icon={<Users size={18} />} label="MyPlayer" active={portalTab === "myplayer"} />
          <NavItem onClick={() => setPortalTab("messages")} icon={<MessageSquare size={18} />} label="Messages" active={portalTab === "messages"} />
          <NavItem onClick={() => setPortalTab("notifications")} icon={<Bell size={18} />} label="Notifications" active={portalTab === "notifications"} />
        </div>

        {userPlan === "Basic" && (
          <div className="px-6 py-4 mt-auto">
            <div className="premium-card-glow-blue rounded-2xl p-4">
              <h4 className="text-sm font-bold text-[#f9fafb] mb-1">Upgrade to Verified</h4>
              <p className="text-xs text-[#9ca3af] mb-4 leading-relaxed">Get verified stats, ClutchScore, and more</p>
              <button onClick={handlePricingClick} className="w-full btn-glow-blue text-white text-xs font-bold py-2.5 rounded-lg transition-all active:scale-[0.97]">View Plans</button>
            </div>
          </div>
        )}

        <div className={`px-4 pb-6 ${userPlan !== "Basic" ? "mt-auto" : ""} pt-4 border-t border-white/[0.06] space-y-1`}>
          <NavItem onClick={() => setPortalTab("profile")} icon={<CircleUser size={18} />} label="Profile" active={portalTab === "profile"} />
          <NavItem onClick={handlePricingClick} icon={<CreditCard size={18} />} label="Pricing" />
          <NavItem onClick={() => setPortalTab("settings")} icon={<Settings size={18} />} label="Settings" active={portalTab === "settings"} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto surface-low relative z-[1]">
        <div className="p-8 md:p-12 max-w-5xl mx-auto w-full h-full">

          {/* HOME TAB */}
          {portalTab === "home" && (
            <div>
              {/* 1. HERO (Command Center) */}
              <div className="animate-fade-up flex flex-col md:flex-row gap-6 mb-8 mt-2">
                <div className="flex-1 flex flex-col justify-center">
                  <h1 className="text-3xl md:text-4xl font-medium text-[#f9fafb] mb-2 tracking-tight">
                    Welcome back, <span className="font-bold">Marcus</span>
                  </h1>
                  <p className="text-[#22c55e] text-base font-medium flex items-center">
                    You're trending this week <TrendingUp size={18} className="ml-1.5" />
                  </p>
                </div>
                
                {/* Focus Card ClutchScore */}
                {userPlan === "Basic" ? (
                  <div className="surface-mid focus-card border border-white/[0.06] rounded-3xl w-full md:w-[320px] relative overflow-hidden backdrop-blur-xl shrink-0 animate-fade-up animate-fade-up-delay-2 float-idle py-16 flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/40 to-[#0b1220] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6366f1]/20 score-aura rounded-full blur-[60px] pointer-events-none animate-[glowPulse_4s_infinite]" />
                    
                    {/* Blurred placeholder number */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                      <span className="text-[110px] font-black text-white blur-[18px] opacity-20 tracking-tighter mix-blend-overlay">00.0</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-5 max-w-[220px] mx-auto">
                      <div className="w-14 h-14 bg-[#0b1220]/60 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        <Lock size={24} className="text-white/90 drop-shadow-lg text-[#6366f1]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2 leading-tight tracking-tight">ClutchScore Locked</h3>
                        <p className="text-sm text-[#9ca3af] font-medium leading-relaxed">Upgrade to Verified to unlock your live performance rating.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="surface-mid focus-card border border-white/[0.06] rounded-3xl p-6 w-full md:w-[320px] relative overflow-hidden backdrop-blur-xl shrink-0 animate-fade-up animate-fade-up-delay-2 float-idle">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#0b1220] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#6366f1]/30 score-aura rounded-full blur-[60px] pointer-events-none animate-[glowPulse_4s_infinite]" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-bold text-[#9ca3af] tracking-wide uppercase">ClutchScore</span>
                        <span className="bg-white/10 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-white/10 backdrop-blur-sm">PRO</span>
                      </div>
                      <div className="flex items-end gap-3 mb-2">
                        <div className="text-6xl font-black text-white glow-text animate-[score-glow_3s_infinite]">
                          {clutchScoreValue.toFixed(1)}
                        </div>
                        <div className="flex items-center text-[#22c55e] text-sm font-bold pb-2 bg-[#22c55e]/10 px-2 py-0.5 rounded-md border border-[#22c55e]/20">
                          <TrendingUp size={14} className="mr-1" /> +0.4
                        </div>
                      </div>
                      <div className="text-xs text-[#9ca3af] font-medium mb-4">Last 90 days</div>
                      
                      <div className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.06] backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <ChartNoAxesColumn size={16} className="text-[#0ea5e9]" />
                          <span className="text-[13px] font-bold text-[#f9fafb]">Top 18% Nationally</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. QUICK ACTIONS BAR */}
              <div className="flex items-center justify-center gap-4 md:gap-5 pb-4 mb-12 animate-fade-up animate-fade-up-delay-1">
                <button className="flex items-center gap-2.5 px-8 py-3.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] text-[#f9fafb] font-bold rounded-full hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-105 active:scale-[0.96] transition-all duration-75 w-max shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group">
                  <div className="bg-[#0ea5e9]/20 p-1.5 rounded-full group-hover:bg-[#0ea5e9]/40 transition-colors duration-150">
                    <Plus size={16} className="text-[#0ea5e9] group-hover:text-white" />
                  </div>
                  Create Reel
                </button>
                <button className="flex items-center gap-2.5 px-8 py-3.5 bg-white/[0.03] backdrop-blur-md border border-white/[0.06] text-[#f9fafb] font-bold rounded-full hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-105 active:scale-[0.96] transition-all duration-75 w-max shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] group">
                  <div className="bg-[#f59e0b]/20 p-1.5 rounded-full group-hover:bg-[#f59e0b]/40 transition-colors duration-150">
                    <Film size={16} className="text-[#f59e0b] group-hover:text-white" />
                  </div>
                  Upload Film
                </button>
              </div>

              {/* 3. CLUTCHSCORE CTA (if locked) */}
              {userPlan === "Basic" && (
                <div className="animate-fade-up animate-fade-up-delay-2 relative overflow-hidden rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between w-full mt-10 mb-12 shadow-[0_20px_60px_rgba(99,102,241,0.15)] hover:shadow-[0_20px_80px_rgba(99,102,241,0.25)] transition-shadow duration-500 group border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#0ea5e9] z-0" />
                  
                  {/* Glass inner overlay */}
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0" />

                  {/* Slow shimmer overlay */}
                  <div className="absolute inset-0 z-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0)_50%)] bg-[length:200%_100%] animate-[shimmer_8s_infinite_linear]" />
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 relative z-10 w-full mb-6 md:mb-0 text-center sm:text-left">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0">
                      <Lock size={24} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-2xl mb-1 tracking-tight drop-shadow-md">Unlock Your ClutchScore</h3>
                      <p className="text-white/90 text-[15px] font-medium drop-shadow-sm">Upgrade to see how your performance metrics rank nationally.</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-full md:w-auto shrink-0 flex items-center justify-center">
                    <button onClick={handlePricingClick} className="w-full md:w-[200px] bg-white/20 backdrop-blur-xl text-white font-bold px-8 py-4 rounded-xl text-sm hover:bg-white/30 transition-all border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:scale-[0.96]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              )}

              {/* 4. FEATURED ATHLETE */}
              <div className="py-16 animate-fade-up animate-fade-up-delay-3">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-[#f9fafb] tracking-tight flex items-center">
                    <Star size={24} className="text-[#f59e0b] mr-3" fill="currentColor" />
                    Featured Spotlight
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={handlePrevAthlete} className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"><ChevronLeft size={18} className="text-white" /></button>
                    <button onClick={handleNextAthlete} className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"><ChevronRight size={18} className="text-white" /></button>
                  </div>
                </div>
                
                <div className="surface-mid rounded-[2rem] overflow-hidden border border-white/[0.06] flex flex-col lg:flex-row group premium-card float-idle p-3 gap-3 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                  <div className="w-full lg:w-[60%] min-h-[350px] lg:min-h-[480px] relative overflow-hidden rounded-2xl">
                    <img 
                      src={featuredAthletes[currentAthleteIdx].img} 
                      alt={featuredAthletes[currentAthleteIdx].name} 
                      className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-[#040814]/95 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 animate-fade-up">
                      <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 shadow-lg">Class of '25</div>
                      {featuredAthletes[currentAthleteIdx].verified && (
                        <div className="bg-[#0ea5e9]/20 backdrop-blur-md text-[#0ea5e9] text-xs font-bold px-4 py-2 rounded-full border border-[#0ea5e9]/30 shadow-lg flex items-center gap-1">
                          VERIFIED
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 md:px-10 py-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#0ea5e9]/5 rounded-full blur-[70px] pointer-events-none" />
                    
                    <div className="relative z-10 w-full">
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-md animate-fade-up">{featuredAthletes[currentAthleteIdx].name}</h3>
                      <p className="text-[#9ca3af] font-medium mb-8 animate-fade-up animate-fade-up-delay-1 flex items-center gap-1.5 text-sm md:text-base">
                        <MapPin size={16} className="text-[#0ea5e9]" /> {featuredAthletes[currentAthleteIdx].info.split(' • ')[1]} • {featuredAthletes[currentAthleteIdx].info.split(' • ')[0]}
                      </p>
                      
                      <div className="flex gap-4 mb-8">
                        <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.04] backdrop-blur-md flex flex-col animate-fade-up animate-fade-up-delay-1 flex-1 text-center hover:bg-white/[0.04] transition-colors">
                          <div className="text-2xl lg:text-3xl font-black text-white glow-text mb-1">{featuredAthletes[currentAthleteIdx].ppg}</div>
                          <div className="text-[10px] text-[#9ca3af] font-bold uppercase tracking-widest">PPG</div>
                        </div>
                        <div className="bg-white/[0.02] rounded-2xl p-4 border border-white/[0.04] backdrop-blur-md flex flex-col animate-fade-up animate-fade-up-delay-2 flex-1 text-center hover:bg-white/[0.04] transition-colors">
                          <div className="text-2xl lg:text-3xl font-black text-[#0ea5e9] drop-shadow-[0_0_15px_rgba(14,165,233,0.3)] mb-1">92.8</div>
                          <div className="text-[10px] text-[#9ca3af] font-bold uppercase tracking-widest">ClutchScore</div>
                        </div>
                      </div>

                      <div className="mb-12 animate-fade-up animate-fade-up-delay-2">
                        <p className="text-[#9ca3af] text-sm leading-relaxed font-medium line-clamp-3">{featuredAthletes[currentAthleteIdx].desc}</p>
                      </div>
                      
                      <div className="mt-auto flex flex-col sm:flex-row gap-3 animate-fade-up animate-fade-up-delay-3 w-full">
                        <button onClick={() => setPortalTab("profile")} className="flex-1 bg-white hover:bg-gray-200 text-[#0f172a] font-black py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] flex items-center justify-center gap-2">
                          View Profile <ArrowUpRight size={16} />
                        </button>
                        <button className="flex-1 bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold py-3.5 px-6 rounded-xl transition-all border border-white/[0.1] flex items-center justify-center gap-2 active:scale-[0.98]">
                          <Play size={18} fill="currentColor" /> Highlights
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. ATHLETES NEAR YOU (DISCOVERY) */}
              <div className="mb-14 animate-fade-up animate-fade-up-delay-4">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#f9fafb] tracking-tight">Recommended for You</h2>
                  </div>
                  <button className="text-sm font-bold text-[#0ea5e9] hover:text-[#38bdf8] transition-colors flex items-center gap-1 hover:-translate-x-1">Explore Network <ChevronRight size={16}/></button>
                </div>
                
                {/* Horizontal Scroll wrapper */}
                <div className="flex gap-5 overflow-x-auto pb-8 pt-2 px-2 -mx-2 no-scrollbar snap-x snap-mandatory">
                  {athletesNearYou.map((ath, i) => (
                    <div key={i} className="premium-card shrink-0 w-[280px] overflow-hidden flex flex-col group snap-start relative">
                      {/* Subtle inner gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff03] to-transparent pointer-events-none" />
                      
                      <div className="relative h-48 bg-[#1f2937] overflow-hidden">
                        <img src={ath.img} alt={ath.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                        
                        {/* Tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {i === 0 && <span className="glass-card-strong text-[#fca5a5] text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border-white/10"><TrendingUp size={10}/> Trending</span>}
                          {i === 1 && <span className="glass-card-strong text-[#86efac] text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border-white/10"><MapPin size={10}/> Near You</span>}
                          {i > 1 && <span className="glass-card-strong text-[#d8b4fe] text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border-white/10"><Target size={10}/> Similar Style</span>}
                        </div>

                        {ath.verified && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-[#0ea5e9] rounded-full flex items-center justify-center border-[1.5px] border-[#111827] shadow-[0_0_10px_rgba(14,165,233,0.4)]">
                            <CircleCheck size={12} className="text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow relative z-10 bg-[#111827]/40">
                        <h4 className="font-bold text-[#f9fafb] mb-1 text-lg tracking-tight">{ath.name}</h4>
                        <p className="text-xs text-[#9ca3af] mb-4 font-medium">{ath.info}</p>
                        
                        <div className="mt-auto flex items-center gap-4 text-xs">
                          <div className="flex flex-col">
                            <span className="text-[#6b7280] uppercase text-[9px] font-black mb-0.5">PPG</span>
                            <span className="font-black text-[#f9fafb] text-[15px]">{ath.ppg}</span>
                          </div>
                          <div className="w-px h-6 bg-white/[0.08]" />
                          <div className="flex flex-col">
                            <span className="text-[#6b7280] uppercase text-[9px] font-black mb-0.5">RPG</span>
                            <span className="font-black text-[#f9fafb] text-[15px]">{ath.rpg}</span>
                          </div>
                          <div className="w-px h-6 bg-white/[0.08]" />
                          <div className="flex flex-col">
                            <span className="text-[#6b7280] uppercase text-[9px] font-black mb-0.5">APG</span>
                            <span className="font-black text-[#f9fafb] text-[15px]">{ath.apg}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. OPPORTUNITIES NEAR YOU */}
              <div className="mb-14 animate-fade-up animate-fade-up-delay-5">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-[#f9fafb] tracking-tight">Opportunities Near You</h2>
                  </div>
                  <button className="text-sm font-bold text-[#0ea5e9] hover:text-[#38bdf8] transition-colors flex items-center gap-1 hover:-translate-x-1">View All <ChevronRight size={16}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {opportunitiesNearYou.map((opp, i) => (
                    <div key={i} className="premium-card surface-mid rounded-[1.5rem] border border-white/[0.06] overflow-hidden flex flex-col group hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-white/[0.12] transition-all duration-500">
                      
                      <div className="relative h-[220px] bg-[#0b1220] overflow-hidden">
                        <img 
                          src={opp.img} 
                          alt={opp.title} 
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(11,18,32,1))] pointer-events-none" />
                        
                        {/* Glass style badges moved to top-right corner */}
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/20 shadow-lg uppercase tracking-wider z-10">
                          {opp.type || 'Camp'}
                        </div>
                      </div>
                      
                      <div className="px-6 pb-7 pt-2 flex flex-col flex-grow relative z-10 bg-[#0b1220] -mt-5">
                        <h4 className="font-black text-[#f9fafb] mb-5 text-xl leading-snug tracking-tight line-clamp-2">{opp.title}</h4>
                        
                        {/* Simplified Metadata */}
                        <div className="flex flex-col gap-3 mb-8 text-[13px] text-[#9ca3af] font-medium">
                          <div className="flex items-center gap-2 hover:text-white transition-colors w-max">
                            <Calendar size={15} className="text-[#0ea5e9]" /> {opp.date}
                          </div> 
                          <div className="flex items-center gap-2 hover:text-white transition-colors w-max">
                            <MapPin size={15} className="text-[#0ea5e9]" /> {opp.location}
                          </div>
                        </div>
                        
                        {/* Dominant Apply & Subtle Save */}
                        <div className="flex gap-3 mt-auto w-full">
                          <button className="flex-1 btn-glow-blue text-white font-bold py-3.5 rounded-xl text-sm transition-all active:scale-[0.96]">
                            Apply Now
                          </button>
                          <button className="w-[52px] shrink-0 bg-white/[0.04] hover:bg-white/[0.08] text-[#9ca3af] hover:text-white rounded-xl transition-all border border-white/[0.06] hover:border-white/[0.12] flex items-center justify-center active:scale-[0.96]" title="Save Opportunity">
                            <Tag size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MYPLAYER HUB TAB */}
          {portalTab === "myplayer" && (
            <div className="w-full h-full flex flex-col">
              <div className="mb-8 animate-fade-up">
                <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">MyPlayer Hub</h1>
                <p className="text-[#9ca3af] text-sm font-medium">Search, connect, and discover opportunities</p>
              </div>

              <div className="animate-fade-up animate-fade-up-delay-1 inline-flex bg-white/[0.04] p-1.5 rounded-full mb-8 w-max border border-white/[0.06]">
                {[
                  { id: "players", label: "Players", icon: <Users size={16} /> },
                  { id: "coaches", label: "Coaches", icon: <Briefcase size={16} /> },
                  { id: "map", label: "Map", icon: <MapPin size={16} /> },
                  { id: "opportunities", label: "Opportunities", icon: <Briefcase size={16} /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setMyPlayerTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${myPlayerTab === tab.id ? 'bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] shadow-[0_0_15px_rgba(14,165,233,0.1)]' : 'text-[#9ca3af] hover:text-[#f9fafb] border border-transparent'}`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="overflow-hidden w-full relative flex-grow min-h-[500px] animate-fade-up animate-fade-up-delay-2">
                <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${['players', 'coaches', 'map', 'opportunities'].indexOf(myPlayerTab) * 100}%)` }}>

                  {/* Players Sub-tab */}
                  <div className="w-full shrink-0">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-grow bg-[#111827] border border-white/[0.06] rounded-xl px-4 py-3.5 flex items-center gap-3 hover:border-white/[0.12] transition-colors">
                        <Search size={18} className="text-[#6b7280]" />
                        <input type="text" placeholder="Search players..." className="w-full outline-none text-sm text-[#f9fafb] font-medium placeholder:text-[#6b7280] bg-transparent" />
                      </div>
                      <div className="flex gap-4">
                        {['All Positions', 'All Years', 'All Locations'].map((f, i) => (
                          <button key={i} className="bg-[#111827] border border-white/[0.06] rounded-xl px-5 py-3.5 flex items-center justify-between gap-3 min-w-[140px] text-sm text-[#9ca3af] font-bold hover:bg-[#1f2937] hover:border-white/[0.1] transition-all">
                            {f} <ChevronDown size={16} className="text-[#6b7280]" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm font-medium text-[#6b7280] mb-6">8 players found</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
                      {athletesNearYou.map((ath, i) => (
                        <div key={i} className="bg-[#111827] rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col hover:border-[#0ea5e9]/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group">
                          <div className="relative h-48 bg-[#1f2937]">
                            <img src={ath.img} alt={ath.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/50 to-transparent" />
                            {ath.verified && (
                              <div className="absolute top-3 right-3 w-6 h-6 bg-[#0ea5e9] rounded-full flex items-center justify-center border-[1.5px] border-[#111827] shadow-[0_0_10px_rgba(14,165,233,0.4)]">
                                <CircleCheck size={12} className="text-white" strokeWidth={3} />
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-grow">
                            <h4 className="font-bold text-[#f9fafb] mb-1 text-lg">{ath.name}</h4>
                            <p className="text-sm text-[#9ca3af] mb-4 font-medium">{ath.info}</p>
                            <div className="flex items-center text-xs text-[#6b7280] mb-6 font-medium gap-1.5">
                              <MapPin size={14} className="text-[#4b5563]" /> {ath.location}
                            </div>
                            <div className="mt-auto flex items-center gap-4 text-xs bg-white/[0.03] p-3 rounded-xl border border-white/[0.06]">
                              <div className="flex items-center text-[#0ea5e9]">
                                <TrendingUp size={14} className="mr-1" />
                                <span className="font-black text-[#f9fafb] text-sm">{ath.ppg}</span> <span className="text-[#6b7280] ml-1 uppercase text-[10px] font-bold">PPG</span>
                              </div>
                              <div>
                                <span className="font-black text-[#f9fafb] text-sm">{ath.rpg}</span> <span className="text-[#6b7280] ml-1 uppercase text-[10px] font-bold">RPG</span>
                              </div>
                              <div>
                                <span className="font-bold text-[#f9fafb] text-sm">{ath.apg}</span> <span className="text-[#6b7280] ml-1 uppercase text-[10px] font-bold">APG</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coaches Sub-tab */}
                  <div className="w-full shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {coachesList.map((coach, i) => (
                        <div key={i} className="bg-[#111827] rounded-2xl border border-white/[0.06] p-6 flex flex-col hover:border-white/[0.12] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300">
                          <div className="flex items-center gap-5 mb-6">
                            <img src={coach.img} alt={coach.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/[0.1]" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-black text-[#f9fafb] text-lg tracking-tight">{coach.name}</h4>
                                <CircleCheck size={16} className="text-[#0ea5e9]" />
                              </div>
                              <div className="text-sm text-[#9ca3af] font-medium">{coach.role}</div>
                              <div className="text-sm text-[#0ea5e9] font-bold mt-0.5">{coach.school}</div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-auto">
                            <button onClick={() => setPortalTab("messages")} className="flex-1 btn-glow-blue text-white font-bold py-2.5 rounded-xl transition-all text-sm active:scale-[0.97]">Message</button>
                            <button className="flex-1 bg-white/[0.06] text-[#f9fafb] border border-white/[0.1] font-bold py-2.5 rounded-xl hover:bg-white/[0.1] transition-all text-sm active:scale-[0.97]">View Profile</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {portalTab === "profile" && (
            <div className="flex flex-col w-full text-[#f9fafb]">
              <div className="animate-fade-up relative w-full h-[260px] md:h-[300px] rounded-3xl bg-[#1f2937] mb-20 border border-white/[0.06] shrink-0 profile-banner">
                <div className="attention-gradient" />
                <img src="https://images.unsplash.com/photo-1505666287802-931dc83948e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="Arena Banner" className="w-full h-full object-cover opacity-60 relative z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent z-[1]" />
                <div className="absolute -bottom-14 left-8 md:left-12 flex flex-col items-center z-10">
                  <div className="relative">
                    <img src={featuredAthletes[currentAthleteIdx].img} alt="Athlete Avatar" className="w-[130px] h-[130px] rounded-full border-[5px] border-[#0b1220] shadow-[0_0_30px_rgba(0,0,0,0.5)] object-cover bg-[#1f2937]" />
                    {featuredAthletes[currentAthleteIdx].verified && (
                      <div className="absolute bottom-1 right-1 bg-[#0ea5e9] w-7 h-7 rounded-full border-2 border-[#0b1220] flex items-center justify-center shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                        <CircleCheck size={14} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
                {featuredAthletes[currentAthleteIdx].verified && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#0ea5e9] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border-2 border-[#0b1220] shadow-[0_0_15px_rgba(14,165,233,0.4)] z-10">
                    Verified
                  </div>
                )}

                <div className="absolute -bottom-12 right-8 md:right-12 focus-card float-idle premium-card-glow-blue rounded-[1.25rem] p-5 w-[220px] text-center hidden sm:block bg-[#111827] z-20">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-3xl font-black text-[#0ea5e9]">12.4</span>
                    <div className="flex items-center text-[#22c55e] text-[11px] font-bold">
                      <TrendingUp size={12} className="mr-0.5" /> +0.4 <span className="text-[#6b7280] ml-1 font-medium text-[9px]">(90d)</span>
                    </div>
                  </div>
                  <div className="text-[11px] font-bold text-[#9ca3af] mb-4 tracking-wide">ClutchScore</div>
                  <div className="space-y-1 text-[10px] font-medium text-[#6b7280]">
                    <p>Top 18% Nationally</p>
                    <p>Top 9% In State</p>
                    <p>Top 22% By Position</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 px-8 md:px-12 mb-10 animate-fade-up animate-fade-up-delay-1">
                <button className="btn-glow-blue text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-[0.97]">Edit Profile</button>
                <button className="bg-white/[0.06] border border-white/[0.1] text-[#f9fafb] font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-white/[0.1] transition-all active:scale-[0.97]">Share Profile</button>
              </div>

              <div className="px-8 md:px-12 pb-16 space-y-8 w-full max-w-[1000px] animate-fade-up animate-fade-up-delay-2">
                <div>
                  <h3 className="text-xl font-bold text-[#f9fafb] mb-5 tracking-tight">Season Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#111827] border border-white/[0.06] rounded-2xl p-5 flex flex-col hover:border-[#0ea5e9]/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-[#9ca3af]">Points Per Game</span>
                        <TrendingUp size={14} className="text-[#4b5563]" />
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <span className="text-2xl font-black text-[#f9fafb]">22.5</span>
                        <TrendingUp size={16} className="text-[#22c55e]" />
                      </div>
                    </div>
                    <div className="bg-[#111827] border border-white/[0.06] rounded-2xl p-5 flex flex-col hover:border-[#0ea5e9]/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-[#9ca3af]">Rebounds Per Game</span>
                        <TrendingUp size={14} className="text-[#4b5563]" />
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <span className="text-2xl font-black text-[#f9fafb]">8.3</span>
                        <TrendingUp size={16} className="text-[#22c55e]" />
                      </div>
                    </div>
                    <div className="bg-[#111827] border border-white/[0.06] rounded-2xl p-5 flex flex-col hover:border-[#0ea5e9]/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-[#9ca3af]">Assists Per Game</span>
                        <TrendingUp size={14} className="text-[#4b5563]" />
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <span className="text-2xl font-black text-[#f9fafb]">5.7</span>
                        <TrendingUp size={16} className="text-[#22c55e]" />
                      </div>
                    </div>
                    <div className="bg-[#111827] border border-white/[0.06] rounded-2xl p-5 flex flex-col hover:border-[#f59e0b]/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium text-[#9ca3af]">ClutchScore</span>
                        <TrendingUp size={14} className="text-[#4b5563]" />
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <span className="text-2xl font-black text-[#0ea5e9]">12.4</span>
                        <TrendingUp size={16} className="text-[#22c55e]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLUTCHSCORE TAB */}
          {portalTab === "clutchscore" && <ClutchScoreView userPlan={userPlan} handlePricingClick={handlePricingClick} />}

          {/* NEW MODULES */}
          {portalTab === "reels" && <ReelsView />}
          {(portalTab === "filmroom" || portalTab === "filmroom-base") && <FilmroomView userPlan={userPlan} type="base" />}
          {portalTab === "filmroom-pro" && <FilmroomView userPlan={userPlan} type="pro" />}
          {portalTab === "performancelab" && <PerformanceLabView userPlan={userPlan} />}
          {portalTab === "messages" && <Messages portal="athlete" />}
          {portalTab === "notifications" && <Notifications portal="athlete" />}
          {portalTab === "settings" && <SettingsView portal="athlete" />}

        </div>
      </div>
    </div>
  );
};
