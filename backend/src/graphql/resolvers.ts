import { quotaService } from '../services/quota.service';
import { videoOrchestrator } from '../services/video-orchestrator.service';
import { LLMGateway } from '@senkron/ai';

const llmGateway = new LLMGateway();

export const graphqlResolvers = {
  quotaStatus: (args: { userId: string; isGuest?: boolean }) => {
    return quotaService.getQuotaStatus(args.userId, args.isGuest ?? false);
  },

  videoRouteDecision: (args: { fileSizeBytes: number; durationSeconds: number }) => {
    return videoOrchestrator.decideProcessingStrategy({
      fileSizeBytes: args.fileSizeBytes,
      durationSeconds: args.durationSeconds,
    });
  },

  generatePostDraft: async (args: { topic: string; tone?: string; userId: string; isGuest?: boolean }) => {
    if (args.isGuest || args.userId === 'guest' || !args.userId) {
      throw new Error('UNAUTHORIZED_GUEST: Misafir kullanıcıların gönderi üretme yetkisi yoktur.');
    }

    // Check quota
    const quota = quotaService.checkAndDeductQuota(args.userId, false);
    if (quota.requestsRemaining === 0) {
      throw new Error('RATE_LIMIT_EXCEEDED: Çok fazla istek gönderdiniz.');
    }

    return await llmGateway.generatePost({
      topic: args.topic,
      tone: (args.tone as any) || 'viral',
      userId: args.userId,
      isGuest: false,
    });
  },
};
