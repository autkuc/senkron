export declare function buildPrompt(topic: string, tone?: ContentTone): string;

export declare interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export declare function checkPromptInjection(input: string): ModerationResult;

export declare type ContentTone = 'viral' | 'professional' | 'educational' | 'casual' | 'witty';

export declare interface GenerationRequest {
    topic: string;
    tone?: ContentTone;
    userId: string;
    isGuest?: boolean;
    candidateCount?: number;
    temperature?: number;
}

export declare interface GenerationResult {
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

export declare interface LLMBackendConfig extends SmartRouterConfig {
    type?: 'internal' | 'external';
    baseUrl?: string;
    apiKey?: string;
    modelName?: string;
}

export declare class LLMGateway {
    private config;
    private router;
    private pipeline;
    constructor(config?: Partial<LLMBackendConfig>);
    getRouter(): SmartRouter;
    generatePost(req: GenerationRequest): Promise<GenerationResult>;
}

export declare function moderateContent(text: string): ModerationResult;

export declare type ModerationCategory = 'hate_speech' | 'harassment' | 'explicit' | 'violence' | 'spam' | 'misinformation' | 'prompt_injection';

export declare interface ModerationResult {
    passed: boolean;
    flaggedCategories: ModerationCategory[];
    reason?: string;
    confidenceScore: number;
}

export declare interface PostCandidate {
    id: string;
    hook: string;
    content: string;
    hashtags: string[];
    characterCount: number;
    viralityScore: number;
    entropyScore: number;
}

export declare interface RouteExecutionResult {
    rawText: string;
    tokenUsage: TokenMetrics;
    modelUsed: string;
    telemetry: RoutingTelemetry;
}

export declare interface RoutingTelemetry {
    routeUsed: 'internal' | 'external';
    routeReason: 'local_healthy' | 'local_concurrency_saturated' | 'local_offline' | 'local_timeout_fallback' | 'forced_mode';
    latencyMs: number;
    activeLocalSlots: number;
    maxLocalConcurrency: number;
    fallbackTriggered: boolean;
}

export declare class SmartRouter {
    private config;
    private activeLocalSlots;
    private isLocalHealthy;
    private lastHealthCheckTime;
    constructor(config?: Partial<SmartRouterConfig>);
    getActiveLocalSlots(): number;
    getMaxLocalConcurrency(): number;
    isLocalAvailable(): boolean;
    executeChat(messages: ChatMessage[], temperature?: number): Promise<RouteExecutionResult>;
    private callLocalWithTimeout;
    private callExternal;
    private simulateFallbackResponse;
}

export declare interface SmartRouterConfig {
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

export declare const SYSTEM_PROMPT = "Sen NSosyal sosyal a\u011F platformu i\u00E7in uzman bir yapay zeka i\u00E7erik yazar\u0131s\u0131n.\nG\u00F6revlerin:\n1. Kullan\u0131c\u0131n\u0131n konusundan ilgi \u00E7ekici, y\u00FCksek etkile\u015Fimli ve kusursuz T\u00FCrk\u00E7e dil kurallar\u0131na uygun bir g\u00F6nderi olu\u015Fturmak.\n2. Kesinlikle YALNIZCA ak\u0131c\u0131, kurall\u0131 ve duru T\u00FCrk\u00E7e yaz. Yabanc\u0131 dildeki (\u0130ngilizce, Frans\u0131zca, Hint\u00E7e, Leh\u00E7e vb.) kelimeleri veya anlams\u0131z karakterleri ASLA kullanma.\n3. NSosyal platformunun 500 karakterlik s\u0131n\u0131r\u0131na kesinlikle uymak ve c\u00FCmleleri tam bitirmek.\n4. \u0130stenen tona (Viral, Kurumsal, E\u011Fitici, Samimi, Yarat\u0131c\u0131) uygun \u00FCslup kullanmak.\n5. G\u00F6nderinin sonuna 3-4 ilgili T\u00FCrk\u00E7e hashtag eklemek (\u00F6rne\u011Fin #NSosyal #Teknoloji).\n6. A\u015F\u0131r\u0131 reklam dili kullanmamak, do\u011Fal ve topluluk odakl\u0131 yazmak.";

export declare interface TokenMetrics {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
}

export declare class TwoStageGenerator {
    private router?;
    constructor(router?: SmartRouter | undefined);
    generateCandidates(topic: string, tone?: ContentTone, candidateCount?: number, chatExecutor?: (messages: ChatMessage[]) => Promise<{
        text: string;
        raw: unknown;
    }>): Promise<TwoStageResult>;
    private buildPromptMessages;
    private parseCandidatesFromLLM;
    private cleanTurkishText;
    private stripTrailingHashtags;
    private getToneHook;
    private extractHashtags;
}

export declare interface TwoStageGeneratorOptions {
    modelName?: string;
    temperature?: number;
}

export declare interface TwoStageResult {
    candidates: PostCandidate[];
    selectedIndex: number;
    telemetry?: RoutingTelemetry;
    rawModel?: string;
}

export { }
