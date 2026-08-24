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

export interface PostCandidate {
  id: string;
  hook: string;
  content: string;
  hashtags: string[];
  characterCount: number;
  viralityScore: number;
  entropyScore: number;
}

export interface RoutingTelemetry {
  routeUsed: 'internal' | 'external';
  routeReason:
    | 'local_healthy'
    | 'local_concurrency_saturated'
    | 'local_offline'
    | 'local_timeout_fallback'
    | 'forced_mode';
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
}

export interface LLMBackendConfig extends SmartRouterConfig {
  type?: 'internal' | 'external';
  baseUrl?: string;
  apiKey?: string;
  modelName?: string;
}
