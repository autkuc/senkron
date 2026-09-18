var C = Object.defineProperty;
var w = (l, e, a) => e in l ? C(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a;
var y = (l, e, a) => w(l, typeof e != "symbol" ? e + "" : e, a);
const A = [
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
function N(l) {
  const e = l.trim();
  return A.some((n) => n.test(e)) ? {
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
const z = {
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
function M(l) {
  if (!l || l.trim().length === 0)
    return {
      passed: !1,
      flaggedCategories: ["spam"],
      reason: "Girdi metni boş olamaz.",
      confidenceScore: 1
    };
  const e = N(l);
  if (!e.passed)
    return e;
  const a = [];
  for (const [n, t] of Object.entries(z))
    for (const r of t)
      if (r.test(l)) {
        a.push(n);
        break;
      }
  return a.length > 0 ? {
    passed: !1,
    flaggedCategories: a,
    reason: `Metin NSosyal Topluluk Kuralları'nı ihlal ediyor: [${a.join(", ")}]`,
    confidenceScore: 0.95
  } : {
    passed: !0,
    flaggedCategories: [],
    confidenceScore: 1
  };
}
const Y = `Sen NSosyal sosyal ağ platformu için uzman bir yapay zeka içerik yazarısın.
Görevlerin:
1. Kullanıcının konusundan ilgi çekici, yüksek etkileşimli ve kusursuz Türkçe dil kurallarına uygun bir gönderi oluşturmak.
2. Kesinlikle YALNIZCA akıcı, kurallı ve duru Türkçe yaz. Yabancı dildeki (İngilizce, Fransızca, Hintçe, Lehçe vb.) kelimeleri veya anlamsız karakterleri ASLA kullanma.
3. NSosyal platformunun 500 karakterlik sınırına kesinlikle uymak ve cümleleri tam bitirmek.
4. İstenen tona (Viral, Kurumsal, Eğitici, Samimi, Yaratıcı) uygun üslup kullanmak.
5. Gönderinin sonuna 3-4 ilgili Türkçe hashtag eklemek (örneğin #NSosyal #Teknoloji).
6. Aşırı reklam dili kullanmamak, doğal ve topluluk odaklı yazmak.`;
function P(l, e = "viral") {
  return `Konu: ${l}
${e === "viral" ? "🔥 Ton: Viral ve Yüksek Etkileşimli (Dikkat çekici açılış, merak uyandıran heyecanlı üslup)" : e === "professional" ? "💼 Ton: Kurumsal ve Resmi (Saygılı, profesyonel, sektörel liderlik vurgusu)" : e === "educational" ? "💡 Ton: Eğitici ve Bilgilendirici (Faydalı hap bilgi, öğretici ve açıklayıcı cümleler)" : e === "witty" ? "✨ Ton: Yaratıcı ve Nüktedan (Zekice yazılmış, esprili ve özgün)" : "☕ Ton: Samimi ve Doğal (Toplulukla sohbet havasında, sıcak üslup)"}

Lütfen NSosyal gönderisini Türkçe olarak oluştur:`;
}
class R {
  constructor(e) {
    y(this, "config");
    y(this, "activeLocalSlots", 0);
    y(this, "isLocalHealthy", !0);
    y(this, "lastHealthCheckTime", 0);
    const a = process.env.LOCAL_LLM_BASE_URL || (process.env.NODE_ENV === "test" ? "http://localhost:11434/v1" : "https://arapronaldosui--senkron-turkish-llm-service-api.modal.run");
    this.config = {
      localBaseUrl: (e == null ? void 0 : e.localBaseUrl) || a,
      localModelName: (e == null ? void 0 : e.localModelName) || process.env.LOCAL_LLM_MODEL || "senkron-turkish-llama3.2:3b",
      maxLocalConcurrency: (e == null ? void 0 : e.maxLocalConcurrency) ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: (e == null ? void 0 : e.localTimeoutMs) ?? Number(process.env.LOCAL_TIMEOUT_MS || 6e4),
      externalBaseUrl: (e == null ? void 0 : e.externalBaseUrl) || process.env.EXTERNAL_LLM_BASE_URL || "https://api.openai.com/v1",
      externalApiKey: (e == null ? void 0 : e.externalApiKey) || process.env.EXTERNAL_LLM_API_KEY || process.env.OPENAI_API_KEY || "",
      externalModelName: (e == null ? void 0 : e.externalModelName) || process.env.EXTERNAL_LLM_MODEL || "gpt-4o-mini",
      healthCheckIntervalMs: (e == null ? void 0 : e.healthCheckIntervalMs) ?? 15e3,
      forceRoute: (e == null ? void 0 : e.forceRoute) || process.env.FORCE_LLM_ROUTE || "internal",
      allowSimulation: (e == null ? void 0 : e.allowSimulation) ?? process.env.NODE_ENV !== "production"
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
  async executeChat(e, a = 0.7) {
    const n = Date.now();
    if (this.config.forceRoute === "external")
      return this.callExternal(e, a, "forced_mode", n, !1);
    if (this.activeLocalSlots >= this.config.maxLocalConcurrency && this.config.externalApiKey)
      return this.callExternal(e, a, "local_concurrency_saturated", n, !1);
    if (!this.isLocalHealthy && this.config.externalApiKey)
      return this.callExternal(e, a, "local_offline", n, !1);
    try {
      this.activeLocalSlots++;
      const t = await this.callLocalWithTimeout(e, a);
      this.isLocalHealthy = !0;
      const r = Date.now() - n;
      return {
        rawText: t.text,
        tokenUsage: t.usage,
        modelUsed: this.config.localModelName,
        telemetry: {
          routeUsed: "internal",
          routeReason: "local_healthy",
          latencyMs: r,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !1
        }
      };
    } catch (t) {
      if (console.error("[SmartRouter Local Error]:", t), this.isLocalHealthy = !1, this.config.externalApiKey)
        return this.callExternal(e, a, "local_timeout_fallback", n, !0);
      if (!this.config.allowSimulation)
        throw new Error(
          "LLM_UNAVAILABLE: Yerel LLM çevrimdışı ve dış sağlayıcı anahtarı tanımlı değil; production modunda simülasyon kapalı."
        );
      const r = Date.now() - n, o = this.simulateFallbackResponse(e);
      return {
        rawText: o,
        tokenUsage: {
          promptTokens: Math.ceil(e.map((i) => i.content).join(" ").length / 4),
          completionTokens: Math.ceil(o.length / 4),
          totalTokens: Math.ceil((e.map((i) => i.content).join(" ").length + o.length) / 4)
        },
        modelUsed: `${this.config.localModelName}-simulated`,
        telemetry: {
          routeUsed: "simulated",
          routeReason: "simulation_no_router",
          latencyMs: r,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !0
        }
      };
    } finally {
      this.activeLocalSlots = Math.max(0, this.activeLocalSlots - 1);
    }
  }
  async callLocalWithTimeout(e, a) {
    var r, o, i, m, h;
    const n = new AbortController(), t = setTimeout(() => n.abort(), this.config.localTimeoutMs);
    try {
      const c = this.config.localBaseUrl.replace(/\/+$/, ""), u = c.endsWith("/chat/completions") ? c : `${c}/chat/completions`;
      console.log(`[SmartRouter] Calling local LLM endpoint: ${u}`);
      const s = await fetch(u, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: n.signal,
        body: JSON.stringify({
          model: this.config.localModelName,
          messages: e,
          temperature: a,
          max_tokens: 600
        })
      });
      if (!s.ok)
        throw new Error(`Local inference returned status ${s.status}`);
      const d = await s.json(), p = ((i = (o = (r = d.choices) == null ? void 0 : r[0]) == null ? void 0 : o.message) == null ? void 0 : i.content) || "", k = ((m = d.usage) == null ? void 0 : m.prompt_tokens) || Math.ceil(e.map((b) => b.content).join(" ").length / 4), g = ((h = d.usage) == null ? void 0 : h.completion_tokens) || Math.ceil(p.length / 4);
      return {
        text: p,
        usage: {
          promptTokens: k,
          completionTokens: g,
          totalTokens: k + g
        }
      };
    } finally {
      clearTimeout(t);
    }
  }
  async callExternal(e, a, n, t, r) {
    var o, i, m, h, c;
    try {
      const u = this.config.externalBaseUrl.replace(/\/+$/, ""), s = u.endsWith("/chat/completions") ? u : `${u}/chat/completions`, d = await fetch(s, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.externalApiKey}`
        },
        body: JSON.stringify({
          model: this.config.externalModelName,
          messages: e,
          temperature: a,
          max_tokens: 600
        })
      });
      if (!d.ok)
        throw new Error(`External API returned status ${d.status}`);
      const p = await d.json(), k = ((m = (i = (o = p.choices) == null ? void 0 : o[0]) == null ? void 0 : i.message) == null ? void 0 : m.content) || "", g = ((h = p.usage) == null ? void 0 : h.prompt_tokens) || Math.ceil(e.map((x) => x.content).join(" ").length / 4), b = ((c = p.usage) == null ? void 0 : c.completion_tokens) || Math.ceil(k.length / 4), E = Date.now() - t;
      return {
        rawText: k,
        tokenUsage: {
          promptTokens: g,
          completionTokens: b,
          totalTokens: g + b
        },
        modelUsed: this.config.externalModelName,
        telemetry: {
          routeUsed: "external",
          routeReason: n,
          latencyMs: E,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: r
        }
      };
    } catch {
      if (!this.config.allowSimulation)
        throw new Error(
          "LLM_UNAVAILABLE: Yerel ve dış LLM sağlayıcılarının ikisine de ulaşılamadı; production modunda simülasyon kapalı."
        );
      const s = Date.now() - t, d = this.simulateFallbackResponse(e);
      return {
        rawText: d,
        tokenUsage: {
          promptTokens: Math.ceil(e.map((p) => p.content).join(" ").length / 4),
          completionTokens: Math.ceil(d.length / 4),
          totalTokens: Math.ceil((e.map((p) => p.content).join(" ").length + d.length) / 4)
        },
        modelUsed: `${this.config.externalModelName}-simulated`,
        telemetry: {
          routeUsed: "simulated",
          routeReason: "simulation_no_router",
          latencyMs: s,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: !0
        }
      };
    }
  }
  simulateFallbackResponse(e) {
    var n;
    return `🔥 Önemli Gelişme:

${((n = e.find((t) => t.role === "user")) == null ? void 0 : n.content) || ""}

NSosyal topluluğuna özel olarak hazırlanan bu gönderi, etkileşimi artırmak için tasarlandı. Siz de görüşlerinizi yorumlarda belirtin! 🚀

#NSosyal #Teknoloji #YapayZeka`;
  }
}
const L = {
  relevance: 0.3,
  languageQuality: 0.2,
  novelty: 0.15,
  lengthFit: 0.15,
  safety: 0.2
}, S = 500, v = 400, _ = (l) => Math.max(0, Math.min(1, l)), T = (l) => l.toLowerCase().split(/[^\p{L}\p{N}#+]+/u).filter((e) => e.length >= 3);
function U(l, e) {
  const a = Array.from(new Set(T(l)));
  if (a.length === 0) return 0.5;
  const n = Array.from(new Set(T(e)));
  let t = 0;
  for (const r of a) {
    const o = r.slice(0, Math.min(5, r.length));
    n.some((i) => i === r || i.startsWith(o) || r.startsWith(i.slice(0, Math.min(5, i.length)))) && t++;
  }
  return _(t / a.length);
}
function O(l) {
  const e = l.split(/\s+/).filter(Boolean);
  if (e.length === 0) return 0;
  const a = e.filter(
    (t) => t.length > 3 && /[a-zçğıöşü]/.test(t) && /[A-ZÇĞİÖŞÜ]/.test(t.slice(1))
  ).length, n = e.filter(
    (t) => /\b(the|and|with|for|our|your|this|that|new|feature|update)\b/i.test(t)
  ).length;
  return _(1 - (a + n) / Math.max(3, e.length * 0.2));
}
function $(l, e) {
  const a = new Set(T(l));
  if (e.length === 0 || a.size === 0) return 0.5;
  let n = 0;
  for (const t of e) {
    const r = new Set(T(t));
    let o = 0;
    for (const m of a) r.has(m) && o++;
    const i = (/* @__PURE__ */ new Set([...a, ...r])).size;
    n = Math.max(n, i > 0 ? o / i : 0);
  }
  return _(1 - n);
}
function I(l) {
  return l <= v ? 1 : l <= S ? 1 - 0.4 * ((l - v) / (S - v)) : 0;
}
function D(l) {
  return M(l).passed ? 1 : 0;
}
function B(l, e, a) {
  const n = a.filter((r) => r !== l.content), t = {
    relevance: f(U(e, l.content)),
    languageQuality: f(O(l.content)),
    novelty: f($(l.content, n)),
    lengthFit: f(I(l.characterCount)),
    safety: D(l.content),
    total: 0
  };
  return t.total = f(
    t.relevance * L.relevance + t.languageQuality * L.languageQuality + t.novelty * L.novelty + t.lengthFit * L.lengthFit + t.safety * L.safety
  ), t;
}
function K(l, e) {
  const a = l.map((o) => o.content), n = l.map((o) => ({ c: o, s: B(o, e, a) }));
  let t = 0;
  return n.forEach((o, i) => {
    o.c.scores = o.s, o.c.viralityScore = Math.round(o.s.total * 100), o.c.entropyScore = Math.round(o.s.novelty * 100), o.s.total > n[t].s.total && (t = i);
  }), { ranked: [...n].sort((o, i) => i.s.total - o.s.total).map((o) => o.c), selectedIndex: t };
}
function F(l, e = S) {
  if (l.length <= e) return l;
  const a = l.slice(0, e - 1), n = a.lastIndexOf(" "), t = n > e * 0.6 ? n : e - 1;
  return a.slice(0, t).trimEnd() + "…";
}
function f(l) {
  return Math.round(l * 1e3) / 1e3;
}
class j {
  constructor(e, a) {
    this.router = e, this.options = a;
  }
  allowSimulation() {
    var e;
    return ((e = this.options) == null ? void 0 : e.allowSimulation) ?? process.env.NODE_ENV !== "production";
  }
  async generateCandidates(e, a = "viral", n = 3, t) {
    const r = this.buildPromptMessages(e, a);
    let o = "", i, m;
    if (t)
      o = (await t(r)).text;
    else if (this.router) {
      const s = await this.router.executeChat(r, 0.5);
      o = s.rawText, i = s.telemetry, m = s.modelUsed;
    }
    if (!(o.trim().length > 0) && !this.allowSimulation())
      throw new Error(
        "LLM_UNAVAILABLE: Yerel veya dış LLM sağlayıcısına ulaşılamadı ve production modunda simülasyon kapalı. Sahte çıktı üretilmez."
      );
    const c = this.parseCandidatesFromLLM(o, e, a, n);
    for (const s of c)
      s.content = F(s.content), s.characterCount = s.content.length;
    const { selectedIndex: u } = K(c, e);
    return {
      candidates: c,
      selectedIndex: u,
      telemetry: i,
      rawModel: m
    };
  }
  buildPromptMessages(e, a) {
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
Ton: ${a}
Lütfen NSosyal gönderisini oluştur.`
      }
    ];
  }
  parseCandidatesFromLLM(e, a, n, t) {
    const r = [], o = e.trim() || `NSosyal üzerinde ${a} hakkında harika gelişmeler yaşanıyor. Detayları keşfetmek için takipte kalın!`, i = this.extractHashtags(o, a), m = this.cleanTurkishText(this.stripTrailingHashtags(o)), h = m.split(`
`).map((u) => u.trim()).filter(Boolean);
    let c = h[0];
    if ((!c || c.includes("Önemli Gelişme") || h.length <= 1) && (c = this.getToneHook(a, n, 0)), r.push({
      id: `cand_${Date.now()}_0`,
      hook: c,
      content: m,
      hashtags: i,
      characterCount: m.length,
      viralityScore: 92,
      entropyScore: 94
    }), t > 1) {
      const u = h.slice(1).join(`

`) || m, s = this.getToneHook(a, n, 1), d = this.cleanTurkishText(`${s}

${u}`.trim());
      r.push({
        id: `cand_${Date.now()}_1`,
        hook: s,
        content: d,
        hashtags: i,
        characterCount: d.length,
        viralityScore: 88,
        entropyScore: 90
      });
      const p = this.getToneHook(a, n, 2), k = this.cleanTurkishText(`${p}

${u}`.trim());
      r.push({
        id: `cand_${Date.now()}_2`,
        hook: p,
        content: k,
        hashtags: i,
        characterCount: k.length,
        viralityScore: 84,
        entropyScore: 87
      });
    }
    return r.slice(0, t);
  }
  cleanTurkishText(e) {
    const a = [
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
    let n = e.replace(/[\u0900-\u097F\u0400-\u04FF\u4E00-\u9FFF\u0100-\u0111\u0114-\u011F\u0122-\u012F\u0132-\u0137\u013C-\u014B\u0150-\u015D\u0160-\u016F\u0172-\u017D]/g, "");
    for (const [t, r] of a)
      n = n.replace(t, r);
    return n = n.replace(/\b([a-zA-ZçğıöşüÇĞİÖŞÜ]+)\b/g, (t) => t.length > 2 && /[a-zçğıöşü]/.test(t) && /[A-ZÇĞİÖŞÜ]/.test(t.slice(1)) ? t.toLowerCase() : t), n = n.replace(/\b(\w+)ır\b/g, "$1dır"), n.replace(/ +/g, " ").trim();
  }
  stripTrailingHashtags(e) {
    return e.replace(/(?:\r?\n\s*)*(?:#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+(?:\s+#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+)*\s*)+$/g, "").replace(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g, (a, n, t) => n >= t.length - 80 && !t.slice(n).includes(`

`) ? "" : a).trim();
  }
  getToneHook(e, a, n) {
    const t = e.trim().replace(/[.?]+$/, "");
    if (a === "professional") {
      const o = [
        `💼 Sektörel Analiz: ${t}`,
        `📈 Operasyonel Standart: ${t}`,
        `🌐 Kurumsal Vizyon: ${t}`
      ];
      return o[n % o.length];
    }
    if (a === "educational") {
      const o = [
        `💡 60 Saniyede Öğrenin: ${t}`,
        `📌 ${t} Rehberi: En sık yapılan 3 hata`,
        `🧠 Temel Kavramlar: ${t}`
      ];
      return o[n % o.length];
    }
    if (a === "witty") {
      const o = [
        `✨ ${t} hakkında bilmeniz gerekenler:`,
        `☕ Kahveler hazırsa konuşalım: ${t}`,
        `👀 ${t} konusu:`
      ];
      return o[n % o.length];
    }
    if (a === "casual") {
      const o = [
        `👋 Selamlar! Bugün gündemimizde: ${t}`,
        `💬 ${t} hakkında ne düşünüyorsunuz?`,
        `🙌 Küçük bir not: ${t}`
      ];
      return o[n % o.length];
    }
    const r = [
      `🔥 "${t}" hakkında bilmeniz gereken o gerçek:`,
      `🚀 2026'da öne çıkan başlık: ${t}!`,
      `⚡ ${t} ile ilgili 3 önemli detay:`
    ];
    return r[n % r.length];
  }
  extractHashtags(e, a) {
    const n = e.match(/#[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]+/g);
    if (n && n.length > 0)
      return Array.from(new Set(n)).slice(0, 4);
    const t = ["#NSosyal"], r = a.toLowerCase();
    return (r.includes("yapay zeka") || r.includes("ai")) && t.push("#YapayZeka"), (r.includes("yazılım") || r.includes("kod")) && t.push("#Yazılım"), (r.includes("video") || r.includes("film")) && t.push("#Video"), t.length < 3 && t.push("#Teknoloji", "#Gündem"), Array.from(new Set(t)).slice(0, 4);
  }
}
class V {
  constructor(e) {
    y(this, "config");
    y(this, "router");
    y(this, "pipeline");
    const a = process.env.LLM_BASE_URL || process.env.LOCAL_LLM_BASE_URL || (process.env.NODE_ENV === "test" ? "http://localhost:11434/v1" : "https://arapronaldosui--senkron-turkish-llm-service-api.modal.run");
    this.config = {
      type: process.env.LLM_BACKEND_TYPE || "internal",
      baseUrl: (e == null ? void 0 : e.baseUrl) || a,
      apiKey: process.env.LLM_API_KEY || "",
      modelName: process.env.LLM_MODEL_NAME || "senkron-turkish-llama3.2:3b",
      maxLocalConcurrency: (e == null ? void 0 : e.maxLocalConcurrency) ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: (e == null ? void 0 : e.localTimeoutMs) ?? Number(process.env.LOCAL_TIMEOUT_MS || 5e3),
      ...e
    }, this.router = new R({
      localBaseUrl: this.config.baseUrl,
      localModelName: this.config.modelName,
      maxLocalConcurrency: this.config.maxLocalConcurrency,
      localTimeoutMs: this.config.localTimeoutMs,
      externalBaseUrl: this.config.externalBaseUrl || process.env.EXTERNAL_LLM_BASE_URL || "https://api.openai.com/v1",
      externalApiKey: this.config.apiKey || this.config.externalApiKey || process.env.EXTERNAL_LLM_API_KEY,
      externalModelName: this.config.externalModelName || process.env.EXTERNAL_LLM_MODEL || "gpt-4o-mini",
      forceRoute: this.config.forceRoute || (this.config.type === "external" ? "external" : void 0),
      allowSimulation: (e == null ? void 0 : e.allowSimulation) ?? process.env.NODE_ENV !== "production"
    }), this.pipeline = new j(this.router, {
      allowSimulation: (e == null ? void 0 : e.allowSimulation) ?? process.env.NODE_ENV !== "production"
    });
  }
  getRouter() {
    return this.router;
  }
  async generatePost(e) {
    if (e.isGuest || e.userId === "guest" || !e.userId)
      throw new Error("UNAUTHORIZED_GUEST: Misafir kullanıcıların gönderi üretme izni yoktur. Lütfen giriş yapın.");
    const a = M(e.topic);
    if (!a.passed)
      throw new Error(`CONTENT_MODERATION_BLOCKED: ${a.reason}`);
    const n = e.tone || "viral", t = e.candidateCount || 3, r = await this.pipeline.generateCandidates(e.topic, n, t), o = r.candidates, i = o[r.selectedIndex] || o[0];
    if (!M(i.content).passed)
      throw new Error("OUTPUT_MODERATION_BLOCKED: Üretilen içerik güvenlik standartlarına uymadığından engellendi.");
    const h = i.content.trim(), c = Math.ceil(e.topic.length / 4) + 50, u = Math.ceil(h.length / 4), s = r.telemetry || {
      routeUsed: "simulated",
      routeReason: "simulation_no_router",
      latencyMs: 0,
      activeLocalSlots: 0,
      maxLocalConcurrency: this.config.maxLocalConcurrency || 2,
      fallbackTriggered: !0
    };
    return {
      content: h,
      hashtags: i.hashtags,
      characterCount: h.length,
      maxCharacters: 500,
      modelUsed: r.rawModel || this.config.modelName || "senkron-turkish-llama3.2:3b",
      tokenUsage: {
        promptTokens: c,
        completionTokens: u,
        totalTokens: c + u
      },
      candidates: o,
      selectedCandidateIndex: r.selectedIndex,
      routingTelemetry: s
    };
  }
}
export {
  V as LLMGateway,
  Y as SYSTEM_PROMPT,
  R as SmartRouter,
  j as TwoStageGenerator,
  P as buildPrompt,
  N as checkPromptInjection,
  M as moderateContent
};
