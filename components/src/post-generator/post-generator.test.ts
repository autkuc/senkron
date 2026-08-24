import { describe, it, expect, beforeEach } from 'vitest';
import './index';
import { SenkronPostGenerator } from './post-generator.element';
import { SenkronPostGeneratorModal } from './post-generator-modal.element';

describe('SenkronPostGenerator Web Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('is registered in customElements registry', () => {
    expect(customElements.get('senkron-post-generator')).toBeDefined();
    expect(customElements.get('senkron-post-generator-modal')).toBeDefined();
  });

  it('instantiates with default tone', async () => {
    const el = document.createElement('senkron-post-generator') as SenkronPostGenerator;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.defaultTone).toBe('viral');
  });

  it('renders form inputs in shadowRoot', async () => {
    const el = document.createElement('senkron-post-generator') as SenkronPostGenerator;
    document.body.appendChild(el);
    await el.updateComplete;

    const shadow = el.shadowRoot;
    expect(shadow).not.toBeNull();
    expect(shadow?.querySelector('textarea')).not.toBeNull();
  });

  it('toggles open state in modal component', async () => {
    const modal = document.createElement('senkron-post-generator-modal') as SenkronPostGeneratorModal;
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
