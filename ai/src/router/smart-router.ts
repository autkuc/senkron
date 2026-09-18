import { RoutingTelemetry, SmartRouterConfig, TokenMetrics } from '../types';

export interface RouteExecutionResult {
  rawText: string;
  tokenUsage: TokenMetrics;
  modelUsed: string;
  telemetry: RoutingTelemetry;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class SmartRouter {
  private config: Required<SmartRouterConfig>;
  private activeLocalSlots: number = 0;
  private isLocalHealthy: boolean = true;
  private lastHealthCheckTime: number = 0;

  constructor(config?: Partial<SmartRouterConfig>) {
    const defaultLocalUrl =
      process.env.LOCAL_LLM_BASE_URL ||
      (process.env.NODE_ENV === 'test'
        ? 'http://localhost:11434/v1'
        : 'https://arapronaldosui--senkron-turkish-llm-service-api.modal.run');

    this.config = {
      localBaseUrl: config?.localBaseUrl || defaultLocalUrl,
      localModelName: config?.localModelName || process.env.LOCAL_LLM_MODEL || 'senkron-turkish-llama3.2:3b',
      maxLocalConcurrency: config?.maxLocalConcurrency ?? Number(process.env.MAX_LOCAL_CONCURRENCY || 2),
      localTimeoutMs: config?.localTimeoutMs ?? Number(process.env.LOCAL_TIMEOUT_MS || 60000),
      externalBaseUrl: config?.externalBaseUrl || process.env.EXTERNAL_LLM_BASE_URL || 'https://api.openai.com/v1',
      externalApiKey: config?.externalApiKey || process.env.EXTERNAL_LLM_API_KEY || process.env.OPENAI_API_KEY || '',
      externalModelName: config?.externalModelName || process.env.EXTERNAL_LLM_MODEL || 'gpt-4o-mini',
      healthCheckIntervalMs: config?.healthCheckIntervalMs ?? 15000,
      forceRoute: config?.forceRoute || (process.env.FORCE_LLM_ROUTE as 'internal' | 'external' | undefined) || ('internal' as any),
      allowSimulation: config?.allowSimulation ?? process.env.NODE_ENV !== 'production',
    };
  }

  public getActiveLocalSlots(): number {
    return this.activeLocalSlots;
  }

  public getMaxLocalConcurrency(): number {
    return this.config.maxLocalConcurrency;
  }

  public isLocalAvailable(): boolean {
    return this.isLocalHealthy && this.activeLocalSlots < this.config.maxLocalConcurrency;
  }

  public async executeChat(messages: ChatMessage[], temperature: number = 0.7): Promise<RouteExecutionResult> {
    const startTime = Date.now();

    // 1. Forced routing override if configured
    if (this.config.forceRoute === 'external') {
      return this.callExternal(messages, temperature, 'forced_mode', startTime, false);
    }

    // 2. Concurrency Check: If local capacity is saturated, burst overflow to external
    if (this.activeLocalSlots >= this.config.maxLocalConcurrency) {
      if (this.config.externalApiKey) {
        return this.callExternal(messages, temperature, 'local_concurrency_saturated', startTime, false);
      }
      // If no external key is configured, wait or proceed locally
    }

    // 3. Health Check: If local is deemed offline, route to external directly
    if (!this.isLocalHealthy && this.config.externalApiKey) {
      return this.callExternal(messages, temperature, 'local_offline', startTime, false);
    }

    // 4. Primary Route: Local Inference
    try {
      this.activeLocalSlots++;
      const result = await this.callLocalWithTimeout(messages, temperature);
      this.isLocalHealthy = true;
      const latencyMs = Date.now() - startTime;

      return {
        rawText: result.text,
        tokenUsage: result.usage,
        modelUsed: this.config.localModelName,
        telemetry: {
          routeUsed: 'internal',
          routeReason: 'local_healthy',
          latencyMs,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: false,
        },
      };
    } catch (localError) {
      console.error('[SmartRouter Local Error]:', localError);
      this.isLocalHealthy = false;

      if (this.config.externalApiKey) {
        return this.callExternal(messages, temperature, 'local_timeout_fallback', startTime, true);
      }

      // If no external provider configured: simulation ONLY in dev/test.
      // Production must fail loudly instead of serving fake AI output.
      if (!this.config.allowSimulation) {
        throw new Error(
          'LLM_UNAVAILABLE: Yerel LLM çevrimdışı ve dış sağlayıcı anahtarı tanımlı değil; production modunda simülasyon kapalı.'
        );
      }
      const latencyMs = Date.now() - startTime;
      const simText = this.simulateFallbackResponse(messages);
      return {
        rawText: simText,
        tokenUsage: {
          promptTokens: Math.ceil(messages.map((m) => m.content).join(' ').length / 4),
          completionTokens: Math.ceil(simText.length / 4),
          totalTokens: Math.ceil((messages.map((m) => m.content).join(' ').length + simText.length) / 4),
        },
        modelUsed: `${this.config.localModelName}-simulated`,
        telemetry: {
          routeUsed: 'simulated',
          routeReason: 'simulation_no_router',
          latencyMs,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: true,
        },
      };
    } finally {
      this.activeLocalSlots = Math.max(0, this.activeLocalSlots - 1);
    }
  }

  private async callLocalWithTimeout(
    messages: ChatMessage[],
    temperature: number
  ): Promise<{ text: string; usage: TokenMetrics }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.localTimeoutMs);

    try {
      const cleanBase = this.config.localBaseUrl.replace(/\/+$/, '');
      const url = cleanBase.endsWith('/chat/completions')
        ? cleanBase
        : `${cleanBase}/chat/completions`;
      console.log(`[SmartRouter] Calling local LLM endpoint: ${url}`);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.config.localModelName,
          messages,
          temperature,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        throw new Error(`Local inference returned status ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';
      const promptTokens = data.usage?.prompt_tokens || Math.ceil(messages.map((m) => m.content).join(' ').length / 4);
      const completionTokens = data.usage?.completion_tokens || Math.ceil(text.length / 4);

      return {
        text,
        usage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
        },
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async callExternal(
    messages: ChatMessage[],
    temperature: number,
    reason: RoutingTelemetry['routeReason'],
    startTime: number,
    fallbackTriggered: boolean
  ): Promise<RouteExecutionResult> {
    try {
      const cleanBase = this.config.externalBaseUrl.replace(/\/+$/, '');
      const url = cleanBase.endsWith('/chat/completions')
        ? cleanBase
        : `${cleanBase}/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.externalApiKey}`,
        },
        body: JSON.stringify({
          model: this.config.externalModelName,
          messages,
          temperature,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        throw new Error(`External API returned status ${res.status}`);
      }

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || '';
      const promptTokens = data.usage?.prompt_tokens || Math.ceil(messages.map((m) => m.content).join(' ').length / 4);
      const completionTokens = data.usage?.completion_tokens || Math.ceil(text.length / 4);
      const latencyMs = Date.now() - startTime;

      return {
        rawText: text,
        tokenUsage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
        },
        modelUsed: this.config.externalModelName,
        telemetry: {
          routeUsed: 'external',
          routeReason: reason,
          latencyMs,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered,
        },
      };
    } catch (err) {
      // External also failed: production must NOT fabricate output.
      if (!this.config.allowSimulation) {
        throw new Error(
          'LLM_UNAVAILABLE: Yerel ve dış LLM sağlayıcılarının ikisine de ulaşılamadı; production modunda simülasyon kapalı.'
        );
      }
      const latencyMs = Date.now() - startTime;
      const simText = this.simulateFallbackResponse(messages);
      return {
        rawText: simText,
        tokenUsage: {
          promptTokens: Math.ceil(messages.map((m) => m.content).join(' ').length / 4),
          completionTokens: Math.ceil(simText.length / 4),
          totalTokens: Math.ceil((messages.map((m) => m.content).join(' ').length + simText.length) / 4),
        },
        modelUsed: `${this.config.externalModelName}-simulated`,
        telemetry: {
          routeUsed: 'simulated',
          routeReason: 'simulation_no_router',
          latencyMs,
          activeLocalSlots: this.activeLocalSlots,
          maxLocalConcurrency: this.config.maxLocalConcurrency,
          fallbackTriggered: true,
        },
      };
    }
  }

  private simulateFallbackResponse(messages: ChatMessage[]): string {
    const userMsg = messages.find((m) => m.role === 'user')?.content || '';
    return (
      `🔥 Önemli Gelişme:\n\n${userMsg}\n\n` +
      `NSosyal topluluğuna özel olarak hazırlanan bu gönderi, etkileşimi artırmak için tasarlandı. ` +
      `Siz de görüşlerinizi yorumlarda belirtin! 🚀\n\n#NSosyal #Teknoloji #YapayZeka`
    );
  }
}
