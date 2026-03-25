import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white overflow-hidden relative border-t border-[#1f1f1f]">
      {/* Footer Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 relative z-10 w-full flex flex-col md:flex-row justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center gap-3 mb-12 md:mb-0">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
          <span className="text-2xl font-bold tracking-wide text-white">Clutch</span>
        </div>

        {/* Right Section: Link Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Company Column */}
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Company</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">About</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Blog</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Jobs</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Brand</a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Platform</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Athlete Portal</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Coach Portal</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">ClutchScore</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Pricing</a>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Resources</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Terms of Use</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Legal Notice</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Disclaimers</a>
            </div>
          </div>

          {/* Support Column */}
          <div className="flex flex-col">
            <h4 className="text-[12px] uppercase tracking-[0.15em] font-semibold text-white mb-6">Support</h4>
            <div className="flex flex-col gap-4 text-[14px]">
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Contact Us</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Help Center</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Twitter</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">Instagram</a>
              <a href="#" className="text-[#666] hover:text-[#999] transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-[#1f1f1f] relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[12px] text-[#666]">© 2025 Clutch. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">Twitter</a>
            <a href="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">Instagram</a>
            <a href="#" className="text-[12px] text-[#666] hover:text-[#999] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Large Watermark Container */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center translate-y-12 pointer-events-none z-0">
        <span 
          className="text-white opacity-[0.04] font-[900] tracking-tighter mix-blend-screen"
          style={{ fontSize: '15rem', lineHeight: '0.8', userSelect: 'none' }}
        >
          CLUTCH
        </span>
      </div>
    </footer>
  );
};

export default Footer;
