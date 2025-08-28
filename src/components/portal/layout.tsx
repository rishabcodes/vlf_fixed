'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/portal', icon: '🏠' },
    { name: 'Cases', href: '/portal/cases', icon: '📁' },
    { name: 'Documents', href: '/portal/documents', icon: '📄' },
    { name: 'Messages', href: '/portal/messages', icon: '💬' },
    { name: 'Billing', href: '/portal/billing', icon: '💳' },
    { name: 'Appointments', href: '/portal/appointments', icon: '📅' },
    { name: 'Profile', href: '/portal/profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/portal" className="flex items-center">
                  <span className="text-xl font-bold text-blue-600">VLF</span>
                  <span className="ml-2 text-gray-700">Client Portal</span>
                </Link>
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {session?.user?.name || 'Client'}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}

                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
          <div className="flex-1 flex flex-col bg-white border-r">
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map(item => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/portal' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.name}

                href={item.href}

                className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Support Section */}
            <div className="p-4 border-t">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
                <p className="mt-1 text-xs text-gray-600">
                  Contact our support team for assistance
                </p>
                <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Get Support →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 pt-16">
            <div
              className="fixed inset-0 bg-gray-600/75"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="px-4 py-4 space-y-1">
                {navigation.map(item => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/portal' && pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.name}

                href={item.href}

                onClick={() => setIsMobileMenuOpen(false)}

                className={`
                        group flex items-center px-3 py-2 text-sm font-medium rounded-md
                        ${
                          isActive
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 md:pl-64">
          <main className="flex-1 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
