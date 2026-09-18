import { describe, it, expect } from 'vitest';
import { TwoStageGenerator } from './two-stage-generator';
import { SmartRouter } from '../router/smart-router';

describe('TwoStageGenerator Turkish Pipeline', () => {
  const router = new SmartRouter({ localBaseUrl: 'http://127.0.0.1:11434/v1', localTimeoutMs: 200 });
  const generator = new TwoStageGenerator(router);

  it('generates multiple candidates with derived (non-constant) scores', async () => {
    const topic = 'WebAssembly ve modern video düzenleme teknolojileri';
    const result = await generator.generateCandidates(topic, 'viral', 3);

    expect(result.candidates).toHaveLength(3);

    for (const candidate of result.candidates) {
      expect(candidate.hook).toBeDefined();
      expect(candidate.hashtags).toContain('#NSosyal');
      expect(candidate.characterCount).toBeLessThanOrEqual(500);
      expect(candidate.scores).toBeDefined();
      expect(candidate.scores!.total).toBeGreaterThanOrEqual(0);
      expect(candidate.scores!.total).toBeLessThanOrEqual(1);
      // Türetilmiş 0-100 ölçekleri toplam skorla tutarlı olmalı
      expect(candidate.viralityScore).toBe(Math.round(candidate.scores!.total * 100));
    }

    // Seçim, skorların argmax'ı olmalı (sabit index yok)
    const totals = result.candidates.map((c) => c.scores!.total);
    const argmax = totals.indexOf(Math.max(...totals));
    expect(result.selectedIndex).toBe(argmax);

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

  it('enforces the 500 character hard limit on oversized model output', async () => {
    const oversized = 'WebAssembly video '.repeat(60); // ~1080 chars
    const gen = new TwoStageGenerator(undefined, { allowSimulation: true });
    const result = await gen.generateCandidates('WebAssembly video', 'viral', 1, async () => ({
      text: oversized,
      raw: null,
    }));
    expect(result.candidates[0].characterCount).toBeLessThanOrEqual(500);
  });

  it('refuses to fabricate output when no LLM is reachable and simulation is disabled (production)', async () => {
    const strictRouter = new SmartRouter({ localBaseUrl: 'http://127.0.0.1:11434/v1', localTimeoutMs: 200, allowSimulation: false });
    const strictGen = new TwoStageGenerator(strictRouter, { allowSimulation: false });
    await expect(
      strictGen.generateCandidates('Herhangi bir konu', 'viral', 2)
    ).rejects.toThrow(/LLM_UNAVAILABLE/);
  });
});
