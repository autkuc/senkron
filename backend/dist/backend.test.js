"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const video_orchestrator_service_1 = require("./services/video-orchestrator.service");
const quota_service_1 = require("./services/quota.service");
const server_ffmpeg_service_1 = require("./services/server-ffmpeg.service");
const ai_1 = require("@senkron/ai");
(0, vitest_1.describe)('Senkron Backend Services & Logic', () => {
    (0, vitest_1.it)('recommends client_wasm for small videos under limits', () => {
        const res = video_orchestrator_service_1.videoOrchestrator.decideProcessingStrategy({
            fileSizeBytes: 20 * 1024 * 1024,
            durationSeconds: 30,
            hardwareConcurrency: 8,
        });
        (0, vitest_1.expect)(res.strategy).toBe('client_wasm');
    });
    (0, vitest_1.it)('recommends server_native for videos exceeding 50MB', () => {
        const res = video_orchestrator_service_1.videoOrchestrator.decideProcessingStrategy({
            fileSizeBytes: 150 * 1024 * 1024,
            durationSeconds: 45,
            hardwareConcurrency: 8,
        });
        (0, vitest_1.expect)(res.strategy).toBe('server_native');
    });
    (0, vitest_1.it)('strictly blocks guest quota allocations', () => {
        const status = quota_service_1.quotaService.getQuotaStatus('guest', true);
        (0, vitest_1.expect)(status.isGuest).toBe(true);
        (0, vitest_1.expect)(status.requestsPerMinuteLimit).toBe(0);
        (0, vitest_1.expect)(status.requestsRemaining).toBe(0);
        (0, vitest_1.expect)(status.dailyRemaining).toBe(0);
    });
    (0, vitest_1.it)('deducts quota for authenticated standard users', () => {
        const testUser = 'user_test_' + Date.now();
        const s1 = quota_service_1.quotaService.checkAndDeductQuota(testUser, false, 'standard');
        (0, vitest_1.expect)(s1.requestsPerMinuteLimit).toBe(15);
        (0, vitest_1.expect)(s1.requestsRemaining).toBe(14);
        (0, vitest_1.expect)(s1.dailyRemaining).toBe(99);
    });
    (0, vitest_1.it)('creates, processes, and tracks server FFmpeg transcode jobs', async () => {
        const jobId = 'test-job-' + Date.now();
        const job = await server_ffmpeg_service_1.serverFFmpegService.simulateServerTranscode(jobId, 5);
        (0, vitest_1.expect)(job.jobId).toBe(jobId);
        (0, vitest_1.expect)(job.status).toBe('completed');
        (0, vitest_1.expect)(job.progressPercent).toBe(100);
        (0, vitest_1.expect)(job.outputUrl).toBeDefined();
        const fetchedJob = server_ffmpeg_service_1.serverFFmpegService.getJob(jobId);
        (0, vitest_1.expect)(fetchedJob).toBeDefined();
        (0, vitest_1.expect)(fetchedJob?.status).toBe('completed');
    });
    (0, vitest_1.it)('executes AI generation with smart routing and multi-candidate output', async () => {
        const gateway = new ai_1.LLMGateway();
        const res = await gateway.generatePost({
            topic: 'NSosyal ile yapay zeka destekli içerik üretimi',
            userId: 'user_backend_test',
            isGuest: false,
            tone: 'viral',
        });
        (0, vitest_1.expect)(res.content).toBeDefined();
        (0, vitest_1.expect)(res.candidates.length).toBeGreaterThanOrEqual(1);
        (0, vitest_1.expect)(res.routingTelemetry).toBeDefined();
        // Test ortamında yerel LLM yok: telemetri dürüstçe simülasyon olarak işaretlenir
        (0, vitest_1.expect)(res.routingTelemetry.routeUsed).toBe('simulated');
        (0, vitest_1.expect)(res.routingTelemetry.fallbackTriggered).toBe(true);
    });
});
