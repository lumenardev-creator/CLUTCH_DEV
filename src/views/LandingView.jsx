import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Video, ChartNoAxesColumn, ShieldCheck, Funnel, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

export const LandingView = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleDemoClick = (sectionId) => {
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAthleteDemoClick = () => {
    navigate('/demo');
  };

  const handleCoachDemoClick = () => {
    navigate('/coach');
  };

  return (
    <>
      <main className="flex-grow flex items-center justify-center px-6 py-24 text-center bg-transparent">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-white drop-shadow-2xl">
            The Future of Basketball Recruiting.
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-50 font-medium mb-8 max-w-3xl drop-shadow-md">
            Where performance meets visibility — and visibility turns into opportunity.
          </h2>
          <p className="text-sm md:text-lg text-blue-100/90 mb-12 max-w-3xl font-light leading-relaxed drop-shadow-md">
            Clutch is the modern recruiting platform built for the way the game works today. Athletes build momentum. Coaches evaluate instantly. The process becomes faster, smarter, and more transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button onClick={handleRegisterClick} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xl shadow-lg hover:scale-105 transition-all duration-300">
              Register
            </button>
            <button onClick={() => handleDemoClick('demo-section')} className="px-10 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold rounded-lg text-xl shadow-md hover:scale-105 transition-all duration-300">
              Demo
            </button>
          </div>
        </div>
      </main>

      <section id="demo-section" className="w-full px-6 py-24 bg-transparent border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight text-white drop-shadow-2xl">See How Clutch Works</h2>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 text-left">
            <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20 text-gray-900">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white">
                <User size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">Built for Visibility.</h3>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                In today's game, exposure drives opportunity. Clutch helps athletes turn performance into presence.
              </p>
              <ul className="space-y-5 mb-12 flex-grow">
                {["Post highlight reels", "Build your ClutchScore", "Track verified stats", "Get discovered nationally"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={24} /> <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={handleAthleteDemoClick} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg shadow-lg transition-colors">
                Watch Athlete Demo
              </button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20 text-gray-900">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white">
                <Briefcase size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">Modern Scouting, Simplified.</h3>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                Recruiting should move as fast as the game. Clutch gives coaches powerful tools to evaluate talent on the go.
              </p>
              <ul className="space-y-5 mb-12 flex-grow">
                {["ScoutSwipe™ evaluation", "Advanced filters", "Verified metrics", "Recruiting board organization"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck className="text-purple-600 shrink-0 mt-0.5" size={24} /> <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={handleCoachDemoClick} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-lg shadow-lg transition-colors">
                Watch Coach Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="visibility-section" className="w-full px-6 py-24 bg-transparent border-t border-white/10 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-2xl">Visibility Wins.</h2>
          <h3 className="text-xl md:text-2xl text-blue-50 font-medium mb-12 drop-shadow-md">The best ability today is discoverability.</h3>
          <p className="text-lg md:text-xl text-blue-100/90 mb-6 max-w-3xl mx-auto font-light drop-shadow-md">
            Recruiting is no longer about waiting to be found. It's about building momentum.<br className="hidden md:block" />
            Clutch gives athletes a platform designed for virality — but structured for credibility.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { i: Video, c: "text-blue-600", t: "Reels Built for Discovery", d: "Short-form highlights engineered for exposure." },
              { i: ChartNoAxesColumn, c: "text-purple-600", t: "ClutchScore", d: "A dynamic performance rating that evolves with your game." },
              { i: ShieldCheck, c: "text-blue-500", t: "Verified Stats", d: "Credibility that coaches trust." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl border border-white/20 hover:-translate-y-2 transition-transform flex flex-col items-center">
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <item.i size={28} className={item.c} />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{item.t}</h4>
                <p className="text-gray-600">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-24 bg-transparent border-t border-white/10 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-2xl">Scouting, Reimagined.</h2>
          <h3 className="text-xl md:text-2xl text-blue-50 font-medium mb-8 drop-shadow-md">Efficiency. Intelligence. Control.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 mt-12">
            {[
              { i: Video, c: "text-[#9333EA]", t: "ScoutSwipe™", d: "Evaluate prospects in seconds." },
              { i: Funnel, c: "text-[#9333EA]", t: "Smart Filtering", d: "Sort by position, region, grad year, ClutchScore, and verified status." },
              { i: Users, c: "text-[#9333EA]", t: "Recruiting Board", d: "Organize prospects with clarity and structure." },
              { i: TrendingUp, c: "text-[#9333EA]", t: "Trend Analytics", d: "Track performance growth over time." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl border border-white/20 hover:-translate-y-2 transition-transform flex flex-col items-center">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <item.i size={28} className={item.c} />
                </div>
                <h4 className="text-lg font-bold mb-3 text-gray-900">{item.t}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="score-section" className="w-full px-6 py-24 bg-transparent border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-2xl">Performance, Quantified.</h2>
            <h3 className="text-2xl text-blue-100/80 mb-12">A new standard for evaluating basketball talent.</h3>
            <div className="space-y-6">
              <p className="opacity-40 text-2xl font-bold text-white">Not popularity.</p>
              <p className="opacity-40 text-2xl font-bold text-white">Not hype.</p>
              <p className="text-white text-5xl font-black drop-shadow-[0_0_30px_rgba(37,99,235,0.6)] underline decoration-blue-600 decoration-8 underline-offset-12">Performance.</p>
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10 text-center">
            <div className="text-8xl font-black text-blue-600 tracking-tighter mb-2">12.4</div>
            <div className="text-lg font-bold text-gray-400 mb-12">ClutchScore • Top 18% Nationally</div>
            <div className="space-y-8 text-left">
              {[
                { l: "Performance Production", v: "85%", c: "bg-blue-600" },
                { l: "Efficiency Metrics", v: "92%", c: "bg-purple-600" },
                { l: "Competition Strength", v: "78%", c: "bg-indigo-600" },
                { l: "Consistency Index", v: "88%", c: "bg-blue-500" }
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-black text-gray-400 mb-2 uppercase tracking-widest">
                    <span>{s.l}</span><span>{s.v}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-sm">
                    <div className={s.c + " h-full transition-all duration-1000"} style={{ width: s.v }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-green-50 p-4 rounded-2xl text-green-700 font-bold text-lg flex items-center justify-center gap-2">
              <ArrowUpRight size={24} /> ↑ +0.4 last 90 days
            </div>
          </div>
        </div>
      </section>

      <section id="join-section" className="w-full px-6 py-40 bg-transparent border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl">
            Recruiting Has Evolved.<br/>So Should the Platform.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <button onClick={handleRegisterClick} className="px-12 py-5 bg-blue-600 text-white font-black rounded-xl shadow-2xl hover:scale-105 transition-all text-xl inline-block">
              Register Interest
            </button>
            <button onClick={handleAthleteDemoClick} className="px-12 py-5 border-2 border-white text-white font-black rounded-xl shadow-2xl hover:bg-white hover:text-gray-900 transition-all text-xl inline-block">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
