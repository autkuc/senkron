import { SenkronPostGenerator } from './post-generator.element';
import { SenkronPostGeneratorModal } from './post-generator-modal.element';

export * from './types';
export { SenkronPostGenerator, SenkronPostGeneratorModal };
declare global {
    interface HTMLElementTagNameMap {
        'senkron-post-generator': SenkronPostGenerator;
        'senkron-post-generator-modal': SenkronPostGeneratorModal;
    }
}
