import { GenerationRequest, GenerationResult, LLMBackendConfig, PostCandidate, RoutingTelemetry } from './types';
import { moderateContent } from './guardrails/moderation';
import { SmartRouter } from './router/smart-router';
import { TwoStageGenerator } from './pipeline/two-stage-generator';

export class LLMGateway {
  private config: LLMBackendConfig;
  private router: SmartRouter;
  private pipeline: TwoStageGenerator;

  constructor(config?: Partial<LLMBackendConfig>) {
    this.config = {
      type: (process.env.LLM_BACKEND_TYPE as 'internal' | 'external') || 'internal',
      baseUrl: process.env.LLM_BASE_URL || 'http://localhost:11434/v1',
      apiKey: process.env.LLM_API_KEY || '',
      modelName: process.env.LLM_MODEL_NAME || 'senkron-turkish-llama3.2:3b',
      maxLocalConcurrency: config?.maxLocalConcurrency ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: config?.localTimeoutMs ?? Number(process.env.LOCAL_TIMEOUT_MS || 5000),
      ...config,
    };

    this.router = new SmartRouter({
      localBaseUrl: this.config.baseUrl,
      localModelName: this.config.modelName,
      maxLocalConcurrency: this.config.maxLocalConcurrency,
      localTimeoutMs: this.config.localTimeoutMs,
      externalBaseUrl: this.config.externalBaseUrl || process.env.EXTERNAL_LLM_BASE_URL || 'https://api.openai.com/v1',
      externalApiKey: this.config.apiKey || this.config.externalApiKey || process.env.EXTERNAL_LLM_API_KEY,
      externalModelName: this.config.externalModelName || process.env.EXTERNAL_LLM_MODEL || 'gpt-4o-mini',
      forceRoute: this.config.forceRoute || (this.config.type === 'external' ? 'external' : undefined),
      allowSimulation: config?.allowSimulation ?? process.env.NODE_ENV !== 'production',
    });

    this.pipeline = new TwoStageGenerator(this.router, {
      allowSimulation: config?.allowSimulation ?? process.env.NODE_ENV !== 'production',
    });
  }

  public getRouter(): SmartRouter {
    return this.router;
  }

  public async generatePost(req: GenerationRequest): Promise<GenerationResult> {
    // 1. Strict Guest Blocking
    if (req.isGuest || req.userId === 'guest' || !req.userId) {
      throw new Error('UNAUTHORIZED_GUEST: Misafir kullanıcıların gönderi üretme izni yoktur. Lütfen giriş yapın.');
    }

    // 2. Strict Input Moderation
    const moderation = moderateContent(req.topic);
    if (!moderation.passed) {
      throw new Error(`CONTENT_MODERATION_BLOCKED: ${moderation.reason}`);
    }

    const tone = req.tone || 'viral';
    const candidateCount = req.candidateCount || 3;

    // 3. Multi-Candidate Two-Stage Generation Pipeline
    const pipelineResult = await this.pipeline.generateCandidates(req.topic, tone, candidateCount);

    const candidates: PostCandidate[] = pipelineResult.candidates;
    const selectedCandidate = candidates[pipelineResult.selectedIndex] || candidates[0];

    // 4. Output Moderation Check on selected post
    const outputModeration = moderateContent(selectedCandidate.content);
    if (!outputModeration.passed) {
      throw new Error('OUTPUT_MODERATION_BLOCKED: Üretilen içerik güvenlik standartlarına uymadığından engellendi.');
    }

    const cleanContent = selectedCandidate.content.trim();
    const promptTokens = Math.ceil(req.topic.length / 4) + 50;
    const completionTokens = Math.ceil(cleanContent.length / 4);

    // Telemetri yoksa (örn. test için dışarıdan chatExecutor verildiyse) uydurma
    // değer değil, açıkça simülasyon olduğunu beyan eden kayıt üretilir.
    const routingTelemetry: RoutingTelemetry = pipelineResult.telemetry || {
      routeUsed: 'simulated',
      routeReason: 'simulation_no_router',
      latencyMs: 0,
      activeLocalSlots: 0,
      maxLocalConcurrency: this.config.maxLocalConcurrency || 2,
      fallbackTriggered: true,
    };

    return {
      content: cleanContent,
      hashtags: selectedCandidate.hashtags,
      characterCount: cleanContent.length,
      maxCharacters: 500,
      modelUsed: pipelineResult.rawModel || this.config.modelName || 'senkron-turkish-llama3.2:3b',
      tokenUsage: {
        promptTokens,
        completionTokens,
        totalTokens: promptTokens + completionTokens,
      },
      candidates,
      selectedCandidateIndex: pipelineResult.selectedIndex,
      routingTelemetry,
    };
  }
}
