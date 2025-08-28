import { useState, useCallback } from 'react';
import { securityLogger } from '@/lib/safe-logger';
import { toast } from 'react-hot-toast';

export interface CrewAITaskStatus {
  taskId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  result?: unknown;
  error?: string;
  progress?: {
    totalSteps: number;
    currentStep: number;
    completedSteps: number;
    stepProgress: Array<{
      step: number;
      agent: string;
      action: string;
      status: 'pending' | 'in-progress' | 'completed';
    }>;
  };
}

export const useCrewAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTasks, setActiveTasks] = useState<Map<string, CrewAITaskStatus>>(new Map());

  const pollTaskStatus = useCallback(async (taskId: string) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let isActive = true;
    
    const poll = async () => {
      if (!isActive) return; // Stop if cleanup occurred
      
      try {
        const response = await fetch(`/api/crewai/client-intake?taskId=${taskId}`);
        if (response.ok) {
          const status: CrewAITaskStatus = await response.json();

          if (!isActive) return; // Check again before state update
          setActiveTasks(prev => new Map(prev.set(taskId, status)));

          if (status.status === 'completed') {
            toast.success('Task completed successfully');
            return; // Stop polling
          } else if (status.status === 'failed') {
            toast.error(`Task failed: ${status.error}`);
            return; // Stop polling
          }

          // Continue polling if task is still in progress
          if (isActive) {
            timeoutId = setTimeout(poll, 2000);
          }
        }
      } catch (error) {
        securityLogger.error('Failed to poll task status:', error);
        if (isActive) {
          timeoutId = setTimeout(poll, 5000); // Retry after longer delay
        }
      }
    };

    poll();

    // Store cleanup function for this taskId
    const cleanup = () => {
      isActive = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    
    // Store cleanup in a WeakMap or closure to call on unmount
    return cleanup;
  }, []);

  const createLegalConsultationTask = useCallback(
    async (data: {
      userId: string;
      caseType: string;
      description: string;
      urgency?: 'low' | 'medium' | 'high';
      language?: 'en' | 'es';
      location?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/legal-consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create legal consultation task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Legal consultation analysis started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start legal consultation');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const createAppointmentSchedulingTask = useCallback(
    async (data: {
      userId: string;
      preferredDates?: string[];
      preferredTimeSlots?: string[];
      appointmentType?: 'consultation' | 'follow_up' | 'document_review' | 'court' | 'other';
      attorneyId?: string;
      practiceArea: string;
      duration?: number;
      isUrgent?: boolean;
      language?: 'en' | 'es';
      location?: 'in-person' | 'virtual' | 'phone';
      notes?: string;
      clientInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        source?: string;
      };
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/appointment-scheduling', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, action: 'find-slots' }),
        });

        if (!response.ok) {
          throw new Error('Failed to create appointment scheduling task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Appointment scheduling started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start appointment scheduling');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const createDocumentAnalysisTask = useCallback(
    async (
      file: File,
      data: {
        userId: string;
        documentType:
          | 'contract'
          | 'court-filing'
          | 'immigration-form'
          | 'medical-record'
          | 'insurance-claim'
          | 'other';
        analysisType?:
          | 'summary'
          | 'risk-assessment'
          | 'compliance-check'
          | 'key-extraction'
          | 'full-analysis';
        language?: 'en' | 'es';
        urgency?: 'low' | 'medium' | 'high';
      }
    ) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('userId', data.userId);
        formData.append('documentType', data.documentType);
        if (data.analysisType) formData.append('analysisType', data.analysisType);
        if (data.language) formData.append('language', data.language);
        if (data.urgency) formData.append('urgency', data.urgency);

        const response = await fetch('/api/crewai/document-analysis', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to create document analysis task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Document analysis started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start document analysis');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const createClientIntakeWorkflow = useCallback(
    async (data: {
      userId: string;
      caseType: string;
      description: string;
      urgency?: 'low' | 'medium' | 'high';
      language?: 'en' | 'es';
      location?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/client-intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create client intake workflow');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Client intake workflow started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start client intake workflow');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const getTaskStatus = useCallback(
    (taskId: string): CrewAITaskStatus | undefined => {
      return activeTasks.get(taskId);
    },
    [activeTasks]
  );

  const bookAppointment = useCallback(
    async (
      userId: string,
      slot: { date: string; time: string; duration: number },
      appointmentRequest: { type: string; notes?: string }
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/appointment-scheduling', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'book-appointment',
            userId,
            slot,
            appointmentRequest,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to book appointment');
        }

        const result = await response.json();
        toast.success(`Appointment booked! Confirmation: ${result.confirmationNumber}`);
        return result;
      } catch (error) {
        toast.error('Failed to book appointment');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createCompetitiveAnalysisTask = useCallback(
    async (data: {
      practiceArea: string;
      location: string;
      analysisType?: 'pricing' | 'services' | 'marketing' | 'seo' | 'comprehensive';
      competitors?: string[];
      language?: 'en' | 'es';
      depth?: 'quick' | 'detailed' | 'deep-dive';
      urgent?: boolean;
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/competitive-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create competitive analysis task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Competitive analysis started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start competitive analysis');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const createSocialMediaMonitoringTask = useCallback(
    async (data: {
      practiceAreas: string[];
      platforms?: ('twitter' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok' | 'reddit')[];
      keywords?: string[];
      location?: string;
      timeframe?: 'last24h' | 'last7days' | 'last30days';
      language?: 'en' | 'es';
      sentimentFilter?: 'positive' | 'negative' | 'neutral' | 'all';
      engagementThreshold?: number;
      urgent?: boolean;
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/social-media-monitoring', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create social media monitoring task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('Social media monitoring started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start social media monitoring');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  const createSEOBlogGenerationTask = useCallback(
    async (data: {
      practiceArea: string;
      targetKeywords: string[];
      contentType?: 'blog_post' | 'case_study' | 'legal_guide' | 'faq' | 'news_update';
      targetAudience?: 'potential_clients' | 'current_clients' | 'other_lawyers' | 'general_public';
      tone?: 'professional' | 'conversational' | 'authoritative' | 'empathetic' | 'educational';
      wordCount?: number;
      language?: 'en' | 'es';
      location?: string;
      urgency?: 'low' | 'medium' | 'high';
      includeCallToAction?: boolean;
      competitorAnalysis?: boolean;
      trendingTopics?: string[];
      existingContent?: string;
    }) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/crewai/seo-blog-generation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create SEO blog generation task');
        }

        const result = await response.json();

        // Start polling for updates
        pollTaskStatus(result.taskId);

        toast.success('SEO blog generation started');
        return result.taskId;
      } catch (error) {
        toast.error('Failed to start SEO blog generation');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [pollTaskStatus]
  );

  return {
    isLoading,
    activeTasks: Array.from(activeTasks.values()),
    createLegalConsultationTask,
    createAppointmentSchedulingTask,
    createDocumentAnalysisTask,
    createClientIntakeWorkflow,
    createCompetitiveAnalysisTask,
    createSocialMediaMonitoringTask,
    createSEOBlogGenerationTask,
    getTaskStatus,
    bookAppointment,
  };
};
