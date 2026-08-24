import { ModerationCategory, ModerationResult } from '../types';
import { checkPromptInjection } from './injection-guard';

export { checkPromptInjection };

const BANNED_TERMS: Record<ModerationCategory, RegExp[]> = {
  hate_speech: [
    /ırkçılık/i, /nefret söylemi/i, /soykırım/i, /terör propagandası/i,
    /hate speech/i, /racist/i, /nazi/i,
  ],
  harassment: [
    /taciz/i, /şantaj/i, /tehdit et/i, /küfür et/i, /cyberbullying/i,
    /harass/i, /doxx/i, /blackmail/i,
  ],
  explicit: [
    /müstehcen/i, /porno/i, /çıplaklık/i, /nsfw/i, /pornography/i, /explicit content/i,
  ],
  violence: [
    /şiddet/i, /bomba yapımı/i, /cinayet/i, /intihar/i, /katliam/i,
    /violence/i, /kill/i, /suicide/i, /bomb/i,
  ],
  spam: [
    /kumar oyna/i, /bedava coin/i, /dolandırıcılık/i, /phishing/i,
    /free crypto/i, /get rich quick/i, /scam/i,
  ],
  misinformation: [
    /sahte haber/i, /dezenformasyon/i, /fake news/i, /conspiracy theory/i,
  ],
  prompt_injection: [],
};

export function moderateContent(text: string): ModerationResult {
  if (!text || text.trim().length === 0) {
    return {
      passed: false,
      flaggedCategories: ['spam'],
      reason: 'Girdi metni boş olamaz.',
      confidenceScore: 1.0,
    };
  }

  // Check injection first
  const injectionCheck = checkPromptInjection(text);
  if (!injectionCheck.passed) {
    return injectionCheck;
  }

  const flaggedCategories: ModerationCategory[] = [];

  for (const [category, patterns] of Object.entries(BANNED_TERMS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        flaggedCategories.push(category as ModerationCategory);
        break;
      }
    }
  }

  if (flaggedCategories.length > 0) {
    return {
      passed: false,
      flaggedCategories,
      reason: `Metin NSosyal Topluluk Kuralları'nı ihlal ediyor: [${flaggedCategories.join(', ')}]`,
      confidenceScore: 0.95,
    };
  }

  return {
    passed: true,
    flaggedCategories: [],
    confidenceScore: 1.0,
  };
}
