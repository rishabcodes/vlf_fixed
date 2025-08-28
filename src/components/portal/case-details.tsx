'use client';

import { formatDate } from '@/lib/utils/date';

interface CaseDetailsProps {
  case: {
    id: string;
    caseNumber: string;
    title: string;
    description: string;
    practiceArea: string;
    status: string;
    priority: string;
    attorney: {
      name: string;
      email: string;
      phone: string;
    };
    createdAt: string;
    updatedAt: string;
    nextHearing?: {
      date: string;
      type: string;
      location: string;
    };
    keyDates: Array<{
      label: string;
      date: string;
    }>;
    parties: Array<{
      role: string;
      name: string;
    }>;
  };
}

export default function CaseDetails({ case: caseData }: CaseDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Case Overview */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Case Overview</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{caseData.description}</p>
        </div>
      </div>

      {/* Case Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">General Information</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Practice Area:</dt>
              <dd className="text-sm text-gray-900">{caseData.practiceArea}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Case Number:</dt>
              <dd className="text-sm text-gray-900">#{caseData.caseNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Filed Date:</dt>
              <dd className="text-sm text-gray-900">{formatDate(caseData.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Last Updated:</dt>
              <dd className="text-sm text-gray-900">{formatDate(caseData.updatedAt)}</dd>
            </div>
          </dl>
        </div>

        {/* Attorney Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Your Attorney</h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900">{caseData.attorney.name}</p>
            <p className="text-sm text-gray-600 mt-1">{caseData.attorney.email}</p>
            <p className="text-sm text-gray-600">{caseData.attorney.phone}</p>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Send Message →
            </button>
          </div>
        </div>
      </div>

      {/* Next Hearing */}
      {caseData.nextHearing && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Next Hearing</h4>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">⚖️</span>
              <div>
                <p className="font-medium text-gray-900">{caseData.nextHearing.type}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {formatDate(caseData.nextHearing.date)} at {caseData.nextHearing.location}
                </p>
                <button className="mt-2 text-sm text-yellow-700 hover:text-yellow-800 font-medium">
                  Add to Calendar →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Dates */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Important Dates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {caseData.keyDates.map((keyDate, index) => (
            <div key={index}

                className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span
                className="text-sm text-gray-700">{keyDate.label}:</span>
              <span className="text-sm font-medium text-gray-900">{formatDate(keyDate.date)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Parties Involved */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Parties Involved</h4>
        <div className="space-y-2">
          {caseData.parties.map((party, index) => (
            <div key={index}

                className="flex items-center p-3 bg-gray-50 rounded-lg">
              <span
                className="text-sm text-gray-500 mr-3">{party.role}:</span>
              <span className="text-sm font-medium text-gray-900">{party.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Upload Document
        </button>
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Send Message
        </button>
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}
