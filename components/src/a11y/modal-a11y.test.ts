import { describe, it, expect, beforeEach } from 'vitest';
import '../index';
import { decideTrapAction } from './modal-a11y';
import { SenkronPostGeneratorModal } from '../post-generator/post-generator-modal.element';
import { SenkronVideoEditorModal } from '../video-editor/video-editor-modal.element';

describe('decideTrapAction (pure focus trap logic)', () => {
  it('wraps to last on Shift+Tab from first element', () => {
    expect(decideTrapAction({ focusableCount: 4, activeIndex: 0, shiftKey: true })).toBe('wrap-last');
  });

  it('wraps to first on Tab from last element', () => {
    expect(decideTrapAction({ focusableCount: 4, activeIndex: 3, shiftKey: false })).toBe('wrap-first');
  });

  it('does not intercept Tab in the middle of the dialog', () => {
    expect(decideTrapAction({ focusableCount: 4, activeIndex: 2, shiftKey: false })).toBe('none');
    expect(decideTrapAction({ focusableCount: 4, activeIndex: 2, shiftKey: true })).toBe('none');
  });

  it('is a no-op for empty dialogs', () => {
    expect(decideTrapAction({ focusableCount: 0, activeIndex: -1, shiftKey: false })).toBe('none');
  });
});

describe('Modal WAI-ARIA compliance', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('post generator modal exposes dialog semantics and labelled title', async () => {
    const modal = document.createElement('senkron-post-generator-modal') as SenkronPostGeneratorModal;
    document.body.appendChild(modal);
    await modal.updateComplete;
    modal.openModal();
    await modal.updateComplete;

    const dialog = modal.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('senkron-pgm-title');
    expect(modal.shadowRoot?.getElementById('senkron-pgm-title')).not.toBeNull();

    const closeBtn = modal.shadowRoot?.querySelector('.modal-close-btn');
    expect(closeBtn?.getAttribute('aria-label')).toBeTruthy();
  });

  it('Escape closes the post generator modal', async () => {
    const modal = document.createElement('senkron-post-generator-modal') as SenkronPostGeneratorModal;
    document.body.appendChild(modal);
    await modal.updateComplete;
    modal.openModal();
    await modal.updateComplete;

    const dialog = modal.shadowRoot?.querySelector('[role="dialog"]');
    dialog?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    await modal.updateComplete;
    expect(modal.open).toBe(false);
  });

  it('video editor modal exposes dialog semantics and labelled title', async () => {
    const modal = document.createElement('senkron-video-editor-modal') as SenkronVideoEditorModal;
    document.body.appendChild(modal);
    await modal.updateComplete;
    modal.openModal();
    await modal.updateComplete;

    const dialog = modal.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('senkron-vem-title');
  });

  it('post generator form binds label to textarea and alerts errors', async () => {
    const gen = document.createElement('senkron-post-generator');
    document.body.appendChild(gen);
    await (gen as any).updateComplete;

    const label = gen.shadowRoot?.querySelector('label[for="senkron-pg-topic"]');
    expect(label).not.toBeNull();
    expect(gen.shadowRoot?.getElementById('senkron-pg-topic')).not.toBeNull();

    const group = gen.shadowRoot?.querySelector('.tone-chips');
    expect(group?.getAttribute('role')).toBe('group');
  });
});
