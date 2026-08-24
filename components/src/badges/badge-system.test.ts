import { describe, it, expect } from 'vitest';
import { BadgeManager, SENKRON_BADGES } from './badge-system';

describe('BadgeManager Gamification Engine', () => {
  it('initializes with zero unlocked badges by default', () => {
    const manager = new BadgeManager();
    const state = manager.getState();

    expect(state.unlockedBadgeIds).toHaveLength(0);
    expect(state.totalXp).toBe(0);
    expect(state.level).toBe(1);
    expect(state.nextLevelXp).toBe(80);
    expect(state.levelProgressPercent).toBe(0);
  });

  it('unlocks individual badges and calculates XP and level progression', () => {
    const manager = new BadgeManager();
    
    // Unlock Video Master (50 XP)
    const res1 = manager.unlock('video_master');
    expect(res1.unlocked).toBe(true);
    expect(res1.badge?.title).toBe('Video Ustası');

    let state = manager.getState();
    expect(state.totalXp).toBe(50);
    expect(state.level).toBe(1);
    expect(state.levelProgressPercent).toBe(63); // 50/80 = 62.5% -> 63%

    // Unlock AI Architect (50 XP) -> Total 100 XP -> Level 2
    const res2 = manager.unlock('ai_architect');
    expect(res2.unlocked).toBe(true);

    state = manager.getState();
    expect(state.totalXp).toBe(100);
    expect(state.level).toBe(2);
    expect(state.nextLevelXp).toBe(160);
  });

  it('prevents duplicate unlocks of the same badge', () => {
    const manager = new BadgeManager();
    manager.unlock('community_voice');
    
    const duplicate = manager.unlock('community_voice');
    expect(duplicate.unlocked).toBe(false);
    expect(manager.getState().totalXp).toBe(30);
  });

  it('automatically unlocks Senkron Ambassador meta-badge when 5 badges are completed', () => {
    const manager = new BadgeManager();
    manager.unlock('video_master');       // 50
    manager.unlock('ai_architect');       // 50
    manager.unlock('community_voice');    // 30
    manager.unlock('interaction_lead');   // 30
    
    expect(manager.isUnlocked('senkron_ambassador')).toBe(false);

    // 5th badge
    const res5 = manager.unlock('offline_hero'); // 40
    expect(res5.becameAmbassador).toBe(true);
    expect(manager.isUnlocked('senkron_ambassador')).toBe(true);

    const state = manager.getState();
    // 50+50+30+30+40 + 100 (ambassador) = 300 XP
    expect(state.totalXp).toBe(300);
    expect(state.level).toBe(4); // 300 / 80 + 1 = 3 + 1 = 4
  });
});
