export type ContentTone = 'viral' | 'professional' | 'educational' | 'casual' | 'witty';

export type ModerationCategory =
  | 'hate_speech'
  | 'harassment'
  | 'explicit'
  | 'violence'
  | 'spam'
  | 'misinformation'
  | 'prompt_injection';

export interface ModerationResult {
  passed: boolean;
  flaggedCategories: ModerationCategory[];
  reason?: string;
  confidenceScore: number;
}

export interface CandidateScores {
  relevance: number;
  languageQuality: number;
  novelty: number;
  lengthFit: number;
  safety: number;
  total: number;
}

export interface PostCandidate {
  id: string;
  hook: string;
  content: string;
  hashtags: string[];
  characterCount: number;
  /** Türetilmiş toplam skorun 0-100 ölçeği (açıklanabilir sıralama, sabit değer değil). */
  viralityScore: number;
  /** Türetilmiş çeşitlilik (novelty) skorunun 0-100 ölçeği. */
  entropyScore: number;
  scores?: CandidateScores;
}

export interface RoutingTelemetry {
  routeUsed: 'internal' | 'external' | 'simulated';
  routeReason:
    | 'local_healthy'
    | 'local_concurrency_saturated'
    | 'local_offline'
    | 'local_timeout_fallback'
    | 'forced_mode'
    | 'simulation_no_router';
  latencyMs: number;
  activeLocalSlots: number;
  maxLocalConcurrency: number;
  fallbackTriggered: boolean;
}

export interface TokenMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface GenerationRequest {
  topic: string;
  tone?: ContentTone;
  userId: string;
  isGuest?: boolean;
  candidateCount?: number;
  temperature?: number;
}

export interface GenerationResult {
  content: string;
  hashtags: string[];
  characterCount: number;
  maxCharacters: number;
  modelUsed: string;
  tokenUsage: TokenMetrics;
  candidates: PostCandidate[];
  selectedCandidateIndex: number;
  routingTelemetry: RoutingTelemetry;
}

export interface TwoStageResult {
  candidates: PostCandidate[];
  selectedIndex: number;
  telemetry?: RoutingTelemetry;
  rawModel?: string;
}

export interface TwoStageGeneratorOptions {
  modelName?: string;
  temperature?: number;
}

export interface SmartRouterConfig {
  localBaseUrl?: string;
  localModelName?: string;
  maxLocalConcurrency?: number;
  localTimeoutMs?: number;
  externalBaseUrl?: string;
  externalApiKey?: string;
  externalModelName?: string;
  healthCheckIntervalMs?: number;
  forceRoute?: 'internal' | 'external';
  /**
   * Yerel ve dış sağlayıcıya ulaşılamadığında deterministik simülasyona izin verilir mi?
   * Varsayılan: NODE_ENV !== 'production'. Production'da false olmalı; sistem sahte çıktı
   * yerine açık hata üretir.
   */
  allowSimulation?: boolean;
}

export interface LLMBackendConfig extends SmartRouterConfig {
  type?: 'internal' | 'external';
  baseUrl?: string;
  apiKey?: string;
  modelName?: string;
}
