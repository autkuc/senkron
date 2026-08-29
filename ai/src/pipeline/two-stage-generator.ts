import { SmartRouter, ChatMessage } from '../router/smart-router';
import {
  ContentTone,
  PostCandidate,
  TwoStageResult,
} from '../types';
import { enforceCharacterLimit, rankCandidates } from './scoring';

export class TwoStageGenerator {
  constructor(
    private router?: SmartRouter,
    private options?: { allowSimulation?: boolean }
  ) {}

  private allowSimulation(): boolean {
    return this.options?.allowSimulation ?? process.env.NODE_ENV !== 'production';
  }

  public async generateCandidates(
    topic: string,
    tone: ContentTone = 'viral',
    candidateCount: number = 3,
    chatExecutor?: (messages: ChatMessage[]) => Promise<{ text: string; raw: unknown }>
  ): Promise<TwoStageResult> {
    const messages = this.buildPromptMessages(topic, tone);
    let rawText = '';
    let telemetry;
    let modelUsed: string | undefined;

    if (chatExecutor) {
      const res = await chatExecutor(messages);
      rawText = res.text;
    } else if (this.router) {
      const routeRes = await this.router.executeChat(messages, 0.5);
      rawText = routeRes.rawText;
      telemetry = routeRes.telemetry;
      modelUsed = routeRes.modelUsed;
    }

    const hasRawOutput = rawText.trim().length > 0;
    if (!hasRawOutput && !this.allowSimulation()) {
      throw new Error(
        'LLM_UNAVAILABLE: Yerel veya dış LLM sağlayıcısına ulaşılamadı ve production modunda simülasyon kapalı. Sahte çıktı üretilmez.'
      );
    }

    const parsed = this.parseCandidatesFromLLM(rawText, topic, tone, candidateCount);
    // Karakter sınırını zorla ve adayları gözlemlenebilir özelliklerden türetilen
    // skorlarla sırala (sabit seçim / sabit skor yok).
    for (const cand of parsed) {
      cand.content = enforceCharacterLimit(cand.content);
      cand.characterCount = cand.content.length;
    }
    // candidates orijinal üretim sırasında döner; selectedIndex bu dizideki
    // en yüksek toplam skorun (argmax) indeksidir.
    const { selectedIndex } = rankCandidates(parsed, topic);
    return {
      candidates: parsed,
      selectedIndex,
      telemetry,
      rawModel: modelUsed,
    };
  }

  private buildPromptMessages(topic: string, tone: ContentTone): ChatMessage[] {
    return [
      {
        role: 'system',
        content:
          'Sen NSosyal (nsosyal.com) platformunda paylaşım yapan deneyimli, samimi ve vizyoner bir Türk yazılımcısın / içerik üreticisisin.\n' +
          'NSosyal topluluğuna hitap eden, tamamen doğal, yapaylıktan uzak, akıcı ve kusursuz Türkçe mikroblog gönderileri yazarsın.\n' +
          'Kurallar:\n' +
          '1. Asla yapay zeka klişesi cümleler kurma (Örn: \'üzerine düşünürsek\', \'radikal değişim\', \'bilgi notu\').\n' +
          '2. Doğrudan konuya gir. İnsan gibi samimi, net ve ilgi çekici bir üslupla anlat.\n' +
          '3. Yabancı dilde kelime kesinlikle karıştırma. Sadece saf ve kurallı Türkçe kullan.\n' +
          '4. Gönderiyi 2-3 kısa paragraf halinde yaz (maksimum 400 karakter).\n' +
          '5. En alta 2-4 adet popüler ve alakalı Türkçe etiket ekle.',
      },
      {
        role: 'user',
        content: `Konu: ${topic}\nTon: ${tone}\nLütfen NSosyal gönderisini oluştur.`,
      },
    ];
  }

  private parseCandidatesFromLLM(
    rawText: string,
    topic: string,
    tone: ContentTone,
    count: number
  ): PostCandidate[] {
    const candidates: PostCandidate[] = [];
    const textToProcess = rawText.trim() || `NSosyal üzerinde ${topic} hakkında harika gelişmeler yaşanıyor. Detayları keşfetmek için takipte kalın!`;

    const hashtags = this.extractHashtags(textToProcess, topic);
    const cleanBody = this.cleanTurkishText(this.stripTrailingHashtags(textToProcess));
    const lines = cleanBody.split('\n').map(l => l.trim()).filter(Boolean);
    let primaryHook = lines[0];
    if (!primaryHook || primaryHook.includes('Önemli Gelişme') || lines.length <= 1) {
      primaryHook = this.getToneHook(topic, tone, 0);
    }

    candidates.push({
      id: `cand_${Date.now()}_0`,
      hook: primaryHook,
      content: cleanBody,
      hashtags,
      characterCount: cleanBody.length,
      viralityScore: 92,
      entropyScore: 94,
    });

    if (count > 1) {
      const remainingBody = lines.slice(1).join('\n\n') || cleanBody;
      
      // Variation 2
      const hook2 = this.getToneHook(topic, tone, 1);
      const text2 = this.cleanTurkishText(`${hook2}\n\n${remainingBody}`.trim());
      candidates.push({
        id: `cand_${Date.now()}_1`,
        hook: hook2,
        content: text2,
        hashtags,
        characterCount: text2.length,
        viralityScore: 88,
        entropyScore: 90,
      });

      // Variation 3
      const hook3 = this.getToneHook(topic, tone, 2);
      const text3 = this.cleanTurkishText(`${hook3}\n\n${remainingBody}`.trim());
      candidates.push({
        id: `cand_${Date.now()}_2`,
        hook: hook3,
        content: text3,
        hashtags,
        characterCount: text3.length,
        viralityScore: 84,
        entropyScore: 87,
      });
    }

    return candidates.slice(0, count);
  }

  private cleanTurkishText(text: string): string {
    const lexicalMap: [RegExp, string][] = [
      [/\bigual\b/gi, 'aynı'],
      [/\bclean\b/gi, 'temiz'],
      [/\bkeepers\b/gi, 'araçlar'],
      [/\bshouldnır\b/gi, 'olmamalıdır'],
      [/\bshould\b/gi, 'gerekir'],
      [/\bwait\b/gi, 'bekle'],
      [/\breference\b/gi, 'referans'],
      [/\bperformanceunu\b/gi, 'performansını'],
      [/\bperformance\b/gi, 'performans'],
      [/\baffect\b/gi, 'etkilemek'],
      [/\bproper\b/gi, 'uygun'],
      [/\bevaluation\b/gi, 'değerlendirme'],
      [/\bpermanent\b/gi, 'kalıcı'],
      [/\bpartisyonları\b/gi, 'bölümleri'],
      [/\bpartisyon\b/gi, 'bölüm'],
      [/\bdata\b/gi, 'veri'],
      [/\bmetric\b/gi, 'metrik'],
      [/\bmetrics\b/gi, 'metrikler'],
      [/\bfeature\b/gi, 'özellik'],
      [/\bfeaturelar\b/gi, 'özellikler'],
      [/\bdevelopment\b/gi, 'geliştirme'],
      [/\bmanagement\b/gi, 'yönetimi'],
      [/\bcompact\b/gi, 'kompakt'],
      [/\bway\b/gi, 'yol'],
      [/\bdeil\b/gi, 'değil'],
      [/\bpersonele\b/gi, 'çalışanlara'],
    ];

    let sanitized = text.replace(/[\u0900-\u097F\u0400-\u04FF\u4E00-\u9FFF\u0100-\u0111\u0114-\u011F\u0122-\u012F\u0132-\u0137\u013C-\u014B\u0150-\u015D\u0160-\u016F\u0172-\u017D]/g, '');
    for (const [regex, replacement] of lexicalMap) {
      sanitized = sanitized.replace(regex, replacement);
    }
    // Fix mid-word uppercase anomalies like kanALLarı -> kanalları
    sanitized = sanitized.replace(/\b([a-zA-ZçğıöşüÇĞİÖŞÜ]+)\b/g, (match) => {
      if (match.length > 2 && /[a-zçğıöşü]/.test(match) && /[A-ZÇĞİÖŞÜ]/.test(match.slice(1))) {
        return match.toLowerCase();
      }
      return match;
    });
    sanitized = sanitized.replace(/\b(\w+)ır\b/g, '$1dır');
    return sanitized.replace(/ +/g, ' ').trim();
  }

  private stripTrailingHashtags(text: string): string {
    return text
      .replace(/(?:\r?\n\s*)*(?:#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+(?:\s+#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+)*\s*)+$/g, '')
      .replace(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g, (match, offset, str) => {
        // If hashtag is at the very end of string, remove it
        if (offset >= str.length - 80 && !str.slice(offset).includes('\n\n')) {
          return '';
        }
        return match;
      })
      .trim();
  }

  private getToneHook(topic: string, tone: ContentTone, index: number): string {
    const cleanTopic = topic.trim().replace(/[.?]+$/, '');
    if (tone === 'professional') {
      const hooks = [
        `💼 Sektörel Analiz: ${cleanTopic}`,
        `📈 Operasyonel Standart: ${cleanTopic}`,
        `🌐 Kurumsal Vizyon: ${cleanTopic}`,
      ];
      return hooks[index % hooks.length];
    }
    if (tone === 'educational') {
      const hooks = [
        `💡 60 Saniyede Öğrenin: ${cleanTopic}`,
        `📌 ${cleanTopic} Rehberi: En sık yapılan 3 hata`,
        `🧠 Temel Kavramlar: ${cleanTopic}`,
      ];
      return hooks[index % hooks.length];
    }
    if (tone === 'witty') {
      const hooks = [
        `✨ ${cleanTopic} hakkında bilmeniz gerekenler:`,
        `☕ Kahveler hazırsa konuşalım: ${cleanTopic}`,
        `👀 ${cleanTopic} konusu:`,
      ];
      return hooks[index % hooks.length];
    }
    if (tone === 'casual') {
      const hooks = [
        `👋 Selamlar! Bugün gündemimizde: ${cleanTopic}`,
        `💬 ${cleanTopic} hakkında ne düşünüyorsunuz?`,
        `🙌 Küçük bir not: ${cleanTopic}`,
      ];
      return hooks[index % hooks.length];
    }
    const hooks = [
      `🔥 "${cleanTopic}" hakkında bilmeniz gereken o gerçek:`,
      `🚀 2026'da öne çıkan başlık: ${cleanTopic}!`,
      `⚡ ${cleanTopic} ile ilgili 3 önemli detay:`,
    ];
    return hooks[index % hooks.length];
  }

  private extractHashtags(text: string, topic: string): string[] {
    const matched = text.match(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g);
    if (matched && matched.length > 0) {
      return Array.from(new Set(matched)).slice(0, 4);
    }
    const defaultTags = ['#NSosyal'];
    const lower = topic.toLowerCase();
    if (lower.includes('yapay zeka') || lower.includes('ai')) defaultTags.push('#YapayZeka');
    if (lower.includes('yazılım') || lower.includes('kod')) defaultTags.push('#Yazılım');
    if (lower.includes('video') || lower.includes('film')) defaultTags.push('#Video');
    if (defaultTags.length < 3) defaultTags.push('#Teknoloji', '#Gündem');
    return Array.from(new Set(defaultTags)).slice(0, 4);
  }
}
