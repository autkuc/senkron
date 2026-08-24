import { ModerationResult } from '../types';

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /disregard\s+(all\s+)?prior\s+prompts/i,
  /you\s+are\s+now\s+a/i,
  /DAN\s+mode/i,
  /override\s+system\s+prompt/i,
  /act\s+as\s+an?\s+unrestricted/i,
  /bypass\s+(safety|content|moderation)\s+(filters|rules)/i,
  /system:\s*/i,
  /\[system\]/i,
  /<<SYS>>/i,
];

export function checkPromptInjection(input: string): ModerationResult {
  const text = input.trim();
  const flagged = INJECTION_PATTERNS.some((pattern) => pattern.test(text));

  if (flagged) {
    return {
      passed: false,
      flaggedCategories: ['prompt_injection'],
      reason: 'İstem enjeksiyonu ve güvenlik kurallarını aşma girişimi tespit edildi.',
      confidenceScore: 0.98,
    };
  }

  return {
    passed: true,
    flaggedCategories: [],
    confidenceScore: 1.0,
  };
}
