"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotaRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const quota_service_1 = require("../services/quota.service");
exports.quotaRouter = (0, express_1.Router)();
exports.quotaRouter.get('/status', auth_1.parseAuthSession, (req, res) => {
    const user = req.user || { id: 'guest', isGuest: true, tier: 'standard' };
    const status = quota_service_1.quotaService.getQuotaStatus(user.id, user.isGuest, user.tier);
    return res.json(status);
});
