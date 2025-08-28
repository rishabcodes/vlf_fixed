import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { CrewLogFilters, CrewLogsResponse, CrewLog } from '@/types/crews';
import { crewLogsService } from '@/services/crews/crew-logs.service';

export const useCrewLogs = (initialFilters?: CrewLogFilters) => {
  const [logs, setLogs] = useState<CrewLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CrewLogFilters>(initialFilters || {});
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [analytics, setAnalytics] = useState<CrewLogsResponse['analytics'] | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000); // 5 seconds default

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await crewLogsService.getLogs(filters);
      setLogs(response.logs);
      setPagination(response.pagination);
      setAnalytics(response.analytics);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch logs';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<CrewLogFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const deleteLogs = useCallback(
    async (logIds: string[]) => {
      try {
        const result = await crewLogsService.deleteLogs(logIds);
        if (result.success) {
          toast.success(result.message);
          // Refresh logs after deletion
          fetchLogs();
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete logs';
        toast.error(errorMessage);
      }
    },
    [fetchLogs]
  );

  const exportLogs = useCallback(async (logIds?: string[]) => {
    try {
      const result = await crewLogsService.exportLogs(logIds);
      if (result.success && result.data) {
        crewLogsService.downloadExport(result.data, `crew-logs-${new Date().toISOString()}.json`);
        toast.success('Logs exported successfully');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export logs';
      toast.error(errorMessage);
    }
  }, []);

  const cleanupOldLogs = useCallback(async () => {
    try {
      const result = await crewLogsService.cleanupOldLogs();
      if (result.success) {
        toast.success(`${result.deletedCount} old logs cleaned up`);
        // Refresh logs after cleanup
        fetchLogs();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cleanup logs';
      toast.error(errorMessage);
    }
  }, [fetchLogs]);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      updateFilters({ page: pagination.page + 1 });
    }
  }, [pagination, updateFilters]);

  const previousPage = useCallback(() => {
    if (pagination.hasPreviousPage) {
      updateFilters({ page: pagination.page - 1 });
    }
  }, [pagination, updateFilters]);

  const setPageSize = useCallback(
    (pageSize: number) => {
      updateFilters({ pageSize, page: 1 });
    },
    [updateFilters]
  );

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchLogs, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, fetchLogs]);

  // Fetch logs when filters change
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    // Data
    logs,
    analytics,
    pagination,
    loading,
    error,
    filters,

    // Actions
    updateFilters,
    deleteLogs,
    exportLogs,
    cleanupOldLogs,
    fetchLogs,
    nextPage,
    previousPage,
    setPageSize,

    // Auto-refresh controls
    autoRefresh,
    setAutoRefresh,
    refreshInterval,
    setRefreshInterval,
  };
};
