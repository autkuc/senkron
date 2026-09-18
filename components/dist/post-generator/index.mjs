import { i as k, a as x, b as s, n as d, r as h, M as w } from "../modal-a11y-CvyA2DZ2.mjs";
const m = k`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: #090d16;
    color: #f1f5f9;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .generator-container {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    min-height: 460px;
    background: #090d16;
  }

  @media (max-width: 768px) {
    .generator-container {
      grid-template-columns: 1fr;
    }
  }

  /* Control Panel */
  .control-panel {
    padding: 18px;
    background: #0f1624;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #f1f5f9;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .text-area {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 13px;
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    transition: border-color 0.15s ease;
  }

  .text-area:focus {
    outline: none;
    border-color: #0284c7;
  }

  /* Tone Pills */
  .tone-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tone-chip {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #94a3b8;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .tone-chip:hover {
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }

  .tone-chip.active {
    background: #1e293b;
    border-color: #0284c7;
    color: #38bdf8;
    font-weight: 600;
  }

  .btn {
    background: #1e293b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.15s ease;
  }

  .btn:hover {
    background: #334155;
  }

  .btn-primary {
    background: #0284c7;
    border: none;
    color: #ffffff;
    font-weight: 600;
  }

  .btn-primary:hover:not(:disabled) {
    background: #0369a1;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Preview Panel */
  .preview-panel {
    padding: 18px;
    background: #090d16;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Preview Cards */
  .preview-card {
    background: #0f1624;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .card-author-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
    color: #ffffff;
  }

  .author-info {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-size: 13px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .author-handle {
    font-size: 11px;
    color: #64748b;
  }

  .card-content {
    font-size: 13px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
    color: #cbd5e1;
  }

  .hashtag-pill {
    color: #38bdf8;
    font-weight: 500;
    font-size: 12px;
  }

  .char-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #94a3b8;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Modal Base */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal-dialog {
    background: #090d16;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    width: 100%;
    max-width: 780px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }

  .modal-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    background: #0f1624;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .modal-close-btn {
    background: #1e293b;
    border: none;
    color: #94a3b8;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    transition: background 0.15s ease;
  }

  .modal-close-btn:hover {
    background: #334155;
    color: #ffffff;
  }

  @media (max-width: 640px) {
    .modal-backdrop {
      padding: 6px;
    }

    .modal-dialog {
      max-height: 96vh;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
    }

    .generator-container {
      min-height: 0;
      max-height: calc(96vh - 48px);
      overflow-y: auto;
      grid-template-columns: 1fr;
    }

    .control-panel {
      padding: 12px 14px;
      gap: 10px;
    }

    .preview-panel {
      padding: 12px 14px;
      gap: 10px;
    }

    .text-area {
      min-height: 60px;
      font-size: 12px;
      padding: 8px 10px;
    }

    .tone-chip {
      padding: 4px 8px;
      font-size: 10px;
    }

    .modal-topbar {
      padding: 10px 14px;
    }
  }
`;
var $ = Object.defineProperty, l = (c, e, r, o) => {
  for (var t = void 0, i = c.length - 1, a; i >= 0; i--)
    (a = c[i]) && (t = a(e, r, t) || t);
  return t && $(e, r, t), t;
};
const b = {
  nsosyal: 500
}, g = class g extends x {
  constructor() {
    super(...arguments), this.apiUrl = "/api/ai/generate", this.graphqlUrl = "", this.defaultTone = "viral", this.topic = "", this.tone = "viral", this.isGenerating = !1, this.errorMessage = null, this.copied = !1, this.drafts = {
      nsosyal: {
        platform: "nsosyal",
        content: "",
        hashtags: [],
        characterCount: 0,
        maxCharacters: b.nsosyal
      }
    }, this.handleApplyToPost = () => {
      const e = this.drafts.nsosyal;
      if (!e.content) return;
      const r = e.hashtags.length ? `

${e.hashtags.join(" ")}` : "", o = `${e.content}${r}`.trim(), t = {
        platform: "nsosyal",
        content: e.content,
        hashtags: e.hashtags,
        fullText: o
      };
      this.dispatchEvent(
        new CustomEvent("senkron:post-applied", {
          detail: t,
          bubbles: !0,
          composed: !0
        })
      );
    }, this.handleCopy = async () => {
      const e = this.drafts.nsosyal;
      if (!e.content) return;
      const r = e.hashtags.length ? `

${e.hashtags.join(" ")}` : "", o = `${e.content}${r}`.trim();
      typeof navigator < "u" && navigator.clipboard && await navigator.clipboard.writeText(o), this.copied = !0, setTimeout(() => {
        this.copied = !1;
      }, 2e3), this.dispatchEvent(
        new CustomEvent("senkron:post-copied", {
          detail: { platform: "nsosyal", text: o },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.defaultTone && (this.tone = this.defaultTone);
  }
  setTone(e) {
    this.tone = e;
  }
  async handleGenerate() {
    if (this.isGenerating) return;
    this.isGenerating = !0, this.errorMessage = null;
    const e = this.apiUrl || "/api/ai/generate", r = this.topic.trim() || "NSosyal platform güncellemesi ve yenilikler";
    try {
      const o = await fetch(e, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": "user_demo",
          "x-user-tier": "standard"
        },
        body: JSON.stringify({
          topic: r,
          platform: "nsosyal",
          tone: this.tone
        })
      });
      if (!o.ok) {
        const i = await o.json().catch(() => ({}));
        throw new Error(i.error || `Sunucu hatası (${o.status})`);
      }
      const t = await o.json();
      if (t.data && t.data.content) {
        const i = t.data.content, a = t.data.hashtags || [], y = i.length + (a.length ? a.join(" ").length + 2 : 0);
        this.drafts = {
          nsosyal: {
            platform: "nsosyal",
            content: i,
            hashtags: a,
            characterCount: y,
            maxCharacters: b.nsosyal
          }
        };
        const v = this.drafts.nsosyal;
        this.dispatchEvent(
          new CustomEvent("senkron:post-generated", {
            detail: { platform: "nsosyal", draft: v },
            bubbles: !0,
            composed: !0
          })
        );
      } else
        throw new Error("Geçersiz yanıt formatı alındı.");
    } catch (o) {
      const t = o instanceof Error ? o.message : "Taslak üretimi başarısız oldu";
      this.errorMessage = t, this.dispatchEvent(
        new CustomEvent("senkron:post-error", {
          detail: { message: t },
          bubbles: !0,
          composed: !0
        })
      );
    } finally {
      this.isGenerating = !1;
    }
  }
  render() {
    const e = this.drafts.nsosyal, r = e.hashtags.length ? `

${e.hashtags.join(" ")}` : "", o = `${e.content}${r}`.trim(), t = o.length > e.maxCharacters, i = !!(e.content && e.content.trim().length > 0);
    return s`
      <div class="generator-container">
        <!-- Controls -->
        <div class="control-panel">
          <div class="panel-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Senkron AI Gönderi Asistanı</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="senkron-pg-topic">Konu / Anahtar Fikirler</label>
            <textarea
              id="senkron-pg-topic"
              class="text-area"
              placeholder="Örn: Yeni video düzenleyicimizi duyuruyoruz, WASM ile hızlı..."
              .value=${this.topic}
              @input=${(a) => this.topic = a.target.value}
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label" id="senkron-pg-tone-label">Ton & Üslup</label>
            <div class="tone-chips" role="group" aria-labelledby="senkron-pg-tone-label">
              ${[
      { id: "viral", label: "🔥 Viral" },
      { id: "professional", label: "💼 Kurumsal" },
      { id: "educational", label: "💡 Eğitici" },
      { id: "casual", label: "☕ Samimi" },
      { id: "witty", label: "✨ Yaratıcı" }
    ].map(
      (a) => s`
                  <button
                    class="tone-chip ${this.tone === a.id ? "active" : ""}"
                    aria-pressed=${this.tone === a.id ? "true" : "false"}
                    @click=${() => this.setTone(a.id)}
                  >
                    ${a.label}
                  </button>
                `
    )}
            </div>
          </div>

          <button
            class="btn btn-primary"
            ?disabled=${this.isGenerating}
            aria-busy=${this.isGenerating ? "true" : "false"}
            @click=${this.handleGenerate}
          >
            ${this.isGenerating ? "Yapay Zeka Üretiyor..." : "Taslak Oluştur"}
          </button>

          ${this.errorMessage ? s`
                <div
                  role="alert"
                  style="margin-top: 10px; padding: 8px 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 12px; color: #fca5a5;"
                >
                  ${this.errorMessage}
                </div>
              ` : ""}
        </div>

        <!-- Live Preview -->
        <div class="preview-panel">
          <div style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">
            Canlı Gönderi Önizlemesi
          </div>

          <!-- Preview Card -->
          <div class="preview-card nsosyal-card">
            <div class="card-author-header">
              <div class="avatar">
                <div class="avatar-inner">NS</div>
              </div>
              <div class="author-info">
                <div class="author-name">
                  NSosyal Topluluk
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0284c7">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div class="author-handle">@nsosyal • Şimdi</div>
              </div>
            </div>

            ${this.isGenerating ? s`
                  <div style="padding: 24px 0; text-align: center; color: #38bdf8;">
                    <div style="display: inline-block; width: 24px; height: 24px; border: 2px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 8px;"></div>
                    <div style="font-size: 13px; font-weight: 500;">Llama 3.2 Türkçe Modeli Metin Üretiyor...</div>
                  </div>
                ` : i ? s`
                  <div class="card-content" style="white-space: pre-wrap;">${e.content}</div>

                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                    ${e.hashtags.map(
      (a) => s`<span class="hashtag-pill">${a}</span>`
    )}
                  </div>

                  <div class="char-counter">
                    <span style="${t ? "color: #ef4444; font-weight: 600;" : ""}">
                      ${o.length} / ${e.maxCharacters} karakter
                    </span>

                    <div style="display: flex; gap: 6px;">
                      <button class="btn" style="padding: 5px 10px; font-size: 11px;" @click=${this.handleCopy}>
                        ${this.copied ? "Kopyalandı" : "Kopyala"}
                      </button>
                      <button
                        class="btn btn-primary"
                        style="padding: 5px 12px; font-size: 11px;"
                        @click=${this.handleApplyToPost}
                      >
                        Metni Aktar
                      </button>
                    </div>
                  </div>
                ` : s`
                  <div style="padding: 32px 16px; text-align: center; color: #64748b; font-size: 13px;">
                    Konunuzu yazıp sol taraftaki <strong>'Taslak Oluştur'</strong> butonuna basarak ince ayarlı Türkçe Llama modelinden özgün gönderi önerisi alabilirsiniz.
                  </div>
                `}
          </div>
        </div>
      </div>
    `;
  }
};
g.styles = m;
let n = g;
l([
  d({ type: String, attribute: "api-url" })
], n.prototype, "apiUrl");
l([
  d({ type: String, attribute: "graphql-url" })
], n.prototype, "graphqlUrl");
l([
  d({ type: String, attribute: "default-tone" })
], n.prototype, "defaultTone");
l([
  d({ type: String })
], n.prototype, "topic");
l([
  h()
], n.prototype, "tone");
l([
  h()
], n.prototype, "isGenerating");
l([
  h()
], n.prototype, "errorMessage");
l([
  h()
], n.prototype, "copied");
l([
  h()
], n.prototype, "drafts");
var z = Object.defineProperty, f = (c, e, r, o) => {
  for (var t = void 0, i = c.length - 1, a; i >= 0; i--)
    (a = c[i]) && (t = a(e, r, t) || t);
  return t && z(e, r, t), t;
};
const u = class u extends x {
  constructor() {
    super(...arguments), this.a11y = new w(this, () => this.closeModal()), this.open = !1, this.apiUrl = "", this.defaultTone = "viral", this.topic = "", this.handleBackdropClick = (e) => {
      e.target.classList.contains("modal-backdrop") && this.closeModal();
    }, this.handlePostApplied = (e) => {
      this.dispatchEvent(
        new CustomEvent("senkron:post-applied", {
          detail: e.detail,
          bubbles: !0,
          composed: !0
        })
      ), this.closeModal();
    };
  }
  updated(e) {
    e.has("open") && this.a11y.openChanged(this.open);
  }
  openModal() {
    this.open = !0;
  }
  closeModal() {
    this.open = !1, this.dispatchEvent(
      new CustomEvent("senkron:modal-close", {
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    return this.open ? s`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div
          class="modal-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="senkron-pgm-title"
          @keydown=${this.a11y.handleKeydown}
        >
          <div class="modal-topbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span
                id="senkron-pgm-title"
                style="font-weight: 600; font-size: 14px; color: #f1f5f9;"
              >
                Taslak Oluşturucu
              </span>
            </div>

            <button
              class="modal-close-btn"
              @click=${this.closeModal}
              title="Kapat"
              aria-label="Taslak Oluşturucu'yu kapat"
            >
              ✕
            </button>
          </div>

          <senkron-post-generator
            api-url=${this.apiUrl}
            .apiUrl=${this.apiUrl}
            default-tone=${this.defaultTone}
            .defaultTone=${this.defaultTone}
            .topic=${this.topic}
            @senkron:post-applied=${this.handlePostApplied}
          ></senkron-post-generator>
        </div>
      </div>
    ` : s``;
  }
};
u.styles = m;
let p = u;
f([
  d({ type: Boolean, reflect: !0 })
], p.prototype, "open");
f([
  d({ type: String, attribute: "api-url" })
], p.prototype, "apiUrl");
f([
  d({ type: String, attribute: "default-tone" })
], p.prototype, "defaultTone");
f([
  d({ type: String })
], p.prototype, "topic");
typeof window < "u" && (customElements.get("senkron-post-generator") || customElements.define("senkron-post-generator", n), customElements.get("senkron-post-generator-modal") || customElements.define("senkron-post-generator-modal", p));
export {
  n as SenkronPostGenerator,
  p as SenkronPostGeneratorModal
};
