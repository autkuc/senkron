import { ExportProgressDetail, TextOverlay } from './types';

export declare class FFmpegService {
    private ffmpeg;
    private isLoaded;
    private isProcessing;
    private loadPromise;
    private readonly defaultBaseUrls;
    /**
     * Initializes the WebAssembly FFmpeg instance with fallback support.
     */
    initialize(customBaseUrl?: string): Promise<boolean>;
    /**
     * Exports the video clip using real WebAssembly FFmpeg, with MediaRecorder fallback.
     */
    exportVideo(videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement, trimStart: number, trimEnd: number, overlays: TextOverlay[] | undefined, onProgress: (detail: ExportProgressDetail) => void, aspectRatio?: string): Promise<string>;
    /**
     * Real in-browser WebAssembly FFmpeg video processing pipeline.
     */
    private exportWithWasmFFmpeg;
    /**
     * Browser MediaRecorder Canvas Capture Fallback
     */
    private recordCanvasSegment;
    /**
     * Headless / Unit Test simulated export
     */
    private simulateExport;
}
