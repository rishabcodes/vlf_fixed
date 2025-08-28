import React from 'react';
import Script from 'next/script';
import { WithContext, HowTo } from 'schema-dts';
import {
  generateLegalProcessSchema,
  generatePracticeAreaHowToSchemas,
  LEGAL_PROCESS_GUIDES,
} from '@/lib/seo/howto-schema-generator';

interface HowToSchemaProps {
  processType?: keyof typeof LEGAL_PROCESS_GUIDES;
  practiceArea?: 'immigration' | 'personalInjury' | 'criminalDefense' | 'workersComp';
  pageType?: string;
}

export function HowToSchema({ processType, practiceArea, pageType = 'default' }: HowToSchemaProps) {
  let schemas: Array<WithContext<HowTo>> = [];

  if (processType) {
    // Generate specific process schema
    schemas.push(generateLegalProcessSchema(processType));
  } else if (practiceArea) {
    // Generate all relevant schemas for practice area
    schemas = generatePracticeAreaHowToSchemas(practiceArea);
  }

  if (schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`howto-schema-${pageType}-${index}`}
          id={`howto-schema-${pageType}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

// Component to display HowTo guide on the page
export function HowToGuide({ processType }: { processType: keyof typeof LEGAL_PROCESS_GUIDES }) {
  const guide = LEGAL_PROCESS_GUIDES[processType];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{guide.name}</h2>
      <p className="text-lg text-gray-600 mb-6">{guide.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">⏱️</span>
            Estimated Time
          </h3>
          <p className="text-gray-700">
            {guide.totalTime ? formatDuration(guide.totalTime) : 'Varies'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
            <span className="text-2xl mr-2">💰</span>
            Estimated Cost
          </h3>
          <p className="text-gray-700">
            {guide.estimatedCost
              ? `$${guide.estimatedCost.value} ${guide.estimatedCost.currency}`
              : 'Free consultation available'}
          </p>
        </div>
      </div>

      {guide.supply && guide.supply.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 What You'll Need</h3>
          <ul className="grid md:grid-cols-2 gap-3">
            {guide.supply.map((item, index) => (
              <li key={index}
                className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <div>
                  <strong
                    className="text-gray-900">{item.name}</strong>
                  {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Step-by-Step Process</h3>
        <ol className="space-y-6">
          {guide.steps.map((step, index) => (
            <li key={index}
              className="relative pl-8">
              <div
                className="absolute left-0 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">{step.name}</h4>
                <p className="text-gray-700 mb-2">{step.text}</p>
                {step.tip && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mt-2">
                    <p className="text-sm">
                      <strong className="text-blue-700">💡 Pro Tip:</strong>{' '}
                      <span className="text-blue-600">{step.tip}</span>
                    </p>
                  </div>
                )}
                {step.warning && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-2">
                    <p className="text-sm">
                      <strong className="text-red-700">⚠️ Warning:</strong>{' '}
                      <span className="text-red-600">{step.warning}</span>
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-primary/10 border-2 border-primary rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Professional Legal Help?</h3>
        <p className="text-gray-700 mb-4">
          Don't navigate the legal system alone. Our experienced attorneys can handle your case
          and maximize your results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:18449673536"
            className="inline-flex items-center justify-center bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-primary-300 transition-colors"
          >
            📞 Call Now: 1-844-YO-PELEO
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
          >
            💬 Free Consultation
          </a>
        </div>
      </div>
    </div>
  );
}

// Helper function to format ISO duration
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(
    /PT?(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
  );

  if (!match) return isoDuration;

  const [, years, months, days, hours, minutes] = match;
  const parts: string[] = [];

  if (years) parts.push(`${years} year${years !== '1' ? 's' : ''}`);
  if (months) parts.push(`${months} month${months !== '1' ? 's' : ''}`);
  if (days) parts.push(`${days} day${days !== '1' ? 's' : ''}`);
  if (hours) parts.push(`${hours} hour${hours !== '1' ? 's' : ''}`);
  if (minutes) parts.push(`${minutes} minute${minutes !== '1' ? 's' : ''}`);

  return parts.join(', ') || 'Varies';
}
