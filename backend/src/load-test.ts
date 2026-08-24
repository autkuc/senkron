import http from 'http';
import { app } from './server';

interface BenchmarkResult {
  endpoint: string;
  totalRequests: number;
  totalTimeMs: number;
  requestsPerSec: number;
  statusCounts: Record<number, number>;
  p50LatencyMs: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
}

async function runEndpointLoadTest(
  serverPort: number,
  path: string,
  method: string,
  body?: object,
  headers: Record<string, string> = {},
  totalRequests: number = 200,
  concurrency: number = 20
): Promise<BenchmarkResult> {
  const latencies: number[] = [];
  const statusCounts: Record<number, number> = {};
  let completed = 0;

  const payload = body ? JSON.stringify(body) : '';

  async function sendRequest(): Promise<void> {
    return new Promise((resolve) => {
      const start = performance.now();
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port: serverPort,
          path,
          method,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            ...headers,
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            const elapsed = performance.now() - start;
            latencies.push(elapsed);
            statusCounts[res.statusCode || 0] = (statusCounts[res.statusCode || 0] || 0) + 1;
            completed++;
            resolve();
          });
        }
      );

      req.on('error', () => {
        const elapsed = performance.now() - start;
        latencies.push(elapsed);
        statusCounts[500] = (statusCounts[500] || 0) + 1;
        completed++;
        resolve();
      });

      if (payload) {
        req.write(payload);
      }
      req.end();
    });
  }

  const overallStart = performance.now();

  // Execute in concurrent batches
  for (let i = 0; i < totalRequests; i += concurrency) {
    const batch = Array.from({ length: Math.min(concurrency, totalRequests - i) }, () => sendRequest());
    await Promise.all(batch);
  }

  const overallDuration = performance.now() - overallStart;
  latencies.sort((a, b) => a - b);

  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;

  return {
    endpoint: `${method} ${path}`,
    totalRequests: completed,
    totalTimeMs: Math.round(overallDuration),
    requestsPerSec: Math.round((completed / (overallDuration / 1000))),
    statusCounts,
    p50LatencyMs: Math.round(p50 * 100) / 100,
    p95LatencyMs: Math.round(p95 * 100) / 100,
    p99LatencyMs: Math.round(p99 * 100) / 100,
  };
}

export async function runFullBenchmark() {
  const PORT = 4099;
  const server = app.listen(PORT, async () => {
    console.log(`\n======================================================`);
    console.log(`🚀 SENKRON BACKEND LOAD PERFORMANCE BENCHMARK SUITE`);
    console.log(`======================================================\n`);

    // 1. Benchmark Video Route Decision Endpoint
    const videoResult = await runEndpointLoadTest(
      PORT,
      '/api/video/route-decision',
      'POST',
      { fileSizeBytes: 45000000, durationSeconds: 28, hardwareConcurrency: 8 },
      {},
      500,
      50
    );

    // 2. Benchmark Quota Status Query Endpoint
    const quotaResult = await runEndpointLoadTest(
      PORT,
      '/api/quota/status',
      'GET',
      undefined,
      { 'x-user-id': 'user_load_test' },
      500,
      50
    );

    // 3. Benchmark AI Post Generation Rate-Limiting & Auth Guard
    const aiResult = await runEndpointLoadTest(
      PORT,
      '/api/ai/generate',
      'POST',
      { topic: 'Senkron Web Components Release', tone: 'viral' },
      { 'x-user-id': 'user_load_test' },
      100,
      10
    );

    console.table([
      {
        Endpoint: videoResult.endpoint,
        'Total Req': videoResult.totalRequests,
        'Time (ms)': videoResult.totalTimeMs,
        'Req/Sec (RPS)': videoResult.requestsPerSec,
        'p50 (ms)': videoResult.p50LatencyMs,
        'p95 (ms)': videoResult.p95LatencyMs,
        'Status Counts': JSON.stringify(videoResult.statusCounts),
      },
      {
        Endpoint: quotaResult.endpoint,
        'Total Req': quotaResult.totalRequests,
        'Time (ms)': quotaResult.totalTimeMs,
        'Req/Sec (RPS)': quotaResult.requestsPerSec,
        'p50 (ms)': quotaResult.p50LatencyMs,
        'p95 (ms)': quotaResult.p95LatencyMs,
        'Status Counts': JSON.stringify(quotaResult.statusCounts),
      },
      {
        Endpoint: aiResult.endpoint,
        'Total Req': aiResult.totalRequests,
        'Time (ms)': aiResult.totalTimeMs,
        'Req/Sec (RPS)': aiResult.requestsPerSec,
        'p50 (ms)': aiResult.p50LatencyMs,
        'p95 (ms)': aiResult.p95LatencyMs,
        'Status Counts': JSON.stringify(aiResult.statusCounts),
      },
    ]);

    console.log(`\n✅ Load benchmark completed successfully.`);
    server.close();
  });
}

if (require.main === module) {
  runFullBenchmark();
}
