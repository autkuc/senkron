"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const quota_guard_1 = require("../middleware/quota-guard");
const ai_1 = require("@senkron/ai");
exports.aiRouter = (0, express_1.Router)();
const llmGateway = new ai_1.LLMGateway();
exports.aiRouter.post('/generate', auth_1.parseAuthSession, auth_1.requireAuthenticatedUser, quota_guard_1.enforceQuotaGuard, async (req, res) => {
    try {
        const { topic, tone } = req.body;
        if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
            return res.status(400).json({
                error: 'INVALID_TOPIC',
                message: 'Lütfen geçerli bir gönderi konusu girin.',
            });
        }
        const result = await llmGateway.generatePost({
            topic: topic.trim(),
            tone: tone || 'viral',
            userId: req.user.id,
            isGuest: req.user.isGuest,
        });
        return res.json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Generation failed';
        if (message.startsWith('UNAUTHORIZED_GUEST')) {
            return res.status(401).json({
                error: 'UNAUTHORIZED_GUEST',
                message: 'Misafir kullanıcılar gönderi üretemez.',
            });
        }
        if (message.startsWith('CONTENT_MODERATION_BLOCKED') || message.startsWith('OUTPUT_MODERATION_BLOCKED')) {
            return res.status(422).json({
                error: 'CONTENT_POLICY_VIOLATION',
                message: message.replace(/^(CONTENT_MODERATION_BLOCKED|OUTPUT_MODERATION_BLOCKED):\s*/, ''),
            });
        }
        return res.status(500).json({
            error: 'SERVER_ERROR',
            message: 'Gönderi üretilirken sunucu hatası oluştu.',
        });
    }
});
