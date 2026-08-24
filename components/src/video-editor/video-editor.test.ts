import { describe, it, expect, beforeEach } from 'vitest';
import './index';
import { SenkronVideoEditor } from './video-editor.element';
import { SenkronVideoEditorModal } from './video-editor-modal.element';

describe('SenkronVideoEditor Web Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('is registered in customElements registry', () => {
    expect(customElements.get('senkron-video-editor')).toBeDefined();
    expect(customElements.get('senkron-video-editor-modal')).toBeDefined();
  });

  it('instantiates with default properties', async () => {
    const el = document.createElement('senkron-video-editor') as SenkronVideoEditor;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.aspectRatio).toBe('16:9');
    expect(el.theme).toBe('dark');
    expect(el.autoplay).toBe(false);
  });

  it('updates aspect-ratio property when changed', async () => {
    const el = document.createElement('senkron-video-editor') as SenkronVideoEditor;
    el.setAttribute('aspect-ratio', '9:16');
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.aspectRatio).toBe('9:16');
  });

  it('toggles open state in modal component', async () => {
    const modal = document.createElement('senkron-video-editor-modal') as SenkronVideoEditorModal;
    document.body.appendChild(modal);
    await modal.updateComplete;

    expect(modal.open).toBe(false);
    modal.openModal();
    await modal.updateComplete;
    expect(modal.open).toBe(true);

    modal.closeModal();
    await modal.updateComplete;
    expect(modal.open).toBe(false);
  });
});
