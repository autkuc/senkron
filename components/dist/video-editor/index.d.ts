import { SenkronVideoEditor } from './video-editor.element';
import { SenkronVideoEditorModal } from './video-editor-modal.element';

export * from './types';
export * from './ffmpeg-service';
export { SenkronVideoEditor, SenkronVideoEditorModal };
declare global {
    interface HTMLElementTagNameMap {
        'senkron-video-editor': SenkronVideoEditor;
        'senkron-video-editor-modal': SenkronVideoEditorModal;
    }
}
