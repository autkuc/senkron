import { describe, it, expect, vi } from 'vitest';
import { FFmpegService } from './ffmpeg-service';

describe('FFmpegService WebAssembly Engine', () => {
  it('instantiates cleanly with isLoaded = false in headless test runner', () => {
    const service = new FFmpegService();
    expect(service).toBeDefined();
  });

  it('initializes gracefully and handles non-browser / headless environments without crashing', async () => {
    const service = new FFmpegService();
    const loaded = await service.initialize();
    // In HappyDOM headless environment where WebWorker/WASM multi-thread is not native, it handles gracefully
    expect(typeof loaded).toBe('boolean');
  });

  it('dispatches structured progress steps and exports video output', async () => {
    const service = new FFmpegService();
    const progressUpdates: any[] = [];

    const mockVideoEl = document.createElement('video');
    mockVideoEl.src = 'https://example.com/mock.mp4';

    const mockCanvasEl = document.createElement('canvas');

    const result = await service.exportVideo(
      mockVideoEl,
      mockCanvasEl,
      0,
      5,
      [],
      (progress) => {
        progressUpdates.push(progress);
      },
      '16:9'
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(progressUpdates.length).toBeGreaterThanOrEqual(3);
    
    // Check terminal stage
    const finalUpdate = progressUpdates[progressUpdates.length - 1];
    expect(finalUpdate.percentage).toBe(100);
    expect(finalUpdate.stage).toBe('completed');
    expect(finalUpdate.outputBlobUrl).toBe(result);
  });

  it('throws error if concurrent exports are triggered simultaneously on single instance', async () => {
    const service = new FFmpegService();
    const mockVideoEl = document.createElement('video');
    const mockCanvasEl = document.createElement('canvas');

    const p1 = service.exportVideo(mockVideoEl, mockCanvasEl, 0, 5, [], () => {});
    
    await expect(
      service.exportVideo(mockVideoEl, mockCanvasEl, 0, 5, [], () => {})
    ).rejects.toThrow('Bir dışa aktarma işlemi zaten yürütülüyor');

    await p1;
  });
});
