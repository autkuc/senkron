"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlResolvers = void 0;
const quota_service_1 = require("../services/quota.service");
const video_orchestrator_service_1 = require("../services/video-orchestrator.service");
const ai_1 = require("@senkron/ai");
const llmGateway = new ai_1.LLMGateway();
exports.graphqlResolvers = {
    quotaStatus: (args) => {
        return quota_service_1.quotaService.getQuotaStatus(args.userId, args.isGuest ?? false);
    },
    videoRouteDecision: (args) => {
        return video_orchestrator_service_1.videoOrchestrator.decideProcessingStrategy({
            fileSizeBytes: args.fileSizeBytes,
            durationSeconds: args.durationSeconds,
        });
    },
    generatePostDraft: async (args) => {
        if (args.isGuest || args.userId === 'guest' || !args.userId) {
            throw new Error('UNAUTHORIZED_GUEST: Misafir kullanıcıların gönderi üretme yetkisi yoktur.');
        }
        // Check quota
        const quota = quota_service_1.quotaService.checkAndDeductQuota(args.userId, false);
        if (quota.requestsRemaining === 0) {
            throw new Error('RATE_LIMIT_EXCEEDED: Çok fazla istek gönderdiniz.');
        }
        return await llmGateway.generatePost({
            topic: args.topic,
            tone: args.tone || 'viral',
            userId: args.userId,
            isGuest: false,
        });
    },
};
