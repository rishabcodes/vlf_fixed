import { NextRequest } from 'next/server';
import ClientIntakeAPI from '@/lib/crewai/client-intake-api';

export async function POST(request: NextRequest) {
  return ClientIntakeAPI.submitIntake(request);
}

export async function GET(request: NextRequest) {
  return ClientIntakeAPI.getAssessment(request);
}

export async function PUT(request: NextRequest) {
  return ClientIntakeAPI.updateAssessment(request);
}
