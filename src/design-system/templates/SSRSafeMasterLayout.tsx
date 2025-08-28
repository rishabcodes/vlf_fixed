'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SSRSafeHeader } from '../components/SSRSafeHeader';
import { ConsistentFooter } from '../components/ConsistentFooter';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClientOnlyWrapper } from '@/components/ClientOnlyWrapper';

// Dynamic imports to prevent SSR issues
const NewsTicker = dynamic(
  () => import('@/components/ui/news-ticker').then(mod => mod.NewsTicker),
  { ssr: false }
);

const ClientSideNav = dynamic(
  () => import('@/components/Navigation/ClientSideNav'),
  { ssr: false }
);

interface SSRSafeMasterLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'hero' | 'minimal';
  showBreadcrumbs?: boolean;
}

export const SSRSafeMasterLayout: React.FC<SSRSafeMasterLayoutProps> = ({
  children,
  variant = 'default',
  showBreadcrumbs = true,
}) => {
  const pathname = usePathname();
  const safePathname = pathname || '/';

  // Determine current language from pathname
  const currentLanguage: 'en' | 'es' = safePathname.startsWith('/es') ? 'es' : 'en';

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const paths = safePathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: currentLanguage === 'es' ? 'Inicio' : 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path, _index) => {
      currentPath += `/${path}`;
      const name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({ name, href: currentPath });
    });

    return breadcrumbs;
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Client-side navigation helper */}
      <ClientSideNav />
      
      {/* News Ticker - Fixed at the very top */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] block"
        style={{
          height: '32px',
          backgroundColor: '#6B1F2E',
          minHeight: '32px',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          transform: 'none',
        }}
      >
        <ClientOnlyWrapper>
          <NewsTicker locale={currentLanguage} />
        </ClientOnlyWrapper>
      </div>

      {/* Header - Adjusted to account for ticker height */}
      <div className="fixed top-[32px] left-0 right-0 z-[90]">
        <SSRSafeHeader
          language={currentLanguage}
          variant={variant === 'hero' ? 'transparent' : 'solid'}
        />
      </div>

      {/* Main content area with padding to account for fixed header + ticker */}
      <div className={variant === 'hero' ? 'pt-0' : 'pt-[132px]'}>
        {/* Breadcrumbs */}
        {showBreadcrumbs && safePathname !== '/' && variant !== 'hero' && (
          <div className="bg-black/50 border-b border-primary/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm">
                  {getBreadcrumbs().map((crumb, index, array) => (
                    <li key={crumb.href}

                className="flex items-center">
                      {index > 0 && (
                        <svg
                className="flex-shrink-0 h-4 w-4 text-gray-400 mx-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                        </svg>
                      )}
                      {index === array.length - 1 ? (
                        <span className="text-gray-400">{crumb.name}</span>
                      ) : (
                        <Link href={crumb.href}

                className="text-primary hover:text-primary-600">
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow relative">
          <div style={{ opacity: 1 }}>
            {children}
          </div>
        </main>

        {/* Footer */}
        <ConsistentFooter language={currentLanguage} />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  );
};