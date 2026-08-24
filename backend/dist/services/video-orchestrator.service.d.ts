export interface VideoRouteRequest {
    fileSizeBytes: number;
    durationSeconds: number;
    width?: number;
    height?: number;
    hardwareConcurrency?: number;
    supportsSharedArrayBuffer?: boolean;
}
export interface VideoRouteDecision {
    strategy: 'client_wasm' | 'server_native';
    reason: string;
    estimatedRenderTimeMs: number;
    serverFallbackAvailable: boolean;
}
export declare class VideoOrchestratorService {
    decideProcessingStrategy(req: VideoRouteRequest): VideoRouteDecision;
}
export declare const videoOrchestrator: VideoOrchestratorService;
