import { PracticeArea } from '@prisma/client';
import { getPrismaClient } from '@/lib/prisma';

export async function generateCaseNumber(practiceArea: PracticeArea): Promise<string> {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');

  // Practice area codes
  const practiceAreaCodes: Record<PracticeArea, string> = {
    [PracticeArea.immigration]: 'IMM',
    [PracticeArea.personal_injury]: 'PI',
    [PracticeArea.workers_compensation]: 'WC',
    [PracticeArea.criminal_defense]: 'CD',
    [PracticeArea.family_law]: 'FL',
    [PracticeArea.traffic]: 'TR',
  };

  const areaCode = practiceAreaCodes[practiceArea];

  // Get the last case number for this practice area and year
  const lastCase = await getPrismaClient().case.findFirst({
    where: {
      caseNumber: {
        startsWith: `${areaCode}-${year}${month}`,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  let sequenceNumber = 1;
  if (lastCase) {
    const lastSequence = parseInt(lastCase.caseNumber.split('-').pop() || '0');
    sequenceNumber = lastSequence + 1;
  }

  // Format: IMM-202412-0001
  return `${areaCode}-${year}${month}-${String(sequenceNumber).padStart(4, '0')}`;
}

export function formatCaseTitle(clientName: string, practiceArea: PracticeArea): string {
  const practiceAreaNames: Record<PracticeArea, string> = {
    [PracticeArea.immigration]: 'Immigration',
    [PracticeArea.personal_injury]: 'Personal Injury',
    [PracticeArea.workers_compensation]: "Workers' Compensation",
    [PracticeArea.criminal_defense]: 'Criminal Defense',
    [PracticeArea.family_law]: 'Family Law',
    [PracticeArea.traffic]: 'Traffic Violation',
  };

  return `${clientName} - ${practiceAreaNames[practiceArea]} Case`;
}

export function calculateCaseDeadlines(practiceArea: PracticeArea, caseDetails?: unknown) {
  const deadlines: Array<{
    title: string;
    dueDate: Date;
    priority: 'critical' | 'urgent' | 'high' | 'medium' | 'low';
  }> = [];
  const now = new Date();

  switch (practiceArea) {
    case PracticeArea.immigration:
      deadlines.push({
        title: 'Initial Document Submission',
        dueDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days
        priority: 'high',
      });
      break;

    case PracticeArea.personal_injury:
      // Statute of limitations varies by state, using 2 years as example
      deadlines.push({
        title: 'Statute of Limitations',
        dueDate: new Date(now.getTime() + 730 * 24 * 60 * 60 * 1000), // 2 years
        priority: 'critical',
      });
      deadlines.push({
        title: 'Medical Records Collection',
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
        priority: 'high',
      });
      break;

    case PracticeArea.criminal_defense:
      deadlines.push({
        title: 'Arraignment Preparation',
        dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        priority: 'urgent',
      });
      break;

    case PracticeArea.family_law:
      deadlines.push({
        title: 'Financial Disclosure',
        dueDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days
        priority: 'high',
      });
      break;

    case PracticeArea.traffic:
      deadlines.push({
        title: 'Court Appearance',
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
        priority: 'high',
      });
      break;

    case PracticeArea.workers_compensation:
      deadlines.push({
        title: 'Claim Filing Deadline',
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
        priority: 'critical',
      });
      break;
  }

  return deadlines;
}

export function getCaseStageByStatus(status: string): string {
  const stages: Record<string, string> = {
    open: 'Initial Review',
    in_progress: 'Active Proceedings',
    pending: 'Awaiting Action',
    closed: 'Case Closed',
    archived: 'Archived',
  };

  return stages[status] || 'Unknown';
}

export function estimateCaseDuration(practiceArea: PracticeArea): {
  min: number;
  max: number;
  unit: string;
} {
  const durations: Record<PracticeArea, { min: number; max: number; unit: string }> = {
    [PracticeArea.immigration]: { min: 6, max: 24, unit: 'months' },
    [PracticeArea.personal_injury]: { min: 6, max: 18, unit: 'months' },
    [PracticeArea.workers_compensation]: { min: 3, max: 12, unit: 'months' },
    [PracticeArea.criminal_defense]: { min: 3, max: 12, unit: 'months' },
    [PracticeArea.family_law]: { min: 4, max: 12, unit: 'months' },
    [PracticeArea.traffic]: { min: 1, max: 3, unit: 'months' },
  };

  return durations[practiceArea];
}
