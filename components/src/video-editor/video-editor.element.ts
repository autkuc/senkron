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

  @state()
  private fileName = '';

  @state()
  private isDragging = false;

  private ffmpegService = new FFmpegService();
  private animationFrameId: number | null = null;

  private get videoEl(): HTMLVideoElement | null {
    return this.renderRoot.querySelector('video');
  }

  private get canvasEl(): HTMLCanvasElement | null {
    return this.renderRoot.querySelector('canvas.overlay-canvas');
  }

  private get fileInputEl(): HTMLInputElement | null {
    return this.renderRoot.querySelector('input[type="file"]');
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
    if (changedProperties.has('aspectRatio')) {
      this.setupCanvas();
    }
  }

  private setupCanvas(): void {
    const canvas = this.canvasEl;
    const video = this.videoEl;
    if (!canvas) return;

    if (video && video.videoWidth && video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    } else {
      const [wRatio, hRatio] = this.aspectRatio.split(':').map(Number);
      const baseWidth = 640;
      const baseHeight = (baseWidth * (hRatio || 9)) / (wRatio || 16);
      canvas.width = baseWidth;
      canvas.height = baseHeight;
    }

    this.renderOverlays();
  }

  private renderOverlays = (): void => {
    const canvas = this.canvasEl;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      this.animationFrameId = requestAnimationFrame(this.renderOverlays);
    }
  };

  public loadVideoFile = (file: File | Blob): void => {
    const fileName = (file as File).name || 'video.mp4';
    const objectUrl = URL.createObjectURL(file);
    this.src = objectUrl;
    this.fileName = fileName;
    this.currentTime = 0;
    this.trimStart = 0;
    this.isPlaying = false;

    if (this.videoEl) {
      this.videoEl.src = objectUrl;
      this.videoEl.load();
    }

    this.dispatchEvent(
      new CustomEvent('senkron:file-selected', {
        detail: {
          name: fileName,
          size: file.size,
          type: file.type,
          url: objectUrl,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  private triggerFilePicker = (): void => {
    this.fileInputEl?.click();
  };

  private handleFileInputChange = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.loadVideoFile(input.files[0]);
    }
  };

  private handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragging = true;
  };

  private handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragging = false;
  };

  private handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      this.loadVideoFile(e.dataTransfer.files[0]);
    }
  };

  private handleVideoLoaded = (): void => {
    if (!this.videoEl) return;
    const dur = this.videoEl.duration || 10;
    this.duration = dur;
    this.trimEnd = dur;
    this.setupCanvas();

    this.dispatchEvent(
      new CustomEvent('senkron:ready', {
        detail: { duration: this.duration },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleTimeUpdate = (): void => {
    if (!this.videoEl) return;
    this.currentTime = this.videoEl.currentTime;

    if (this.currentTime >= this.trimEnd) {
      this.videoEl.currentTime = this.trimStart;
      if (!this.autoplay) {
        this.videoEl.pause();
        this.isPlaying = false;
      }
    }

    this.renderOverlays();
  };

  private togglePlay = (): void => {
    const video = this.videoEl;
    if (!video) return;

    if (this.isPlaying) {
      video.pause();
      this.isPlaying = false;
    } else {
      if (this.currentTime >= this.trimEnd || this.currentTime < this.trimStart) {
        video.currentTime = this.trimStart;
      }
      video.play().catch(() => {});
      this.isPlaying = true;
      this.renderOverlays();
    }
  };

  private seek = (time: number): void => {
    const video = this.videoEl;
    if (!video) return;

    this.currentTime = Math.max(0, Math.min(this.duration, time));
    video.currentTime = this.currentTime;
    this.renderOverlays();
  };

  private handleTimelineClick = (e: MouseEvent): void => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.seek(pos * this.duration);
  };

  private setTrimStartToCurrent = (): void => {
    if (this.currentTime < this.trimEnd) {
      this.trimStart = this.currentTime;
      this.requestUpdate();
    }
  };

  private setTrimEndToCurrent = (): void => {
    if (this.currentTime > this.trimStart) {
      this.trimEnd = this.currentTime;
      this.requestUpdate();
    }
  };

  private setAspectRatio = (ratio: string): void => {
    this.aspectRatio = ratio;
    this.setupCanvas();
    this.dispatchEvent(
      new CustomEvent('senkron:aspect-ratio-change', {
        detail: { aspectRatio: ratio },
        bubbles: true,
        composed: true,
      })
    );
  };

  private addOverlay = (): void => {
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
    this.renderOverlays();
  };

  private removeOverlay = (id: string): void => {
    this.overlays = this.overlays.filter((o) => o.id !== id);
    this.renderOverlays();
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
        },
        this.aspectRatio
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
            ${this.fileName
              ? html`<span class="file-badge" title="${this.fileName}">📁 ${this.fileName}</span>`
              : ''}
          </div>

          <div class="header-actions">
            <!-- Video Upload Button inside Editor Modal -->
            <label class="upload-btn" title="Cihazınızdan video yükleyin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>${this.src ? 'Videoyu Değiştir' : 'Video Yükle'}</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/*"
                style="display: none;"
                @change=${this.handleFileInputChange}
              />
            </label>

            <!-- Aspect Ratio Selector -->
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
        </div>

        <!-- Preview Stage -->
        <div
          class="preview-stage"
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          ${this.src
            ? html`
                <div class="video-preview-wrapper">
                  <video
                    playsinline
                    crossorigin="anonymous"
                    .src=${this.src}
                    @loadedmetadata=${this.handleVideoLoaded}
                    @timeupdate=${this.handleTimeUpdate}
                    @ended=${() => (this.isPlaying = false)}
                    @click=${this.togglePlay}
                  ></video>
                  <canvas class="overlay-canvas"></canvas>
                </div>
              `
            : html`
                <div class="empty-stage-dropzone" @click=${this.triggerFilePicker}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <div>
                    <div style="font-weight: 600; font-size: 15px; color: #f1f5f9; margin-bottom: 4px;">
                      Video Dosyasını Buraya Sürükleyin veya Seçin
                    </div>
                    <div style="font-size: 12px; color: #64748b;">
                      MP4, WebM, MOV desteklenir • İstemci taraflı WASM işleme
                    </div>
                  </div>
                </div>
              `}

          ${this.isDragging
            ? html`
                <div class="drop-overlay">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#07d0e0" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>Video Dosyasını Bırakın</span>
                </div>
              `
            : ''}

          ${this.isExporting
            ? html`
                <div class="modal-backdrop" style="position: absolute;">
                  <div class="modal-dialog" style="max-width: 380px; padding: 24px; text-align: center;">
                    <div style="font-weight: 700; font-size: 15px; margin-bottom: 12px; color: #f1f5f9;">
                      ${this.exportProgress.stage === 'completed'
                        ? '🎉 Video Render Tamamlandı!'
                        : this.exportProgress.stage === 'error'
                        ? '❌ Render Hatası'
                        : '⚡ WASM FFmpeg ile İşleniyor...'}
                    </div>

                    <div style="height: 6px; background: #1e293b; border-radius: 9999px; overflow: hidden; margin-bottom: 10px;">
                      <div
                        style="height: 100%; width: ${this.exportProgress.percentage}%; background: linear-gradient(90deg, #07d0e0, #324bff); transition: width 0.2s ease;"
                      ></div>
                    </div>

                    <div style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">
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
            <button class="btn" @click=${this.togglePlay} ?disabled=${!this.src}>
              ${this.isPlaying ? 'Duraklat' : 'Oynat'}
            </button>
            <button class="btn" @click=${this.setTrimStartToCurrent} ?disabled=${!this.src} title="Başlangıç Noktası Ayarla">
              [ Başlangıç
            </button>
            <button class="btn" @click=${this.setTrimEndToCurrent} ?disabled=${!this.src} title="Bitiş Noktası Ayarla">
              Bitiş ]
            </button>
          </div>

          <div class="playback-group">
            <button
              class="btn btn-primary"
              @click=${this.startExport}
              ?disabled=${!this.src || this.isExporting}
            >
              ${this.isExporting ? 'İşleniyor...' : '⚡ WASM Dışa Aktar'}
            </button>
          </div>
        </div>

        <!-- Timeline -->
        <div class="timeline-section">
          <div class="timecode-display">
            <span>Seçili Aralık: ${this.formatTime(this.trimStart)} - ${this.formatTime(this.trimEnd)}</span>
            <span>Konum: ${this.formatTime(this.currentTime)} / ${this.formatTime(this.duration)}</span>
          </div>

          <div class="timeline-scrubber-track" @click=${this.handleTimelineClick}>
            <!-- Selected Trim Window -->
            <div
              class="timeline-trim-region"
              style="left: ${trimStartPercent}%; width: ${trimWidthPercent}%;"
            ></div>

            <!-- Overlays Indicators -->
            ${this.overlays.map((overlay) => {
              const start = (overlay.startTime / this.duration) * 100;
              const width = ((overlay.endTime - overlay.startTime) / this.duration) * 100;
              return html`
                <div
                  class="timeline-overlay-marker"
                  style="left: ${start}%; width: ${width}%;"
                  title="${overlay.text}"
                ></div>
              `;
            })}

            <!-- Playhead -->
            <div class="playhead" style="left: ${playheadPercent}%;"></div>
          </div>
        </div>

        <!-- Overlays Manager -->
        <div class="overlays-panel">
          <div class="overlay-input-group">
            <input
              type="text"
              class="overlay-input"
              placeholder="Videoya metin katmanı ekle (örn: #TEKNOFEST2026)..."
              .value=${this.newOverlayText}
              @input=${(e: Event) => (this.newOverlayText = (e.target as HTMLInputElement).value)}
              @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this.addOverlay()}
            />
            <button class="btn" @click=${this.addOverlay} ?disabled=${!this.src}>
              + Metin Ekle
            </button>
          </div>

          ${this.overlays.length > 0
            ? html`
                <div class="overlays-list">
                  ${this.overlays.map(
                    (overlay) => html`
                      <div class="overlay-tag">
                        <span>"${overlay.text}" (${this.formatTime(overlay.startTime)} - ${this.formatTime(overlay.endTime)})</span>
                        <button class="overlay-tag-delete" @click=${() => this.removeOverlay(overlay.id)}>
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
