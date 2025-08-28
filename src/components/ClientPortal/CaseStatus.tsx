'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/safe-logger';

import {
  Briefcase,
  Clock,
  AlertCircle,
  Users,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  FileText,
  Calendar,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Case {
  id: string;
  caseNumber: string;
  title: string;
  type: string;
  status: 'active' | 'pending' | 'closed' | 'on-hold';
  attorney: {
    name: string;
    email: string;
    phone: string;
    photo?: string;
  };
  paralegal?: {
    name: string;
    email: string;
  };
  openedDate: string;
  lastActivity: string;
  nextDeadline?: {
    date: string;
    description: string;
  };
  documents: number;
  messages: number;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    type: 'milestone' | 'document' | 'hearing' | 'filing' | 'other';
  }>;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function CaseStatus({ clientData }: { clientData: ClientData }) {
  // Using clientData for future client-specific case queries
  const clientId = clientData.id;
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`/api/client/cases?clientId=${clientId}`);
        const data = await response.json();
        setCases(data.cases || []);
        if (data.cases.length > 0) {
          setSelectedCase(data.cases[0]);
        }
      } catch (error) {
        logger.error('Error fetching cases:', error);
      } finally {
        setLoading(false);
          }
};

    fetchCases();
  }, [clientId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return CheckCircle;
      case 'document':
        return FileText;
      case 'hearing':
        return Calendar;
      case 'filing':
        return Briefcase;
      default:
        return Activity;
        }
};

  const filteredCases = filter === 'all' ? cases : cases.filter(c => c.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B1F2E]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Cases</h2>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'closed'].map(status => (
            <button
              key={status}

                onClick={() => setFilter(status)}

                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-[#6B1F2E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredCases.map(caseItem => (
            <div
              key={caseItem.id}

                className={`bg-white rounded-lg shadow-sm border p-4 cursor-pointer transition-all ${
                selectedCase?.id === caseItem.id ? 'border-[#6B1F2E] shadow-md' : 'hover:shadow-md'
              }` onClick={() => setSelectedCase(caseItem)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{caseItem.caseNumber}</h3>
                  <p className="text-sm text-gray-600">{caseItem.title}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem.status)}`}
                >
                  {caseItem.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <p>Type: {caseItem.type}</p>
                <p>Last activity: {new Date(caseItem.lastActivity).toLocaleDateString()}</p>
              </div>
              {caseItem.nextDeadline && (
                <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      Deadline: {new Date(caseItem.nextDeadline.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Case Details */}
        {selectedCase && (
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCase.caseNumber}</h3>
                  <p className="text-gray-600">{selectedCase.title}</p>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCase.status)}`}
                    >
                      {selectedCase.status}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/portal/cases/${selectedCase.id}`}

                className="flex items-center gap-2 text-[#6B1F2E] hover:text-[#8B2635] font-medium"
                >
                  View Full Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Team */}
            <div className="p-6 border-b">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Legal Team
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {selectedCase.attorney.photo ? (
                      <Image
                        src={selectedCase.attorney.photo}

                alt={selectedCase.attorney.name}
                        width={48}
                        height={48}

                className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-600 font-medium">
                        {selectedCase.attorney.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{selectedCase.attorney.name}</p>
                    <p className="text-sm text-gray-600">Lead Attorney</p>
                    <div className="flex gap-4 mt-1">
                      <a
                        href={`mailto:${selectedCase.attorney.email}`}

                className="text-xs text-[#6B1F2E] hover:underline"
                      >
                        {selectedCase.attorney.email}
                      </a>
                      <a
                        href={`tel:${selectedCase.attorney.phone}`}

                className="text-xs text-[#6B1F2E] hover:underline"
                      >
                        {selectedCase.attorney.phone}
                      </a>
                    </div>
                  </div>
                </div>
                {selectedCase.paralegal && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {selectedCase.paralegal.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedCase.paralegal.name}</p>
                      <p className="text-sm text-gray-600">Paralegal</p>
                      <a
                        href={`mailto:${selectedCase.paralegal.email}`}

                className="text-xs text-[#6B1F2E] hover:underline"
                      >
                        {selectedCase.paralegal.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border-b">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCase.documents}</div>
                  <div className="text-sm text-gray-600">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedCase.messages}</div>
                  <div className="text-sm text-gray-600">Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(
                      (new Date().getTime() - new Date(selectedCase.openedDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Days Active</div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Case Timeline
              </h4>
              <div className="space-y-4">
                {selectedCase.timeline.slice(0, 5).map((event, index) => {
                  const Icon = getTimelineIcon(event.type);
                  return (
                    <div key={index}

                className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.type === 'milestone'
                              ? 'bg-green-100'
                              : event.type === 'hearing'
                                ? 'bg-purple-100'
                                : 'bg-gray-100'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              event.type === 'milestone'
                                ? 'text-green-600'
                                : event.type === 'hearing'
                                  ? 'text-purple-600'
                                  : 'text-gray-600'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex-1 pb-4 border-b last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{event.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {selectedCase.timeline.length > 5 && (
                <button className="mt-4 text-[#6B1F2E] hover:text-[#8B2635] font-medium text-sm flex items-center gap-2">
                  View Full Timeline
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {cases.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Cases</h3>
          <p className="text-gray-600">You don't have any cases at the moment.</p>
        </div>
      )}
    </div>
  );
}
}
