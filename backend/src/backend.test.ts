import { describe, it, expect } from 'vitest';
import { videoOrchestrator } from './services/video-orchestrator.service';
import { quotaService } from './services/quota.service';
import { serverFFmpegService } from './services/server-ffmpeg.service';
import { LLMGateway } from '@senkron/ai';

describe('Senkron Backend Services & Logic', () => {
  it('recommends client_wasm for small videos under limits', () => {
    const res = videoOrchestrator.decideProcessingStrategy({
      fileSizeBytes: 20 * 1024 * 1024,
      durationSeconds: 30,
      hardwareConcurrency: 8,
    });
    expect(res.strategy).toBe('client_wasm');
  });

  it('recommends server_native for videos exceeding 50MB', () => {
    const res = videoOrchestrator.decideProcessingStrategy({
      fileSizeBytes: 150 * 1024 * 1024,
      durationSeconds: 45,
      hardwareConcurrency: 8,
    });
    expect(res.strategy).toBe('server_native');
  });

  it('strictly blocks guest quota allocations', () => {
    const status = quotaService.getQuotaStatus('guest', true);
    expect(status.isGuest).toBe(true);
    expect(status.requestsPerMinuteLimit).toBe(0);
    expect(status.requestsRemaining).toBe(0);
    expect(status.dailyRemaining).toBe(0);
  });

  it('deducts quota for authenticated standard users', () => {
    const testUser = 'user_test_' + Date.now();
    const s1 = quotaService.checkAndDeductQuota(testUser, false, 'standard');
    expect(s1.requestsPerMinuteLimit).toBe(15);
    expect(s1.requestsRemaining).toBe(14);
    expect(s1.dailyRemaining).toBe(99);
  });

  it('creates, processes, and tracks server FFmpeg transcode jobs', async () => {
    const jobId = 'test-job-' + Date.now();
    const job = await serverFFmpegService.simulateServerTranscode(jobId, 5);

    expect(job.jobId).toBe(jobId);
    expect(job.status).toBe('completed');
    expect(job.progressPercent).toBe(100);
    expect(job.outputUrl).toBeDefined();

    const fetchedJob = serverFFmpegService.getJob(jobId);
    expect(fetchedJob).toBeDefined();
    expect(fetchedJob?.status).toBe('completed');
  });

  it('executes AI generation with smart routing and multi-candidate output', async () => {
    const gateway = new LLMGateway();
    const res = await gateway.generatePost({
      topic: 'NSosyal ile yapay zeka destekli içerik üretimi',
      userId: 'user_backend_test',
      isGuest: false,
      tone: 'viral',
    });

    expect(res.content).toBeDefined();
    expect(res.candidates.length).toBeGreaterThanOrEqual(1);
    expect(res.routingTelemetry).toBeDefined();
    // Test ortamında yerel LLM yok: telemetri dürüstçe simülasyon olarak işaretlenir
    expect(res.routingTelemetry.routeUsed).toBe('simulated');
    expect(res.routingTelemetry.fallbackTriggered).toBe(true);
  });
});
