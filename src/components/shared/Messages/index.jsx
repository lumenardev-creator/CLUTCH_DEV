import React, { useState } from 'react';
import { useMessages } from '../../../hooks/useMessages';
import { Search, Send, User, CheckCircle2, Paperclip } from 'lucide-react';

const formatRecentTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return date.toLocaleDateString();
};

export const Messages = ({ portal }) => {
  const { conversations, messages, activeConversation, setActiveConversation, sendMessage } = useMessages(portal);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConvDetails = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;
    sendMessage(activeConversation, messageInput);
    setMessageInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="animate-fade-up flex bg-[#111827] rounded-3xl border border-white/[0.06] overflow-hidden h-[calc(100vh-160px)] min-h-[600px] shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
      {/* Sidebar ListView */}
      <div className="w-[320px] md:w-[380px] border-r border-white/[0.06] flex flex-col shrink-0 bg-[#111827]/80">
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-2xl font-black text-[#f9fafb] mb-5 tracking-tight">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-[#f9fafb] font-medium placeholder:text-[#6b7280] placeholder:font-normal focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all block"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredConversations.length === 0 ? (
            <div className="text-center text-[#6b7280] text-sm py-10 font-medium">No conversations found</div>
          ) : (
            filteredConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 ${activeConversation === conv.id ? 'bg-white/[0.06] border border-white/[0.1] shadow-[0_4px_20px_rgba(0,0,0,0.2)]' : 'hover:bg-white/[0.03] border border-transparent'}`}
              >
                <div className="relative shrink-0">
                  <img src={conv.participantPhoto} alt={conv.participantName} className="w-12 h-12 rounded-full object-cover border border-white/[0.1]" />
                  {conv.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#0ea5e9] rounded-full border-2 border-[#111827] flex items-center justify-center p-0.5 shadow-[0_0_8px_rgba(14,165,233,0.4)]">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-[#f9fafb] text-sm truncate pr-2">{conv.participantName}</span>
                    <span className="text-[10px] text-[#6b7280] font-bold tracking-wide shrink-0">{formatRecentTime(conv.lastMessageTime)}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread > 0 ? 'text-[#f9fafb] font-bold' : 'text-[#6b7280] font-medium'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[#0ea5e9] text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(14,165,233,0.4)]">{conv.unread}</div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0b1220] overflow-hidden relative">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="px-8 py-5 border-b border-white/[0.06] flex items-center gap-4 bg-[#111827]/60 backdrop-blur-sm z-10">
              <img src={activeConvDetails?.participantPhoto} alt={activeConvDetails?.participantName} className="w-12 h-12 rounded-full object-cover border border-white/[0.1] shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-[#f9fafb] text-lg tracking-tight">{activeConvDetails?.participantName}</h3>
                  {activeConvDetails?.verified && <CheckCircle2 className="w-4 h-4 text-[#0ea5e9]" />}
                </div>
                <span className="text-xs text-[#6b7280] font-bold uppercase tracking-wider">{activeConvDetails?.participantType}</span>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col space-y-6">
              {messages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-[#6b7280] text-sm font-medium">
                  Start the conversation
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isOwn = msg.senderId === 'current';
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                        {!isOwn && (
                          <img src={activeConvDetails?.participantPhoto} className="w-8 h-8 rounded-full border border-white/[0.1] shadow-sm shrink-0 object-cover" alt="Sender" />
                        )}
                        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                          <div className={`px-5 py-3.5 rounded-2xl text-[15px] font-medium leading-relaxed ${isOwn ? 'bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white rounded-tr-sm shadow-[0_4px_20px_rgba(14,165,233,0.25)]' : 'bg-[#111827] text-[#d1d5db] border border-white/[0.06] rounded-tl-sm shadow-[0_4px_12px_rgba(0,0,0,0.2)]'}`}>
                            {msg.content}
                          </div>
                          <span className="text-[10px] text-[#6b7280] font-bold mt-2 px-1">{formatRecentTime(msg.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-6 bg-[#111827]/60 backdrop-blur-sm border-t border-white/[0.06]">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <button className="p-3 text-[#6b7280] hover:text-[#9ca3af] hover:bg-white/[0.04] rounded-xl transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-2xl pl-5 pr-14 py-3.5 text-sm text-[#f9fafb] font-medium focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all resize-none block scrollbar-hide placeholder:text-[#6b7280]"
                    placeholder="Type a message..."
                    rows={1}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ minHeight: '52px', maxHeight: '120px' }}
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${messageInput.trim() ? 'bg-[#0ea5e9] text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:bg-[#0284c7]' : 'bg-transparent text-[#4b5563]'}`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-[#4b5563] font-bold tracking-wide mt-4 uppercase">
                All communications are monitored for compliance
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-[#6b7280]">
            <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-6 border border-white/[0.06]">
              <User className="w-8 h-8 text-[#4b5563]" />
            </div>
            <p className="text-lg font-bold text-[#9ca3af] tracking-tight">Select a conversation</p>
            <p className="text-sm font-medium text-[#6b7280] mt-2">Choose someone from the list to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
