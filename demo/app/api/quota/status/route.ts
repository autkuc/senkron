import { NextResponse } from 'next/server';
import { quotaService } from '@senkron/backend/dist/services/quota.service';

export async function GET(request: Request) {
  const isGuestHeader = request.headers.get('x-is-guest');
  const userIdHeader = request.headers.get('x-user-id');
  const userTierHeader = (request.headers.get('x-user-tier') as 'standard' | 'verified') || 'standard';

  const isGuest = isGuestHeader === 'true' || userIdHeader === 'guest' || !userIdHeader;
  const userId = userIdHeader || 'user_demo';

  const status = quotaService.getQuotaStatus(userId, isGuest, userTierHeader);
  return NextResponse.json(status);
}
