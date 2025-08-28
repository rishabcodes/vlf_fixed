'use client';

import React, { useState } from 'react';
import { paymentLogger } from '@/lib/safe-logger';
import ResourceLeadCaptureForm from './index';
import { FileText, BookOpen, Video, Calculator, CheckCircle } from 'lucide-react';

// Example implementation showing different use cases
export default function ResourceLeadCaptureExamples() {
  const [capturedLeads, setCapturedLeads] = useState<Array<{ email: string; resource: string }>>(
    []
  );

  const handleLeadCapture =
    (resource: string) => (data: { email: string; resourceDelivered: boolean }) => {
      setCapturedLeads(prev => [...prev, { email: data.email, resource }]);
      paymentLogger.info(`Lead captured for ${resource}:`, data);
    };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Resource Lead Capture Form Examples
        </h1>

        {/* Captured Leads Display */}
        {capturedLeads.length > 0 && (
          <div className="mb-12 bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
              Captured Leads ({capturedLeads.length})
            </h2>
            <ul className="space-y-2">
              {capturedLeads.map((lead, index) => (
                <li
                  key={index}

                className="flex items-center gap-2 text-green-700 dark:text-green-300"
                >
                  <CheckCircle
                className="w-4 h-4" />
                  <span>
                    {lead.email} - {lead.resource}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example 1: PDF Download */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <FileText className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Immigration Guide 2024</h2>
              <p className="text-blue-100">
                Complete guide to US immigration processes and requirements
              </p>
            </div>
            <div className="p-6">
              <ResourceLeadCaptureForm
                resourceId="immigration-guide-2024"
                resourceTitle="2024 Immigration Law Guide"
                resourceUrl="/api/mock-resource/immigration-guide.pdf"
                resourceType="download"
                practiceArea="immigration"
                language="en"
                onSuccess={handleLeadCapture('Immigration Guide')}
              />
            </div>
          </div>

          {/* Example 2: Spanish eBook */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <BookOpen className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Guía de Compensación Laboral</h2>
              <p className="text-green-100">
                Todo lo que necesita saber sobre compensación laboral en NC
              </p>
            </div>
            <div className="p-6">
              <ResourceLeadCaptureForm
                resourceId="workers-comp-guide-es"
                resourceTitle="Guía de Compensación Laboral"
                resourceUrl="/api/mock-resource/workers-comp-es.pdf"
                resourceType="download"
                practiceArea="workersComp"
                language="es"
                onSuccess={handleLeadCapture('Workers Comp Guide (Spanish)')}
              />
            </div>
          </div>

          {/* Example 3: Video Resource (Email Delivery) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
              <Video className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">DUI Defense Strategies</h2>
              <p className="text-purple-100">Video training on defending against DUI charges</p>
            </div>
            <div className="p-6">
              <ResourceLeadCaptureForm
                resourceId="dui-defense-video"
                resourceTitle="DUI Defense Video Training"
                resourceType="email"
                practiceArea="criminal"
                language="en"
                customThankYouMessage="We've sent the video link to your email. It includes 45 minutes of expert advice on DUI defense."
                onSuccess={handleLeadCapture('DUI Defense Video')}
              />
            </div>
          </div>

          {/* Example 4: Interactive Tool (Redirect) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
              <Calculator className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Settlement Calculator</h2>
              <p className="text-orange-100">Calculate your potential personal injury settlement</p>
            </div>
            <div className="p-6">
              <ResourceLeadCaptureForm
                resourceId="settlement-calculator"
                resourceTitle="Personal Injury Settlement Calculator"
                resourceUrl="/tools/settlement-calculator"
                resourceType="redirect"
                practiceArea="personalInjury"
                language="en"
                customThankYouMessage="Great! You'll be redirected to our settlement calculator in a moment..."
                onSuccess={handleLeadCapture('Settlement Calculator')}
              />
            </div>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Implementation Notes
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Features Demonstrated:
              </h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>PDF download delivery (Immigration Guide)</li>
                <li>Spanish language support (Workers Comp Guide)</li>
                <li>Email delivery for video content (DUI Defense)</li>
                <li>Redirect to protected tool (Settlement Calculator)</li>
                <li>Custom success messages for each resource</li>
                <li>Lead capture callback for tracking</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Validation Includes:</h3>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email format validation (must be valid email)</li>
                <li>ZIP code validation (US format: 12345 or 12345-6789)</li>
                <li>Required privacy consent</li>
                <li>Optional marketing consent</li>
                <li>Phone number is optional</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Data Flow:</h3>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>User fills out form with validation</li>
                <li>Data sent to /api/leads/capture endpoint</li>
                <li>Lead stored in database with metadata</li>
                <li>Resource delivered based on type</li>
                <li>Success callback triggered</li>
                <li>Google Analytics conversion tracked</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
