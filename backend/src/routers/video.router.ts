import { Router, Request, Response } from 'express';
import { videoOrchestrator } from '../services/video-orchestrator.service';
import { serverFFmpegService } from '../services/server-ffmpeg.service';

export const videoRouter = Router();

videoRouter.post('/route-decision', (req: Request, res: Response) => {
  const { fileSizeBytes, durationSeconds, width, height, hardwareConcurrency, supportsSharedArrayBuffer } = req.body;

  if (!fileSizeBytes || !durationSeconds) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'fileSizeBytes and durationSeconds are required.',
    });
  }

  const decision = videoOrchestrator.decideProcessingStrategy({
    fileSizeBytes: Number(fileSizeBytes),
    durationSeconds: Number(durationSeconds),
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
    hardwareConcurrency: hardwareConcurrency ? Number(hardwareConcurrency) : undefined,
    supportsSharedArrayBuffer: supportsSharedArrayBuffer ?? true,
  });

  return res.json(decision);
});

videoRouter.post('/transcode', async (req: Request, res: Response) => {
  const jobId = `job-${Date.now()}`;
  const { inputPath, outputPath, startTimeSec, durationSeconds, width, height, videoCodec, audioCodec } = req.body;

  if (inputPath && outputPath) {
    const job = await serverFFmpegService.processVideoFile(jobId, {
      inputPath,
      outputPath,
      startTimeSec: startTimeSec ? Number(startTimeSec) : undefined,
      durationSec: durationSeconds ? Number(durationSeconds) : undefined,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      videoCodec,
      audioCodec,
    });
    return res.json(job);
  }

  const duration = durationSeconds ? Number(durationSeconds) : 10;
  const job = await serverFFmpegService.simulateServerTranscode(jobId, duration);
  return res.json(job);
});

videoRouter.get('/job/:jobId', (req: Request, res: Response) => {
  const job = serverFFmpegService.getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'JOB_NOT_FOUND', message: 'Job not found.' });
  }
  return res.json(job);
});
