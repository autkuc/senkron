import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedUser {
    id: string;
    isGuest: boolean;
    tier: 'standard' | 'verified';
}
export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}
export declare function parseAuthSession(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export declare function requireAuthenticatedUser(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
