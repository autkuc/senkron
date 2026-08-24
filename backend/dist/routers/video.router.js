"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const video_orchestrator_service_1 = require("../services/video-orchestrator.service");
const server_ffmpeg_service_1 = require("../services/server-ffmpeg.service");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.post('/route-decision', (req, res) => {
    const { fileSizeBytes, durationSeconds, width, height, hardwareConcurrency, supportsSharedArrayBuffer } = req.body;
    if (!fileSizeBytes || !durationSeconds) {
        return res.status(400).json({
            error: 'INVALID_INPUT',
            message: 'fileSizeBytes and durationSeconds are required.',
        });
    }
    const decision = video_orchestrator_service_1.videoOrchestrator.decideProcessingStrategy({
        fileSizeBytes: Number(fileSizeBytes),
        durationSeconds: Number(durationSeconds),
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        hardwareConcurrency: hardwareConcurrency ? Number(hardwareConcurrency) : undefined,
        supportsSharedArrayBuffer: supportsSharedArrayBuffer ?? true,
    });
    return res.json(decision);
});
exports.videoRouter.post('/transcode', async (req, res) => {
    const jobId = `job-${Date.now()}`;
    const { inputPath, outputPath, startTimeSec, durationSeconds, width, height, videoCodec, audioCodec } = req.body;
    if (inputPath && outputPath) {
        const job = await server_ffmpeg_service_1.serverFFmpegService.processVideoFile(jobId, {
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
    const job = await server_ffmpeg_service_1.serverFFmpegService.simulateServerTranscode(jobId, duration);
    return res.json(job);
});
exports.videoRouter.get('/job/:jobId', (req, res) => {
    const job = server_ffmpeg_service_1.serverFFmpegService.getJob(req.params.jobId);
    if (!job) {
        return res.status(404).json({ error: 'JOB_NOT_FOUND', message: 'Job not found.' });
    }
    return res.json(job);
});
