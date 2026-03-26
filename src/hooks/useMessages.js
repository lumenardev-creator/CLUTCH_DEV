import { useState, useEffect } from 'react';
import { mockConversations, mockMessages } from '../data/shared';

export const useMessages = (portal = 'athlete') => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    // In a real app we would filter by portal context and current user ID
    // Filtering mock data for currently logged in user based on portal
    const filteredConvos = mockConversations.filter(c => 
      portal === 'athlete' ? c.participantType === 'coach' : c.participantType === 'athlete'
    );
    setConversations(filteredConvos);
    
    const grouped = {};
    mockMessages.forEach(msg => {
      if (!grouped[msg.conversationId]) grouped[msg.conversationId] = [];
      grouped[msg.conversationId].push(msg);
    });
    setMessages(grouped);
  }, [portal]);

  const sendMessage = (conversationId, content) => {
    const newMessage = {
      id: `m_${Date.now()}`,
      conversationId,
      senderId: 'current',
      senderName: 'You',
      senderType: portal,
      content,
      timestamp: new Date(),
      read: true
    };
    
    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMessage]
    }));

    // Update conversation last message preview
    setConversations(prev => 
      prev.map(c => c.id === conversationId ? {
        ...c,
        lastMessage: content,
        lastMessageTime: new Date()
      } : c)
    );
  };

  return {
    conversations,
    messages: activeConversation ? messages[activeConversation] || [] : [],
    activeConversation,
    setActiveConversation,
    sendMessage
  };
};
