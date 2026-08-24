import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { postGeneratorStyles } from './styles';
import { ContentTone, PostAppliedDetail } from './types';
import './post-generator.element';

export class SenkronPostGeneratorModal extends LitElement {
  static styles = postGeneratorStyles;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, attribute: 'api-url' })
  apiUrl = '';

  @property({ type: String, attribute: 'default-tone' })
  defaultTone: ContentTone = 'viral';

  @property({ type: String })
  topic = '';

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

  private handlePostApplied = (e: CustomEvent<PostAppliedDetail>): void => {
    this.dispatchEvent(
      new CustomEvent('senkron:post-applied', {
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
                Taslak Oluşturucu
              </span>
            </div>

            <button class="modal-close-btn" @click=${this.closeModal} title="Kapat">
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
    `;
  }
}
