import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

/**
 * Custom hook for interacting with HODOS platform
 */
export function useHodos() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Make authenticated request to HODOS via proxy
   */
  const hodosRequest = useCallback(
    async <T>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
      if (!session) {
        toast.error('Please log in to continue');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/hodos${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast.error(error.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [session]
  );

  /**
   * Create a new case in HODOS
   */
  const createCase = useCallback(
    async (caseData: {
      caseType: string;
      description: string;
      urgency: 'low' | 'medium' | 'high';
    }) => {
      return hodosRequest('/cases', {
        method: 'POST',
        body: JSON.stringify({
          ...caseData,
          clientId: session?.user?.id,
        }),
      });
    },
    [hodosRequest, session]
  );

  /**
   * Get AI assistance from HODOS agents
   */
  const getAIAssistance = useCallback(
    async (question: string, context?: unknown) => {
      return hodosRequest('/agents/assist', {
        method: 'POST',
        body: JSON.stringify({
          task: question,
          context,
          priority: 'medium',
        }),
      });
    },
    [hodosRequest]
  );

  /**
   * Upload document to HODOS
   */
  const uploadDocument = useCallback(
    async (caseId: string, file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseId', caseId);

      return hodosRequest('/documents/upload', {
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set content-type for FormData
      });
    },
    [hodosRequest]
  );

  /**
   * Book appointment through HODOS
   */
  const bookAppointment = useCallback(
    async (appointmentData: {
      datetime: string;
      type: string;
      notes?: string;
      attorneyId?: string;
    }) => {
      return hodosRequest('/scheduling/appointments', {
        method: 'POST',
        body: JSON.stringify({
          ...appointmentData,
          clientId: session?.user?.id,
        }),
      });
    },
    [hodosRequest, session]
  );

  /**
   * Get available appointment slots
   */
  const getAvailableSlots = useCallback(
    async (date?: string, attorneyId?: string) => {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (attorneyId) params.append('attorneyId', attorneyId);

      return hodosRequest(`/scheduling/availability?${params}`);
    },
    [hodosRequest]
  );

  /**
   * Get client's cases from HODOS
   */
  const getMyCases = useCallback(async () => {
    if (!session?.user?.id) return null;
    return hodosRequest(`/cases?clientId=${session.user.id}`);
  }, [hodosRequest, session]);

  /**
   * Generate legal document
   */
  const generateDocument = useCallback(
    async (templateId: string, data: Record<string, unknown>) => {
      return hodosRequest('/documents/generate', {
        method: 'POST',
        body: JSON.stringify({ templateId, data }),
      });
    },
    [hodosRequest]
  );

  return {
    // State
    loading,
    error,
    isAuthenticated: !!session,

    // Case management
    createCase,
    getMyCases,

    // AI assistance
    getAIAssistance,

    // Documents
    uploadDocument,
    generateDocument,

    // Scheduling
    bookAppointment,
    getAvailableSlots,

    // Generic request method
    hodosRequest,
  };
}
