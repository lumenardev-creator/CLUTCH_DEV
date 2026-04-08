import React, { useRef, useState, useEffect } from 'react';
import { Plus, Play, ThumbsUp, MessageSquare, Share2, Volume2, VolumeX, MoreVertical, Bookmark, Activity, CircleCheck, Eye } from 'lucide-react';

const REELS_DATA = [
  {
    id: 1,
    videoSrc: '/videos/Basketball_Dunk_Video_Generation.mp4',
    authorName: 'Marcus Johnson',
    authorHandle: '@mjhoops23',
    authorAvatar: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Putting in that offseason work 😤🏀 #grind #hoops',
    likes: '12.4K',
    comments: '402',
    shares: '1.2K',
    audioTrack: 'Original Audio - mjhoops23',
    insight: 'Explosive Finishing +12%',
    scoutSignal: 'Viewed by 12 coaches this week',
    specs: 'PG • 6\'2"',
    verified: true
  },
  {
    id: 2,
    videoSrc: 'https://videos.pexels.com/video-files/4933938/4933938-uhd_2160_4096_25fps.mp4',
    authorName: 'Elijah Wright',
    authorHandle: '@ej_wright5',
    authorAvatar: 'https://images.unsplash.com/photo-1546456073-92b9f0a8d413?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Game winner from last night! Ice in the veins 🥶',
    likes: '45.1K',
    comments: '1,204',
    shares: '8.4K',
    audioTrack: 'Game Time - Stadium Sounds',
    insight: 'Clutch Scorer',
    scoutSignal: 'Top 5% engagement rank',
    specs: 'SG • 6\'4"',
    verified: true
  },
  {
    id: 3,
    videoSrc: 'https://videos.pexels.com/video-files/8476839/8476839-uhd_2160_4096_25fps.mp4',
    authorName: 'Trey Smith',
    authorHandle: '@treyday_10',
    authorAvatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=150&h=150&q=80',
    description: 'Light work 🥱 Back to the lab tomorrow.',
    likes: '8.9K',
    comments: '156',
    shares: '342',
    audioTrack: 'Original Audio - treyday_10',
    insight: 'Top 10% Transition',
    scoutSignal: '2 D1 Programs tracking',
    specs: 'SF • 6\'6"',
    verified: false
  }
];

const ReelCard = ({ data, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(null); 

  const [likeCount, setLikeCount] = useState(() => {
    const match = data.likes.match(/([\d.]+)([KM]?)/);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    return match[2] === 'K' ? num * 1000 : match[2] === 'M' ? num * 1000000 : num;
  });

  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(e => console.log('Autoplay prevented:', e));
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
      setShowModal(null); 
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className={`relative w-full max-w-[460px] aspect-[9/16] h-[82vh] transition-all duration-700 ease-out-expo flex items-center justify-center ${
      isActive ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-40 blur-[2px] pointer-events-none'
    }`}>
      
      {/* Central Video Container */}
      <div className={`relative w-full h-full rounded-[24px] bg-black overflow-hidden border border-white/[0.04] flex flex-col group/video ${isActive ? 'animate-[subtleFloat_4s_ease-in-out_infinite]' : ''}`}
           style={{ boxShadow: isActive ? '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.15)' : 'none' }}>
        
        <video
          ref={videoRef}
          src={data.videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          loop playsInline muted={isMuted}
          onClick={togglePlay} onTimeUpdate={handleTimeUpdate}
        />
        
        {/* Play Overlay */}
        {!isPlaying && !showModal && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity">
            <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
              <Play size={40} className="text-white ml-2 opacity-90" fill="white" />
            </div>
          </div>
        )}

        {/* Smart Overlay - Performance Insight Chip */}
        <div className={`absolute top-6 left-6 z-20 transition-all duration-700 transform ${isActive ? 'translate-x-0 opacity-100 delay-[1000ms]' : '-translate-x-4 opacity-0'}`}>
          <div className="relative group/chip">
            <div className="absolute inset-0 bg-white opacity-0 group-hover/chip:animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full" />
            <div className="bg-white/[0.06] backdrop-blur-[12px] border border-white/[0.08] rounded-full px-4 py-2 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_1px_2px_rgba(255,255,255,0.15)] relative overflow-hidden">
               {/* Shimmer line */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]" />
              <span className="text-white font-bold text-[11px] flex items-center gap-2 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 bg-[#0ea5e9] rounded-full shadow-[0_0_8px_rgba(14,165,233,0.8)] animate-pulse" />
                {data.insight}
              </span>
            </div>
          </div>
        </div>

        {/* Modals Overlay */}
        {showModal && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col justify-end transition-opacity">
            <div className="bg-[#111827] border-t border-white/[0.06] rounded-t-[32px] p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-full duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-[#f9fafb] text-lg">
                  {showModal === 'comments' && "Comments"}
                  {showModal === 'share' && "Share to"}
                  {showModal === 'more' && "More Actions"}
                </h3>
                <button onClick={() => setShowModal(null)} className="p-2 hover:bg-white/[0.06] rounded-full text-[#9ca3af] font-bold transition-colors">X</button>
              </div>
              
              {showModal === 'comments' && (
                <div className="space-y-4">
                  <p className="text-[#6b7280] text-sm font-medium text-center py-4">Be the first to comment!</p>
                  <input type="text" placeholder="Add a comment..." className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-[#f9fafb] font-medium placeholder:text-[#6b7280] focus:outline-none focus:border-[#0ea5e9]/30 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all" />
                </div>
              )}
              
              {showModal === 'share' && (
                <div className="grid grid-cols-4 gap-4 text-center">
                  {['Direct', 'Coach', 'X', 'Copy'].map(btn => (
                    <div key={btn} className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 bg-white/[0.04] rounded-full flex items-center justify-center hover:bg-white/[0.08] cursor-pointer transition-colors border border-white/[0.06]">
                        <Share2 size={20} className="text-[#9ca3af]" />
                      </div>
                      <span className="text-[10px] font-bold text-[#9ca3af]">{btn}</span>
                    </div>
                  ))}
                </div>
              )}

              {showModal === 'more' && (
                <div className="space-y-3">
                  <button className="w-full text-left px-5 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.04] hover:border-white/[0.1] rounded-2xl font-bold text-[#d1d5db] flex items-center justify-between transition-all group">
                    <span>Not Interested in this reel</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white/50">→</span>
                  </button>
                  <button className="w-full text-left px-5 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold border border-red-500/10 hover:border-red-500/30 flex items-center justify-between transition-all group">
                    <span>Report this video</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                </div>
              )}
              <div className="pb-safe" />
            </div>
          </div>
        )}

        {/* Bottom Overlay Info */}
        <div className={`absolute bottom-0 left-0 right-0 pt-24 pb-7 px-6 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-20 transition-all duration-500 delay-200 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="pr-2 flex flex-col gap-3.5">
            
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="relative">
                <img src={data.authorAvatar} alt={data.authorName} className="w-[46px] h-[46px] rounded-full border border-white/20 object-cover shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 transition-transform" />
                {data.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-[#0ea5e9] rounded-full border-2 border-black w-[18px] h-[18px] flex items-center justify-center">
                    <CircleCheck size={11} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-white font-black text-[16px] drop-shadow-md tracking-tight">{data.authorHandle}</span>
                  <button className="bg-white/[0.12] backdrop-blur-md border border-white/10 text-white text-[9px] uppercase font-bold px-3 py-1 rounded shadow-sm hover:bg-white hover:text-black transition-colors">Follow</button>
                </div>
                <span className="text-white/70 text-[12px] font-semibold tracking-wide mt-0.5">{data.authorName} • {data.specs}</span>
              </div>
            </div>
            
            {/* Scout Signal */}
            <div className="flex items-center gap-1.5 text-[#9ca3af] font-medium text-[11px] uppercase tracking-wide">
              <Eye size={12} className="text-[#0ea5e9]/70" />
              {data.scoutSignal}
            </div>

            <p className="text-white/95 text-[14px] font-medium leading-relaxed drop-shadow-lg">{data.description}</p>
            
            {/* Audio Bar Overlay */}
            <div className="flex items-center gap-2 pointer-events-auto w-max max-w-[220px] bg-white/[0.06] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.05] shadow-md mt-1 overflow-hidden opacity-90">
              <Activity size={14} className="text-white/80 shrink-0" />
              <div className="w-full overflow-hidden shrink whitespace-nowrap mask-edges-x">
                <span className="text-white text-[11px] font-bold inline-block animate-[marquee_6s_linear_infinite] opacity-80">{data.audioTrack} • {data.audioTrack} • </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Header Mute toggle */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="w-10"></div>
          <div className="flex items-center gap-3">
            <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors pointer-events-auto shadow-lg hover:scale-105 active:scale-95">
              {isMuted ? <VolumeX size={18} className="text-white/90" /> : <Volume2 size={18} className="text-white/90" />}
            </button>
            <button onClick={() => setShowModal('more')} className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-black/50 transition-colors pointer-events-auto shadow-lg hover:scale-105 active:scale-95">
              <MoreVertical size={18} className="text-white/90" />
            </button>
          </div>
        </div>

        {/* Video Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent z-30 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] transition-all duration-75 shadow-[0_0_10px_rgba(14,165,233,0.8)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* External Right Action Rail */}
      <div className={`absolute left-[calc(100%+32px)] bottom-24 flex flex-col items-center gap-7 z-20 transition-all duration-400 ease-out ${isActive ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        
        <div className="flex flex-col items-center gap-1.5 group/btn">
          <button onClick={handleLike} className={`w-[52px] h-[52px] rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-200 border border-white/10 active:scale-[0.92] group-hover/btn:scale-110 shadow-xl ${liked ? 'bg-[#0ea5e9] shadow-[0_0_30px_rgba(14,165,233,0.5)]' : 'bg-white/[0.08] hover:bg-white/[0.15]'}`}>
            <ThumbsUp size={20} className="text-white" fill={liked ? "currentColor" : "none"} />
          </button>
          <span className="text-white/90 text-xs font-bold drop-shadow-md">{formatCount(likeCount)}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1.5 group/btn">
          <button onClick={() => setShowModal('comments')} className="w-[52px] h-[52px] bg-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-xl group-hover/btn:bg-white/[0.15] group-hover/btn:scale-110 active:scale-[0.92] transition-all duration-200 border border-white/10 shadow-xl">
            <MessageSquare size={20} className="text-white" fill="white" />
          </button>
          <span className="text-white/90 text-xs font-bold drop-shadow-md">{data.comments}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1.5 group/btn">
          <button onClick={() => setShowModal('share')} className="w-[52px] h-[52px] bg-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-xl group-hover/btn:bg-white/[0.15] group-hover/btn:scale-110 active:scale-[0.92] transition-all duration-200 border border-white/10 shadow-xl">
            <Share2 size={20} className="text-white" fill="white" />
          </button>
          <span className="text-white/90 text-xs font-bold drop-shadow-md">{data.shares}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5 group/btn">
          <button className="w-[52px] h-[52px] bg-white/[0.08] rounded-full flex items-center justify-center backdrop-blur-xl group-hover/btn:bg-white/[0.15] group-hover/btn:scale-110 active:scale-[0.92] transition-all duration-200 border border-white/10 shadow-xl">
            <Bookmark size={20} className="text-white" fill="none" />
          </button>
          <span className="text-white/90 text-[11px] font-bold drop-shadow-md">Save</span>
        </div>
      </div>
      
    </div>
  );
};

export const ReelsView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, clientHeight } = scrollRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (e) => {
    if (!scrollRef.current) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIndex < REELS_DATA.length - 1) {
        scrollRef.current.scrollTo({ top: (activeIndex + 1) * scrollRef.current.clientHeight, behavior: 'smooth' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIndex > 0) {
        scrollRef.current.scrollTo({ top: (activeIndex - 1) * scrollRef.current.clientHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-2rem)] relative group/reels animate-in fade-in zoom-in-[0.98] duration-300">
      
      {/* Cinematic Focused Background Overlay */}
      <div className="fixed inset-0 bg-[#0b1220]/20 transition-colors duration-500 pointer-events-none z-[-1]" />
      
      {/* Background System */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {REELS_DATA.map((reel, index) => (
          <video 
            key={`bg-${index}`}
            src={reel.videoSrc}
            className={`absolute inset-0 w-full h-full object-cover blur-[80px] scale-[1.25] transition-opacity duration-400 ease-in-out ${index === activeIndex ? 'opacity-[0.18]' : 'opacity-0'}`}
            autoPlay muted loop playsInline
          />
        ))}
        {/* Deep Elliptical Vignette Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.18)_0%,rgba(0,0,0,0.85)_70%)] z-10" />
      </div>

      <div className="relative z-20 flex flex-col h-full pointer-events-none max-w-[700px] mx-auto w-full pt-12">
        
        {/* Header Aligned to Reel Axis */}
        <div className="flex items-end justify-between mb-8 pointer-events-auto w-full max-w-[460px] mx-auto px-4 sm:px-0">
          <div>
            <h1 className="text-[32px] font-black text-[#f9fafb] mb-1 tracking-tight drop-shadow-md leading-none">Reels</h1>
            <p className="text-[#9ca3af] text-[13px] font-bold tracking-wide drop-shadow">Scouting through performance</p>
          </div>
          <button className="bg-white/[0.08] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.15] text-white font-bold py-2.5 px-5 rounded-[14px] text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-[0.96] shadow-lg">
            <Plus className="w-4 h-4" /> Create Reel
          </button>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="flex-1 w-full overflow-y-auto snap-y snap-mandatory outline-none no-scrollbar flex flex-col items-center pointer-events-auto px-4 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REELS_DATA.map((reel, index) => (
            <div key={reel.id} className="snap-center shrink-0 w-full h-full flex justify-center items-center pb-12">
               <ReelCard data={reel} isActive={index === activeIndex} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
