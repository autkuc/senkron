import { NextResponse } from 'next/server';
import { LLMGateway } from '@senkron/ai';
import { quotaService } from '@senkron/backend/dist/services/quota.service';

function getLLMGateway() {
  return new LLMGateway({
    baseUrl: process.env.LOCAL_LLM_BASE_URL || 'https://arapronaldosui--senkron-turkish-llm-service-api.modal.run',
    modelName: 'senkron-turkish-llama3.2:3b',
    localTimeoutMs: 60000,
  });
}

export async function POST(request: Request) {
  try {
    const isGuestHeader = request.headers.get('x-is-guest');
    const userIdHeader = request.headers.get('x-user-id');
    const userTierHeader = request.headers.get('x-user-tier') as 'standard' | 'verified' || 'standard';

    const isGuest = isGuestHeader === 'true' || userIdHeader === 'guest' || !userIdHeader;
    const userId = userIdHeader || 'user_demo';

    // 1. Strict Guest Blocking
    if (isGuest || userId === 'guest') {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED_GUEST',
          message: 'Misafir kullanıcıların AI gönderi üretme izni yoktur. Lütfen NSosyal hesabınızla giriş yapın.',
        },
        { status: 401 }
      );
    }

    // 2. Quota Check
    const quota = quotaService.checkAndDeductQuota(userId, false, userTierHeader);
    const headers = new Headers({
      'X-RateLimit-Limit': quota.requestsPerMinuteLimit.toString(),
      'X-RateLimit-Remaining': quota.requestsRemaining.toString(),
      'X-Quota-Daily-Remaining': quota.dailyRemaining.toString(),
      'X-RateLimit-Reset': quota.resetSeconds.toString(),
    });

    if (quota.requestsRemaining === 0 && quota.dailyRemaining === 0) {
      return NextResponse.json(
        {
          error: 'QUOTA_EXHAUSTED',
          message: 'Günlük AI gönderi üretme kotanız dolmuştur. Lütfen yarın tekrar deneyin.',
        },
        { status: 429, headers }
      );
    }

    if (quota.requestsRemaining === 0) {
      return NextResponse.json(
        {
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Çok hızlı istek gönderdiniz. Lütfen bir süre bekleyin.',
        },
        { status: 429, headers }
      );
    }

    // 3. Request Execution
    const body = await request.json();
    const { topic, tone } = body;

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'INVALID_TOPIC', message: 'Lütfen geçerli bir gönderi konusu girin.' },
        { status: 400, headers }
      );
    }

    const result = await getLLMGateway().generatePost({
      topic: topic.trim(),
      tone: tone || 'viral',
      userId,
      isGuest: false,
    });

    return NextResponse.json(
      { success: true, data: result },
      { status: 200, headers }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Generation failed';

    if (message.startsWith('CONTENT_MODERATION_BLOCKED') || message.startsWith('OUTPUT_MODERATION_BLOCKED')) {
      return NextResponse.json(
        {
          error: 'CONTENT_POLICY_VIOLATION',
          message: message.replace(/^(CONTENT_MODERATION_BLOCKED|OUTPUT_MODERATION_BLOCKED):\s*/, ''),
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Gönderi üretilirken sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
