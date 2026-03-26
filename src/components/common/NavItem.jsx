import React from 'react';
import { ChevronDown } from 'lucide-react';

export const NavItem = ({ icon, label, active, badge, hasDropdown, onClick }) => (
  <div onClick={onClick} className={`flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}>
    <div className="flex items-center gap-3">
      <span className={`${active ? "text-gray-900" : "text-gray-500"}`}>{icon}</span>
      <span className={`text-sm ${active ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge === "Locked" && <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-medium">Locked</span>}
      {badge === "Pro" && <span className="bg-white border border-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium shadow-sm">Pro</span>}
      {hasDropdown && <ChevronDown size={14} className="text-gray-400" />}
    </div>
  </div>
);
