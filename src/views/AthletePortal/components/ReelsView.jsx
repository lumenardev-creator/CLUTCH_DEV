import React, { useRef, useState, useEffect } from 'react';
import { Plus, Play, ThumbsUp, MessageSquare, Share2, Volume2, VolumeX, MoreVertical } from 'lucide-react';

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
    audioTrack: 'Original Audio - mjhoops23'
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
    audioTrack: 'Game Time - Stadium Sounds'
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
    audioTrack: 'Original Audio - treyday_10'
  }
];

const ReelCard = ({ data, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(null); // 'comments', 'share', 'more'

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
      setShowModal(null); // reset modals when swiping
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
    <div className="relative h-full w-full snap-start shrink-0 bg-black flex flex-col justify-center items-center group overflow-hidden">
      <video
        ref={videoRef}
        src={data.videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />
      
      {/* Play Overlay */}
      {!isPlaying && !showModal && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Play size={40} className="text-white ml-2 opacity-90" fill="white" />
          </div>
        </div>
      )}

      {/* Right Action Bar */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-7 z-20">
        <div className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110 duration-200">
          <button onClick={handleLike} className={`w-[46px] h-[46px] rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-lg border border-white/10 ${liked ? 'bg-blue-600/80 shadow-blue-500/50' : 'bg-black/40 hover:bg-black/60'}`}>
            <ThumbsUp size={22} className={liked ? "text-white" : "text-white/90"} fill={liked ? "currentColor" : "none"} />
          </button>
          <span className="text-white text-[11px] font-bold drop-shadow-md">{formatCount(likeCount)}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110 duration-200">
          <button onClick={() => setShowModal('comments')} className="w-[46px] h-[46px] bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors shadow-lg border border-white/10">
            <MessageSquare size={22} className="text-white/90" fill="white" />
          </button>
          <span className="text-white text-[11px] font-bold drop-shadow-md">{data.comments}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1.5 transition-transform hover:scale-110 duration-200">
          <button onClick={() => setShowModal('share')} className="w-[46px] h-[46px] bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors shadow-lg border border-white/10">
            <Share2 size={22} className="text-white/90" fill="white" />
          </button>
          <span className="text-white text-[11px] font-bold drop-shadow-md">{data.shares}</span>
        </div>

        <button onClick={() => setShowModal('more')} className="w-[46px] h-[46px] mt-2 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors shadow-lg border border-white/10">
          <MoreVertical size={20} className="text-white/90" />
        </button>
      </div>

      {/* Modals Overlay */}
      {showModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-gray-900 text-lg">
                {showModal === 'comments' && "Comments"}
                {showModal === 'share' && "Share to"}
                {showModal === 'more' && "More Actions"}
              </h3>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 font-bold">X</button>
            </div>
            
            {showModal === 'comments' && (
              <div className="space-y-4">
                <p className="text-gray-500 text-sm font-medium text-center py-4">Be the first to comment!</p>
                <input type="text" placeholder="Add a comment..." className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            
            {showModal === 'share' && (
              <div className="grid grid-cols-4 gap-4 text-center">
                {['Direct', 'Coach', 'X', 'Copy'].map(btn => (
                  <div key={btn} className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors shadow-sm border border-gray-200">
                      <Share2 size={20} className="text-gray-600" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-600">{btn}</span>
                  </div>
                ))}
              </div>
            )}

            {showModal === 'more' && (
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl font-bold flex items-center gap-3">Not Interested</button>
                <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl font-bold flex items-center gap-3">Report</button>
              </div>
            )}
            
            <div className="pb-safe" />
          </div>
        </div>
      )}

      {/* Bottom Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-20">
        <div className="pr-16">
          <div className="flex items-center gap-3 mb-3 pointer-events-auto w-max">
            <img src={data.authorAvatar} alt={data.authorName} className="w-11 h-11 rounded-full border-[2.5px] border-blue-500 object-cover shadow-lg cursor-pointer hover:opacity-90 transition-opacity" />
            <div>
              <h4 className="text-white font-bold text-[15px] leading-tight flex items-center gap-2 drop-shadow-md">
                {data.authorHandle}
                <button className="bg-transparent border border-white/80 text-white/90 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded shadow-sm hover:bg-white hover:text-black transition-colors">Follow</button>
              </h4>
              <p className="text-white/70 text-xs font-semibold drop-shadow-sm mt-0.5">{data.authorName}</p>
            </div>
          </div>
          <p className="text-white/90 text-[15px] font-medium mb-4 drop-shadow-md leading-snug">{data.description}</p>
          <div className="flex items-center gap-2 pointer-events-auto w-max bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-md">
            <Volume2 size={14} className="text-white/80" />
            <span className="text-white/90 text-xs font-bold truncate max-w-[150px]">{data.audioTrack}</span>
          </div>
        </div>
      </div>
      
      {/* Top Header Mute toggle */}
      <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="text-white font-black text-xl drop-shadow-md pointer-events-auto">Reels</div>
        <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/60 transition-colors pointer-events-auto border border-white/10 shadow-lg">
          {isMuted ? <VolumeX size={18} className="text-white/90" /> : <Volume2 size={18} className="text-white/90" />}
        </button>
      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/30 z-30">
        <div className="h-full bg-white/80 transition-all duration-75" style={{ width: `${progress}%` }} />
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

  return (
    <div className="animate-in fade-in duration-300 w-full max-w-5xl mx-auto flex flex-col h-full">
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Reels</h1>
          <p className="text-gray-500 text-sm font-medium">Create and share your highlight tapes</p>
        </div>
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
          <Plus className="w-5 h-5" /> Create Reel
        </button>
      </div>

      <div className="flex-1 flex justify-center py-6 px-4 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 shadow-inner overflow-hidden min-h-[85vh]">
        {/* Phone-sized Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full max-w-[420px] h-[calc(100vh-240px)] min-h-[600px] max-h-[850px] bg-black rounded-[2.5rem] overflow-y-scroll snap-y snap-mandatory relative shadow-2xl border-4 border-gray-900 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {REELS_DATA.map((reel, index) => (
             <ReelCard key={reel.id} data={reel} isActive={index === activeIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};
