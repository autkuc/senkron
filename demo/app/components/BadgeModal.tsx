'use client';

import React from 'react';
import { Badge } from './useBadges';

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  level: number;
  totalXp: number;
  nextLevelXp: number;
  currentLevelProgress: number;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({
  isOpen,
  onClose,
  badges,
  level,
  totalXp,
  nextLevelXp,
  currentLevelProgress,
}) => {
  if (!isOpen) return null;

  const getLevelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Çaylak Üye';
    if (lvl === 2) return 'Aktif Geliştirici';
    if (lvl === 3) return 'Usta İçerik Üreticisi';
    if (lvl === 4) return 'Teknoloji Mimarı';
    return 'NSosyal Efsanesi';
  };

  const unlockedCount = badges.filter((b) => b.unlockedAt).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shadow-inner">
              🏅
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                NSosyal Rozet & Ödül Sistemi
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  {unlockedCount} / {badges.length} Açıldı
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Platform ile etkileşime geçerek tecrübe puanı (XP) ve özel rozetler kazanın.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-850 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Level & XP Progress Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1424] to-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Mevcut Seviye:</span>
              <span className="text-sm font-bold text-sky-400">
                Seviye {level} — {getLevelTitle(level)}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-300">
              {totalXp} XP <span className="text-slate-500">/ {nextLevelXp} XP</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 text-right font-mono">
            Bir sonraki seviyeye {Math.max(0, nextLevelXp - totalXp)} XP kaldı
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {badges.map((badge) => {
            const isUnlocked = badge.unlockedAt !== null;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-[#0f1627] border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl border ${
                    isUnlocked
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm'
                      : 'bg-slate-800/40 border-slate-700/60 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-xs font-bold truncate ${
                        isUnlocked ? 'text-slate-100' : 'text-slate-400'
                      }`}
                    >
                      {badge.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      +{badge.xp} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono">
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        ✓ Kazanıldı
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        🔒 Kilitli
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
