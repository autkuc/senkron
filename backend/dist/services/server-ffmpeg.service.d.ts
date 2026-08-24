export interface TranscodeOptions {
    inputPath: string;
    outputPath: string;
    startTimeSec?: number;
    durationSec?: number;
    width?: number;
    height?: number;
    fps?: number;
    audioCodec?: string;
    videoCodec?: string;
}
export interface TranscodeJob {
    jobId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progressPercent: number;
    outputUrl?: string;
    error?: string;
    createdAt: string;
    completedAt?: string;
}
export declare class ServerFFmpegService {
    private jobs;
    private hasNativeFFmpeg;
    constructor();
    private detectFFmpegBinary;
    createJob(jobId: string): TranscodeJob;
    getJob(jobId: string): TranscodeJob | undefined;
    /**
     * Real native FFmpeg pipeline processing with fluent-ffmpeg
     */
    processVideoFile(jobId: string, options: TranscodeOptions): Promise<TranscodeJob>;
    /**
     * Fallback transcoding simulation for environments without native FFmpeg binary
     */
    simulateServerTranscode(jobId: string, durationSec?: number): Promise<TranscodeJob>;
}
export declare const serverFFmpegService: ServerFFmpegService;
