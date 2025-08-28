'use client';

import { useSession } from 'next-auth/react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { useEffect, useState, useCallback } from 'react';
import CaseList from '@/components/portal/case-list';
import CaseFilters from '@/components/portal/case-filters';

export default function CasesPage() {
  const { data: session } = useSession();
  const [cases, setCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: [] as string[],
    practiceArea: '',
    dateRange: null as any,
  });

  const fetchCases = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status.length > 0) {
        params.append('status', filters.status.join(','));
      }
      if (filters.practiceArea) {
        params.append('practiceArea', filters.practiceArea);
      }
      if (filters.dateRange) {
        params.append('startDate', filters.dateRange.start);
        params.append('endDate', filters.dateRange.end);
      }

      const response = await fetch(`/api/portal/cases?${params}`);
      const data = await response.json();

      if (data.success) {
        setCases(data.cases);
      }
    } catch (error) {
      logger.error('Failed to fetch cases:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCases();
    }
  }, [session, fetchCases]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>
        <p className="text-gray-600 mt-2">View and track the progress of your legal cases</p>
      </div>

      {/* Filters */}
      <CaseFilters filters={filters} onFiltersChange={setFilters} />

      {/* Cases List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : cases.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No cases found matching your filters</p>
        </div>
      ) : (
        <CaseList cases={cases} />
      )}
    </div>
  );
}
