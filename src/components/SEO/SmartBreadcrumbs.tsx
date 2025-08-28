'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import Script from 'next/script';
import { generateSmartBreadcrumbs } from '@/lib/seo/internal-linking-mesh';

interface SmartBreadcrumbsProps {
  customLabels?: Record<string, string>;
  className?: string;
  showHome?: boolean;
}

export function SmartBreadcrumbs({
  customLabels = {},
  className = '',
  showHome = true,
}: SmartBreadcrumbsProps) {
  const pathname = usePathname();

  // Don't show on homepage
  if (!pathname || pathname === '/') return null;

  const breadcrumbs = generateSmartBreadcrumbs(pathname, customLabels);

  // Generate schema markup
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://www.vasquezlawnc.com${crumb.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={`bg-gray-50 border-b border-gray-200 ${className}`}>
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href}

                className="flex items-center">
                {index > 0 && <ChevronRight
                className="w-4 h-4 text-gray-400 mx-2" />}

                {crumb.current ? (
                  <span className="text-gray-700 font-medium">{crumb.name}</span>
                ) : (
                  <Link
                    href={crumb.href}

                className="text-primary hover:text-primary-300 transition-colors font-medium inline-flex items-center"
                  >
                    {index === 0 && showHome && <Home
                className="w-4 h-4 mr-1" />}
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>

          {/* Add contextual message based on page type */}
          {pathname?.includes('/near-me/') && (
            <p className="text-xs text-gray-600 mt-2">
              🚨 Need immediate help? Call{' '}
              <a href="tel:18449673536" className="text-primary font-bold">
                1-844-YO-PELEO
              </a>{' '}
              for 24/7 emergency legal assistance
            </p>
          )}

          {pathname?.includes('/locations/') && (
            <p className="text-xs text-gray-600 mt-2">
              📍 Serving all of North Carolina with offices in Charlotte, Raleigh, Greensboro &
              Smithfield
            </p>
          )}

          {pathname?.includes('/practice-areas/') && (
            <p className="text-xs text-gray-600 mt-2">
              ⚖️ Free consultation available • No fee unless we win • Se habla español
            </p>
          )}
        </div>
      </nav>

      <Script
        id={`breadcrumb-schema-${pathname?.replace(/\//g, '-') || 'default'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
}
