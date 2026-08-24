'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'video' | 'ai' | 'social' | 'game' | 'special';
  xp: number;
  unlockedAt: string | null;
  progress?: { current: number; max: number };
}

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'video_master',
    title: 'Video Ustası',
    description: 'WebAssembly ile tarayıcıda ilk videonu düzenle ve dışa aktar.',
    icon: '🎬',
    category: 'video',
    xp: 50,
    unlockedAt: null,
  },
  {
    id: 'ai_architect',
    title: 'Yapay Zeka Mimarı',
    description: 'Senkron Türkçe AI motoru ile viral bir gönderi taslağı oluştur.',
    icon: '✨',
    category: 'ai',
    xp: 50,
    unlockedAt: null,
  },
  {
    id: 'community_voice',
    title: 'Topluluk Sesi',
    description: 'NSosyal akışında ilk gönderini başarıyla yayınla.',
    icon: '💬',
    category: 'social',
    xp: 30,
    unlockedAt: null,
  },
  {
    id: 'interaction_lead',
    title: 'Etkileşim Öncüsü',
    description: 'Topluluk gönderilerini beğen veya yeniden paylaş.',
    icon: '❤️',
    category: 'social',
    xp: 30,
    unlockedAt: null,
  },
  {
    id: 'offline_hero',
    title: 'Piksel Koşucusu',
    description: 'Çevrimdışı Senkron Dino oyununda 50+ puana ulaş.',
    icon: '🦖',
    category: 'game',
    xp: 40,
    unlockedAt: null,
  },
  {
    id: 'teknofest_pioneer',
    title: 'Milli Teknoloji Hamlesi',
    description: 'TEKNOFEST veya yerli yazılım etiketi içeren bir paylaşım yap.',
    icon: '🚀',
    category: 'special',
    xp: 50,
    unlockedAt: null,
  },
  {
    id: 'senkron_ambassador',
    title: 'Senkron Elçisi',
    description: 'En az 5 rozeti tamamlayarak platform ustası unvanını kazan.',
    icon: '🏆',
    category: 'special',
    xp: 100,
    unlockedAt: null,
  },
];

const STORAGE_KEY = 'senkron_user_badges';

export function useBadges() {
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Badge[];
        setBadges((prev) =>
          prev.map((b) => {
            const match = parsed.find((p) => p.id === b.id);
            return match ? { ...b, unlockedAt: match.unlockedAt } : b;
          })
        );
      }
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  // Save to localStorage when badges change
  const persistBadges = (updated: Badge[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage write error
    }
  };

  const unlockBadge = useCallback((badgeId: string) => {
    setBadges((prev) => {
      const target = prev.find((b) => b.id === badgeId);
      if (!target || target.unlockedAt) return prev; // Already unlocked

      const now = new Date().toISOString();
      const updatedBadge = { ...target, unlockedAt: now };
      const nextList = prev.map((b) => (b.id === badgeId ? updatedBadge : b));

      // Check for meta-badge (Senkron Ambassador) if 5+ badges unlocked
      const unlockedCount = nextList.filter((b) => b.unlockedAt && b.id !== 'senkron_ambassador').length;
      let finalList = nextList;
      if (unlockedCount >= 5) {
        const ambassador = nextList.find((b) => b.id === 'senkron_ambassador');
        if (ambassador && !ambassador.unlockedAt) {
          finalList = nextList.map((b) =>
            b.id === 'senkron_ambassador' ? { ...b, unlockedAt: now } : b
          );
        }
      }

      persistBadges(finalList);
      setNewlyUnlockedBadge(updatedBadge);
      return finalList;
    });
  }, []);

  const clearNewBadgeToast = () => setNewlyUnlockedBadge(null);

  const unlockedBadges = badges.filter((b) => b.unlockedAt !== null);
  const totalXp = unlockedBadges.reduce((sum, b) => sum + b.xp, 0);
  const level = Math.floor(totalXp / 80) + 1;
  const nextLevelXp = level * 80;
  const currentLevelProgress = Math.min(100, Math.round((totalXp % 80) / 80 * 100));

  return {
    badges,
    unlockedBadges,
    totalXp,
    level,
    nextLevelXp,
    currentLevelProgress,
    unlockBadge,
    newlyUnlockedBadge,
    clearNewBadgeToast,
  };
}
