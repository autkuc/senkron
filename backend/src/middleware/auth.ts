import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedUser {
  id: string;
  isGuest: boolean;
  tier: 'standard' | 'verified';
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function parseAuthSession(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const userIdHeader = req.headers['x-user-id'] as string;
  const isGuestHeader = req.headers['x-is-guest'] as string;

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

export function requireAuthenticatedUser(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user || req.user.isGuest || req.user.id === 'guest') {
    res.status(401).json({
      error: 'UNAUTHORIZED_GUEST',
      message: 'Misafir kullanıcıların AI gönderi oluşturma yetkisi yoktur. Lütfen NSosyal hesabınızla giriş yapın.',
    });
    return;
  }
  next();
}
