// Common types for CrewAI agents and workflows

export interface Agent {
  id: string;
  name: string;
  role: string;
  specializations: string[];
  isActive: boolean;
}

export interface Task {
  id: string;
  type: 'legal-consultation' | 'appointment-scheduling' | 'document-analysis' | 'multi-step';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  data: Record<string, unknown>;
  result?: unknown;
  error?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface WorkflowStep {
  id: string;
  agentType: string;
  action: string;
  data: Record<string, unknown>;
  dependencies?: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  currentStep: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LegalPracticeArea {
  id: string;
  name: string;
  description: string;
  complexity: 'simple' | 'moderate' | 'complex';
  typicalDuration: number; // in minutes
  requiredDocuments?: string[];
  urgencyFactors?: string[];
}

export interface Attorney {
  id: string;
  name: string;
  email: string;
  practiceAreas: string[];
  languages: string[];
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  location: string;
  isActive: boolean;
}

export interface AppointmentSlot {
  id: string;
  attorneyId: string;
  date: Date;
  time: string;
  duration: number;
  isAvailable: boolean;
  type: 'consultation' | 'follow-up' | 'document-review' | 'court-prep';
  location: 'in-person' | 'virtual' | 'phone';
}

export interface CrewAIMetrics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageCompletionTime: number;
  tasksByType: Record<string, number>;
  tasksByPriority: Record<string, number>;
  agentUtilization: Record<string, number>;
}
