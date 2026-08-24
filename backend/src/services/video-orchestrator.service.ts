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

export class VideoOrchestratorService {
  public decideProcessingStrategy(req: VideoRouteRequest): VideoRouteDecision {
    const fileSizeMb = req.fileSizeBytes / (1024 * 1024);
    const duration = req.durationSeconds;
    const cores = req.hardwareConcurrency ?? 4;
    const sab = req.supportsSharedArrayBuffer ?? true;

    if (fileSizeMb > 50) {
      return {
        strategy: 'server_native',
        reason: `Dosya boyutu (${fileSizeMb.toFixed(1)}MB) WASM tarayıcı üst sınırı olan 50MB'ı aştığı için sunucu tarafında işlenecektir.`,
        estimatedRenderTimeMs: Math.max(2000, duration * 300),
        serverFallbackAvailable: true,
      };
    }

    if (duration > 60) {
      return {
        strategy: 'server_native',
        reason: `Video süresi (${duration.toFixed(1)}s) tarayıcı içi işleme sınırı olan 60 saniyeyi aşıyor.`,
        estimatedRenderTimeMs: Math.max(3000, duration * 250),
        serverFallbackAvailable: true,
      };
    }

    if (cores < 4 || !sab) {
      return {
        strategy: 'server_native',
        reason: 'Cihaz işlemci çekirdek sayısı veya bellek desteği yetersiz olduğundan sunucu aktarımı önerilir.',
        estimatedRenderTimeMs: 4000,
        serverFallbackAvailable: true,
      };
    }

    const estimatedClientTime = Math.max(800, duration * 120);

    return {
      strategy: 'client_wasm',
      reason: 'Video parametreleri ve cihaz performansı anında tarayıcı içi WASM düzenleme için uygundur (0 sunucu maliyeti).',
      estimatedRenderTimeMs: estimatedClientTime,
      serverFallbackAvailable: true,
    };
  }
}

export const videoOrchestrator = new VideoOrchestratorService();
