import React from 'react';
import { Plus, MoreHorizontal, User } from 'lucide-react';
import { featuredAthletes } from '../../../data/athlete';

export const RecruitingBoardView = () => {
  const columns = [
    { id: 'evaluating', title: 'Evaluating', count: 12, color: 'bg-gray-100 border-gray-200 text-gray-700' },
    { id: 'contacted', title: 'Contacted', count: 8, color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { id: 'offered', title: 'Offered', count: 4, color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { id: 'committed', title: 'Committed', count: 2, color: 'bg-green-50 border-green-200 text-green-700' }
  ];

  return (
    <div className="animate-in fade-in duration-300 w-full h-full flex flex-col">
      <div className="flex items-end justify-between mb-8 pb-3 border-b border-gray-200 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Recruiting Board</h1>
          <p className="text-gray-500 text-sm font-medium">Manage your pipeline and track prospect status</p>
        </div>
        <button className="bg-gray-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Prospect
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 flex-1 items-start snap-x">
        {columns.map(col => (
          <div key={col.id} className="w-80 shrink-0 flex flex-col h-full max-h-full snap-start">
            <div className={`flex items-center justify-between mb-4 px-4 py-2.5 rounded-xl border font-bold text-sm shadow-sm ${col.color}`}>
              <div className="flex items-center gap-2 uppercase tracking-wide">
                {col.title} <span className="opacity-70 px-1.5 py-0.5 rounded-md bg-white/50 text-[10px]">{col.count}</span>
              </div>
              <button className="hover:bg-black/5 p-1 rounded transition-colors"><MoreHorizontal size={14} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pb-4">
              {featuredAthletes.slice(0, col.id === 'offered' ? 1 : 2).map((ath, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-move group">
                  <div className="flex gap-3 mb-3">
                    <img src={ath.img} alt={ath.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{ath.name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate mb-1">{ath.info}</p>
                      <div className="flex gap-2 text-[10px] font-bold text-blue-600">
                        <span className="bg-blue-50 px-1.5 py-0.5 rounded">{ath.ppg} PPG</span>
                        <span className="bg-blue-50 px-1.5 py-0.5 rounded">CS: 12.4</span>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 pt-3 border-t border-gray-50">
                     <button className="flex-1 bg-gray-50 text-gray-600 text-xs font-bold py-1.5 rounded-lg hover:bg-gray-100 border border-gray-100">View</button>
                     <button className="flex-1 bg-gray-900 text-white text-xs font-bold py-1.5 rounded-lg hover:bg-black shadow-sm">Message</button>
                  </div>
                </div>
              ))}
              
              <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-3 text-center text-sm font-bold text-gray-400 hover:border-gray-300 hover:text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Add to {col.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
