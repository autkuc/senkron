export interface TextOverlay {
    id: string;
    text: string;
    startTime: number;
    endTime: number;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    fontFamily: string;
}
export interface VideoClip {
    id: string;
    src: string;
    startTime: number;
    endTime: number;
    duration: number;
    originalDuration: number;
    playbackRate: number;
    volume: number;
}
export interface ExportProgressDetail {
    percentage: number;
    stage: 'idle' | 'extracting' | 'processing' | 'encoding' | 'completed' | 'error';
    message?: string;
    outputBlobUrl?: string;
}
export interface VideoAttachedDetail {
    videoUrl: string;
    duration: number;
    aspectRatio: string;
    trimStart: number;
    trimEnd: number;
    overlaysCount: number;
}
export interface VideoEditorEvents {
    'senkron:ready': CustomEvent<{
        duration: number;
    }>;
    'senkron:timeupdate': CustomEvent<{
        currentTime: number;
    }>;
    'senkron:export-progress': CustomEvent<ExportProgressDetail>;
    'senkron:export-complete': CustomEvent<{
        outputBlobUrl: string;
        duration: number;
    }>;
    'senkron:video-attached': CustomEvent<VideoAttachedDetail>;
    'senkron:modal-close': CustomEvent<void>;
    'senkron:error': CustomEvent<{
        message: string;
        error?: unknown;
    }>;
}
