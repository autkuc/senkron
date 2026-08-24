export interface BadgeDefinition {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'video' | 'ai' | 'social' | 'game' | 'special';
    xp: number;
}
export declare const SENKRON_BADGES: BadgeDefinition[];
export interface UserBadgeState {
    unlockedBadgeIds: string[];
    totalXp: number;
    level: number;
    nextLevelXp: number;
    levelProgressPercent: number;
}
export declare class BadgeManager {
    private unlocked;
    constructor(initialUnlockedIds?: string[]);
    unlock(badgeId: string): {
        unlocked: boolean;
        badge?: BadgeDefinition;
        becameAmbassador: boolean;
    };
    isUnlocked(badgeId: string): boolean;
    getState(): UserBadgeState;
}
