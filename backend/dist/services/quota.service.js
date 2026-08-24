"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotaService = exports.QuotaService = void 0;
class QuotaService {
    memoryStore = new Map();
    getTierLimits(tier) {
        if (tier === 'verified') {
            return { rpm: 60, daily: 1000 };
        }
        return { rpm: 15, daily: 100 };
    }
    getTodayKey() {
        return new Date().toISOString().split('T')[0];
    }
    checkAndDeductQuota(userId, isGuest, tier = 'standard') {
        if (isGuest || userId === 'guest') {
            return {
                userId: 'guest',
                isGuest: true,
                tier: 'standard',
                requestsPerMinuteLimit: 0,
                requestsRemaining: 0,
                dailyAllowance: 0,
                dailyRemaining: 0,
                resetSeconds: 60,
            };
        }
        const now = Date.now();
        const today = this.getTodayKey();
        const limits = this.getTierLimits(tier);
        let window = this.memoryStore.get(userId);
        if (!window) {
            window = { timestamps: [], dailyCount: 0, lastResetDay: today };
            this.memoryStore.set(userId, window);
        }
        // Reset daily count if day changed
        if (window.lastResetDay !== today) {
            window.dailyCount = 0;
            window.lastResetDay = today;
        }
        // Clean up timestamps older than 60s
        window.timestamps = window.timestamps.filter((ts) => now - ts < 60000);
        const requestsRemaining = Math.max(0, limits.rpm - window.timestamps.length);
        const dailyRemaining = Math.max(0, limits.daily - window.dailyCount);
        if (window.timestamps.length >= limits.rpm || window.dailyCount >= limits.daily) {
            return {
                userId,
                isGuest: false,
                tier,
                requestsPerMinuteLimit: limits.rpm,
                requestsRemaining: 0,
                dailyAllowance: limits.daily,
                dailyRemaining,
                resetSeconds: Math.ceil((60000 - (now - (window.timestamps[0] || now))) / 1000),
            };
        }
        // Deduct
        window.timestamps.push(now);
        window.dailyCount += 1;
        return {
            userId,
            isGuest: false,
            tier,
            requestsPerMinuteLimit: limits.rpm,
            requestsRemaining: Math.max(0, limits.rpm - window.timestamps.length),
            dailyAllowance: limits.daily,
            dailyRemaining: Math.max(0, limits.daily - window.dailyCount),
            resetSeconds: 60,
        };
    }
    getQuotaStatus(userId, isGuest, tier = 'standard') {
        if (isGuest || userId === 'guest') {
            return {
                userId: 'guest',
                isGuest: true,
                tier: 'standard',
                requestsPerMinuteLimit: 0,
                requestsRemaining: 0,
                dailyAllowance: 0,
                dailyRemaining: 0,
                resetSeconds: 60,
            };
        }
        const limits = this.getTierLimits(tier);
        const now = Date.now();
        const today = this.getTodayKey();
        const window = this.memoryStore.get(userId) || { timestamps: [], dailyCount: 0, lastResetDay: today };
        const recentTs = window.timestamps.filter((ts) => now - ts < 60000);
        const dailyCount = window.lastResetDay === today ? window.dailyCount : 0;
        return {
            userId,
            isGuest: false,
            tier,
            requestsPerMinuteLimit: limits.rpm,
            requestsRemaining: Math.max(0, limits.rpm - recentTs.length),
            dailyAllowance: limits.daily,
            dailyRemaining: Math.max(0, limits.daily - dailyCount),
            resetSeconds: 60,
        };
    }
}
exports.QuotaService = QuotaService;
exports.quotaService = new QuotaService();
