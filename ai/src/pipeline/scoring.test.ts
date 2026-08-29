import { describe, it, expect } from 'vitest';
import {
  enforceCharacterLimit,
  lengthFitScore,
  noveltyScore,
  rankCandidates,
  topicRelevance,
  HARD_CHARACTER_LIMIT,
} from './scoring';
import { PostCandidate } from '../types';

const mk = (id: string, content: string, charCount?: number): PostCandidate => ({
  id,
  hook: id,
  content,
  hashtags: ['#NSosyal'],
  characterCount: charCount ?? content.length,
  viralityScore: 0,
  entropyScore: 0,
});

describe('Explainable candidate scoring', () => {
  it('relevance rises when topic tokens appear in content', () => {
    const topic = 'WebAssembly ile tarayıcıda video düzenleme';
    const onTopic = 'WebAssembly sayesinde tarayıcıda video kesmek artık çok hızlı. #Yazılım';
    const offTopic = 'Bugün hava çok güzel, kahve içtim ve kitap okudum. #Gündem';
    expect(topicRelevance(topic, onTopic)).toBeGreaterThan(topicRelevance(topic, offTopic));
  });

  it('lengthFit is 1 under soft limit, decays to 0.6 at hard limit, 0 above', () => {
    expect(lengthFitScore(300)).toBe(1);
    expect(lengthFitScore(HARD_CHARACTER_LIMIT)).toBeCloseTo(0.6, 5);
    expect(lengthFitScore(HARD_CHARACTER_LIMIT + 1)).toBe(0);
  });

  it('novelty penalizes near-duplicate candidates', () => {
    const base = 'WebAssembly video düzenleme tarayıcı performans';
    expect(noveltyScore(base, [base + ' ekstra'])).toBeLessThan(noveltyScore(base, ['Kahve kitap hava gündem sabah']));
  });

  it('rankCandidates selects the observable-best candidate, not index 0', () => {
    const topic = 'WebAssembly video performansı';
    const weak = mk('c0', 'Kahve ve kitap ile sakin bir sabah geçirdim bugün. #Gündem');
    const strong = mk('c1', 'WebAssembly ile tarayıcıda video performansı ölçülebilir şekilde artıyor. #Yazılım');
    const { ranked, selectedIndex } = rankCandidates([weak, strong], topic);
    expect(selectedIndex).toBe(1);
    expect(ranked[0].id).toBe('c1');
    expect(strong.scores!.total).toBeGreaterThan(weak.scores!.total);
    // Skorlar sabit değil, türetilmiş: iki adayın toplam skorları farklı
    expect(strong.scores!.total).not.toBe(weak.scores!.total);
  });

  it('enforceCharacterLimit keeps content within 500 chars at word boundary', () => {
    const long = ('Kelime '.repeat(120)).trim();
    const out = enforceCharacterLimit(long);
    expect(out.length).toBeLessThanOrEqual(HARD_CHARACTER_LIMIT);
    expect(out.endsWith('…')).toBe(true);
    expect(enforceCharacterLimit('kısa metin')).toBe('kısa metin');
  });
});
