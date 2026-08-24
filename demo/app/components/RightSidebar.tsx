'use client';

import React, { useState } from 'react';

const TRENDS = [
  { topic: 'Gündem', title: '#Senkron', posts: '14.2 B gönderi' },
  { topic: 'Teknoloji', title: '#WASM', posts: '8.7 B gönderi' },
  { topic: 'Yazılım', title: '#NextJS', posts: '22.5 B gönderi' },
  { topic: 'Topluluk', title: '#NSosyal', posts: '45.8 B gönderi' },
];

const WHO_TO_FOLLOW = [
  { name: 'NSosyal Geliştirici', handle: '@nsosyal_dev', avatar: 'NS', isFollowing: false },
  { name: 'Yazılım Dünyası', handle: '@yazilim_tr', avatar: 'YD', isFollowing: false },
  { name: 'Web Dev Daily', handle: '@webdev_daily', avatar: 'WD', isFollowing: true },
];

export const RightSidebar: React.FC = () => {
  const [followList, setFollowList] = useState(WHO_TO_FOLLOW);

  const toggleFollow = (idx: number) => {
    setFollowList((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, isFollowing: !item.isFollowing } : item
      )
    );
  };

  return (
    <aside className="w-80 flex-shrink-0 py-6 px-4 space-y-4 hidden lg:block border-l border-slate-800/80 min-h-screen sticky top-0 bg-[#090d16]">
      {/* Search Bar */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Arama yap..."
          className="w-full bg-[#0f1624] border border-slate-800 focus:border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 outline-none transition-colors"
        />
      </div>

      {/* Trending Topics Box */}
      <div className="p-3.5 rounded-xl bg-[#0f1624] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Gündemdekiler
          </h2>
          <span className="text-xs text-sky-400 font-medium cursor-pointer hover:underline">
            Tümünü Gör
          </span>
        </div>

        <div className="space-y-2.5 pt-0.5">
          {TRENDS.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center group cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-normal">{item.topic}</span>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-sky-400 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.posts}</span>
              </div>
              <span className="text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                •••
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Who To Follow Box */}
      <div className="p-3.5 rounded-xl bg-[#0f1624] border border-slate-800 space-y-3">
        <h2 className="text-sm font-semibold text-slate-200">Kimi Takip Etmeli</h2>

        <div className="space-y-2.5 pt-0.5">
          {followList.map((user, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-semibold text-[11px] text-white">
                  {user.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{user.handle}</span>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  user.isFollowing
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                    : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                {user.isFollowing ? 'Takipte' : 'Takip Et'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] text-slate-600 space-y-1 px-1">
        <div className="flex gap-2 flex-wrap">
          <span className="hover:underline cursor-pointer">Hakkında</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Gizlilik</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Şartlar</span>
        </div>
        <div>© 2026 NSosyal</div>
      </div>
    </aside>
  );
};
