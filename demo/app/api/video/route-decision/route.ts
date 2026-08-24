import { NextResponse } from 'next/server';
import { videoOrchestrator } from '@senkron/backend/dist/services/video-orchestrator.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileSizeBytes, durationSeconds, width, height, hardwareConcurrency, supportsSharedArrayBuffer } = body;

    if (!fileSizeBytes || !durationSeconds) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: 'fileSizeBytes and durationSeconds are required.' },
        { status: 400 }
      );
    }

    const decision = videoOrchestrator.decideProcessingStrategy({
      fileSizeBytes: Number(fileSizeBytes),
      durationSeconds: Number(durationSeconds),
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      hardwareConcurrency: hardwareConcurrency ? Number(hardwareConcurrency) : undefined,
      supportsSharedArrayBuffer: supportsSharedArrayBuffer ?? true,
    });

    return NextResponse.json(decision);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: err instanceof Error ? err.message : 'Processing failed' },
      { status: 500 }
    );
  }
}
