import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { NavItem } from '../../components/common/NavItem';
import { LogoIcon } from '../../components/common/Icons';
import { 
  House, Search, Target, Users, LayoutDashboard, 
  TrendingUp, Map as MapIcon, MessageSquare, Bell, 
  Settings, CreditCard, LogOut, SwitchCamera, ListChecks
} from 'lucide-react';

// Import Views
import { DashboardView } from './components/DashboardView';
import { ScoutSwipeView } from './components/ScoutSwipeView';
import { CoachSearchView } from './components/CoachSearchView';
import { RecruitingBoardView } from './components/RecruitingBoardView';
import { IntelligenceView } from './components/IntelligenceView';
import { EventsMapView } from './components/EventsMapView';

// Import Shared Components
import { Messages } from '../../components/shared/Messages';
import { Notifications } from '../../components/shared/Notifications';
import { Settings as SettingsView } from '../../components/shared/Settings';

export const CoachPortal = () => {
  const navigate = useNavigate();
  const { userPlan } = useUser();
  const [portalTab, setPortalTab] = useState("dashboard");
  
  const handleHomeClick = () => navigate('/');
  const handlePricingClick = () => navigate('/pricing', { state: { from: '/coach' } });

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full bg-[#f8f9fa] text-gray-900 font-sans overflow-hidden animate-in fade-in duration-300">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto shrink-0 z-10 relative">
        <div className="p-6 flex items-center justify-between cursor-pointer group" onClick={handleHomeClick} title="Return to Home">
          <div className="flex items-center cursor-pointer group shrink-0">
            <LogoIcon className="h-9 w-auto group-hover:scale-110 transition-transform -mr-2 brightness-0" />
            <span className="text-xl font-bold tracking-wide text-gray-900">Clutch</span>
          </div>
        </div>
        
        <div className="px-6 flex items-center justify-between mb-6">
          <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-100 uppercase font-black tracking-widest px-2 py-1 rounded-md">Coach/Scout</span>
          <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{userPlan}</span>
        </div>
        
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-black">CT</div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight block">Coach Thompson</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Head Coach</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 px-4 space-y-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 pb-2 pt-2">Core</div>
          <NavItem onClick={() => setPortalTab("dashboard")} icon={<LayoutDashboard size={18} />} label="Dashboard" active={portalTab === "dashboard"} />
          <NavItem onClick={() => setPortalTab("scout")} icon={<SwitchCamera size={18} />} label="Scout Swipe" active={portalTab === "scout"} />
          <NavItem onClick={() => setPortalTab("search")} icon={<Search size={18} />} label="Player Search" active={portalTab === "search"} />
          
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 pb-2 pt-6">Recruiting</div>
          <NavItem onClick={() => setPortalTab("board")} icon={<ListChecks size={18} />} label="Recruiting Board" active={portalTab === "board"} />
          <NavItem onClick={() => setPortalTab("intelligence")} icon={<TrendingUp size={18} />} label="Intelligence" badge={userPlan !== "Pro" ? "Pro" : null} active={portalTab === "intelligence"} />
          <NavItem onClick={() => setPortalTab("events")} icon={<MapIcon size={18} />} label="Events & Map" active={portalTab === "events"} />
          
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 pb-2 pt-6">Communication</div>
          <NavItem onClick={() => setPortalTab("messages")} icon={<MessageSquare size={18} />} label="Messages" active={portalTab === "messages"} />
          <NavItem onClick={() => setPortalTab("notifications")} icon={<Bell size={18} />} label="Notifications" active={portalTab === "notifications"} />
        </div>
        
        <div className="px-4 pb-6 pt-4 border-t border-gray-100 space-y-1 mt-auto">
          <NavItem onClick={handlePricingClick} icon={<CreditCard size={18} />} label="Billing" />
          <NavItem onClick={() => setPortalTab("settings")} icon={<Settings size={18} />} label="Settings" active={portalTab === "settings"} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-[#fafafa]">
        <div className="p-8 md:p-12 max-w-6xl mx-auto w-full h-full">
          
          {portalTab === "dashboard" && <DashboardView />}
          {portalTab === "scout" && <ScoutSwipeView />}
          {portalTab === "search" && <CoachSearchView />}
          {portalTab === "board" && <RecruitingBoardView />}
          {portalTab === "intelligence" && <IntelligenceView userPlan={userPlan} />}
          {portalTab === "events" && <EventsMapView />}
          
          {portalTab === "messages" && <Messages portal="coach" />}
          {portalTab === "notifications" && <Notifications portal="coach" />}
          {portalTab === "settings" && <SettingsView portal="coach" />}

        </div>
      </div>
    </div>
  );
};
