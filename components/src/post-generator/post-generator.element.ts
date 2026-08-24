import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { postGeneratorStyles } from './styles';
import { SocialPlatform, ContentTone, PostDraft, PostAppliedDetail } from './types';

const PLATFORM_LIMITS: Record<SocialPlatform, number> = {
  nsosyal: 500,
};

export class SenkronPostGenerator extends LitElement {
  static styles = postGeneratorStyles;

  @property({ type: String, attribute: 'api-url' })
  apiUrl = '/api/ai/generate';

  @property({ type: String, attribute: 'graphql-url' })
  graphqlUrl = '';

  @property({ type: String, attribute: 'default-tone' })
  defaultTone: ContentTone = 'viral';

  @property({ type: String })
  topic = '';

  @state()
  private tone: ContentTone = 'viral';

  @state()
  private isGenerating = false;

  @state()
  private errorMessage: string | null = null;

  @state()
  private copied = false;

  @state()
  private drafts: Record<SocialPlatform, PostDraft> = {
    nsosyal: {
      platform: 'nsosyal',
      content: '',
      hashtags: [],
      characterCount: 0,
      maxCharacters: PLATFORM_LIMITS.nsosyal,
    },
  };

  connectedCallback(): void {
    super.connectedCallback();
    if (this.defaultTone) {
      this.tone = this.defaultTone;
    }
  }

  private setTone(t: ContentTone): void {
    this.tone = t;
  }

  public async handleGenerate(): Promise<void> {
    if (this.isGenerating) return;
    this.isGenerating = true;
    this.errorMessage = null;

    const endpoint = this.apiUrl || '/api/ai/generate';
    const postTopic = this.topic.trim() || 'NSosyal platform güncellemesi ve yenilikler';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_demo',
          'x-user-tier': 'standard',
        },
        body: JSON.stringify({
          topic: postTopic,
          platform: 'nsosyal',
          tone: this.tone,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Sunucu hatası (${res.status})`);
      }

      const data = await res.json();
      if (data.data && data.data.content) {
        const rawContent = data.data.content;
        const hashtags = data.data.hashtags || [];
        const charCount = rawContent.length + (hashtags.length ? hashtags.join(' ').length + 2 : 0);

        this.drafts = {
          nsosyal: {
            platform: 'nsosyal',
            content: rawContent,
            hashtags: hashtags,
            characterCount: charCount,
            maxCharacters: PLATFORM_LIMITS.nsosyal,
          },
        };

        const activeDraft = this.drafts.nsosyal;
        this.dispatchEvent(
          new CustomEvent('senkron:post-generated', {
            detail: { platform: 'nsosyal', draft: activeDraft },
            bubbles: true,
            composed: true,
          })
        );
      } else {
        throw new Error('Geçersiz yanıt formatı alındı.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Taslak üretimi başarısız oldu';
      this.errorMessage = msg;
      this.dispatchEvent(
        new CustomEvent('senkron:post-error', {
          detail: { message: msg },
          bubbles: true,
          composed: true,
        })
      );
    } finally {
      this.isGenerating = false;
    }
  }

  private handleApplyToPost = (): void => {
    const draft = this.drafts.nsosyal;
    if (!draft.content) return;
    
    const tagString = draft.hashtags.length ? `\n\n${draft.hashtags.join(' ')}` : '';
    const fullText = `${draft.content}${tagString}`.trim();

    const detail: PostAppliedDetail = {
      platform: 'nsosyal',
      content: draft.content,
      hashtags: draft.hashtags,
      fullText,
    };

    this.dispatchEvent(
      new CustomEvent('senkron:post-applied', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleCopy = async (): Promise<void> => {
    const draft = this.drafts.nsosyal;
    if (!draft.content) return;
    const tagString = draft.hashtags.length ? `\n\n${draft.hashtags.join(' ')}` : '';
    const fullText = `${draft.content}${tagString}`.trim();

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(fullText);
    }

    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);

    this.dispatchEvent(
      new CustomEvent('senkron:post-copied', {
        detail: { platform: 'nsosyal', text: fullText },
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    const activeDraft = this.drafts.nsosyal;
    const tagString = activeDraft.hashtags.length ? `\n\n${activeDraft.hashtags.join(' ')}` : '';
    const fullText = `${activeDraft.content}${tagString}`.trim();
    const isOverLimit = fullText.length > activeDraft.maxCharacters;
    const hasContent = Boolean(activeDraft.content && activeDraft.content.trim().length > 0);

    return html`
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
            <label class="form-label">Konu / Anahtar Fikirler</label>
            <textarea
              class="text-area"
              placeholder="Örn: Yeni video düzenleyicimizi duyuruyoruz, WASM ile hızlı..."
              .value=${this.topic}
              @input=${(e: Event) => (this.topic = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Ton & Üslup</label>
            <div class="tone-chips">
              ${[
                { id: 'viral', label: '🔥 Viral' },
                { id: 'professional', label: '💼 Kurumsal' },
                { id: 'educational', label: '💡 Eğitici' },
                { id: 'casual', label: '☕ Samimi' },
                { id: 'witty', label: '✨ Yaratıcı' },
              ].map(
                (t) => html`
                  <button
                    class="tone-chip ${this.tone === t.id ? 'active' : ''}"
                    @click=${() => this.setTone(t.id as ContentTone)}
                  >
                    ${t.label}
                  </button>
                `
              )}
            </div>
          </div>

          <button
            class="btn btn-primary"
            ?disabled=${this.isGenerating}
            @click=${this.handleGenerate}
          >
            ${this.isGenerating ? 'Yapay Zeka Üretiyor...' : 'Taslak Oluştur'}
          </button>

          ${this.errorMessage
            ? html`
                <div style="margin-top: 10px; padding: 8px 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 12px; color: #fca5a5;">
                  ${this.errorMessage}
                </div>
              `
            : ''}
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

            ${this.isGenerating
              ? html`
                  <div style="padding: 24px 0; text-align: center; color: #38bdf8;">
                    <div style="display: inline-block; width: 24px; height: 24px; border: 2px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 8px;"></div>
                    <div style="font-size: 13px; font-weight: 500;">Llama 3.2 Türkçe Modeli Metin Üretiyor...</div>
                  </div>
                `
              : hasContent
              ? html`
                  <div class="card-content" style="white-space: pre-wrap;">${activeDraft.content}</div>

                  <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                    ${activeDraft.hashtags.map(
                      (tag) => html`<span class="hashtag-pill">${tag}</span>`
                    )}
                  </div>

                  <div class="char-counter">
                    <span style="${isOverLimit ? 'color: #ef4444; font-weight: 600;' : ''}">
                      ${fullText.length} / ${activeDraft.maxCharacters} karakter
                    </span>

                    <div style="display: flex; gap: 6px;">
                      <button class="btn" style="padding: 5px 10px; font-size: 11px;" @click=${this.handleCopy}>
                        ${this.copied ? 'Kopyalandı' : 'Kopyala'}
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
                `
              : html`
                  <div style="padding: 32px 16px; text-align: center; color: #64748b; font-size: 13px;">
                    Konunuzu yazıp sol taraftaki <strong>'Taslak Oluştur'</strong> butonuna basarak ince ayarlı Türkçe Llama modelinden özgün gönderi önerisi alabilirsiniz.
                  </div>
                `}
          </div>
        </div>
      </div>
    `;
  }
}
