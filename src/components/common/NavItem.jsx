import React from 'react';
import { ChevronDown } from 'lucide-react';

export const NavItem = ({ icon, label, active, badge, hasDropdown, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group
      ${active
        ? "bg-[#0ea5e9]/10 border border-[rgba(14,165,233,0.2)]"
        : "hover:bg-white/[0.04] border border-transparent"
      }`}
  >
    <div className="flex items-center gap-3">
      <span className={`transition-colors duration-200 ${active ? "text-[#0ea5e9]" : "text-[#9ca3af] group-hover:text-[#d1d5db]"}`}>{icon}</span>
      <span className={`text-sm tracking-tight ${active ? "font-semibold text-[#f9fafb]" : "font-medium text-[#9ca3af] group-hover:text-[#d1d5db]"}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge === "Locked" && (
        <span className="bg-white/[0.06] text-[#6b7280] text-[10px] px-2 py-0.5 rounded-full font-medium border border-white/[0.06]">Locked</span>
      )}
      {badge === "Pro" && (
        <span className="bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] text-[10px] px-2 py-0.5 rounded-full font-semibold">Pro</span>
      )}
      {hasDropdown && <ChevronDown size={14} className={`transition-colors ${active ? "text-[#0ea5e9]/60" : "text-[#4b5563]"}`} />}
    </div>
  </div>
);
