import React, { useState } from 'react';
import { Heart, X, Star, MapPin, Info } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

const CardContent = ({ athlete, onAction, isTop }) => (
  <>
    <div className="relative h-[60%] bg-[#0b1220] shrink-0 group pointer-events-none">
      <img src={athlete.img} alt={athlete.name} className="w-full h-full object-cover opacity-90 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/40 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white text-left">
        <h2 className="text-3xl font-black mb-1 drop-shadow-md">{athlete.name}</h2>
        <div className="flex items-center gap-2 text-sm font-bold text-[#d1d5db] drop-shadow-md">
          <MapPin className="w-4 h-4 text-[#0ea5e9]" /> {athlete.location}
        </div>
      </div>
      <button className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white p-2 rounded-full pointer-events-auto hover:bg-white/10 transition-colors">
        <Info className="w-5 h-5" />
      </button>
    </div>
    
    <div className="p-6 flex-1 flex flex-col bg-[#111827]">
      <p className="text-xs font-bold text-[#6b7280] mb-4 uppercase tracking-widest truncate">{athlete.info}</p>
      
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="text-center">
          <div className="text-[26px] font-black text-[#f9fafb] leading-none">{athlete.ppg}</div>
          <div className="text-[10px] text-[#6b7280] font-bold uppercase mt-1">PPG</div>
        </div>
        <div className="text-center border-l border-r border-white/[0.06] px-6">
          <div className="text-[26px] font-black text-[#f9fafb] leading-none">{athlete.rpg}</div>
          <div className="text-[10px] text-[#6b7280] font-bold uppercase mt-1">RPG</div>
        </div>
        <div className="text-center">
          <div className="text-[26px] font-black text-[#f9fafb] leading-none">{athlete.apg}</div>
          <div className="text-[10px] text-[#6b7280] font-bold uppercase mt-1">APG</div>
        </div>
      </div>
      
      <div className="mt-auto flex justify-center gap-6 pb-2 pointer-events-auto">
        <button 
          onClick={(e) => { e.stopPropagation(); if(isTop) onAction('left'); }} 
          className="w-14 h-14 bg-[#1f2937] border-2 border-red-500/30 text-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-500/10 hover:scale-105 active:scale-95 transition-all"
        >
          <X className="w-7 h-7" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); if(isTop) onAction('super'); }} 
          className="w-12 h-12 self-end bg-[#1f2937] border-2 border-[#3b82f6]/30 text-[#3b82f6] rounded-full flex items-center justify-center shadow-md hover:bg-[#3b82f6]/10 hover:scale-105 active:scale-95 transition-all mb-1"
        >
          <Star className="w-5 h-5 fill-current" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); if(isTop) onAction('right'); }} 
          className="w-14 h-14 bg-[#1f2937] border-2 border-green-500/30 text-green-500 rounded-full flex items-center justify-center shadow-md hover:bg-green-500/10 hover:scale-105 active:scale-95 transition-all"
        >
          <Heart className="w-7 h-7 fill-current" />
        </button>
      </div>
    </div>
  </>
);

export const ScoutSwipeView = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  
  const x = useMotionValue(0);
  
  // Top Card Transforms
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Labels Transforms
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);
  const recruitOpacity = useTransform(x, [50, 150], [0, 1]);

  // Next Card Transforms
  const nextScale = useTransform(x, [-200, 0, 200], [1, 0.92, 1]);
  const nextOpacity = useTransform(x, [-200, 0, 200], [1, 0.6, 1]);

  const handleSwipe = (direction) => {
    const targetX = direction === 'left' ? -1000 : 1000;
    
    // Animate smoothly out of screen
    animate(x, targetX, { duration: 0.25, ease: 'easeOut' });
    
    // Wait for animation, then swap card and snap back instantly
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % featuredAthletes.length);
      x.set(0);
    }, 280);
  };

  const onDragEnd = (event, info) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      handleSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleSwipe('left');
    } else {
      // Snap back if threshold not reached
      animate(x, 0, { type: 'spring', stiffness: 350, damping: 25 });
    }
  };

  const topAthlete = featuredAthletes[currentIdx];
  const nextAthlete = featuredAthletes[(currentIdx + 1) % featuredAthletes.length];

  return (
    <div className="animate-in fade-in duration-300 w-full h-full flex flex-col items-center max-w-4xl mx-auto overflow-hidden select-none">
      <div className="w-full flex items-end justify-between mb-8 pb-3 border-b border-white/[0.06] shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Scout Swipe</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Discover top talent in your region</p>
        </div>
      </div>

      <div className="relative w-full max-w-md h-[580px] flex items-center justify-center">
        
        {/* Next Card Background */}
        <motion.div 
          className="absolute w-full h-full bg-[#111827] rounded-[2.5rem] shadow-lg border border-white/[0.06] overflow-hidden flex flex-col pointer-events-none"
          style={{ scale: nextScale, opacity: nextOpacity }}
        >
          <CardContent athlete={nextAthlete} isTop={false} />
        </motion.div>

        {/* Top Active Card */}
        <AnimatePresence>
          <motion.div
            key={currentIdx}
            style={{ x, rotate, opacity }}
            drag="x"
            dragElastic={0.8}
            onDragEnd={onDragEnd}
            className="absolute w-full h-full bg-[#111827] rounded-[2.5rem] shadow-2xl border border-white/[0.08] overflow-hidden flex flex-col cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            {/* Swipe Labels */}
            <motion.div 
              style={{ opacity: passOpacity }}
              className="absolute top-10 right-10 z-50 border-[5px] border-red-500 rounded-xl px-5 py-2 rotate-12 pointer-events-none"
            >
              <span className="text-red-500 text-3xl font-black uppercase tracking-tight">REJECTED</span>
            </motion.div>
            
            <motion.div 
              style={{ opacity: recruitOpacity }}
              className="absolute top-10 left-10 z-50 border-[5px] border-green-500 rounded-xl px-5 py-2 -rotate-12 pointer-events-none"
            >
              <span className="text-green-500 text-3xl font-black uppercase">RECRUIT</span>
            </motion.div>

            <CardContent athlete={topAthlete} onAction={handleSwipe} isTop={true} />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <p className="text-xs text-[#6b7280] font-bold mt-8 tracking-wide uppercase">Tip: Swipe right to add to Recruiting Board</p>
    </div>
  );
};
