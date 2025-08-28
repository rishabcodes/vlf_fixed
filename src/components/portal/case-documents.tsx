'use client';

import { useEffect, useState, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { formatDate, formatFileSize } from '@/lib/utils/format';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: {
    name: string;
    role: 'client' | 'attorney';
  };
  status: 'pending_review' | 'approved' | 'requires_signature' | 'signed';
  category: string;
  description?: string;
  downloadUrl: string;
  signatureRequired: boolean;
  signedAt?: string;
}

interface CaseDocumentsProps {
  caseId: string;
}

export default function CaseDocuments({ caseId }: CaseDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending_signature' | 'recent'>('all');
  const [isUploading, setIsUploading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.append('filter', filter);
      }

      const response = await fetch(`/api/portal/cases/${caseId}/documents?${params}`);
      const data = await response.json();

      if (data.success) {
        setDocuments(data.documents);
      }
    } catch (error) {
      logger.error('Failed to fetch documents:', error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId, filter]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseId', caseId);

      try {
        const response = await fetch('/api/portal/documents/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          await fetchDocuments();
          event.target.value = '';
        }
      } catch (error) {
        logger.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [caseId, fetchDocuments]
  );

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'requires_signature':
        return 'bg-red-100 text-red-800';
      case 'signed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    return '📎';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Upload */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {(['all', 'pending_signature', 'recent'] as const).map(filterOption => (
            <button
              key={filterOption}

                onClick={() => setFilter(filterOption)}

                className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === filterOption
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filterOption === 'all'
                ? 'All Documents'
                : filterOption === 'pending_signature'
                  ? 'Needs Signature'
                  : 'Recent'}
            </button>
          ))}
        </div>

        <label className="relative cursor-pointer">
          <input
            type="file"
            className="sr-only"
            onChange={handleFileUpload} disabled={isUploading}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <span
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Document
              </>
            )}
          </span>
        </label>
      </div>

      {/* Documents List */}
      {documents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No documents found</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {documents.map(doc => (
              <li key={doc.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-2xl">{getFileIcon(doc.type)}</div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-blue-600 hover:text-blue-700">
                            {doc.name}
                          </p>
                          <span
                            className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(doc.status)}`}
                          >
                            {doc.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{doc.category}</span>
                          <span className="mx-2">•</span>
                          <span>{formatFileSize(doc.size)}</span>
                          <span className="mx-2">•</span>
                          <span>
                            Uploaded {formatDate(doc.uploadedAt)} by {doc.uploadedBy.name}
                          </span>
                        </div>
                        {doc.description && (
                          <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.signatureRequired && !doc.signedAt && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                          Sign Document
                        </button>
                      )}
                      <a
                        href={doc.downloadUrl}
                        download
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg
                          className="mr-1.5 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
}
