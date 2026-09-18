'use client';

import React from 'react';

const STORIES = [
  { id: 'user', name: 'Hikayen', avatar: '+', isUser: true },
  { id: 'tech', name: 'TechTR', avatar: 'TR', hasUnread: true },
  { id: 'nsosyal', name: 'NSosyal', avatar: 'NS', hasUnread: true },
  { id: 'selin', name: 'Selin Y.', avatar: 'SY', hasUnread: true },
  { id: 'burak', name: 'Burak K.', avatar: 'BK', hasUnread: true },
  { id: 'deniz', name: 'Deniz A.', avatar: 'DA', hasUnread: false },
  { id: 'ayse', name: 'Ayşe K.', avatar: 'AK', hasUnread: false },
];

export const StoryBar: React.FC = () => {
  return (
    <div className="py-2.5 sm:py-3 px-3 overflow-x-auto no-scrollbar flex items-center gap-2.5 sm:gap-3 border-b border-slate-800/80 bg-[#090d16] select-none touch-pan-x">
      {STORIES.map((story) => (
        <button
          key={story.id}
          className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0 group cursor-pointer active:scale-95 transition-transform"
        >
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px] transition ${
              story.isUser
                ? 'border border-dashed border-slate-600'
                : story.hasUnread
                ? 'bg-gradient-to-tr from-sky-500 to-cyan-400'
                : 'bg-slate-700'
            }`}
          >
            <div className="w-full h-full rounded-full bg-[#0f1624] flex items-center justify-center font-semibold text-xs text-slate-200 border border-[#090d16]">
              {story.avatar}
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 max-w-[52px] sm:max-w-[56px] truncate">
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
};
