import React, { useState } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { Eye, MessageSquare, Calendar, Trophy, CheckCheck, MapPin } from 'lucide-react';

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
    case 'profile_view': return <Eye className="w-5 h-5 text-blue-600" />;
    case 'message': return <MessageSquare className="w-5 h-5 text-green-600" />;
    case 'event': return <Calendar className="w-5 h-5 text-purple-600" />;
    case 'milestone': return <Trophy className="w-5 h-5 text-yellow-600" />;
    default: return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const getBackgroundColor = (type) => {
  switch (type) {
    case 'profile_view': return 'bg-blue-50 border-blue-100';
    case 'message': return 'bg-green-50 border-green-100';
    case 'event': return 'bg-purple-50 border-purple-100';
    case 'milestone': return 'bg-yellow-50 border-yellow-100';
    default: return 'bg-gray-50 border-gray-100';
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
    <div className="flex flex-col h-full animate-in fade-in duration-300 w-full max-w-4xl mx-auto">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Notifications</h1>
          <p className="text-gray-500 text-sm font-medium">Stay updated on your {portal} activity</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <CheckCheck className="w-4 h-4 text-blue-500" />
            Mark all read
          </button>
        )}
      </div>

      <div className="inline-flex bg-gray-100/80 p-1.5 rounded-full mb-8 w-max">
        {[
          { id: 'all', label: 'All', count: notifications.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'read', label: 'Read', count: notifications.length - unreadCount }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all duration-200 ${activeTab === tab.id ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
            {tab.count > 0 && tab.id === 'unread' && (
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-12">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-200">
              <CheckCheck className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">You're all caught up!</h3>
            <p className="text-gray-500 font-medium text-sm">No new notifications in this category right now.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`w-full text-left bg-white rounded-2xl p-6 border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex gap-5 ${!notification.read ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${getBackgroundColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1.5 gap-4">
                  <h3 className="font-bold text-gray-900 text-base">{notification.title}</h3>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 font-bold tracking-wide">{formatRecentTime(notification.timestamp)}</span>
                    {!notification.read && <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />}
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium line-clamp-2">{notification.description}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
