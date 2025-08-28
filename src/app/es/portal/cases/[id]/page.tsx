'use client';

import { useSession } from 'next-auth/react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import CaseDetails from '@/components/portal/case-details';
import CaseTimeline from '@/components/portal/case-timeline';
import CaseDocuments from '@/components/portal/case-documents';
import CaseMessages from '@/components/portal/case-messages';

export default function CaseDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const caseId = params?.id as string;

  const [caseData, setCaseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'messages'>(
    'overview'
  );

  const fetchCaseDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/portal/cases/${caseId}`);
      const data = await response.json();

      if (data.success) {
        setCaseData(data.case);
      }
    } catch (error) {
      logger.error('Failed to fetch case details:', error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    if (session?.user?.id && caseId) {
      fetchCaseDetails();
    }
  }, [session, caseId, fetchCaseDetails]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Case not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{caseData.title}</h1>
            <p className="text-gray-600 mt-1">Case #{caseData.caseNumber}</p>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                caseData.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : caseData.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : caseData.status === 'closed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
              }`}
            >
              {caseData.status}
            </span>
            <p className="text-sm text-gray-500 mt-2">Priority: {caseData.priority}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {(['overview', 'timeline', 'documents', 'messages'] as const).map(tab => (
              <button
                key={tab}

                onClick={() => setActiveTab(tab)}

                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && <CaseDetails case={caseData} />}
          {activeTab === 'timeline' && <CaseTimeline caseId={caseId} />}
          {activeTab === 'documents' && <CaseDocuments caseId={caseId} />}
          {activeTab === 'messages' && <CaseMessages caseId={caseId} />}
        </div>
      </div>
    </div>
  );
}
