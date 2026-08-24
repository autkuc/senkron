export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'video' | 'ai' | 'social' | 'game' | 'special';
  xp: number;
}

export const SENKRON_BADGES: BadgeDefinition[] = [
  {
    id: 'video_master',
    title: 'Video Ustası',
    description: 'WebAssembly ile tarayıcıda ilk videonu düzenle ve dışa aktar.',
    icon: '🎬',
    category: 'video',
    xp: 50,
  },
  {
    id: 'ai_architect',
    title: 'Yapay Zeka Mimarı',
    description: 'Senkron Türkçe AI motoru ile viral bir gönderi taslağı oluştur.',
    icon: '✨',
    category: 'ai',
    xp: 50,
  },
  {
    id: 'community_voice',
    title: 'Topluluk Sesi',
    description: 'NSosyal akışında ilk gönderini başarıyla yayınla.',
    icon: '💬',
    category: 'social',
    xp: 30,
  },
  {
    id: 'interaction_lead',
    title: 'Etkileşim Öncüsü',
    description: 'Topluluk gönderilerini beğen veya yeniden paylaş.',
    icon: '❤️',
    category: 'social',
    xp: 30,
  },
  {
    id: 'offline_hero',
    title: 'Piksel Koşucusu',
    description: 'Çevrimdışı Senkron Dino oyununda 50+ puana ulaş.',
    icon: '🦖',
    category: 'game',
    xp: 40,
  },
  {
    id: 'teknofest_pioneer',
    title: 'Milli Teknoloji Hamlesi',
    description: 'TEKNOFEST veya yerli yazılım etiketi içeren bir paylaşım yap.',
    icon: '🚀',
    category: 'special',
    xp: 50,
  },
  {
    id: 'senkron_ambassador',
    title: 'Senkron Elçisi',
    description: 'En az 5 rozeti tamamlayarak platform ustası unvanını kazan.',
    icon: '🏆',
    category: 'special',
    xp: 100,
  },
];

export interface UserBadgeState {
  unlockedBadgeIds: string[];
  totalXp: number;
  level: number;
  nextLevelXp: number;
  levelProgressPercent: number;
}

export class BadgeManager {
  private unlocked = new Set<string>();

  constructor(initialUnlockedIds: string[] = []) {
    initialUnlockedIds.forEach((id) => this.unlocked.add(id));
  }

  public unlock(badgeId: string): { unlocked: boolean; badge?: BadgeDefinition; becameAmbassador: boolean } {
    const badge = SENKRON_BADGES.find((b) => b.id === badgeId);
    if (!badge || this.unlocked.has(badgeId)) {
      return { unlocked: false, becameAmbassador: false };
    }

    this.unlocked.add(badgeId);
    let becameAmbassador = false;

    // Check meta-badge condition
    if (this.unlocked.size >= 5 && !this.unlocked.has('senkron_ambassador') && badgeId !== 'senkron_ambassador') {
      this.unlocked.add('senkron_ambassador');
      becameAmbassador = true;
    }

    return { unlocked: true, badge, becameAmbassador };
  }

  public isUnlocked(badgeId: string): boolean {
    return this.unlocked.has(badgeId);
  }

  public getState(): UserBadgeState {
    const unlockedIds = Array.from(this.unlocked);
    const totalXp = SENKRON_BADGES
      .filter((b) => this.unlocked.has(b.id))
      .reduce((sum, b) => sum + b.xp, 0);

    const level = Math.floor(totalXp / 80) + 1;
    const nextLevelXp = level * 80;
    const levelProgressPercent = Math.min(100, Math.round(((totalXp % 80) / 80) * 100));

    return {
      unlockedBadgeIds: unlockedIds,
      totalXp,
      level,
      nextLevelXp,
      levelProgressPercent,
    };
  }
}
