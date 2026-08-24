export interface QuotaStatus {
    userId: string;
    isGuest: boolean;
    tier: 'standard' | 'verified';
    requestsPerMinuteLimit: number;
    requestsRemaining: number;
    dailyAllowance: number;
    dailyRemaining: number;
    resetSeconds: number;
}
export declare class QuotaService {
    private memoryStore;
    private getTierLimits;
    private getTodayKey;
    checkAndDeductQuota(userId: string, isGuest: boolean, tier?: 'standard' | 'verified'): QuotaStatus;
    getQuotaStatus(userId: string, isGuest: boolean, tier?: 'standard' | 'verified'): QuotaStatus;
}
export declare const quotaService: QuotaService;
