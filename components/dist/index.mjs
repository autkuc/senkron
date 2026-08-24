import { FFmpegService as u, SenkronVideoEditor as p, SenkronVideoEditorModal as m } from "./video-editor/index.mjs";
import { SenkronPostGenerator as h, SenkronPostGeneratorModal as S } from "./post-generator/index.mjs";
import { a as g, S as v, c as b, b as x } from "./SenkronPostGeneratorModal-CN_QI7GZ.mjs";
const t = [
  {
    id: "video_master",
    title: "Video Ustası",
    description: "WebAssembly ile tarayıcıda ilk videonu düzenle ve dışa aktar.",
    icon: "🎬",
    category: "video",
    xp: 50
  },
  {
    id: "ai_architect",
    title: "Yapay Zeka Mimarı",
    description: "Senkron Türkçe AI motoru ile viral bir gönderi taslağı oluştur.",
    icon: "✨",
    category: "ai",
    xp: 50
  },
  {
    id: "community_voice",
    title: "Topluluk Sesi",
    description: "NSosyal akışında ilk gönderini başarıyla yayınla.",
    icon: "💬",
    category: "social",
    xp: 30
  },
  {
    id: "interaction_lead",
    title: "Etkileşim Öncüsü",
    description: "Topluluk gönderilerini beğen veya yeniden paylaş.",
    icon: "❤️",
    category: "social",
    xp: 30
  },
  {
    id: "offline_hero",
    title: "Piksel Koşucusu",
    description: "Çevrimdışı Senkron Dino oyununda 50+ puana ulaş.",
    icon: "🦖",
    category: "game",
    xp: 40
  },
  {
    id: "teknofest_pioneer",
    title: "Milli Teknoloji Hamlesi",
    description: "TEKNOFEST veya yerli yazılım etiketi içeren bir paylaşım yap.",
    icon: "🚀",
    category: "special",
    xp: 50
  },
  {
    id: "senkron_ambassador",
    title: "Senkron Elçisi",
    description: "En az 5 rozeti tamamlayarak platform ustası unvanını kazan.",
    icon: "🏆",
    category: "special",
    xp: 100
  }
];
class d {
  constructor(e = []) {
    this.unlocked = /* @__PURE__ */ new Set(), e.forEach((o) => this.unlocked.add(o));
  }
  unlock(e) {
    const o = t.find((n) => n.id === e);
    if (!o || this.unlocked.has(e))
      return { unlocked: !1, becameAmbassador: !1 };
    this.unlocked.add(e);
    let a = !1;
    return this.unlocked.size >= 5 && !this.unlocked.has("senkron_ambassador") && e !== "senkron_ambassador" && (this.unlocked.add("senkron_ambassador"), a = !0), { unlocked: !0, badge: o, becameAmbassador: a };
  }
  isUnlocked(e) {
    return this.unlocked.has(e);
  }
  getState() {
    const e = Array.from(this.unlocked), o = t.filter((i) => this.unlocked.has(i.id)).reduce((i, s) => i + s.xp, 0), a = Math.floor(o / 80) + 1, n = a * 80, r = Math.min(100, Math.round(o % 80 / 80 * 100));
    return {
      unlockedBadgeIds: e,
      totalXp: o,
      level: a,
      nextLevelXp: n,
      levelProgressPercent: r
    };
  }
}
export {
  d as BadgeManager,
  u as FFmpegService,
  t as SENKRON_BADGES,
  h as SenkronPostGenerator,
  S as SenkronPostGeneratorModal,
  g as SenkronPostGeneratorModalReact,
  v as SenkronPostGeneratorReact,
  p as SenkronVideoEditor,
  m as SenkronVideoEditorModal,
  b as SenkronVideoEditorModalReact,
  x as SenkronVideoEditorReact
};
