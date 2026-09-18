'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  onOpenComposer: () => void;
  onOpenBadges?: () => void;
  onOpenDinoGame?: () => void;
  unlockedBadgeCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onOpenComposer,
  onOpenBadges,
  onOpenDinoGame,
  unlockedBadgeCount = 0,
}) => {
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
      label: 'Rozetlerim',
      active: false,
      badge: unlockedBadgeCount > 0 ? `${unlockedBadgeCount} Rozet` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      onClick: onOpenBadges,
      icon: <span className="text-base">🏅</span>,
    },
    {
      label: 'Dino Oyunu',
      active: false,
      onClick: onOpenDinoGame,
      icon: <span className="text-base">🎮</span>,
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
    <aside className="hidden md:flex md:w-16 lg:w-64 flex-shrink-0 flex-col justify-between py-5 px-2 lg:px-4 border-r border-slate-800/80 min-h-screen sticky top-0 bg-[#090d16] transition-all duration-200 z-20">
      {/* Brand & Nav */}
      <div className="space-y-6">
        {/* NSosyal Brand Logo */}
        <Link href="/" className="flex items-center justify-center lg:justify-start gap-3 px-1 lg:px-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center font-bold text-white text-base shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
            N
          </div>
          <div className="hidden lg:block">
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
              onClick={item.onClick}
              title={item.label}
              className={`w-full flex items-center justify-center lg:justify-between px-2.5 lg:px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors group relative ${
                item.active
                  ? 'bg-slate-800/80 text-white border border-slate-700/60 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex-shrink-0 ${item.active ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {item.icon}
                </span>
                <span className="hidden lg:inline">{item.label}</span>
              </div>
              {item.badge && (
                <>
                  {/* Full Badge Pill on Large Screens */}
                  <span
                    className={`hidden lg:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-sky-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                  {/* Badge Notification Indicator Dot on Tablet Screens */}
                  <span
                    className="lg:hidden absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-400 ring-2 ring-[#090d16]"
                    title={item.badge}
                  />
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Primary 'Gönderi Paylaş' Button */}
        <button
          onClick={onOpenComposer}
          title="Gönderi Paylaş"
          className="w-full py-2.5 px-2 lg:px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-sky-500/10"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span className="hidden lg:inline">Gönderi Paylaş</span>
        </button>
      </div>

      {/* User Card */}
      <div className="p-2 lg:p-2.5 rounded-xl bg-[#0f1624] border border-slate-800 flex items-center justify-center lg:justify-between mt-auto">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-bold text-xs text-white flex-shrink-0 cursor-pointer"
            onClick={onOpenBadges}
            title="Kaan Arslan (@kaan_dev)"
          >
            KA
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Kaan Arslan</span>
            <span className="text-[11px] text-slate-500 font-mono">@kaan_dev</span>
          </div>
        </div>

        <button
          onClick={onOpenBadges}
          className="hidden lg:block text-amber-400 hover:text-amber-300 text-sm p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Rozetlerim"
        >
          🏅
        </button>
      </div>
    </aside>
  );
};
