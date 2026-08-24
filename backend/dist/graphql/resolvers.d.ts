export declare const graphqlResolvers: {
    quotaStatus: (args: {
        userId: string;
        isGuest?: boolean;
    }) => import("../services/quota.service").QuotaStatus;
    videoRouteDecision: (args: {
        fileSizeBytes: number;
        durationSeconds: number;
    }) => import("../services/video-orchestrator.service").VideoRouteDecision;
    generatePostDraft: (args: {
        topic: string;
        tone?: string;
        userId: string;
        isGuest?: boolean;
    }) => Promise<import("@senkron/ai").GenerationResult>;
};
