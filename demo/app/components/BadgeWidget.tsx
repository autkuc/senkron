'use client';

import React from 'react';
import { Badge } from './useBadges';

interface BadgeWidgetProps {
  level: number;
  totalXp: number;
  nextLevelXp: number;
  currentLevelProgress: number;
  unlockedBadges: Badge[];
  onOpenBadgeModal: () => void;
  onOpenDinoGame: () => void;
}

export const BadgeWidget: React.FC<BadgeWidgetProps> = ({
  level,
  totalXp,
  nextLevelXp,
  currentLevelProgress,
  unlockedBadges,
  onOpenBadgeModal,
  onOpenDinoGame,
}) => {
  const latestBadge = unlockedBadges[unlockedBadges.length - 1];

  return (
    <div className="p-3.5 rounded-xl bg-[#0f1624] border border-slate-800 space-y-3">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🏅</span>
          <h2 className="text-xs font-bold text-slate-200">
            Rozetlerim & Seviye
          </h2>
        </div>
        <button
          onClick={onOpenBadgeModal}
          className="text-[11px] text-sky-400 font-medium hover:underline cursor-pointer"
        >
          Tümünü Gör
        </button>
      </div>

      {/* Level & XP Card */}
      <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 space-y-2">
        <div className="flex justify-between items-center text-[11px]">
          <span className="font-bold text-amber-400">Seviye {level}</span>
          <span className="font-mono text-slate-400">
            {totalXp} / {nextLevelXp} XP
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${currentLevelProgress}%` }}
          />
        </div>
      </div>

      {/* Latest Unlocked Badge Pill or Call to Action */}
      {latestBadge ? (
        <div
          onClick={onOpenBadgeModal}
          className="flex items-center gap-2.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 cursor-pointer hover:bg-amber-500/15 transition-colors"
        >
          <span className="text-lg">{latestBadge.icon}</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-amber-300 truncate">
              {latestBadge.title}
            </span>
            <span className="text-[9px] text-slate-400 truncate">
              Son kazanılan rozet (+{latestBadge.xp} XP)
            </span>
          </div>
        </div>
      ) : (
        <p className="text-[10px] text-slate-500 italic">
          Video düzenleyerek veya gönderi üreterek ilk rozetinizi kazanın!
        </p>
      )}

      {/* Dino Game Quick Trigger */}
      <button
        onClick={onOpenDinoGame}
        className="w-full py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/60 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 text-[11px] font-medium transition-colors"
      >
        <span>🎮</span>
        <span>Çevrimdışı Dino Oyunu Oyna</span>
      </button>
    </div>
  );
};
