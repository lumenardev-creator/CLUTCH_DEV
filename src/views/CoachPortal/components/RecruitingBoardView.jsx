import React from 'react';
import { Plus, MoreHorizontal, User } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';

export const RecruitingBoardView = () => {
  const columns = [
    { id: 'evaluating', title: 'Evaluating', count: 12, color: 'bg-white/[0.04] border-white/[0.06] text-[#9ca3af]' },
    { id: 'contacted', title: 'Contacted', count: 8, color: 'bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6]' },
    { id: 'offered', title: 'Offered', count: 4, color: 'bg-[#6366f1]/10 border-[#6366f1]/20 text-[#818cf8]' },
    { id: 'committed', title: 'Committed', count: 2, color: 'bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]' }
  ];

  return (
    <div className="animate-in fade-in duration-300 w-full h-full flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-white/[0.06] shrink-0">
        <div>
          <h1 className="text-3xl font-black text-[#f9fafb] mb-1 tracking-tight">Recruiting Board</h1>
          <p className="text-[#9ca3af] text-sm font-medium">Manage your pipeline and track prospect status</p>
        </div>
        <button className="bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-[0_4px_15px_rgba(99,102,241,0.2)] flex items-center gap-2 hover:scale-105 active:scale-[0.96] transition-all">
          <Plus className="w-4 h-4" /> Add Prospect
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 flex-1 items-start snap-x">
        {columns.map(col => (
          <div key={col.id} className="w-80 shrink-0 flex flex-col h-full max-h-full snap-start">
            <div className={`flex items-center justify-between mb-4 px-4 py-2.5 rounded-xl border font-bold text-sm ${col.color}`}>
              <div className="flex items-center gap-2 uppercase tracking-wide">
                {col.title} <span className="opacity-70 px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[10px]">{col.count}</span>
              </div>
              <button className="hover:bg-white/[0.06] p-1 rounded transition-colors text-[#6b7280]"><MoreHorizontal size={14} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pb-4">
              {featuredAthletes.slice(0, col.id === 'offered' ? 1 : 2).map((ath, i) => (
                <div key={i} className="bg-[#111827] rounded-2xl p-4 border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 transition-all cursor-move group">
                  <div className="flex gap-3 mb-3">
                    <img src={ath.img} alt={ath.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-white/[0.1]" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#f9fafb] text-sm truncate">{ath.name}</h4>
                      <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider truncate mb-1">{ath.info}</p>
                      <div className="flex gap-2 text-[10px] font-bold text-[#0ea5e9]">
                        <span className="bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 px-1.5 py-0.5 rounded">{ath.ppg} PPG</span>
                        <span className="bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#818cf8] px-1.5 py-0.5 rounded">CS: 12.4</span>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 pt-3 border-t border-white/[0.05]">
                     <button className="flex-1 bg-white/[0.04] text-[#9ca3af] text-xs font-bold py-1.5 rounded-lg hover:bg-white/[0.08] border border-white/[0.06] transition-colors">View</button>
                     <button className="flex-1 bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white text-xs font-bold py-1.5 rounded-lg hover:from-[#4f46e5] hover:to-[#2563eb] shadow-sm transition-all">Message</button>
                  </div>
                </div>
              ))}
              
              <button className="w-full border-2 border-dashed border-white/[0.06] rounded-2xl p-3 text-center text-sm font-bold text-[#6b7280] hover:border-white/[0.12] hover:text-[#9ca3af] hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Add to {col.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
