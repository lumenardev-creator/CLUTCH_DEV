export const opportunitiesNearYou = [
  { title: "Elite Basketball Camp - Summer 2026", type: "Camp", date: "July 15-20, 2026", location: "Los Angeles, CA", tags: "Elite \u2022 $450", desc: "High-level training camp with D1 coaches", img: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "National Showcase Tournament", type: "Tournament", date: "August 5-7, 2026", location: "Las Vegas, NV", tags: "National \u2022 $350", desc: "Compete against top prospects from across the nation", img: "https://images.unsplash.com/photo-1518481612222-68bbe828def1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "College Prep Showcase", type: "Showcase", date: "June 12, 2026", location: "Chicago, IL", tags: "All Levels \u2022 $200", desc: "Showcase your skills in front of 40+ college coaches", img: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
];

export const comparisonRows = [
  { feature: "Profile Creation", basic: "check-green", verified: "check-green", pro: "check-green" },
  { feature: "Post Reels", basic: "Limited", verified: "check-green", pro: "check-green" },
  { feature: "Verified Badge", basic: "-", verified: "check-green", pro: "check-green" },
  { feature: "Verified Stats", basic: "-", verified: "check-green", pro: "check-green" },
  { feature: "ClutchScore", basic: "-", verified: "check-green", pro: "check-green" },
  { feature: "Filmroom", basic: "-", verified: "Base", pro: "Advanced" },
  { feature: "Storage", basic: "1 GB", verified: "10 GB", pro: "50 GB" },
  { feature: "Performance Lab", basic: "-", verified: "-", pro: "check-purple", highlightPro: true },
  { feature: "Priority Support", basic: "-", verified: "-", pro: "check-green" }
];

export const faqs = [
  { q: "Can I cancel anytime?", a: "Yes! You can upgrade, downgrade, or cancel your plan at any time. No long-term commitments." },
  { q: "What's the difference between Verified and Pro?", a: "Verified gives you the credibility boost with verified stats and ClutchScore. Pro adds advanced tools like Filmroom+ and Performance Lab to help you train and improve faster." },
  { q: "Is my data secure and NCAA-compliant?", a: "Absolutely. All plans include NCAA-compliant data handling and secure storage. Your privacy is our priority." }
];

export const mockConversations = [
  {
    id: 'conv1',
    participantId: 'c1',
    participantName: 'Coach Mike Thompson',
    participantType: 'coach',
    participantPhoto: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400',
    lastMessage: 'I\'d love to see more of your highlight footage.',
    lastMessageTime: new Date(Date.now() - 3600000),
    unread: 1,
    verified: true
  },
  {
    id: 'conv2',
    participantId: 'c2',
    participantName: 'Coach Sarah Williams',
    participantType: 'coach',
    participantPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    lastMessage: 'Are you available for a campus visit?',
    lastMessageTime: new Date(Date.now() - 86400000),
    unread: 0,
    verified: true
  },
  {
    id: 'conv3',
    participantId: '2',
    participantName: 'Jaylen Williams',
    participantType: 'athlete',
    participantPhoto: 'https://images.unsplash.com/photo-1762025930827-9f1dda45aff8?w=400',
    lastMessage: 'That game was crazy! Good luck with recruiting.',
    lastMessageTime: new Date(Date.now() - 172800000),
    unread: 0
  }
];

export const mockMessages = [
  {
    id: 'm1',
    conversationId: 'conv1',
    senderId: 'c1',
    senderName: 'Coach Mike Thompson',
    senderType: 'coach',
    content: 'Hi Marcus, I saw your performance at the showcase. Very impressive!',
    timestamp: new Date(Date.now() - 7200000),
    read: true
  },
  {
    id: 'm2',
    conversationId: 'conv1',
    senderId: 'current',
    senderName: 'You',
    senderType: 'athlete',
    content: 'Thank you coach! I appreciate you reaching out.',
    timestamp: new Date(Date.now() - 5400000),
    read: true
  },
  {
    id: 'm3',
    conversationId: 'conv1',
    senderId: 'c1',
    senderName: 'Coach Mike Thompson',
    senderType: 'coach',
    content: 'I\'d love to see more of your highlight footage.',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  }
];

export const mockNotifications = [
  {
    id: 'n1',
    type: 'profile_view',
    title: 'Coach Mike Thompson viewed your profile',
    description: 'UCLA Assistant Coach',
    timestamp: new Date(Date.now() - 1800000),
    read: false
  },
  {
    id: 'n2',
    type: 'message',
    title: 'New message from Coach Sarah Williams',
    description: 'Are you available for a campus visit?',
    timestamp: new Date(Date.now() - 86400000),
    read: false
  },
  {
    id: 'n3',
    type: 'event',
    title: 'Elite Basketball Camp - Summer 2026',
    description: 'New opportunity near you in Los Angeles',
    timestamp: new Date(Date.now() - 172800000),
    read: true
  },
  {
    id: 'n4',
    type: 'milestone',
    title: '100 Profile Views!',
    description: 'Your profile is getting noticed by coaches',
    timestamp: new Date(Date.now() - 259200000),
    read: true
  }
];
