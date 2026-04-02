import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoIcon } from '../common/Icons';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId, path = '/') => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between gap-8 px-6 py-4 lg:px-12 backdrop-blur-md bg-white/5 border border-white/10 sticky top-4 z-50 mx-4 md:mx-auto max-w-7xl rounded-full">
        <div className="flex items-center cursor-pointer group shrink-0" onClick={() => handleNavClick(null)}>
          <LogoIcon className="h-9 w-auto group-hover:scale-110 transition-transform -mr-2" />
          <span className="text-xl font-bold tracking-wide text-white">Clutch</span>
        </div>
        
        <div className="hidden md:flex flex-1 justify-start ml-10 items-center gap-8 font-medium text-sm text-blue-50">
          <button onClick={() => handleNavClick(null)} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => handleNavClick('demo-section')} className="hover:text-white transition-colors">How Clutch Works</button>
          <button onClick={() => handleNavClick('visibility-section')} className="hover:text-white transition-colors">Why Clutch</button>
          <button onClick={() => handleNavClick('score-section')} className="hover:text-white transition-colors">Clutch Score</button>
          <button onClick={() => handleNavClick('join-section')} className="hover:text-white transition-colors">Get Started</button>
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button onClick={() => handleNavClick('demo-section')} className="text-sm font-medium text-blue-50 hover:text-white transition-colors">Demo</button>
          <Link to="/login" className="px-5 py-2 text-white border border-white/20 hover:bg-white/10 text-sm font-semibold rounded-md transition-all hover:scale-105 active:scale-95">Log In</Link>
          <Link to="/signup" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow-md transition-all hover:scale-105 active:scale-95">Sign Up</Link>
        </div>

        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] backdrop-blur-xl bg-black/80 flex flex-col items-center py-12 gap-8 z-50 animate-in slide-in-from-top duration-300">
          <button onClick={() => handleNavClick(null)} className="text-2xl font-semibold text-white hover:text-blue-300">Home</button>
          <button onClick={() => handleNavClick('demo-section')} className="text-2xl font-semibold text-white hover:text-blue-300">How Clutch Works</button>
          <button onClick={() => handleNavClick('visibility-section')} className="text-2xl font-semibold text-white hover:text-blue-300">Why Clutch</button>
          <button onClick={() => handleNavClick('score-section')} className="text-2xl font-semibold text-white hover:text-blue-300">Clutch Score</button>
          <button onClick={() => handleNavClick('join-section')} className="text-2xl font-semibold text-white hover:text-blue-300">Get Started</button>
          
          <div className="flex flex-col gap-4 w-full px-8 mt-4">
            <button onClick={() => handleNavClick('demo-section')} className="w-full py-4 border border-white/20 rounded-xl text-lg text-white font-medium">Demo</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/login'); }} className="w-full py-4 border border-white/20 rounded-xl text-lg text-white font-medium">Log In</button>
            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/signup'); }} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg">Sign Up</button>
          </div>
        </div>
      )}
    </>
  );
};
