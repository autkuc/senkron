import { default as React } from 'react';
import { ExportProgressDetail } from '../video-editor/types';

export interface SenkronVideoEditorProps {
    src?: string;
    aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5';
    theme?: 'dark' | 'light';
    autoplay?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onReady?: (e: CustomEvent<{
        duration: number;
    }>) => void;
    onTimeUpdate?: (e: CustomEvent<{
        currentTime: number;
    }>) => void;
    onExportProgress?: (e: CustomEvent<ExportProgressDetail>) => void;
    onExportComplete?: (e: CustomEvent<{
        outputBlobUrl: string;
        duration: number;
    }>) => void;
    onError?: (e: CustomEvent<{
        message: string;
        error?: unknown;
    }>) => void;
}
export declare const SenkronVideoEditor: React.FC<SenkronVideoEditorProps>;
