import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
export declare function enforceQuotaGuard(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
