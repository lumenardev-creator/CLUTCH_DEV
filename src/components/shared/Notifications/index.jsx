import React, { useState } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { Eye, MessageSquare, Calendar, Trophy, CheckCheck, Bell } from 'lucide-react';

const formatRecentTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
};

const getIcon = (type) => {
  switch (type) {
    case 'profile_view': return <Eye className="w-5 h-5 text-[#0ea5e9]" />;
    case 'message': return <MessageSquare className="w-5 h-5 text-[#22c55e]" />;
    case 'event': return <Calendar className="w-5 h-5 text-[#818cf8]" />;
    case 'milestone': return <Trophy className="w-5 h-5 text-[#f59e0b]" />;
    default: return <Bell className="w-5 h-5 text-[#9ca3af]" />;
  }
};

const getBackgroundColor = (type) => {
  switch (type) {
    case 'profile_view': return 'bg-[#0ea5e9]/10 border-[#0ea5e9]/20';
    case 'message': return 'bg-[#22c55e]/10 border-[#22c55e]/20';
    case 'event': return 'bg-[#6366f1]/10 border-[#6366f1]/20';
    case 'milestone': return 'bg-[#f59e0b]/10 border-[#f59e0b]/20';
    default: return 'bg-white/[0.04] border-white/[0.06]';
  }
};

export const Notifications = ({ portal }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications(portal);
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'read') return n.read;
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="animate-fade-up flex items-end justify-between mb-8 pb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Notifications</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Stay updated on your {portal} activity</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm font-bold text-[#9ca3af] hover:text-[#f9fafb] bg-white/[0.04] border border-white/[0.06] px-4 py-2 rounded-xl hover:bg-white/[0.06] hover:border-white/[0.1] transition-all active:scale-[0.97]"
          >
            <CheckCheck className="w-4 h-4 text-[#0ea5e9]" />
            Mark all read
          </button>
        )}
      </div>

      <div className="animate-fade-up animate-fade-up-delay-1 inline-flex bg-white/[0.04] p-1.5 rounded-full mb-8 w-max border border-white/[0.06]">
        {[
          { id: 'all', label: 'All', count: notifications.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'read', label: 'Read', count: notifications.length - unreadCount }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${activeTab === tab.id ? 'bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] shadow-[0_0_15px_rgba(14,165,233,0.1)]' : 'text-[#9ca3af] hover:text-[#f9fafb] border border-transparent'}`}
          >
            {tab.label}
            {tab.count > 0 && tab.id === 'unread' && (
              <span className="bg-[#0ea5e9] text-white text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.3)]">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="animate-fade-up animate-fade-up-delay-2 space-y-4 pb-12">
        {filteredNotifications.length === 0 ? (
          <div className="bg-[#111827] rounded-[2rem] p-16 border border-white/[0.06] flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
              <CheckCheck className="w-8 h-8 text-[#4b5563]" />
            </div>
            <h3 className="text-xl font-black text-[#f9fafb] mb-2">You're all caught up!</h3>
            <p className="text-[#6b7280] font-medium text-sm">No new notifications in this category right now.</p>
          </div>
        ) : (
          filteredNotifications.map((notification, idx) => (
            <button
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`w-full text-left bg-[#111827] rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] flex gap-5 group ${!notification.read ? 'border-[#0ea5e9]/20 bg-[#0ea5e9]/[0.03] shadow-[0_0_20px_rgba(14,165,233,0.05)]' : 'border-white/[0.06] hover:border-white/[0.1]'}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${getBackgroundColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1.5 gap-4">
                  <h3 className="font-bold text-[#f9fafb] text-base">{notification.title}</h3>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-[#6b7280] font-bold tracking-wide">{formatRecentTime(notification.timestamp)}</span>
                    {!notification.read && <div className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9] shadow-[0_0_8px_rgba(14,165,233,0.5)]" />}
                  </div>
                </div>
                <p className="text-[#6b7280] text-sm font-medium line-clamp-2">{notification.description}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
