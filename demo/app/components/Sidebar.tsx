'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  onOpenComposer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenComposer }) => {
  const navItems = [
    {
      label: 'Ana Sayfa',
      active: true,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      label: 'Keşfet',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      label: 'Bildirimler',
      badge: '3',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      label: 'Mesajlar',
      badge: '1',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: 'Topluluklar',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      label: 'Kaydedilenler',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: 'Beğeniler',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      label: 'Profil',
      active: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between py-6 px-4 border-r border-slate-800/80 min-h-screen sticky top-0 bg-[#090d16]">
      {/* Brand & Nav */}
      <div className="space-y-6">
        {/* NSosyal Brand Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 group">
          <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
            N
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight text-white">
              NSosyal
            </div>
            <div className="text-[11px] text-slate-500 font-normal">Sosyal Ağ</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-slate-800/80 text-white border border-slate-700/60 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={item.active ? 'text-sky-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-600 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Primary 'Gönderi Paylaş' Button */}
        <button
          onClick={onOpenComposer}
          className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 active:scale-98"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>Gönderi Paylaş</span>
        </button>
      </div>

      {/* User Card */}
      <div className="p-2.5 rounded-xl bg-[#0f1624] border border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-white">
            KA
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
              Kaan Arslan
            </span>
            <span className="text-[11px] text-slate-500 font-mono">@kaan_dev</span>
          </div>
        </div>
        <span className="text-slate-500 text-xs px-1">•••</span>
      </div>
    </aside>
  );
};
