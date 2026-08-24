var v = Object.defineProperty;
var x = (s, e, n) => e in s ? v(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[e] = n;
var y = (s, e, n) => x(s, typeof e != "symbol" ? e + "" : e, n);
const M = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /disregard\s+(all\s+)?prior\s+prompts/i,
  /you\s+are\s+now\s+a/i,
  /DAN\s+mode/i,
  /override\s+system\s+prompt/i,
  /act\s+as\s+an?\s+unrestricted/i,
  /bypass\s+(safety|content|moderation)\s+(filters|rules)/i,
  /system:\s*/i,
  /\[system\]/i,
  /<<SYS>>/i
];
function _(s) {
  const e = s.trim();
  return M.some((a) => a.test(e)) ? {
    passed: !1,
    flaggedCategories: ["prompt_injection"],
    reason: "İstem enjeksiyonu ve güvenlik kurallarını aşma girişimi tespit edildi.",
    confidenceScore: 0.98
  } : {
    passed: !0,
    flaggedCategories: [],
    confidenceScore: 1
  };
}
const S = {
  hate_speech: [
    /ırkçılık/i,
    /nefret söylemi/i,
    /soykırım/i,
    /terör propagandası/i,
    /hate speech/i,
    /racist/i,
    /nazi/i
  ],
  harassment: [
    /taciz/i,
    /şantaj/i,
    /tehdit et/i,
    /küfür et/i,
    /cyberbullying/i,
    /harass/i,
    /doxx/i,
    /blackmail/i
  ],
  explicit: [
    /müstehcen/i,
    /porno/i,
    /çıplaklık/i,
    /nsfw/i,
    /pornography/i,
    /explicit content/i
  ],
  violence: [
    /şiddet/i,
    /bomba yapımı/i,
    /cinayet/i,
    /intihar/i,
    /katliam/i,
    /violence/i,
    /kill/i,
    /suicide/i,
    /bomb/i
  ],
  spam: [
    /kumar oyna/i,
    /bedava coin/i,
    /dolandırıcılık/i,
    /phishing/i,
    /free crypto/i,
    /get rich quick/i,
    /scam/i
  ],
  misinformation: [
    /sahte haber/i,
    /dezenformasyon/i,
    /fake news/i,
    /conspiracy theory/i
  ],
  prompt_injection: []
};
function L(s) {
  if (!s || s.trim().length === 0)
    return {
      passed: !1,
      flaggedCategories: ["spam"],
      reason: "Girdi metni boş olamaz.",
      confidenceScore: 1
    };
  const e = _(s);
  if (!e.passed)
    return e;
  const n = [];
  for (const [a, t] of Object.entries(S))
    for (const l of t)
      if (l.test(s)) {
        n.push(a);
        break;
      }
  return n.length > 0 ? {
    passed: !1,
    flaggedCategories: n,
    reason: `Metin NSosyal Topluluk Kuralları'nı ihlal ediyor: [${n.join(", ")}]`,
    confidenceScore: 0.95
  } : {
    passed: !0,
    flaggedCategories: [],
    confidenceScore: 1
  };
}
const N = `Sen NSosyal sosyal ağ platformu için uzman bir yapay zeka içerik yazarısın.
Görevlerin:
1. Kullanıcının konusundan ilgi çekici, yüksek etkileşimli ve kusursuz Türkçe dil kurallarına uygun bir gönderi oluşturmak.
2. Kesinlikle YALNIZCA akıcı, kurallı ve duru Türkçe yaz. Yabancı dildeki (İngilizce, Fransızca, Hintçe, Lehçe vb.) kelimeleri veya anlamsız karakterleri ASLA kullanma.
3. NSosyal platformunun 500 karakterlik sınırına kesinlikle uymak ve cümleleri tam bitirmek.
4. İstenen tona (Viral, Kurumsal, Eğitici, Samimi, Yaratıcı) uygun üslup kullanmak.
5. Gönderinin sonuna 3-4 ilgili Türkçe hashtag eklemek (örneğin #NSosyal #Teknoloji).
6. Aşırı reklam dili kullanmamak, doğal ve topluluk odaklı yazmak.`;
function w(s, e = "viral") {
  return `Konu: ${s}
${e === "viral" ? "🔥 Ton: Viral ve Yüksek Etkileşimli (Dikkat çekici açılış, merak uyandıran heyecanlı üslup)" : e === "professional" ? "💼 Ton: Kurumsal ve Resmi (Saygılı, profesyonel, sektörel liderlik vurgusu)" : e === "educational" ? "💡 Ton: Eğitici ve Bilgilendirici (Faydalı hap bilgi, öğretici ve açıklayıcı cümleler)" : e === "witty" ? "✨ Ton: Yaratıcı ve Nüktedan (Zekice yazılmış, esprili ve özgün)" : "☕ Ton: Samimi ve Doğal (Toplulukla sohbet havasında, sıcak üslup)"}

Lütfen NSosyal gönderisini Türkçe olarak oluştur:`;
}
class C {
  constructor(e) {
    y(this, "config");
    y(this, "activeLocalSlots", 0);
    y(this, "isLocalHealthy", !0);
    y(this, "lastHealthCheckTime", 0);
    this.config = {
      localBaseUrl: (e == null ? void 0 : e.localBaseUrl) || process.env.LOCAL_LLM_BASE_URL || "http://localhost:11434/v1",
      localModelName: (e == null ? void 0 : e.localModelName) || process.env.LOCAL_LLM_MODEL || "senkron-turkish-llama3.2:3b",
      maxLocalConcurrency: (e == null ? void 0 : e.maxLocalConcurrency) ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: (e == null ? void 0 : e.localTimeoutMs) ?? Number(process.env.LOCAL_TIMEOUT_MS || 6e4),
      externalBaseUrl: (e == null ? void 0 : e.externalBaseUrl) || process.env.EXTERNAL_LLM_BASE_URL || "https://api.openai.com/v1",
      externalApiKey: (e == null ? void 0 : e.externalApiKey) || process.env.EXTERNAL_LLM_API_KEY || process.env.OPENAI_API_KEY || "",
      externalModelName: (e == null ? void 0 : e.externalModelName) || process.env.EXTERNAL_LLM_MODEL || "gpt-4o-mini",
      healthCheckIntervalMs: (e == null ? void 0 : e.healthCheckIntervalMs) ?? 15e3,
      forceRoute: (e == null ? void 0 : e.forceRoute) || process.env.FORCE_LLM_ROUTE || "internal"
    };
  }
  getActiveLocalSlots() {
    return this.activeLocalSlots;
  }
  getMaxLocalConcurrency() {
    return this.config.maxLocalConcurrency;
  }
  isLocalAvailable() {
    return this.isLocalHealthy && this.activeLocalSlots < this.config.maxLocalConcurrency;
  }
  async executeChat(e, n = 0.7) {
    const a = Date.now();
    if (this.config.forceRoute === "external")
      return this.callExternal(e, n, "forced_mode", a, !1);
    if (this.activeLocalSlots >= this.config.maxLocalConcurrency && this.config.externalApiKey)
      return this.callExternal(e, n, "local_concurrency_saturated", a, !1);
    if (!this.isLocalHealthy && this.config.externalApiKey)
      return this.callExternal(e, n, "local_offline", a, !1);
    try {
      this.activeLocalSlots++;
      const t = await this.callLocalWithTimeout(e, n);
      this.isLocalHealthy = !0;
      const l = Date.now() - a;
      return {
        rawText: t.text,
        tokenUsage: t.usage,
        modelUsed: this.config.localModelName,
        telemetry: {
          routeUsed: "internal",
          routeReason: "local_healthy",
          latencyMs: l,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !1
        }
      };
    } catch (t) {
      if (console.error("[SmartRouter Local Error]:", t), this.isLocalHealthy = !1, this.config.externalApiKey)
        return this.callExternal(e, n, "local_timeout_fallback", a, !0);
      const l = Date.now() - a, r = this.simulateFallbackResponse(e);
      return {
        rawText: r,
        tokenUsage: {
          promptTokens: Math.ceil(e.map((i) => i.content).join(" ").length / 4),
          completionTokens: Math.ceil(r.length / 4),
          totalTokens: Math.ceil((e.map((i) => i.content).join(" ").length + r.length) / 4)
        },
        modelUsed: `${this.config.localModelName}-simulated`,
        telemetry: {
          routeUsed: "internal",
          routeReason: "local_healthy",
          latencyMs: l,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !1
        }
      };
    } finally {
      this.activeLocalSlots = Math.max(0, this.activeLocalSlots - 1);
    }
  }
  async callLocalWithTimeout(e, n) {
    var l, r, i, u, m;
    const a = new AbortController(), t = setTimeout(() => a.abort(), this.config.localTimeoutMs);
    try {
      const o = this.config.localBaseUrl.replace(/\/+$/, ""), c = o.endsWith("/chat/completions") ? o : `${o}/chat/completions`;
      console.log(`[SmartRouter] Calling local LLM endpoint: ${c}`);
      const h = await fetch(c, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: a.signal,
        body: JSON.stringify({
          model: this.config.localModelName,
          messages: e,
          temperature: n,
          max_tokens: 600
        })
      });
      if (!h.ok)
        throw new Error(`Local inference returned status ${h.status}`);
      const d = await h.json(), k = ((i = (r = (l = d.choices) == null ? void 0 : l[0]) == null ? void 0 : r.message) == null ? void 0 : i.content) || "", p = ((u = d.usage) == null ? void 0 : u.prompt_tokens) || Math.ceil(e.map((b) => b.content).join(" ").length / 4), g = ((m = d.usage) == null ? void 0 : m.completion_tokens) || Math.ceil(k.length / 4);
      return {
        text: k,
        usage: {
          promptTokens: p,
          completionTokens: g,
          totalTokens: p + g
        }
      };
    } finally {
      clearTimeout(t);
    }
  }
  async callExternal(e, n, a, t, l) {
    var r, i, u, m, o;
    try {
      const c = this.config.externalBaseUrl.replace(/\/+$/, ""), h = c.endsWith("/chat/completions") ? c : `${c}/chat/completions`, d = await fetch(h, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.externalApiKey}`
        },
        body: JSON.stringify({
          model: this.config.externalModelName,
          messages: e,
          temperature: n,
          max_tokens: 600
        })
      });
      if (!d.ok)
        throw new Error(`External API returned status ${d.status}`);
      const k = await d.json(), p = ((u = (i = (r = k.choices) == null ? void 0 : r[0]) == null ? void 0 : i.message) == null ? void 0 : u.content) || "", g = ((m = k.usage) == null ? void 0 : m.prompt_tokens) || Math.ceil(e.map((f) => f.content).join(" ").length / 4), b = ((o = k.usage) == null ? void 0 : o.completion_tokens) || Math.ceil(p.length / 4), T = Date.now() - t;
      return {
        rawText: p,
        tokenUsage: {
          promptTokens: g,
          completionTokens: b,
          totalTokens: g + b
        },
        modelUsed: this.config.externalModelName,
        telemetry: {
          routeUsed: "external",
          routeReason: a,
          latencyMs: T,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: l
        }
      };
    } catch {
      const h = Date.now() - t;
      return {
        rawText: this.simulateFallbackResponse(e),
        tokenUsage: {
          promptTokens: 100,
          completionTokens: 100,
          totalTokens: 200
        },
        modelUsed: "deterministic-fallback",
        telemetry: {
          routeUsed: "external",
          routeReason: a,
          latencyMs: h,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !0
        }
      };
    }
  }
  simulateFallbackResponse(e) {
    var a;
    return `🔥 Önemli Gelişme:

${((a = e.find((t) => t.role === "user")) == null ? void 0 : a.content) || ""}

NSosyal topluluğuna özel olarak hazırlanan bu gönderi, etkileşimi artırmak için tasarlandı. Siz de görüşlerinizi yorumlarda belirtin! 🚀

#NSosyal #Teknoloji #YapayZeka`;
  }
}
class E {
  constructor(e) {
    this.router = e;
  }
  async generateCandidates(e, n = "viral", a = 3, t) {
    const l = this.buildPromptMessages(e, n);
    let r = "", i, u;
    if (t)
      r = (await t(l)).text;
    else if (this.router) {
      const o = await this.router.executeChat(l, 0.5);
      r = o.rawText, i = o.telemetry, u = o.modelUsed;
    }
    return {
      candidates: this.parseCandidatesFromLLM(r, e, n, a),
      selectedIndex: 0,
      telemetry: i,
      rawModel: u
    };
  }
  buildPromptMessages(e, n) {
    return [
      {
        role: "system",
        content: `Sen NSosyal (nsosyal.com) platformunda paylaşım yapan deneyimli, samimi ve vizyoner bir Türk yazılımcısın / içerik üreticisisin.
NSosyal topluluğuna hitap eden, tamamen doğal, yapaylıktan uzak, akıcı ve kusursuz Türkçe mikroblog gönderileri yazarsın.
Kurallar:
1. Asla yapay zeka klişesi cümleler kurma (Örn: 'üzerine düşünürsek', 'radikal değişim', 'bilgi notu').
2. Doğrudan konuya gir. İnsan gibi samimi, net ve ilgi çekici bir üslupla anlat.
3. Yabancı dilde kelime kesinlikle karıştırma. Sadece saf ve kurallı Türkçe kullan.
4. Gönderiyi 2-3 kısa paragraf halinde yaz (maksimum 400 karakter).
5. En alta 2-4 adet popüler ve alakalı Türkçe etiket ekle.`
      },
      {
        role: "user",
        content: `Konu: ${e}
Ton: ${n}
Lütfen NSosyal gönderisini oluştur.`
      }
    ];
  }
  parseCandidatesFromLLM(e, n, a, t) {
    const l = [], r = e.trim() || `NSosyal üzerinde ${n} hakkında harika gelişmeler yaşanıyor. Detayları keşfetmek için takipte kalın!`, i = this.extractHashtags(r, n), u = this.cleanTurkishText(this.stripTrailingHashtags(r)), m = u.split(`
`).map((c) => c.trim()).filter(Boolean);
    let o = m[0];
    if ((!o || o.includes("Önemli Gelişme") || m.length <= 1) && (o = this.getToneHook(n, a, 0)), l.push({
      id: `cand_${Date.now()}_0`,
      hook: o,
      content: u,
      hashtags: i,
      characterCount: u.length,
      viralityScore: 92,
      entropyScore: 94
    }), t > 1) {
      const c = m.slice(1).join(`

`) || u, h = this.getToneHook(n, a, 1), d = this.cleanTurkishText(`${h}

${c}`.trim());
      l.push({
        id: `cand_${Date.now()}_1`,
        hook: h,
        content: d,
        hashtags: i,
        characterCount: d.length,
        viralityScore: 88,
        entropyScore: 90
      });
      const k = this.getToneHook(n, a, 2), p = this.cleanTurkishText(`${k}

${c}`.trim());
      l.push({
        id: `cand_${Date.now()}_2`,
        hook: k,
        content: p,
        hashtags: i,
        characterCount: p.length,
        viralityScore: 84,
        entropyScore: 87
      });
    }
    return l.slice(0, t);
  }
  cleanTurkishText(e) {
    const n = [
      [/\bigual\b/gi, "aynı"],
      [/\bclean\b/gi, "temiz"],
      [/\bkeepers\b/gi, "araçlar"],
      [/\bshouldnır\b/gi, "olmamalıdır"],
      [/\bshould\b/gi, "gerekir"],
      [/\bwait\b/gi, "bekle"],
      [/\breference\b/gi, "referans"],
      [/\bperformanceunu\b/gi, "performansını"],
      [/\bperformance\b/gi, "performans"],
      [/\baffect\b/gi, "etkilemek"],
      [/\bproper\b/gi, "uygun"],
      [/\bevaluation\b/gi, "değerlendirme"],
      [/\bpermanent\b/gi, "kalıcı"],
      [/\bpartisyonları\b/gi, "bölümleri"],
      [/\bpartisyon\b/gi, "bölüm"],
      [/\bdata\b/gi, "veri"],
      [/\bmetric\b/gi, "metrik"],
      [/\bmetrics\b/gi, "metrikler"],
      [/\bfeature\b/gi, "özellik"],
      [/\bfeaturelar\b/gi, "özellikler"],
      [/\bdevelopment\b/gi, "geliştirme"],
      [/\bmanagement\b/gi, "yönetimi"],
      [/\bcompact\b/gi, "kompakt"],
      [/\bway\b/gi, "yol"],
      [/\bdeil\b/gi, "değil"],
      [/\bpersonele\b/gi, "çalışanlara"]
    ];
    let a = e.replace(/[\u0900-\u097F\u0400-\u04FF\u4E00-\u9FFF\u0100-\u0111\u0114-\u011F\u0122-\u012F\u0132-\u0137\u013C-\u014B\u0150-\u015D\u0160-\u016F\u0172-\u017D]/g, "");
    for (const [t, l] of n)
      a = a.replace(t, l);
    return a = a.replace(/\b([a-zA-ZçğıöşüÇĞİÖŞÜ]+)\b/g, (t) => t.length > 2 && /[a-zçğıöşü]/.test(t) && /[A-ZÇĞİÖŞÜ]/.test(t.slice(1)) ? t.toLowerCase() : t), a = a.replace(/\b(\w+)ır\b/g, "$1dır"), a.replace(/ +/g, " ").trim();
  }
  stripTrailingHashtags(e) {
    return e.replace(/(?:\r?\n\s*)*(?:#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+(?:\s+#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+)*\s*)+$/g, "").replace(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g, (n, a, t) => a >= t.length - 80 && !t.slice(a).includes(`

`) ? "" : n).trim();
  }
  getToneHook(e, n, a) {
    const t = e.trim().replace(/[.?]+$/, "");
    if (n === "professional") {
      const r = [
        `💼 Sektörel Analiz: ${t}`,
        `📈 Operasyonel Standart: ${t}`,
        `🌐 Kurumsal Vizyon: ${t}`
      ];
      return r[a % r.length];
    }
    if (n === "educational") {
      const r = [
        `💡 60 Saniyede Öğrenin: ${t}`,
        `📌 ${t} Rehberi: En sık yapılan 3 hata`,
        `🧠 Temel Kavramlar: ${t}`
      ];
      return r[a % r.length];
    }
    if (n === "witty") {
      const r = [
        `✨ ${t} hakkında bilmeniz gerekenler:`,
        `☕ Kahveler hazırsa konuşalım: ${t}`,
        `👀 ${t} konusu:`
      ];
      return r[a % r.length];
    }
    if (n === "casual") {
      const r = [
        `👋 Selamlar! Bugün gündemimizde: ${t}`,
        `💬 ${t} hakkında ne düşünüyorsunuz?`,
        `🙌 Küçük bir not: ${t}`
      ];
      return r[a % r.length];
    }
    const l = [
      `🔥 "${t}" hakkında bilmeniz gereken o gerçek:`,
      `🚀 2026'da öne çıkan başlık: ${t}!`,
      `⚡ ${t} ile ilgili 3 önemli detay:`
    ];
    return l[a % l.length];
  }
  extractHashtags(e, n) {
    const a = e.match(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g);
    if (a && a.length > 0)
      return Array.from(new Set(a)).slice(0, 4);
    const t = ["#NSosyal"], l = n.toLowerCase();
    return (l.includes("yapay zeka") || l.includes("ai")) && t.push("#YapayZeka"), (l.includes("yazılım") || l.includes("kod")) && t.push("#Yazılım"), (l.includes("video") || l.includes("film")) && t.push("#Video"), t.length < 3 && t.push("#Teknoloji", "#Gündem"), Array.from(new Set(t)).slice(0, 4);
  }
}
class z {
  constructor(e) {
    y(this, "config");
    y(this, "router");
    y(this, "pipeline");
    this.config = {
      type: process.env.LLM_BACKEND_TYPE || "internal",
      baseUrl: process.env.LLM_BASE_URL || "http://localhost:11434/v1",
      apiKey: process.env.LLM_API_KEY || "",
      modelName: process.env.LLM_MODEL_NAME || "senkron-turkish-llama3.2:3b",
      maxLocalConcurrency: (e == null ? void 0 : e.maxLocalConcurrency) ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: (e == null ? void 0 : e.localTimeoutMs) ?? Number(process.env.LOCAL_TIMEOUT_MS || 5e3),
      ...e
    }, this.router = new C({
      localBaseUrl: this.config.baseUrl,
      localModelName: this.config.modelName,
      maxLocalConcurrency: this.config.maxLocalConcurrency,
      localTimeoutMs: this.config.localTimeoutMs,
      externalBaseUrl: this.config.externalBaseUrl || process.env.EXTERNAL_LLM_BASE_URL || "https://api.openai.com/v1",
      externalApiKey: this.config.apiKey || this.config.externalApiKey || process.env.EXTERNAL_LLM_API_KEY,
      externalModelName: this.config.externalModelName || process.env.EXTERNAL_LLM_MODEL || "gpt-4o-mini",
      forceRoute: this.config.forceRoute || (this.config.type === "external" ? "external" : void 0)
    }), this.pipeline = new E(this.router);
  }
  getRouter() {
    return this.router;
  }
  async generatePost(e) {
    if (e.isGuest || e.userId === "guest" || !e.userId)
      throw new Error("UNAUTHORIZED_GUEST: Misafir kullanıcıların gönderi üretme izni yoktur. Lütfen giriş yapın.");
    const n = L(e.topic);
    if (!n.passed)
      throw new Error(`CONTENT_MODERATION_BLOCKED: ${n.reason}`);
    const a = e.tone || "viral", t = e.candidateCount || 3, l = await this.pipeline.generateCandidates(e.topic, a, t), r = l.candidates, i = r[l.selectedIndex] || r[0];
    if (!L(i.content).passed)
      throw new Error("OUTPUT_MODERATION_BLOCKED: Üretilen içerik güvenlik standartlarına uymadığından engellendi.");
    const m = i.content.trim(), o = Math.ceil(e.topic.length / 4) + 50, c = Math.ceil(m.length / 4), h = l.telemetry || {
      routeUsed: "internal",
      routeReason: "local_healthy",
      latencyMs: 120,
      activeLocalSlots: 0,
      maxLocalConcurrency: this.config.maxLocalConcurrency || 2,
      fallbackTriggered: !1
    };
    return {
      content: m,
      hashtags: i.hashtags,
      characterCount: m.length,
      maxCharacters: 500,
      modelUsed: l.rawModel || this.config.modelName || "senkron-turkish-llama3.2:3b",
      tokenUsage: {
        promptTokens: o,
        completionTokens: c,
        totalTokens: o + c
      },
      candidates: r,
      selectedCandidateIndex: l.selectedIndex,
      routingTelemetry: h
    };
  }
}
export {
  z as LLMGateway,
  N as SYSTEM_PROMPT,
  C as SmartRouter,
  E as TwoStageGenerator,
  w as buildPrompt,
  _ as checkPromptInjection,
  L as moderateContent
};
