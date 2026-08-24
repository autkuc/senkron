import { SenkronPostGenerator } from './post-generator.element';
import { SenkronPostGeneratorModal } from './post-generator-modal.element';

export * from './types';
export { SenkronPostGenerator, SenkronPostGeneratorModal };

if (typeof window !== 'undefined') {
  if (!customElements.get('senkron-post-generator')) {
    customElements.define('senkron-post-generator', SenkronPostGenerator);
  }
  if (!customElements.get('senkron-post-generator-modal')) {
    customElements.define('senkron-post-generator-modal', SenkronPostGeneratorModal);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'senkron-post-generator': SenkronPostGenerator;
    'senkron-post-generator-modal': SenkronPostGeneratorModal;
  }
}
