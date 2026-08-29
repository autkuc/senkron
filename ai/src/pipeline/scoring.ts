import { CandidateScores, PostCandidate } from '../types';
import { moderateContent } from '../guardrails/moderation';

/**
 * Açıklanabilir aday sıralama modülü.
 *
 * Tüm skorlar adayın GÖZLEMLENEBİLİR özelliklerinden türetilir (konu örtüşmesi,
 * uzunluk, çeşitlilik, güvenlik); hiçbir skor sabit atanmaz. Ağırlıklar aşağıda
 * tek yerde tanımlıdır ve summary çıktısında raporlanır.
 */

export const SCORE_WEIGHTS = {
  relevance: 0.3,
  languageQuality: 0.2,
  novelty: 0.15,
  lengthFit: 0.15,
  safety: 0.2,
} as const;

export const HARD_CHARACTER_LIMIT = 500;
export const SOFT_CHARACTER_LIMIT = 400;

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}#+]+/u)
    .filter((t) => t.length >= 3);

/** Konu token'larının aday içeriğinde görülme oranı (kök benzeşmesi toleranslı). */
export function topicRelevance(topic: string, content: string): number {
  const topicTokens = Array.from(new Set(tokenize(topic)));
  if (topicTokens.length === 0) return 0.5; // konu yoksa nötr: ödüllendirme/cezalandırma yok
  const contentTokens = Array.from(new Set(tokenize(content)));
  let hit = 0;
  for (const t of topicTokens) {
    const stem = t.slice(0, Math.min(5, t.length));
    if (contentTokens.some((c) => c === t || c.startsWith(stem) || t.startsWith(c.slice(0, Math.min(5, c.length))))) {
      hit++;
    }
  }
  return clamp01(hit / topicTokens.length);
}

/**
 * Dil kalitesi: temizleme sonrası kalan büyük/küçük harf anomalileri ve
 * bilinen yabancı kelime sızıntıları üzerinden türetilir.
 */
export function languageQualityScore(content: string): number {
  const words = content.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const anomalies = words.filter(
    (w) => w.length > 3 && /[a-zçğıöşü]/.test(w) && /[A-ZÇĞİÖŞÜ]/.test(w.slice(1))
  ).length;
  const foreignLeaks = words.filter((w) =>
    /\b(the|and|with|for|our|your|this|that|new|feature|update)\b/i.test(w)
  ).length;
  return clamp01(1 - (anomalies + foreignLeaks) / Math.max(3, words.length * 0.2));
}

/** Diğer adaylarla kelime kümesi örtüşmesi ne kadar düşükse çeşitlilik o kadar yüksek. */
export function noveltyScore(content: string, otherContents: string[]): number {
  const mine = new Set(tokenize(content));
  if (otherContents.length === 0 || mine.size === 0) return 0.5;
  let maxOverlap = 0;
  for (const other of otherContents) {
    const os = new Set(tokenize(other));
    let inter = 0;
    for (const t of mine) if (os.has(t)) inter++;
    const union = new Set([...mine, ...os]).size;
    maxOverlap = Math.max(maxOverlap, union > 0 ? inter / union : 0);
  }
  return clamp01(1 - maxOverlap);
}

/** 400 karaktere kadar tam, 400-500 arası doğrusal azalan, 500 üstü 0. */
export function lengthFitScore(characterCount: number): number {
  if (characterCount <= SOFT_CHARACTER_LIMIT) return 1;
  if (characterCount <= HARD_CHARACTER_LIMIT) {
    return 1 - 0.4 * ((characterCount - SOFT_CHARACTER_LIMIT) / (HARD_CHARACTER_LIMIT - SOFT_CHARACTER_LIMIT));
  }
  return 0;
}

export function safetyScore(content: string): number {
  return moderateContent(content).passed ? 1 : 0;
}

export function scoreCandidate(candidate: PostCandidate, topic: string, allContents: string[]): CandidateScores {
  const others = allContents.filter((c) => c !== candidate.content);
  const scores: CandidateScores = {
    relevance: round3(topicRelevance(topic, candidate.content)),
    languageQuality: round3(languageQualityScore(candidate.content)),
    novelty: round3(noveltyScore(candidate.content, others)),
    lengthFit: round3(lengthFitScore(candidate.characterCount)),
    safety: safetyScore(candidate.content),
    total: 0,
  };
  scores.total = round3(
    scores.relevance * SCORE_WEIGHTS.relevance +
      scores.languageQuality * SCORE_WEIGHTS.languageQuality +
      scores.novelty * SCORE_WEIGHTS.novelty +
      scores.lengthFit * SCORE_WEIGHTS.lengthFit +
      scores.safety * SCORE_WEIGHTS.safety
  );
  return scores;
}

/** Adayları toplam skora göre sıralar; selectedIndex orijinal dizi içindeki en yüksek skoru gösterir. */
export function rankCandidates(
  candidates: PostCandidate[],
  topic: string
): { ranked: PostCandidate[]; selectedIndex: number } {
  const allContents = candidates.map((c) => c.content);
  const scored = candidates.map((c) => ({ c, s: scoreCandidate(c, topic, allContents) }));
  let bestIdx = 0;
  scored.forEach((entry, i) => {
    entry.c.scores = entry.s;
    entry.c.viralityScore = Math.round(entry.s.total * 100);
    entry.c.entropyScore = Math.round(entry.s.novelty * 100);
    if (entry.s.total > scored[bestIdx].s.total) bestIdx = i;
  });
  const ranked = [...scored].sort((a, b) => b.s.total - a.s.total).map((e) => e.c);
  return { ranked, selectedIndex: bestIdx };
}

/** 500 karakter üstü içeriği kelime sınırında keser; kesme yapılırsa '…' ekler. */
export function enforceCharacterLimit(content: string, limit: number = HARD_CHARACTER_LIMIT): string {
  if (content.length <= limit) return content;
  const cut = content.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > limit * 0.6 ? lastSpace : limit - 1;
  return cut.slice(0, safeCut).trimEnd() + '…';
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000;
}
