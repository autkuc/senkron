import { SenkronVideoEditor } from './video-editor.element';
import { SenkronVideoEditorModal } from './video-editor-modal.element';

export * from './types';
export * from './ffmpeg-service';
export { SenkronVideoEditor, SenkronVideoEditorModal };

if (typeof window !== 'undefined') {
  if (!customElements.get('senkron-video-editor')) {
    customElements.define('senkron-video-editor', SenkronVideoEditor);
  }
  if (!customElements.get('senkron-video-editor-modal')) {
    customElements.define('senkron-video-editor-modal', SenkronVideoEditorModal);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'senkron-video-editor': SenkronVideoEditor;
    'senkron-video-editor-modal': SenkronVideoEditorModal;
  }
}
