'use client';

import Script from 'next/script';
import { generateEnhancedFAQSchema } from '@/lib/seo/comprehensive-schema';

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  pageName?: string;
}

export function FAQSchema({ faqs, pageName }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = generateEnhancedFAQSchema(faqs);

  return (
    <Script
      id={`faq-schema-${pageName || 'page'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}
