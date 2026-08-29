import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SmartRouter } from './smart-router';

describe('SmartRouter Traffic Management', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with default zero active local slots and healthy status', () => {
    const router = new SmartRouter({ maxLocalConcurrency: 2 });
    expect(router.getActiveLocalSlots()).toBe(0);
    expect(router.getMaxLocalConcurrency()).toBe(2);
    expect(router.isLocalAvailable()).toBe(true);
  });

  it('routes to local when healthy and within concurrency limit', async () => {
    const router = new SmartRouter({
      localBaseUrl: 'http://mock-local/v1',
      localModelName: 'mock-turkish-3b',
      maxLocalConcurrency: 2,
    });

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Local Turkish model response' } }],
        usage: { prompt_tokens: 10, completion_tokens: 20 },
      }),
    } as any);

    const result = await router.executeChat([
      { role: 'user', content: 'Test prompt' },
    ]);

    expect(result.telemetry.routeUsed).toBe('internal');
    expect(result.telemetry.fallbackTriggered).toBe(false);
    expect(result.rawText).toBe('Local Turkish model response');
  });

  it('bursts to external route when local concurrency is saturated', async () => {
    const router = new SmartRouter({
      maxLocalConcurrency: 1,
      externalApiKey: 'test-key',
      externalModelName: 'mock-gpt-4o-mini',
    });

    // Mock global fetch
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      if (typeof url === 'string' && url.includes('openai.com')) {
        return {
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'External burst post response' } }],
            usage: { prompt_tokens: 15, completion_tokens: 25 },
          }),
        } as any;
      }
      // Local hangs/slow
      return new Promise(() => {});
    });

    // Simulate occupied local slot
    (router as any).activeLocalSlots = 1;

    const result = await router.executeChat([
      { role: 'user', content: 'Burst traffic test' },
    ]);

    expect(result.telemetry.routeUsed).toBe('external');
    expect(result.telemetry.routeReason).toBe('local_concurrency_saturated');
    expect(result.rawText).toBe('External burst post response');
  });

  it('does not fabricate output when BOTH providers fail in production mode', async () => {
    const router = new SmartRouter({
      externalApiKey: 'test-key',
      allowSimulation: false,
    });

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

    await expect(
      router.executeChat([{ role: 'user', content: 'Herhangi bir konu' }])
    ).rejects.toThrow(/LLM_UNAVAILABLE/);
  });

  it('labels dual-provider failure as simulated (not external) when simulation is allowed', async () => {
    const router = new SmartRouter({
      externalApiKey: 'test-key',
      allowSimulation: true,
    });

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

    const result = await router.executeChat([{ role: 'user', content: 'Herhangi bir konu' }]);
    expect(result.telemetry.routeUsed).toBe('simulated');
    expect(result.telemetry.fallbackTriggered).toBe(true);
    expect(result.modelUsed).toContain('-simulated');
  });

  it('falls back to external when local inference times out or throws', async () => {
    const router = new SmartRouter({
      localTimeoutMs: 50,
      externalApiKey: 'test-key',
      externalModelName: 'mock-gpt-4o-mini',
    });

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      if (typeof url === 'string' && url.includes('openai.com')) {
        return {
          ok: true,
          json: async () => ({
            choices: [{ message: { content: 'Fallback response from external' } }],
            usage: { prompt_tokens: 10, completion_tokens: 20 },
          }),
        } as any;
      }
      throw new Error('Local server ECONNREFUSED');
    });

    const result = await router.executeChat([
      { role: 'user', content: 'Fallback test' },
    ]);

    expect(result.telemetry.routeUsed).toBe('external');
    expect(result.telemetry.fallbackTriggered).toBe(true);
    expect(result.telemetry.routeReason).toBe('local_timeout_fallback');
  });
});
