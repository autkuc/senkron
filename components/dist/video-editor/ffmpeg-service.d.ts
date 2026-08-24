import { ExportProgressDetail, TextOverlay } from './types';

export declare class FFmpegService {
    private isLoaded;
    private isProcessing;
    initialize(): Promise<void>;
    exportVideo(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement, trimStart: number, trimEnd: number, overlays: TextOverlay[], onProgress: (detail: ExportProgressDetail) => void): Promise<string>;
    private recordCanvasSegment;
    private simulateExport;
}
