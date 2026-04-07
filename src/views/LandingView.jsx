import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import {
  User, Briefcase, Video, ChartNoAxesColumn, ShieldCheck,
  Funnel, Users, TrendingUp, ArrowUpRight, X, ChevronDown,
} from 'lucide-react';
import { HeroScrollSequence } from '../components/common/HeroScrollSequence';
import { BasketballScrollSequence } from '../components/common/BasketballScrollSequence';
import { DribblingScrollSequence } from '../components/common/DribblingScrollSequence';

/* ─────────────────────────────────────────
   SHARED ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const cardHover = {
  whileHover: {
    y: -8,
    borderColor: 'rgba(37,99,235,0.45)',
    boxShadow: '0 0 40px rgba(37,99,235,0.12), 0 20px 60px rgba(0,0,0,0.4)',
  },
  transition: { type: 'spring', stiffness: 280, damping: 22 },
};

const btnPrimary =
  'btn-glow-blue px-10 py-4 text-white font-bold rounded-xl text-lg cursor-pointer';
const btnSecondary =
  'px-10 py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-lg backdrop-blur-sm cursor-pointer';

/* ─────────────────────────────────────────
   SECTION B — VISIBILITY WINS
   Pre-captures video frames → instant img swap (same technique as hero)
───────────────────────────────────────── */
const DUNK_FRAME_COUNT = 32;

const VisibilitySection = ({ onDemoClick }) => {
  const outerRef  = useRef(null);
  const imgRef    = useRef(null);
  const videoRef  = useRef(null);
  const framesRef = useRef([]); // JPEG data URLs, populated once
  const [ready,    setReady]    = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Step 1: capture frames from hidden video ──────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const capture = async () => {
      const canvas = document.createElement('canvas');
      canvas.width  = vid.videoWidth  || 1280;
      canvas.height = vid.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      const collected = [];

      for (let i = 0; i < DUNK_FRAME_COUNT; i++) {
        await new Promise((resolve) => {
          vid.currentTime = (i / (DUNK_FRAME_COUNT - 1)) * vid.duration;
          vid.addEventListener('seeked', () => {
            ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
            collected.push(canvas.toDataURL('image/jpeg', 0.72));
            resolve();
          }, { once: true });
        });
      }

      framesRef.current = collected;
      if (imgRef.current) imgRef.current.src = collected[0];
      setReady(true);
    };

    // Wait until we have enough metadata + data to seek
    if (vid.readyState >= 2) {
      capture();
    } else {
      vid.addEventListener('loadeddata', capture, { once: true });
    }
  }, []);

  // ── Step 2: scroll → instant img.src swap ────────────────────────
  useEffect(() => {
    const handler = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);
      setProgress(p);
      const frames = framesRef.current;
      if (frames.length > 0 && imgRef.current) {
        const idx = Math.min(frames.length - 1, Math.max(0, Math.round(p * (frames.length - 1))));
        imgRef.current.src = frames[idx];
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const phase1 = Math.min(progress / 0.35, 1);
  const phase2 = Math.min(Math.max((progress - 0.33) / 0.34, 0), 1);
  const phase3 = Math.min(Math.max((progress - 0.66) / 0.34, 0), 1);

  const features = [
    { icon: Video,           color: 'text-blue-400',   label: 'Reels Built for Discovery', desc: 'Short-form highlights engineered for exposure.' },
    { icon: ChartNoAxesColumn, color: 'text-cyan-400', label: 'ClutchScore',                desc: 'A dynamic performance rating that evolves with your game.' },
    { icon: ShieldCheck,     color: 'text-orange-400', label: 'Verified Stats',             desc: 'Credibility that coaches trust instantly.' },
  ];

  return (
    <div ref={outerRef} style={{ height: '280vh' }} className="relative w-full">
      {/* Hidden video — only used for frame extraction */}
      <video
        ref={videoRef}
        src="/videos/Basketball_Dunk_Video_Generation.mp4"
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Pre-captured frames displayed via img — instant swap, no seeking lag */}
        <img
          ref={imgRef}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen transition-none"
          style={{ opacity: ready ? 0.6 : 0 }}
        />
        {/* Loading shimmer while frames capture */}
        {!ready && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-orange-900/10 animate-pulse" />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

        {/* Content overlay */}
        <div className="relative h-full flex items-center z-10 px-6 md:px-16 lg:px-24">
          <div className="max-w-6xl mx-auto w-full">

            {/* Phase 1 — headline */}
            <motion.div
              style={{ opacity: phase1, y: (1 - phase1) * 30 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Platform Feature
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                Visibility <span className="text-gradient-orange">Wins.</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-lg">
                The best ability today is discoverability. Build momentum — be found.
              </p>
            </motion.div>

            {/* Phase 2 — feature cards */}
            <motion.div
              style={{ opacity: phase2, y: (1 - phase2) * 30 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  {...cardHover}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-3"
                >
                  <div className={`w-10 h-10 icon-cyan rounded-xl flex items-center justify-center`}>
                    <f.icon size={20} className={f.color} />
                  </div>
                  <h4 className="text-white font-bold text-base">{f.label}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Phase 3 — CTA text + button */}
            <motion.div
              style={{ opacity: phase3, y: (1 - phase3) * 20 }}
              className="flex flex-col sm:flex-row items-start gap-6"
            >
              <p className="text-2xl font-black text-white max-w-sm">
                Recruiting is no longer about waiting to be found.
              </p>
              <motion.button
                onClick={onDemoClick}
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(249,115,22,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl text-base shrink-0 border border-orange-400/30 cursor-pointer"
              >
                See Platform Demo
              </motion.button>
            </motion.div>

          </div>
        </div>

        {/* Scroll progress stripe */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-500 to-cyan-400 transition-none" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   SECTION C — SCOUTING (frames forward + court arc)
───────────────────────────────────────── */
const ScoutingSection = () => {
  const outerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max(-rect.top / (rect.height - window.innerHeight), 0), 1);
      setProgress(p);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const cards = [
    { icon: Video,      color: 'text-purple-400', label: 'ScoutSwipe™',     desc: 'Evaluate prospects in seconds with swipe-based review.' },
    { icon: Funnel,     color: 'text-purple-400', label: 'Smart Filtering',  desc: 'Sort by position, region, grad year, ClutchScore, and verified status.' },
    { icon: Users,      color: 'text-purple-400', label: 'Recruiting Board', desc: 'Organize prospects with clarity and structure.' },
    { icon: TrendingUp, color: 'text-purple-400', label: 'Trend Analytics',  desc: 'Track performance growth over time.' },
  ];

  // SVG court arc — stroke-dashoffset driven by progress
  const ARC_LENGTH = 520;

  return (
    <div ref={outerRef} style={{ height: '260vh' }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full flex items-center">

          {/* Left — court arc SVG overlay (Background image handled by DribblingScrollSequence) */}
          <div className="absolute left-0 top-0 w-full md:w-1/2 h-full">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 500 500"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M 50 450 Q 250 50 450 450"
                stroke="rgba(37,99,235,0.7)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={ARC_LENGTH}
                strokeDashoffset={ARC_LENGTH * (1 - progress)}
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
              />
              <circle
                cx={50 + progress * 400}
                cy={450 - Math.sin(progress * Math.PI) * 400}
                r="7"
                fill="#f97316"
                style={{ opacity: progress > 0.05 && progress < 0.95 ? 1 : 0 }}
              />
            </svg>
          </div>

          {/* Right — cards */}
          <div className="relative z-10 ml-auto w-full md:w-1/2 px-8 md:pr-16 lg:pr-24 flex flex-col justify-center gap-6 py-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                For Coaches
              </div>
              <motion.h2
                {...fadeUp(0)}
                className="text-4xl md:text-5xl font-extrabold text-white mb-3"
              >
                Scouting,{' '}
                <span className="text-gradient-blue">Reimagined.</span>
              </motion.h2>
              <motion.p {...fadeUp(0.1)} className="text-slate-400 text-lg mb-6">
                Efficiency. Intelligence. Control.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((c, i) => {
                const threshold = i / (cards.length - 1);
                const cardOpacity = Math.min(Math.max((progress - threshold * 0.6) / 0.25, 0), 1);
                return (
                  <motion.div
                    key={i}
                    style={{ opacity: cardOpacity, y: (1 - cardOpacity) * 20 }}
                    {...cardHover}
                    className="glass-card rounded-2xl p-5 flex flex-col gap-3"
                  >
                    <div className="w-10 h-10 icon-purple rounded-xl flex items-center justify-center">
                      <c.icon size={18} className={c.color} />
                    </div>
                    <h4 className="text-white font-bold text-sm">{c.label}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-400 transition-none" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   SECTION D — PERFORMANCE
───────────────────────────────────────── */
const PerformanceSection = () => {
  const contentRef = useRef(null);
  const inView     = useInView(contentRef, { once: true, margin: '-100px' });
  const [score, setScore] = useState(0);

  // Score counter
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const id = setInterval(() => {
      v += 0.25;
      setScore(parseFloat(Math.min(v, 12.4).toFixed(1)));
      if (v >= 12.4) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [inView]);

  const bars = [
    { label: 'Performance Production', value: 85, color: 'from-blue-500 to-blue-400' },
    { label: 'Efficiency Metrics',      value: 92, color: 'from-cyan-500 to-cyan-400' },
    { label: 'Competition Strength',    value: 78, color: 'from-purple-500 to-purple-400' },
    { label: 'Consistency Index',       value: 88, color: 'from-blue-600 to-indigo-400' },
  ];

  return (
    <section id="score-section" className="w-full px-6 py-40 md:py-56 bg-transparent flex items-center min-h-screen">
      <div ref={contentRef} className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div className="text-left">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              ClutchScore
            </motion.div>
            <motion.h2 {...fadeUp(0.05)} className="text-4xl md:text-6xl font-extrabold mb-5 text-white">
              Performance,{' '}
              <span className="text-gradient-blue">Quantified.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-xl text-slate-400 mb-10">
              A new standard for evaluating basketball talent.
            </motion.p>
            <motion.div {...fadeUp(0.15)} className="space-y-5">
              <p className="text-slate-500 text-xl font-bold">Not popularity.</p>
              <p className="text-slate-500 text-xl font-bold">Not hype.</p>
              <p className="text-white text-5xl font-black" style={{ textShadow: '0 0 40px rgba(59,130,246,0.7)' }}>
                Performance.
              </p>
            </motion.div>
          </div>

          {/* Right — ClutchScore card */}
          <motion.div {...fadeUp(0.1)} className="glass-card-strong rounded-[2rem] p-10 text-center border border-white/10">
            <div className="text-8xl font-black tracking-tighter mb-1 text-gradient-blue" style={{ animation: inView ? 'score-glow 2s ease-in-out infinite' : 'none' }}>
              {score.toFixed(1)}
            </div>
            <div className="text-sm font-bold text-slate-500 mb-10 uppercase tracking-widest">
              ClutchScore · Top 18% Nationally
            </div>
            <div className="space-y-6 text-left">
              {bars.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">
                    <span>{b.label}</span>
                    <span className="text-slate-300">{b.value}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${b.value}%` : 0 }}
                      transition={{ duration: 1.3, ease: 'easeOut', delay: i * 0.15 + 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-400 font-bold text-sm flex items-center justify-center gap-2">
              <ArrowUpRight size={18} />
              +0.4 last 90 days
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   SECTION E — FINAL CTA
───────────────────────────────────────── */
const CtaSection = ({ onRegister, onDemo }) => {
  const contentRef = useRef(null);
  const inView     = useInView(contentRef, { once: true, margin: '-100px' });

  return (
    <section className="w-full px-6 py-40 md:py-64 bg-transparent border-t border-white/5 flex items-center min-h-screen">
      <div ref={contentRef} className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
            Recruiting Has <span className="text-gradient-blue">Evolved.</span>
            <br />
            So Should the Platform.
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join athletes and coaches already building their futures on Clutch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <motion.button
              onClick={onRegister}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(37,99,235,0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 btn-glow-blue text-white font-black rounded-xl text-xl cursor-pointer"
            >
              Register Interest
            </motion.button>
            <motion.button
              onClick={onDemo}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 border-2 border-white/20 text-white font-black rounded-xl text-xl backdrop-blur-sm cursor-pointer"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   MAIN LANDING VIEW
───────────────────────────────────────── */
export const LandingView = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleRegister = () => navigate('/signup');
  const handleScrollToDemo = () => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
  const handleAthleteDemo = () => navigate('/demo');
  const handleCoachDemo = () => navigate('/coach');

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />

      {/* ─────────────────────────────────────
          SECTION A — HERO + DEMO CARDS
          (wrapped in existing HeroScrollSequence)
      ───────────────────────────────────── */}
      <HeroScrollSequence>

        {/* Hero block */}
        <main className="w-full flex-grow flex items-center justify-center px-6 min-h-screen text-center bg-transparent">
          <div className="max-w-4xl mx-auto flex flex-col items-center mt-[-8vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Basketball Recruiting Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white"
              style={{ textShadow: '0 0 80px rgba(37,99,235,0.3)' }}
            >
              The Future of{' '}
              <span className="text-gradient-blue">Basketball</span>{' '}
              Recruiting.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-300 font-medium mb-6 max-w-2xl"
            >
              Where performance meets visibility — and visibility turns into opportunity.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl font-light leading-relaxed"
            >
              Athletes build momentum. Coaches evaluate instantly. The process becomes faster, smarter, and more transparent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <motion.button
                onClick={handleRegister}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(37,99,235,0.6)' }}
                whileTap={{ scale: 0.95 }}
                className={btnPrimary}
              >
                Register
              </motion.button>
              <motion.button
                onClick={handleScrollToDemo}
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.96 }}
                className={btnSecondary}
              >
                See Demo
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-16 flex flex-col items-center gap-1 text-slate-500 text-xs uppercase tracking-widest"
            >
              <span>Scroll to explore</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                <ChevronDown size={18} />
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Demo section — inside HeroScrollSequence */}
        <section id="demo-section" className="w-full px-6 py-28 bg-transparent border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-5">
                How It Works
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                See How Clutch Works
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Athlete card */}
              <motion.div
                {...fadeUp(0.1)}
                {...cardHover}
                className="glass-card rounded-3xl p-8 md:p-10 flex flex-col border border-white/8"
              >
                <div className="w-14 h-14 icon-blue rounded-2xl flex items-center justify-center mb-7 shadow-lg">
                  <User size={28} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Built for Visibility.</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  In today's game, exposure drives opportunity. Clutch helps athletes turn performance into presence.
                </p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {['Post highlight reels', 'Build your ClutchScore', 'Track verified stats', 'Get discovered nationally'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <ShieldCheck size={12} className="text-blue-400" />
                      </div>
                      <span className="text-slate-300 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={handleAthleteDemo}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(37,99,235,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 btn-glow-blue text-white font-bold rounded-xl text-base cursor-pointer"
                >
                  Watch Athlete Demo
                </motion.button>
              </motion.div>

              {/* Coach card */}
              <motion.div
                {...fadeUp(0.2)}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(249,115,22,0.4)',
                  boxShadow: '0 0 40px rgba(249,115,22,0.1), 0 20px 60px rgba(0,0,0,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="glass-card rounded-3xl p-8 md:p-10 flex flex-col border border-white/8"
              >
                <div className="w-14 h-14 icon-orange rounded-2xl flex items-center justify-center mb-7 shadow-lg">
                  <Briefcase size={28} className="text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Modern Scouting, Simplified.</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Recruiting should move as fast as the game. Clutch gives coaches powerful tools to evaluate talent on the go.
                </p>
                <ul className="space-y-4 mb-10 flex-grow">
                  {['ScoutSwipe™ evaluation', 'Advanced filters', 'Verified metrics', 'Recruiting board organization'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                        <ShieldCheck size={12} className="text-orange-400" />
                      </div>
                      <span className="text-slate-300 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={handleCoachDemo}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(249,115,22,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl text-base border border-orange-400/30 cursor-pointer"
                >
                  Watch Coach Demo
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

      </HeroScrollSequence>

      {/* ─────────────────────────────────────
          SECTION B — VISIBILITY WINS (dunk video)
      ───────────────────────────────────── */}
      <VisibilitySection onDemoClick={() => setShowDemoModal(true)} />

      {/* ─────────────────────────────────────
          SECTION C — SCOUTING (Dribbling Animation Wrapper)
      ───────────────────────────────────── */}
      <DribblingScrollSequence>
        <ScoutingSection />
      </DribblingScrollSequence>

      {/* ─────────────────────────────────────
          SECTION D & E — PERFORMANCE & CTA (Basketball Animation Wrapper)
      ───────────────────────────────────── */}
      <BasketballScrollSequence>
        <PerformanceSection />
        <CtaSection onRegister={handleRegister} onDemo={() => setShowDemoModal(true)} />
      </BasketballScrollSequence>

      {/* ─────────────────────────────────────
          DEMO MODAL
      ───────────────────────────────────── */}
      {showDemoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={() => setShowDemoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-strong rounded-[2rem] p-8 max-w-[400px] w-full border border-white/10 text-left"
          >
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-6 right-6 w-8 h-8 glass-card flex items-center justify-center rounded-full text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <h3 className="text-2xl font-black text-white mb-1">Select Demo</h3>
            <p className="text-slate-400 mb-7 text-sm">Which platform would you like to explore?</p>

            <div className="space-y-3">
              <motion.button
                onClick={handleAthleteDemo}
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(37,99,235,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-glow-blue text-white p-4 rounded-2xl flex items-center gap-4 cursor-pointer"
              >
                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <User size={22} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base">Athlete Portal</div>
                  <div className="text-blue-200/70 text-xs font-semibold tracking-wider uppercase mt-0.5">Build momentum & exposure</div>
                </div>
              </motion.button>

              <motion.button
                onClick={handleCoachDemo}
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-2xl flex items-center gap-4 border border-orange-400/30 cursor-pointer"
              >
                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                  <Briefcase size={22} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-base">Coach Portal</div>
                  <div className="text-orange-200/70 text-xs font-semibold tracking-wider uppercase mt-0.5">Scout & organize perfectly</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
