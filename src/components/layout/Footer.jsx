import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white overflow-hidden relative border-t border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 relative z-10 w-full flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-3 mb-12 md:mb-0 focus:outline-none">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          <span className="text-2xl font-bold tracking-wide text-white">Clutch</span>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Company</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">About</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Blog</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Jobs</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Brand</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Platform</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Athlete Portal</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Coach Portal</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">ClutchScore</Link>
              <Link to="/pricing" className="text-[#666] hover:text-[#999] transition-colors">Pricing</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Resources</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Terms of Use</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Legal Notice</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Disclaimers</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Support</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Contact Us</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Help Center</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Twitter</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">Instagram</Link>
              <Link to="#" className="text-[#666] hover:text-[#999] transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full border-t border-[#1f1f1f] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[12px] text-[#666]">© 2025 Clutch. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">Twitter</Link>
            <Link to="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">Instagram</Link>
            <Link to="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center translate-y-12 pointer-events-none z-0">
        <span className="text-white opacity-[0.04] font-[900] tracking-tighter mix-blend-screen" style={{ fontSize: "200px", lineHeight: "0.8", userSelect: "none" }}>CLUTCH</span>
      </div>
    </footer>
  );
};
