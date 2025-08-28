import { NextRequest } from 'next/server';
import ClientIntakeAPI from '@/lib/crewai/client-intake-api';

export async function GET(request: NextRequest) {
  return ClientIntakeAPI.getClientDashboard(request);
}
