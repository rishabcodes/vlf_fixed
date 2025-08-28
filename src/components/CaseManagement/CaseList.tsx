'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/safe-logger';

import {
  Briefcase,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Calendar,
  User,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { PracticeArea, CaseStatus } from '@prisma/client';

interface Case {
  id: string;
  caseNumber: string;
  client: {
    name: string;
    email: string;
  };
  attorney?: {
    name: string;
  };
  practiceArea: PracticeArea;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  metrics?: {
    taskCompletion: number;
    overdueTasks: number;
    upcomingAppointments: number;
  };
}

export default function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    practiceArea: '',
    status: '',
    attorneyId: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchCases = React.useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (filters.practiceArea) params.append('practiceArea', filters.practiceArea);
      if (filters.status) params.append('status', filters.status);
      if (filters.attorneyId) params.append('attorneyId', filters.attorneyId);

      const response = await fetch(`/api/cases?${params}`);
      const data = await response.json();
      setCases(data.cases || []);
    } catch (error) {
      logger.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const getStatusColor = (status: CaseStatus) => {
    const colors = {
      [CaseStatus.open]: 'bg-blue-100 text-blue-800',
      [CaseStatus.in_progress]: 'bg-yellow-100 text-yellow-800',
      [CaseStatus.pending]: 'bg-orange-100 text-orange-800',
      [CaseStatus.closed]: 'bg-green-100 text-green-800',
      [CaseStatus.archived]: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatPracticeArea = (area: PracticeArea) => {
    return area
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B1F2E]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all active cases</p>
        </div>
        <Link
          href="/admin/cases/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Case
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by case number, client name, or email..."
              value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            >
              <option value="">All Practice Areas</option>
              {Object.values(PracticeArea).map(area => (
                <option key={area}

                value={area}>
                  {formatPracticeArea(area)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {Object.values(CaseStatus).map(status => (
                <option key={status}

                value={status}>
                  {status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setFilters({ practiceArea: '', status: '', attorneyId: '' });
                setSearchQuery('');
              }}
              className="text-[#6B1F2E] hover:text-[#8B2635] font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {cases.map(case_ => (
          <div
            key={case_.id}

                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <Link
              href={`/admin/cases/${case_.id}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{case_.caseNumber}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(case_.status)}`}
                      >
                        {case_.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{case_.client.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{formatPracticeArea(case_.practiceArea)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{case_.attorney?.name || 'Unassigned'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Opened {format(new Date(case_.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                    </div>

                    {case_.metrics && (
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {Math.round(case_.metrics.taskCompletion)}% Complete
                          </span>
                        </div>

                        {case_.metrics.overdueTasks > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">
                              {case_.metrics.overdueTasks} overdue tasks
                            </span>
                          </div>
                        )}

                        {case_.metrics.upcomingAppointments > 0 && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {case_.metrics.upcomingAppointments} upcoming appointments
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {cases.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Cases Found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || Object.values(filters).some(f => f)
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first case'}
          </p>
          {!searchQuery && !Object.values(filters).some(f => f) && (
            <Link
              href="/admin/cases/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Case
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
