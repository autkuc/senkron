"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAuthSession = parseAuthSession;
exports.requireAuthenticatedUser = requireAuthenticatedUser;
function parseAuthSession(req, res, next) {
    const authHeader = req.headers.authorization;
    const userIdHeader = req.headers['x-user-id'];
    const isGuestHeader = req.headers['x-is-guest'];
    if (isGuestHeader === 'true' || userIdHeader === 'guest' || !userIdHeader) {
        req.user = {
            id: 'guest',
            isGuest: true,
            tier: 'standard',
        };
        return next();
    }
    const isVerified = req.headers['x-user-tier'] === 'verified';
    req.user = {
        id: userIdHeader || (authHeader ? 'user_' + authHeader.slice(-6) : 'user_authenticated'),
        isGuest: false,
        tier: isVerified ? 'verified' : 'standard',
    };
    next();
}
function requireAuthenticatedUser(req, res, next) {
    if (!req.user || req.user.isGuest || req.user.id === 'guest') {
        res.status(401).json({
            error: 'UNAUTHORIZED_GUEST',
            message: 'Misafir kullanıcıların AI gönderi oluşturma yetkisi yoktur. Lütfen NSosyal hesabınızla giriş yapın.',
        });
        return;
    }
    next();
}
