import React from 'react';
import Link from 'next/link';
import {
  generateContextualLinks,
  generateRelatedLinks,
} from '@/lib/seo/internal-linking-mesh';

interface InternalLinkingSectionProps {
  currentPage: {
    type: 'location' | 'service' | 'practice-area' | 'attorney' | 'blog';
    location?: string;
    service?: string;
    slug?: string;
  };
  variant?: 'inline' | 'sidebar' | 'footer' | 'related';
  maxLinks?: number;
  className?: string;
}

export function InternalLinkingSection({
  currentPage,
  variant = 'inline',
  maxLinks = 5,
  className = '',
}: InternalLinkingSectionProps) {
  // Generate contextual links based on current page
  const contextualLinks = generateContextualLinks(currentPage, maxLinks);

  // Generate related links if on practice area or location page
  const relatedLinks = currentPage.slug
    ? generateRelatedLinks(currentPage.type, currentPage.slug, 6)
    : [];

  if (variant === 'inline') {
    return (
      <div className={`internal-links-inline ${className}`}>
        <p className="text-gray-600 text-sm">
          <span className="font-semibold text-gray-800">Quick Links: </span>
          {contextualLinks.map((link, index) => (
            <React.Fragment key={index}>
              <Link
                href={link.href}
                title={link.title} className="text-primary hover:text-primary-300 underline font-medium"
              >
                {link.text}
              </Link>
              {index < contextualLinks.length - 1 && ' • '}
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`internal-links-sidebar bg-gray-50 p-6 rounded-lg ${className}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-4">🔥 Popular Services</h3>
        <ul className="space-y-3">
          {contextualLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                title={link.title}
                className="flex items-center text-gray-700 hover:text-primary transition-colors"
              >
                <span className="text-primary mr-2">→</span>
                <span className="font-medium">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/contact?source=sidebar"
            className="block w-full bg-primary text-black text-center py-3 px-4 rounded-lg font-bold hover:bg-primary-300 transition-colors"
          >
            Get FREE Consultation
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'related') {
    if (relatedLinks.length === 0) return null;

    return (
      <div className={`internal-links-related ${className}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Legal Services</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedLinks.map((link, index) => (
            <Link
              key={index}

                href={link.href}

                className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-lg transition-all"
            >
              <h4
                className="font-semibold text-gray-900 mb-2">{link.text}</h4>
              <p className="text-sm text-gray-600">{link.description}</p>
              <span className="text-primary text-sm font-medium mt-2 inline-flex items-center">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`internal-links-footer grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {contextualLinks.map((link, index) => (
          <Link
            key={index}

                href={link.href}
            title={link.title} className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {link.text}
          </Link>
        ))}
      </div>
    );
  }

  return null;
}
