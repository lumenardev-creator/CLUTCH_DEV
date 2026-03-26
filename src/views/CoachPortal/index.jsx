import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '../../components/common/Icons';
import { ChevronLeft } from 'lucide-react';

export const CoachPortal = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => navigate('/');

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full bg-[#f8f9fa] text-gray-900 font-sans overflow-hidden animate-in fade-in duration-300">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto shrink-0 z-10 relative">
        <div className="p-6 flex items-center justify-between cursor-pointer group" onClick={handleHomeClick} title="Return to Home">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gray-900 text-lg">Clutch</span>
          </div>
        </div>
        
        <div className="px-6 flex items-center justify-between mb-6">
          <span className="text-xs text-gray-500 font-medium tracking-wide">Coach Portal</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto bg-[#fafafa]">
        <div className="p-8 md:p-12 max-w-5xl mx-auto w-full h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Coach Portal Coming Soon</h1>
            <p className="text-gray-500 text-lg font-medium mb-8">This portal is currently under development.</p>
            <button onClick={handleHomeClick} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-semibold text-sm w-max">
              <ChevronLeft size={16} className="mr-1" /> Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};
