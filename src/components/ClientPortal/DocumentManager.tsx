'use client';

import React, { useState, useEffect, useRef } from 'react';
import { logger } from '@/lib/safe-logger';

import {
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  Search,
  File,
  FileCheck,
  AlertCircle,
  X,
  Shield,
  FolderOpen,
  Briefcase,
  User,
  DollarSign,
  MessageSquare,
  Building,
} from 'lucide-react';
import { format } from 'date-fns';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  category: 'case' | 'personal' | 'financial' | 'correspondence' | 'court' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  caseId?: string;
  caseNumber?: string;
  url: string;
  thumbnailUrl?: string;
  requiresSignature?: boolean;
  signed?: boolean;
  expiryDate?: string;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function DocumentManager({ clientData }: { clientData: ClientData }) {
  // Using clientData for future client-specific document queries
  const clientId = clientData.id;
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'All Documents', icon: FolderOpen },
    { id: 'case', label: 'Case Documents', icon: Briefcase },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'correspondence', label: 'Correspondence', icon: MessageSquare },
    { id: 'court', label: 'Court Filings', icon: Building },
    { id: 'other', label: 'Other', icon: File },
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/client/documents?clientId=${clientId}`);
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        logger.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
          }
};

    fetchDocuments();
  }, [clientId]);

  const filterDocuments = React.useCallback(() => {
    let filtered = documents;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        doc =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  }, [documents, selectedCategory, searchTerm]);

  useEffect(() => {
    filterDocuments();
  }, [filterDocuments]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = async (files: FileList) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        formData.append('files', file);
      }
    }

    try {
      const response = await fetch('/api/client/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const response = await fetch(`/api/client/documents?clientId=${clientId}`);
        const data = await response.json();
        setDocuments(data.documents || []);
        setUploadModalOpen(false);
      }
    } catch (error) {
      logger.error('Error uploading documents:', error);
        }
};

  const handleDownload = async (doc: Document) => {
    try {
      const response = await fetch(`/api/client/documents/${doc.id}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      logger.error('Error downloading document:', error);
        }
};

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const response = await fetch(`/api/client/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const docResponse = await fetch(`/api/client/documents?clientId=${clientId}`);
        const data = await docResponse.json();
        setDocuments(data.documents || []);
        setSelectedDocument(null);
      }
    } catch (error) {
      logger.error('Error deleting document:', error);
        }
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
        <button
          onClick={() => setUploadModalOpen(true)}

                className="flex items-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Documents
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}

                onClick={() => setSelectedCategory(category.id)}

                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#6B1F2E] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocuments.map(document => {
          return (
            <div
              key={document.id}

                className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedDocument(document)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <File className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex items-center gap-1">
                  {document.requiresSignature && !document.signed && (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  {document.signed && <FileCheck className="w-4 h-4 text-green-500" />}
                </div>
              </div>
              <h3 className="font-medium text-gray-900 truncate mb-1">{document.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{formatFileSize(document.size)}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{format(new Date(document.uploadedAt), 'MMM d, yyyy')}</span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    document.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : document.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {document.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Upload your first document to get started'}
          </p>
        </div>
      )}

      {/* Document Preview Modal */}
      <>
        {selectedDocument && (
          <div
className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDocument(null)}
          >
            <div
className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedDocument.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploaded by {selectedDocument.uploadedBy} on{' '}
                      {format(new Date(selectedDocument.uploadedAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDocument(null)}

                className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Document Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Size</p>
                    <p className="text-gray-900">{formatFileSize(selectedDocument.size)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-gray-900 capitalize">{selectedDocument.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-sm ${
                        selectedDocument.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : selectedDocument.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedDocument.status}
                    </span>
                  </div>
                  {selectedDocument.caseNumber && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Case</p>
                      <p className="text-gray-900">{selectedDocument.caseNumber}</p>
                    </div>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Secure Document</p>
                      <p className="text-sm text-blue-700">
                        This document is encrypted and protected by attorney-client privilege
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(selectedDocument.url, '_blank')}

                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Document
                  </button>
                  <button
                    onClick={() => handleDownload(selectedDocument)}

                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(selectedDocument.id)}

                className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>

      {/* Upload Modal */}
      <>
        {uploadModalOpen && (
          <div
className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setUploadModalOpen(false)}
          >
            <div
className="bg-white rounded-lg shadow-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Documents</h3>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#6B1F2E] transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                    e.preventDefault();
                    if (e.dataTransfer.files.length > 0) {
                      handleFileUpload(e.dataTransfer.files);
                    }}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
                </div>

                <input
                  ref={fileInputRef}

                type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files);}
      className="hidden"
                />

                <div className="mt-6 flex gap-3">
                  <button
                onClick={() => setUploadModalOpen(false)}

                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
}
}
}
