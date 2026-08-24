import { describe, it, expect } from 'vitest';
import { TwoStageGenerator } from './two-stage-generator';
import { SmartRouter } from '../router/smart-router';

describe('TwoStageGenerator Turkish Pipeline', () => {
  const router = new SmartRouter();
  const generator = new TwoStageGenerator(router);

  it('generates multiple ranked candidates with distinct hooks and hashtags', async () => {
    const topic = 'WebAssembly ve modern video düzenleme teknolojileri';
    const result = await generator.generateCandidates(topic, 'viral', 3);

    expect(result.candidates).toHaveLength(3);
    expect(result.selectedIndex).toBe(0);

    for (const candidate of result.candidates) {
      expect(candidate.hook).toBeDefined();
      expect(candidate.hashtags).toContain('#NSosyal');
      expect(candidate.characterCount).toBeLessThanOrEqual(500);
      expect(candidate.viralityScore).toBeGreaterThan(0);
      expect(candidate.entropyScore).toBeGreaterThan(0);
    }

    // Ensure candidate hooks are distinct
    const hookSet = new Set(result.candidates.map((c) => c.hook));
    expect(hookSet.size).toBe(3);
  });

  it('adapts tone and hooks for professional and educational prompts', async () => {
    const profRes = await generator.generateCandidates('Yapay zeka etiği ve veri güvenliği', 'professional', 2);
    expect(profRes.candidates[0].hook).toMatch(/(Analiz|Standart|Kurumsal)/i);

    const eduRes = await generator.generateCandidates('TypeScript generic tipler nasıl kullanılır', 'educational', 2);
    expect(eduRes.candidates[0].hook).toMatch(/(Öğrenin|Hata|Rehberi)/i);
  });
});
