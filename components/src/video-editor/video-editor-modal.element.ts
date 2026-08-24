import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { videoEditorStyles } from './styles';
import { VideoAttachedDetail } from './types';
import './video-editor.element';

export class SenkronVideoEditorModal extends LitElement {
  static styles = videoEditorStyles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  src = '';

  @property({ type: String, attribute: 'aspect-ratio' })
  aspectRatio = '16:9';

  @property({ type: String })
  theme = 'dark';

  public openModal(): void {
    this.open = true;
  }

  public closeModal(): void {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('senkron:modal-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleBackdropClick = (e: MouseEvent): void => {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  };

  private handleVideoAttached = (e: CustomEvent<VideoAttachedDetail>): void => {
    // Forward video-attached event
    this.dispatchEvent(
      new CustomEvent('senkron:video-attached', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
    this.closeModal();
  };

  render() {
    if (!this.open) return html``;

    return html`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}>
        <div class="modal-dialog">
          <div class="modal-topbar">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 600; font-size: 14px; color: #f1f5f9;">
                Video Düzenle
              </span>
            </div>

            <button class="modal-close-btn" @click=${this.closeModal} title="Kapat">
              ✕
            </button>
          </div>

          <senkron-video-editor
            .src=${this.src}
            .aspectRatio=${this.aspectRatio}
            .theme=${this.theme}
            @senkron:video-attached=${this.handleVideoAttached}
          ></senkron-video-editor>
        </div>
      </div>
    `;
  }
}
