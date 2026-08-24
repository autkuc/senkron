import { Router, Response } from 'express';
import { parseAuthSession, AuthenticatedRequest } from '../middleware/auth';
import { quotaService } from '../services/quota.service';

export const quotaRouter = Router();

quotaRouter.get('/status', parseAuthSession, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user || { id: 'guest', isGuest: true, tier: 'standard' };
  const status = quotaService.getQuotaStatus(user.id, user.isGuest, user.tier);
  return res.json(status);
});
