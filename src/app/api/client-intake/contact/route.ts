import { NextRequest } from 'next/server';
import ClientIntakeAPI from '@/lib/crewai/client-intake-api';

export async function POST(request: NextRequest) {
  return ClientIntakeAPI.requestContact(request);
}
