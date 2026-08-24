"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceQuotaGuard = enforceQuotaGuard;
const quota_service_1 = require("../services/quota.service");
function enforceQuotaGuard(req, res, next) {
    if (!req.user || req.user.isGuest || req.user.id === 'guest') {
        res.status(401).json({
            error: 'UNAUTHORIZED_GUEST',
            message: 'Misafir kullanıcıların gönderi oluşturma izni yoktur.',
        });
        return;
    }
    const status = quota_service_1.quotaService.checkAndDeductQuota(req.user.id, false, req.user.tier);
    res.setHeader('X-RateLimit-Limit', status.requestsPerMinuteLimit.toString());
    res.setHeader('X-RateLimit-Remaining', status.requestsRemaining.toString());
    res.setHeader('X-Quota-Daily-Remaining', status.dailyRemaining.toString());
    res.setHeader('X-RateLimit-Reset', status.resetSeconds.toString());
    if (status.requestsRemaining === 0 && status.dailyRemaining === 0) {
        res.status(429).json({
            error: 'QUOTA_EXHAUSTED',
            message: 'Günlük AI gönderi üretme kotanız dolmuştur. Lütfen yarın tekrar deneyin.',
            status,
        });
        return;
    }
    if (status.requestsRemaining === 0) {
        res.status(429).json({
            error: 'RATE_LIMIT_EXCEEDED',
            message: 'Çok hızlı istek gönderdiniz. Lütfen bir süre bekleyin.',
            status,
        });
        return;
    }
    next();
}
