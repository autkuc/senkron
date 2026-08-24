import { LitElement, html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { videoEditorStyles } from './styles';
import { TextOverlay, ExportProgressDetail, VideoAttachedDetail } from './types';
import { FFmpegService } from './ffmpeg-service';

export class SenkronVideoEditor extends LitElement {
  static styles = videoEditorStyles;

  @property({ type: String })
  src = '';

  @property({ type: String, attribute: 'aspect-ratio' })
  aspectRatio = '16:9';

  @property({ type: String })
  theme = 'dark';

  @property({ type: Boolean })
  autoplay = false;

  @property({ type: Boolean, attribute: 'modal-mode' })
  modalMode = false;

  @state()
  private isPlaying = false;

  @state()
  private currentTime = 0;

  @state()
  private duration = 10;

  @state()
  private trimStart = 0;

  @state()
  private trimEnd = 10;

  @state()
  private overlays: TextOverlay[] = [];

  @state()
  private newOverlayText = '';

  @state()
  private isExporting = false;

  @state()
  private exportProgress: ExportProgressDetail = {
    percentage: 0,
    stage: 'idle',
  };

  @state()
  private exportedVideoUrl: string | null = null;

  private ffmpegService = new FFmpegService();
  private animationFrameId: number | null = null;

  private get videoEl(): HTMLVideoElement | null {
    return this.renderRoot.querySelector('video');
  }

  private get canvasEl(): HTMLCanvasElement | null {
    return this.renderRoot.querySelector('canvas');
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.ffmpegService.initialize().catch(() => {});
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.setupCanvas();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('src') && this.src && this.videoEl) {
      this.videoEl.src = this.src;
      this.videoEl.load();
    }
  }

  private setupCanvas(): void {
    const canvas = this.canvasEl;
    if (!canvas) return;

    const [wRatio, hRatio] = this.aspectRatio.split(':').map(Number);
    const baseWidth = 640;
    const baseHeight = (baseWidth * (hRatio || 9)) / (wRatio || 16);

    canvas.width = baseWidth;
    canvas.height = baseHeight;
    this.renderFrame();
  }

  private renderFrame = (): void => {
    const canvas = this.canvasEl;
    const video = this.videoEl;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (video && video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#111827';
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.fillStyle = '#64748b';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        this.src ? 'Video Yükleniyor...' : 'Video Kaynağı Yüklenmedi',
        canvas.width / 2,
        canvas.height / 2
      );
    }

    for (const overlay of this.overlays) {
      if (this.currentTime >= overlay.startTime && this.currentTime <= overlay.endTime) {
        ctx.save();
        ctx.fillStyle = overlay.color || '#ffffff';
        ctx.font = `bold ${overlay.fontSize || 24}px ${overlay.fontFamily || 'sans-serif'}`;
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        const posX = (canvas.width * overlay.x) / 100;
        const posY = (canvas.height * overlay.y) / 100;
        ctx.fillText(overlay.text, posX, posY);
        ctx.restore();
      }
    }

    if (this.isPlaying) {
      this.animationFrameId = requestAnimationFrame(this.renderFrame);
    }
  };

  private handleVideoLoaded = (): void => {
    if (!this.videoEl) return;
    const dur = this.videoEl.duration || 10;
    this.duration = dur;
    this.trimEnd = dur;
    this.dispatchEvent(
      new CustomEvent('senkron:ready', {
        detail: { duration: dur },
        bubbles: true,
        composed: true,
      })
    );
    this.renderFrame();
  };

  private handleTimeUpdate = (): void => {
    if (!this.videoEl) return;
    this.currentTime = this.videoEl.currentTime;

    if (this.currentTime >= this.trimEnd) {
      this.videoEl.currentTime = this.trimStart;
      this.currentTime = this.trimStart;
    }

    this.dispatchEvent(
      new CustomEvent('senkron:timeupdate', {
        detail: { currentTime: this.currentTime },
        bubbles: true,
        composed: true,
      })
    );
    this.renderFrame();
  };

  private togglePlay = (): void => {
    if (!this.videoEl) return;

    if (this.isPlaying) {
      this.videoEl.pause();
      this.isPlaying = false;
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
      }
    } else {
      if (this.currentTime < this.trimStart || this.currentTime >= this.trimEnd) {
        this.videoEl.currentTime = this.trimStart;
      }
      this.videoEl.play().catch(() => {});
      this.isPlaying = true;
      this.renderFrame();
    }
  };

  private handleSeek = (e: MouseEvent): void => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * this.duration;

    this.currentTime = newTime;
    if (this.videoEl) {
      this.videoEl.currentTime = newTime;
    }
    this.renderFrame();
  };

  private setTrimStartToCurrent = (): void => {
    this.trimStart = Math.min(this.currentTime, this.trimEnd - 0.5);
  };

  private setTrimEndToCurrent = (): void => {
    this.trimEnd = Math.max(this.currentTime, this.trimStart + 0.5);
  };

  private setAspectRatio = (ratio: string): void => {
    this.aspectRatio = ratio;
    this.setupCanvas();
  };

  private addTextOverlay = (): void => {
    if (!this.newOverlayText.trim()) return;

    const newOverlay: TextOverlay = {
      id: `overlay-${Date.now()}`,
      text: this.newOverlayText.trim(),
      startTime: this.currentTime,
      endTime: Math.min(this.duration, this.currentTime + 3),
      x: 50,
      y: 75,
      fontSize: 26,
      color: '#07d0e0',
      fontFamily: 'sans-serif',
    };

    this.overlays = [...this.overlays, newOverlay];
    this.newOverlayText = '';
    this.renderFrame();
  };

  private removeOverlay = (id: string): void => {
    this.overlays = this.overlays.filter((o) => o.id !== id);
    this.renderFrame();
  };

  private startExport = async (): Promise<string | null> => {
    if (!this.videoEl || !this.canvasEl) return null;

    this.isExporting = true;
    this.exportedVideoUrl = null;

    try {
      const outputUrl = await this.ffmpegService.exportVideo(
        this.videoEl,
        this.canvasEl,
        this.trimStart,
        this.trimEnd,
        this.overlays,
        (progress) => {
          this.exportProgress = progress;
          this.dispatchEvent(
            new CustomEvent('senkron:export-progress', {
              detail: progress,
              bubbles: true,
              composed: true,
            })
          );
        }
      );

      this.exportedVideoUrl = outputUrl;
      this.dispatchEvent(
        new CustomEvent('senkron:export-complete', {
          detail: {
            outputBlobUrl: outputUrl,
            duration: this.trimEnd - this.trimStart,
          },
          bubbles: true,
          composed: true,
        })
      );
      return outputUrl;
    } catch (err: unknown) {
      this.exportProgress = {
        percentage: 0,
        stage: 'error',
        message: err instanceof Error ? err.message : 'Export başarısız oldu',
      };
      this.dispatchEvent(
        new CustomEvent('senkron:error', {
          detail: { message: 'Export failed', error: err },
          bubbles: true,
          composed: true,
        })
      );
      return null;
    }
  };

  private handleAttachToPost = async (): Promise<void> => {
    let url = this.exportedVideoUrl;
    if (!url) {
      url = await this.startExport();
    }

    if (url) {
      const detail: VideoAttachedDetail = {
        videoUrl: url,
        duration: this.trimEnd - this.trimStart,
        aspectRatio: this.aspectRatio,
        trimStart: this.trimStart,
        trimEnd: this.trimEnd,
        overlaysCount: this.overlays.length,
      };

      this.dispatchEvent(
        new CustomEvent('senkron:video-attached', {
          detail,
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  }

  render() {
    const playheadPercent = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    const trimStartPercent = this.duration > 0 ? (this.trimStart / this.duration) * 100 : 0;
    const trimWidthPercent =
      this.duration > 0 ? ((this.trimEnd - this.trimStart) / this.duration) * 100 : 100;

    return html`
      <div class="editor-container">
        <!-- Header -->
        <div class="editor-header">
          <div class="editor-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <span>Senkron Video Studio (WASM FFmpeg)</span>
          </div>

          <div class="aspect-selector">
            ${['16:9', '9:16', '1:1', '4:5'].map(
              (ratio) => html`
                <button
                  class="aspect-btn ${this.aspectRatio === ratio ? 'active' : ''}"
                  @click=${() => this.setAspectRatio(ratio)}
                >
                  ${ratio}
                </button>
              `
            )}
          </div>
        </div>

        <!-- Preview Stage -->
        <div class="preview-stage">
          <div class="canvas-wrapper">
            <canvas></canvas>
            <video
              playsinline
              crossorigin="anonymous"
              @loadedmetadata=${this.handleVideoLoaded}
              @timeupdate=${this.handleTimeUpdate}
              @ended=${() => (this.isPlaying = false)}
            ></video>
          </div>

          ${this.isExporting
            ? html`
                <div class="modal-backdrop" style="position: absolute;">
                  <div class="modal-dialog" style="max-width: 360px; padding: 24px; text-align: center;">
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px;">
                      ${this.exportProgress.stage === 'completed'
                        ? '🎉 Video Render Tamamlandı!'
                        : this.exportProgress.stage === 'error'
                        ? '❌ Render Hatası'
                        : '⚡ WASM FFmpeg ile İşleniyor...'}
                    </div>

                    <div style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 8px;">
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div style="font-size: 11px; color: #94a3b8; margin-bottom: 16px;">
                      ${this.exportProgress.message || `${this.exportProgress.percentage}%`}
                    </div>

                    ${this.exportedVideoUrl
                      ? html`
                          <div style="display: flex; gap: 8px; justify-content: center;">
                            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
                              Videoyu Gönderiye Ekle
                            </button>
                            <button class="btn" @click=${() => (this.isExporting = false)}>
                              Kapat
                            </button>
                          </div>
                        `
                      : html`
                          <button class="btn" @click=${() => (this.isExporting = false)}>
                            İptal
                          </button>
                        `}
                  </div>
                </div>
              `
            : ''}
        </div>

        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="playback-group">
            <button class="btn" @click=${this.togglePlay}>
              ${this.isPlaying ? 'Duraklat' : 'Oynat'}
            </button>
            <span class="timecode">
              ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}
            </span>
          </div>

          <div class="playback-group">
            <button class="btn" @click=${this.setTrimStartToCurrent} title="Başlangıç Noktası">
              Baş [${this.formatTime(this.trimStart)}]
            </button>
            <button class="btn" @click=${this.setTrimEndToCurrent} title="Bitiş Noktası">
              Bit [${this.formatTime(this.trimEnd)}]
            </button>
            <button class="btn btn-primary" @click=${this.handleAttachToPost}>
              Videoyu Gönderiye Ekle
            </button>
          </div>
        </div>

        <!-- CapCut Timeline -->
        <div class="timeline-container">
          <div class="timeline-toolbar">
            <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
              Zaman Çizelgesi & Kırpma Aralığı (${this.formatTime(this.trimEnd - this.trimStart)})
            </span>

            <div class="overlay-editor">
              <input
                type="text"
                class="text-input"
                placeholder="Altyazı / Metin ekle..."
                .value=${this.newOverlayText}
                @input=${(e: Event) => (this.newOverlayText = (e.target as HTMLInputElement).value)}
                @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addTextOverlay()}
              />
              <button class="btn" @click=${this.addTextOverlay}>
                + Metin
              </button>
            </div>
          </div>

          <div class="track-wrapper" @click=${this.handleSeek}>
            <div class="track-ruler">
              <span>00:00</span>
              <span>${this.formatTime(this.duration / 2)}</span>
              <span>${this.formatTime(this.duration)}</span>
            </div>

            <div class="track-content">
              <div
                class="trim-region"
                style="left: ${trimStartPercent}%; width: ${trimWidthPercent}%;"
              ></div>
              <div class="playhead" style="left: ${playheadPercent}%;"></div>
            </div>
          </div>

          ${this.overlays.length > 0
            ? html`
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${this.overlays.map(
                    (ov) => html`
                      <div
                        style="background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; padding: 3px 8px; font-size: 11px; display: flex; align-items: center; gap: 6px;"
                      >
                        <span style="color: #07d0e0; font-weight: 600;">"${ov.text}"</span>
                        <span style="color: #64748b;">
                          (${this.formatTime(ov.startTime)} - ${this.formatTime(ov.endTime)})
                        </span>
                        <button
                          style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0 2px;"
                          @click=${() => this.removeOverlay(ov.id)}
                        >
                          ✕
                        </button>
                      </div>
                    `
                  )}
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}
