import { default as React } from 'react';
import { VideoAttachedDetail, ExportProgressDetail } from '../video-editor/types';

export interface SenkronVideoEditorModalProps {
    isOpen: boolean;
    src?: string;
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
    theme?: 'dark' | 'light';
    onClose?: () => void;
    onVideoAttached?: (detail: VideoAttachedDetail) => void;
    onExportProgress?: (detail: ExportProgressDetail) => void;
}
export declare const SenkronVideoEditorModal: React.FC<SenkronVideoEditorModalProps>;
