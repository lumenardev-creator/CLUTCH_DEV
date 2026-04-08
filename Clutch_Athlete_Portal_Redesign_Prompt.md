# Clutch — Athlete Portal: Complete Redesign Prompt

> **Purpose**: This document contains *every* section, mock dataset, state variable, tier-gating rule, and UI specification from the current Clutch Athlete Portal. Hand this entire file to Stitch AI (or any design/code tool) so it can reproduce and redesign everything with full fidelity.

---

## 1. Platform Overview

**Clutch** is a basketball recruiting platform that connects high-school athletes with college coaches. The **Athlete Portal** is the primary logged-in dashboard experience, accessible at route `/demo`.

### Tech Stack (Current)
- **Framework**: React 18 + Vite
- **Routing**: react-router-dom v6
- **Styling**: TailwindCSS (full utility classes)
- **Charts**: Recharts (LineChart)
- **Icons**: Lucide React (all icons from `lucide-react`)
- **State**: React Context API (`UserProvider` / `useUser`)
- **UI Primitives**: shadcn/ui components (accordion, dialog, card, sidebar, tabs, etc.)

### Global Design Tokens (CSS Variables)
```
--page-base: #080810          (dark background for landing)
--deep-navy: #0d1525
--royal-blue: #2563eb
--electric-blue: #3b82f6
--cyan-highlight: #06b6d4
--ball-orange: #f97316
--bright-white: #f8fafc
--slate-secondary: #94a3b8
--glass-surface: rgba(255,255,255,0.05)
--glass-border: rgba(255,255,255,0.08)
--glow-blue: rgba(37,99,235,0.4)
--glow-orange: rgba(249,115,22,0.35)
```

> **Important**: The Athlete Portal itself uses a **light theme** (`bg-[#f8f9fa]` body, `bg-white` cards, `text-gray-900` text) — the dark tokens above are for the landing page only.

---

## 2. Application Shell & Layout

The portal is a **f                    │
│                   │                                   │
│ ─── Nav Items ─── │                                   │
│ Home              │                                   │
│ Reels             │                                   │
│ ClutchScore       │                                   │
│ Filmroom ▼        │                                   │
│   ├─ Filmroom Base│                                   │
│   └─ Filmroom+    │                                   │
│ Performance Lab   │                                   │
│ MyPlayer          │                                   │
│ Messages          │                                   │
│ Notifications     │                                   │
│                   │                                   │
│ [Upgrade Card]    │                                   │
│ ─── Bottom ───    │                                   │
│ Profile           │                                   │
│ Pricing           │                                   │
│ Settings          │                                   │
└──────────────────────────────────────────────────────┘
```

### Sidebar Specifications
- **Width**: `w-64` (256px), `bg-white`, `border-r border-gray-200`
- **Logo area**: Clutch logo image (`/logo/CLUTCH DARK BG.png`, 56px height) + "Clutch" text (`text-xl font-bold`). Entire area clickable → navigates to `/`.
- **Portal label**: `"Athlete Portal"` in `text-xs text-gray-500 font-medium tracking-wide`
- **Plan badge**: Dynamic pill showing the user's plan (`Basic`, `Verified`, or `Pro`) in `bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded-full`
- **Create Reel button**: Full-width gradient button `from-[#4F46E5] to-[#A855F7]`, white text, rounded-xl, centered Plus icon + "Create Reel" text

### Nav Items
Each `NavItem` component renders:
- Icon (18px Lucide icon) + label text
- Active state: `bg-gray-100` background, `font-semibold text-gray-900`
- Inactive state: `hover:bg-gray-50`, `font-medium text-gray-600`
- Optional badge: `"Locked"` (gray pill) or `"Pro"` (white pill with border)
- Optional dropdown chevron

**Filmroom dropdown**: When expanded, shows two sub-items:
1. "Filmroom Base" — with `Verified` badge (blue)
2. "Filmroom+" — with `Pro` badge (purple)

### Upgrade Card (Basic plan only)
Shown at bottom of sidebar before the Profile/Settings section:
- `bg-blue-50 rounded-2xl p-4 border border-blue-100`
- Title: "Upgrade to Verified" (`text-sm font-bold`)
- Subtitle: "Get verified stats, ClutchScore, and more" (`text-xs text-gray-600`)
- CTA button: "View Plans" (`bg-blue-600 text-white rounded-lg`)

### Bottom Navigation
Separated by `border-t border-gray-100`:
- Profile → `CircleUser` icon
- Pricing → `CreditCard` icon (navigates to `/pricing`)
- Settings → `Settings` icon

---

## 3. State Management

### User Context (`useUser`)
```javascript
const [userPlan, setUserPlan] = useState('Basic');
// Possible values: 'Basic', 'Verified', 'Pro'
```

### Portal Tab State
```javascript
const [portalTab, setPortalTab] = useState("home");
// Possible values: "home", "reels", "clutchscore", "filmroom-base", "filmroom-pro",
//                  "performancelab", "myplayer", "messages", "notifications",
//                  "profile", "settings"

const [myPlayerTab, setMyPlayerTab] = useState("players");
// Possible values: "players", "coaches", "map", "opportunities"

const [currentAthleteIdx, setCurrentAthleteIdx] = useState(0);
// Index into featuredAthletes array for the carousel

const [isFilmroomOpen, setIsFilmroomOpen] = useState(false);
// Controls Filmroom dropdown expansion in sidebar
```

### Tier-Gating Rules
| Feature | Basic | Verified | Pro |
|---|---|---|---|
| Home (Discover) | ✅ | ✅ | ✅ |
| Reels | ✅ | ✅ | ✅ |
| ClutchScore | 🔒 Locked paywall | ✅ Full | ✅ Full |
| Filmroom Base | 🔒 Locked paywall | ✅ Full | ✅ Full |
| Filmroom+ | 🔒 Locked paywall | 🔒 Locked paywall | ✅ Full |
| Performance Lab | 🔒 Locked paywall | 🔒 Locked paywall | ✅ Full |
| MyPlayer Hub | ✅ | ✅ | ✅ |
| Messages | ✅ | ✅ | ✅ |
| Notifications | ✅ | ✅ | ✅ |
| Profile | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | ✅ |

**Locked state UI pattern**: Centered card with Lock icon (gray), blurred/obscured content preview, title, description, and a CTA button to upgrade.

---

## 4. Complete Mock Data

### 4.1 Featured Athletes (carousel)
```javascript
const featuredAthletes = [
  {
    name: "Marcus Johnson",
    info: 'PG • 6\'2" • Class of 2026',
    location: "Los Angeles, CA",
    ppg: "22.5", rpg: "4.2", apg: "8.1",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?...w=800&q=80",
    verified: true,
    desc: "An elite floor general with exceptional court vision and ability to score at all three levels. Proven leader on and off the court with a high basketball IQ."
  },
  {
    name: "David Chen",
    info: 'SG • 6\'5" • Class of 2025',
    location: "Seattle, WA",
    ppg: "24.1", rpg: "5.5", apg: "3.2",
    img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?...w=800&q=80",
    verified: true,
    desc: "Knockdown shooter with deep range. Excellent off-ball movement and plays tough perimeter defense. Shooting 42% from distance this season."
  },
  {
    name: "Jamal Reynolds",
    info: 'SF • 6\'8" • Class of 2026',
    location: "Chicago, IL",
    ppg: "18.5", rpg: "9.2", apg: "4.1",
    img: "https://images.unsplash.com/photo-1518481612222-68bbe828def1?...w=800&q=80",
    verified: true,
    desc: "Versatile wing defender who can guard positions 1-4. Explosive in transition with a rapidly developing face-up game. High-motor player."
  }
];
```

### 4.2 Athletes Near You (grid cards)
Includes all 3 featured athletes above PLUS:
```javascript
{ name: "Jaylen Williams", info: 'SG • 6\'4" • Class of 2025', location: "Atlanta, GA", ppg: "25.8", rpg: "5.5", apg: "3.2", verified: true },
{ name: "Tyler Robinson", info: 'SF • 6\'7" • Class of 2026', location: "Houston, TX", ppg: "18.3", rpg: "7.8", apg: "2.5", verified: false },
{ name: "DeAndre Carter", info: 'PF • 6\'9" • Class of 2025', location: "Chicago, IL", ppg: "20.1", rpg: "11.2", apg: "1.8", verified: true },
{ name: "Elijah Moore", info: 'SG • 6\'3" • Class of 2026', location: "Dallas, TX", ppg: "19.5", rpg: "3.2", apg: "5.1", verified: true },
{ name: "Cameron Davis", info: 'SF • 6\'6" • Class of 2025', location: "Miami, FL", ppg: "16.8", rpg: "8.5", apg: "2.2", verified: false },
{ name: "Jordan Smith", info: 'PG • 6\'0" • Class of 2026', location: "New York, NY", ppg: "14.3", rpg: "2.8", apg: "9.5", verified: true },
{ name: "Isaiah Thomas", info: 'PF • 6\'8" • Class of 2027', location: "Phoenix, AZ", ppg: "12.1", rpg: "10.2", apg: "1.0", verified: false }
```
Each athlete card has: image, name, info, location (with MapPin icon), verified badge (blue checkmark), and PPG/RPG/APG stats.

### 4.3 Coaches List
```javascript
const coachesList = [
  { name: "Coach Mike Thompson", role: "Assistant Coach", school: "UCLA", img: "unsplash-face" },
  { name: "Coach Sarah Williams", role: "Recruiting Coordinator", school: "Duke University", img: "unsplash-face" },
  { name: "Coach James Rodriguez", role: "Head Coach", school: "University of Arizona", img: "unsplash-face" }
];
```
Coach cards show: circular avatar, name + verified checkmark, role, school (in blue), Message + View Profile buttons.

### 4.4 Opportunities
```javascript
const opportunitiesNearYou = [
  {
    title: "Elite Basketball Camp - Summer 2026",
    type: "Camp", date: "July 15-20, 2026",
    location: "Los Angeles, CA", tags: "Elite • $450",
    desc: "High-level training camp with D1 coaches",
    img: "unsplash-basketball-court"
  },
  {
    title: "National Showcase Tournament",
    type: "Tournament", date: "August 5-7, 2026",
    location: "Las Vegas, NV", tags: "National • $350",
    desc: "Compete against top prospects from across the nation",
    img: "unsplash-basketball"
  },
  {
    title: "College Prep Showcase",
    type: "Showcase", date: "June 12, 2026",
    location: "Chicago, IL", tags: "All Levels • $200",
    desc: "Showcase your skills in front of 40+ college coaches",
    img: "unsplash-basketball"
  }
];
```
Each opportunity card has: image with type badge overlay, title, date (Calendar icon), location (MapPin icon), tags (Tag icon), description, Apply + Save buttons.

### 4.5 Conversations (Messages)
```javascript
const mockConversations = [
  { id: 'conv1', participantName: 'Coach Mike Thompson', participantType: 'coach', lastMessage: "I'd love to see more of your highlight footage.", unread: 1, verified: true },
  { id: 'conv2', participantName: 'Coach Sarah Williams', participantType: 'coach', lastMessage: 'Are you available for a campus visit?', unread: 0, verified: true },
  { id: 'c3', participantName: 'Coach John Davis', participantType: 'coach', lastMessage: 'Impressive stats this season. Keep it up!', unread: 0, verified: true },
  { id: 'conv3', participantName: 'Jaylen Williams', participantType: 'athlete', lastMessage: 'That game was crazy! Good luck with recruiting.', unread: 0 },
  { id: 'conv4', participantName: 'DeAndre Carter', participantType: 'athlete', lastMessage: "Thanks coach, looking forward to the visit.", unread: 1, verified: true },
  { id: 'conv5', participantName: 'Marcus Johnson', participantType: 'athlete', lastMessage: 'Are there any scholarships still available?', unread: 0, verified: true },
  { id: 'conv6', participantName: 'Tyler Robinson', participantType: 'athlete', lastMessage: 'I submitted my highlights reel yesterday.', unread: 0 }
];
// In athlete portal: only coach conversations are shown
// In coach portal: only athlete conversations are shown
```

### 4.6 Messages
```javascript
const mockMessages = [
  // Conversation conv1 (Coach Mike Thompson):
  { senderId: 'c1', content: "Hi Marcus, I saw your performance at the showcase. Very impressive!" },
  { senderId: 'current', content: "Thank you coach! I appreciate you reaching out." },
  { senderId: 'c1', content: "I'd love to see more of your highlight footage." },

  // Conversation conv4 (DeAndre Carter):
  { senderId: 'current', content: "Hey DeAndre, great game last night. Let's schedule a visit." },
  { senderId: '3', content: "Thanks coach, looking forward to the visit." },

  // Conversation conv5 (Marcus Johnson):
  { senderId: '4', content: "Hi coach, I was wondering about the program requirements." },
  { senderId: 'current', content: "I'll send you the details shortly." },
  { senderId: '4', content: "Are there any scholarships still available?" }
];
```

### 4.7 Notifications
```javascript
const mockNotifications = [
  { id: 'n1', type: 'profile_view', title: 'Coach Mike Thompson viewed your profile', description: 'UCLA Assistant Coach', read: false },
  { id: 'n2', type: 'message', title: 'New message from Coach Sarah Williams', description: 'Are you available for a campus visit?', read: false },
  { id: 'n3', type: 'event', title: 'Elite Basketball Camp - Summer 2026', description: 'New opportunity near you in Los Angeles', read: true },
  { id: 'n4', type: 'milestone', title: '100 Profile Views!', description: 'Your profile is getting noticed by coaches', read: true }
];
// Notification icons by type:
//   profile_view → Eye (blue)
//   message → MessageSquare (green)
//   event → Calendar (purple)
//   milestone → Trophy (yellow)
```

### 4.8 ClutchScore Chart Data
```javascript
const scoreDataAllTime = [
  { name: 'Dec 29', uv: 11.8 }, { name: 'Jan 1', uv: 11.9 }, { name: 'Jan 4', uv: 11.7 },
  { name: 'Jan 7', uv: 11.6 }, { name: 'Jan 10', uv: 11.8 }, { name: 'Jan 13', uv: 11.7 },
  { name: 'Jan 16', uv: 11.6 }, { name: 'Jan 19', uv: 12.3 }, { name: 'Jan 22', uv: 11.5 },
  { name: 'Jan 25', uv: 11.8 }, { name: 'Jan 28', uv: 11.7 }, { name: 'Jan 31', uv: 11.9 },
  { name: 'Feb 3', uv: 12.2 }, { name: 'Feb 6', uv: 11.6 }, { name: 'Feb 9', uv: 12.2 },
  { name: 'Feb 15', uv: 11.6 }, { name: 'Feb 21', uv: 12.0 }, { name: 'Feb 27', uv: 12.4 },
  { name: 'Mar 2', uv: 12.4 }, { name: 'Mar 5', uv: 12.3 }, { name: 'Mar 8', uv: 12.0 },
  { name: 'Mar 14', uv: 12.4 }, { name: 'Mar 20', uv: 12.2 }, { name: 'Mar 26', uv: 12.4 }
];

const last10Games = [12.0, 11.8, 12.4, 12.1, 11.9, 12.6, 12.2, 12.7, 12.3, 12.5];
```

### 4.9 Reels Video Data
```javascript
const REELS_DATA = [
  {
    id: 1,
    videoSrc: '/videos/Basketball_Dunk_Video_Generation.mp4',
    authorName: 'Marcus Johnson', authorHandle: '@mjhoops23',
    description: 'Putting in that offseason work 😤🏀 #grind #hoops',
    likes: '12.4K', comments: '402', shares: '1.2K',
    audioTrack: 'Original Audio - mjhoops23'
  },
  {
    id: 2,
    videoSrc: 'https://videos.pexels.com/video-files/4933938/4933938-uhd_2160_4096_25fps.mp4',
    authorName: 'Elijah Wright', authorHandle: '@ej_wright5',
    description: 'Game winner from last night! Ice in the veins 🥶',
    likes: '45.1K', comments: '1,204', shares: '8.4K',
    audioTrack: 'Game Time - Stadium Sounds'
  },
  {
    id: 3,
    videoSrc: 'https://videos.pexels.com/video-files/8476839/8476839-uhd_2160_4096_25fps.mp4',
    authorName: 'Trey Smith', authorHandle: '@treyday_10',
    description: 'Light work 🥱 Back to the lab tomorrow.',
    likes: '8.9K', comments: '156', shares: '342',
    audioTrack: 'Original Audio - treyday_10'
  }
];
```

### 4.10 Filmroom Projects (inline mock)
```javascript
const recentProjects = [
  { title: "Championship Game Highlights", type: "Highlight Reel", date: "2 days ago", clips: 8 },
  { title: "Season Best Plays", type: "Skills Compilation", date: "1 week ago", clips: 15 },
  { title: "Defense Compilation", type: "Game Breakdown", date: "2 weeks ago", clips: 6 }
];
```

---

## 5. Section-by-Section UI Specification

---

### 5.1 HOME TAB (`portalTab === "home"`)

**Header area**:
- Title: "Discover" (`text-3xl font-black tracking-tight`)
- Subtitle: "Find athletes, opportunities, and showcase your talent" (`text-gray-500 text-sm`)
- Plan badge pill in top-right

**Unlock ClutchScore CTA** (Basic plan only):
- Gradient banner: `from-[#6366F1] to-[#A855F7]`, `rounded-3xl p-6`
- Lock icon in white/20 circle, title "Unlock Your ClutchScore", subtitle, "Learn More" white button

**Featured Athletes Carousel**:
- Large card with image on left (45% width, 450px height) and details on right (55%)
- Left/Right navigation arrows (white circles with chevrons)
- Shows: Verified badge, name, info, PPG/RPG/APG stats, description, "View Profile" + "Watch Highlights" buttons
- Dot pagination below (blue active, gray inactive)

**Enter Swipe Mode CTA**:
- Same gradient banner style as the ClutchScore CTA
- Video icon, "Enter Swipe Mode" title, "Discover players through their highlight reels" subtitle
- TrendingUp icon on right

**Athletes Near You Section**:
- Title + "View All" link
- 4-column grid of athlete cards (shows first 4 athletes)
- Each card: image (176px height), verified badge, name, info, location with MapPin, PPG/RPG/APG stats

**Opportunities Near You Section**:
- Title + "View All" link
- 3-column grid of opportunity cards
- Each card: image (192px height) with type badge, title, date/location/tags with icons, description, Apply + Save buttons

---

### 5.2 REELS TAB (`portalTab === "reels"`)

**Layout**:
- Header: "Reels" title + "Create Reel" blue button
- Phone-sized container centered: `max-w-[420px]`, `h-[calc(100vh-240px)]`, black background, `rounded-[2.5rem]`, `border-4 border-gray-900`
- Vertical snap-scrolling through reel cards

**Each ReelCard**:
- Full-screen video (looping, autoplay when active, muted by default)
- **Play overlay**: 80x80 circle with Play icon when paused
- **Right action bar** (bottom-right, vertical): Like (ThumbsUp), Comment (MessageSquare), Share (Share2), More (MoreVertical) — each 46x46 circle with count below
- **Bottom overlay**: Author avatar (with blue border), handle + Follow button, description text, audio track pill
- **Top header**: "Reels" title + mute/unmute toggle
- **Progress bar**: 4px bar at very bottom showing video progress
- **Modal system**: Sliding up drawer for Comments (text input), Share (4-icon grid: Direct/Coach/X/Copy), More (Not Interested / Report)

**Interaction Logic**:
- Like toggles fill and adjusts count
- Videos auto-play when they become the active slide
- Videos reset to start when scrolled away

---

### 5.3 CLUTCHSCORE TAB (`portalTab === "clutchscore"`)

**Locked State (Basic plan)**:
- Centered card showing Lock icon, "ClutchScore" title, blurred "12.4" score preview (`blur-md opacity-30`), "Unlock ClutchScore to access..." text, "Upgrade to Verified" blue button

**Unlocked State (Verified/Pro)**:
- **Badge**: "Verified Feature" pill (blue)

- **Main Score Card**: Giant "12.4" in `text-[100px] text-blue-600`, "ClutchScore" label, percentile rankings (Top 18% Nationally, Top 9% In State, Top 22% Among PGs), "+0.4 last 90 days" green trend pill

- **Score Trend Graph**: Recharts LineChart with time filter tabs (30 Days, 90 Days, 1 Year, All Time). Blue line (#2563eb), 2.5px stroke, no dots, gray grid. 400px container height.

- **Score Breakdown** (left column):
  - Performance Production: 40% weight, score 4.8, blue bar
  - Efficiency Metrics: 25% weight, score 3.2, purple bar
  - Competition Strength: 20% weight, score 2.9, indigo bar
  - Consistency Index: 15% weight, score 1.5, dark blue bar

- **Competition Strength** (right column):
  - 1.18x Competition Multiplier headline
  - Tier list: National Elite (1.35x), Regional Premium (1.18x), State Tier (1.08x), Standard Competition (1.00x)

- **How ClutchScore Works**:
  - Info icon + title
  - "ClutchScore is not capped at 100" — no maximum, top performers define upper range
  - "Performance-Based Only" — no social metrics
  - Score ranges: Average varsity (6–8), Strong regional (9–11), National prospect (12–15+)
  - Disclaimer about objectivity and transparency

- **Consistency Rating**:
  - "High" green badge
  - "Low variance across your recent games" green alert
  - Stats grid: Average 12.3, High 12.7, Low 11.9
  - Variance: 0.8
  - Last 10 games bar chart (blue bars, dashed average line at 12.3)

---

### 5.4 FILMROOM BASE (`portalTab === "filmroom-base"`)

**Locked State (Basic plan)**:
- Lock icon, "Unlock Filmroom" title, description about AI-assisted clipping, "View Plans" blue button

**Unlocked State (Verified/Pro)**:
- **Badge**: "Verified" blue pill
- **Upload area**: Dashed border card, Upload icon in blue circle, "Upload Game Film" title, "Supports MP4 and MOV files up to 500MB", "Upload Video" button. Actual file input (hidden) triggers on click, accepts `video/mp4,video/x-m4v,video/*`
- **Recent Projects**: 3-column grid showing project cards with Film icon placeholder, title, type label, date + clip count, "Edit Project" button
- **Toast notification**: Dark rounded-xl pill with green CheckCircle2 + success message, slides in from top

---

### 5.5 FILMROOM+ (`portalTab === "filmroom-pro"`)

**Locked State (non-Pro plans)**:
- Lock icon, "Unlock Filmroom+" title, description about timeline editing and overlays, "Upgrade to Pro" purple button

**Unlocked State (Pro only)**:
- **Badge**: "Pro" purple pill
- **Welcome card**: Purple border-top accent, Sparkles icon in purple circle, "Welcome to Filmroom+" title, description, "Start Creating" full-width black button
- **Feature cards** (3-column grid):
  1. **Pro Templates**: LayoutTemplate icon, "Coach Quick Eval, Top Plays, Skills Breakdown" description
  2. **Advanced Editing**: Wand2 icon, "Multi-clip timeline, transitions, speed control" description
  3. **Coach Share**: Share2 icon, "One-click packages with stats, measurables, and private share links" description

---

### 5.6 PERFORMANCE LAB (`portalTab === "performancelab"`)

**Locked State (non-Pro plans)**:
- Lock icon, "Unlock Performance Lab" title, description about biometrics and predictive analysis, "Upgrade to Pro" purple button

**Unlocked State (Pro only)**:
- **Badge**: "Pro" purple pill
- **Welcome card**: BrainCircuit icon in purple circle, "Welcome to Performance Lab" title, description about AI-powered insights, "Run Your First Analysis" full-width black button
- **Feature cards** (3-column grid):
  1. **Timestamped Clips**: Clock icon, "Jump to key moments instantly"
  2. **Shot Charts**: Target icon, "Visual breakdown by zone"
  3. **Coach Reports**: FileText icon, "Shareable recruiting summaries"
- **Toast notification**: Same pattern as Filmroom

---

### 5.7 MYPLAYER HUB (`portalTab === "myplayer"`)

**Header**: "MyPlayer Hub" title, "Search, connect, and discover opportunities" subtitle

**Tab bar** (pill-style, inline-flex):
- Players (Users icon) | Coaches (Briefcase icon) | Map (MapPin icon) | Opportunities (Briefcase icon)
- Active tab: white background + shadow
- All tabs use horizontal sliding animation (`translateX` based on tab index)

**Players Sub-tab**:
- Search bar + filter dropdowns (All Positions, All Years, All Locations)
- "8 players found" count
- 4-column grid showing ALL 8+ athletes from `athletesNearYou`
- Cards include stat bar with PPG/RPG/APG in `bg-gray-50 rounded-xl` container

**Coaches Sub-tab**:
- 3-column grid of coach cards
- Each: avatar + name with verified checkmark, role, school (blue text), Message + View Profile buttons

**Map Sub-tab**: Placeholder (exists conceptually but not fully implemented)

**Opportunities Sub-tab**: Placeholder (exists conceptually but not fully implemented)

---

### 5.8 MESSAGES (`portalTab === "messages"`)

**Layout**: Full-height two-panel layout (sidebar list + chat area)

**Conversation List** (left panel, 320-380px):
- "Messages" title
- Search input with Search icon
- Conversation list items: avatar (with verified badge overlay), participant name, last message preview (bold if unread), timestamp, unread count badge (blue circle)
- In athlete portal: only shows conversations where `participantType === 'coach'`

**Chat Area** (right panel):
- **Header**: Participant avatar, name + verified badge, type label (uppercase)
- **Message feed**: Own messages (dark background, right-aligned, rounded-tr-sm), their messages (white background, left-aligned, rounded-tl-sm with avatar)
- **Input area**: Paperclip attachment button, textarea with Send button (blue when text present), compliance notice "All communications are monitored for compliance"
- **Empty state**: User icon in gray circle, "Select a conversation" prompt

**Send logic**: Enter key sends (no shift), message appends to conversation, updates last message preview and timestamp

---

### 5.9 NOTIFICATIONS (`portalTab === "notifications"`)

**Header**: "Notifications" title, "Mark all read" button (when unread exist)

**Filter tabs** (pill-style): All | Unread (with count badge) | Read

**Notification cards**:
- Icon circle colored by type (blue/green/purple/yellow)
- Title, description, timestamp, unread indicator (blue dot)
- Click marks as read
- Unread cards have `border-blue-200 bg-blue-50/30`

**Empty state**: CheckCheck icon, "You're all caught up!", "No new notifications in this category right now."

---

### 5.10 PROFILE (`portalTab === "profile"`)

**Banner**: Full-width basketball arena cover image (260-300px height), `rounded-3xl`

**Avatar**: 130x130 circular image, positioned overlapping the banner bottom-left, white 5px border, verified badge overlay (bottom-right)

**Verified pill**: Centered at banner bottom edge, "Verified" blue pill with white border

**ClutchScore widget** (floating, right side): White card with shadow, shows score "12.4", "+0.4 (90d)" green trend, percentile rankings

**Action buttons**: "Edit Profile" (dark) + "Share Profile" (white with border)

**Season Stats Grid** (4 columns):
- Points Per Game: 22.5 with TrendingUp icon
- (Additional stat cards for RPG, APG, etc. exist in the same pattern)

---

### 5.11 SETTINGS (`portalTab === "settings"`)

**Layout**: Two-column (sidebar tabs + content area)

**Setting tabs** (left, 256px):
- Account (User icon)
- Privacy (Lock icon)
- Notifications (Bell icon)
- Subscription (CreditCard icon)
- Log Out (red, separated by border)

**Account tab**:
- Full Name input (pre-filled: "Marcus Johnson")
- Email Address input (pre-filled)
- Change Password → "Update Password" button
- "Save Changes" dark button

**Privacy tab**:
- Profile Visibility dropdown (Public / Verified Coaches Only / Private)
- Show Location toggle (with MapPin icon, description)
- Show Stats toggle (with BarChart icon, description)
- NCAA compliance notice (blue info card with Lock icon)
- "Save Privacy Settings" button

Toggle switch: Custom 48x24 rounded-full toggle, blue when on, gray when off, with sliding white circle

**Notifications tab**:
- Email Notifications toggle
- Push Notifications toggle
- "Save Notification Settings" button

**Subscription tab**:
- CreditCard icon in gray circle
- "Basic Plan" title
- Description about upgrading
- "Upgrade to Verified" gradient button

---

## 6. Shared Design Patterns

### Card Styles
- Standard: `bg-white rounded-2xl shadow-sm border border-gray-100`
- Large: `bg-white rounded-[2rem] shadow-sm border border-gray-100`
- Extra large: `bg-white rounded-[1.5rem] shadow-sm border border-gray-100`

### Button Styles
- Primary: `bg-gray-900 text-white font-bold rounded-xl shadow-md hover:bg-gray-800`
- Secondary: `bg-white text-gray-900 border border-gray-200 font-bold rounded-xl shadow-sm hover:bg-gray-50`
- CTA Blue: `bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700`
- CTA Purple: `bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700`
- Gradient: `bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-white font-bold rounded-xl shadow-md`

### Badge Styles
- Verified: `bg-blue-50 text-blue-600 text-[10px] font-black tracking-wider px-2.5 py-1 rounded border border-blue-100`
- Pro: `bg-white border border-gray-200 text-purple-600 text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm`
- Locked: `bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-medium`

### Typography
- Page title: `text-3xl font-black text-gray-900 tracking-tight`
- Section title: `text-xl font-bold text-gray-900 tracking-tight`
- Subtitle: `text-gray-500 text-sm font-medium`
- Card title: `font-bold text-gray-900`
- Stat number: `text-2xl font-black text-gray-900`
- Stat label: `text-[11px] text-gray-400 font-bold uppercase tracking-widest`

### Animation
- Page transitions: `animate-in fade-in duration-300`
- Card hover: `hover:-translate-y-1 transition-all duration-300`
- Toast notification: `animate-in slide-in-from-top-4 fade-in duration-300`

### Spacing
- Page padding: `p-8 md:p-12`
- Content max-width: `max-w-5xl mx-auto`
- Section gap: `mt-12 mb-8`
- Card grid gap: `gap-5` to `gap-6`

---

## 7. Redesign Instructions for Stitch AI

You now have every section, every mock dataset, every state variable, every tier-gating rule, and every design specification from the Clutch Athlete Portal. 

**When redesigning, ensure you:**

1. **Reproduce all 10+ views** (Home, Reels, ClutchScore, Filmroom Base, Filmroom+, Performance Lab, MyPlayer Hub, Messages, Notifications, Profile, Settings)
2. **Maintain all mock data exactly** — athlete names, stats, coach info, conversations, notifications, score chart data, reels data
3. **Preserve the tier-gating logic** — Basic/Verified/Pro with locked states and upgrade CTAs
4. **Keep the sidebar navigation architecture** — including the Filmroom dropdown, upgrade card, and bottom navigation
5. **Maintain all interaction patterns** — carousel navigation, video reels snap-scrolling, message send/receive, notification mark-as-read, settings toggles
6. **Use the same icon set** (Lucide React) or map to equivalent icons in your design tool
7. **Use Recharts** (or equivalent) for the ClutchScore trend line chart and consistency bar chart
8. **Apply modern, premium design aesthetics** while keeping the functional architecture identical
ull-screen, fixed layout** with a left sidebar + right content area. No Navbar or Footer from the public site appears.

```
┌──────────────────────────────────────────────────────┐
│ [SIDEBAR: 256px]  │  [MAIN CONTENT: flex-1]          │
│                   │                                   │
│ Logo + "Clutch"   │  Content area scrolls vertically  │
│ "Athlete Portal"  │  Max-width: 1024px, centered      │
│ [Plan Badge]      │  Padding: 32px (desktop) /        │
│                   │           48px (larger)            │
│ [Create Reel btn] │               