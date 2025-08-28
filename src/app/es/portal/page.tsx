'use client';

import { useSession } from 'next-auth/react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ClientPortalDashboard from '@/components/portal/dashboard';

export default function PortalHomePage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/portal/dashboard');
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      logger.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
        }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name || 'Client'}
        </h1>
        <p className="text-gray-600 mt-2">
          Access your cases, documents, and communicate securely with your legal team.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickActionCard
          title="View Cases"
          description="Track your case progress"
          href="/portal/cases"
          icon="📁"
        />
        <QuickActionCard
          title="Documents"
          description="Access case documents"
          href="/portal/documents"
          icon="📄"
        />
        <QuickActionCard
          title="Messages"
          description="Secure messaging"
          href="/portal/messages"
          icon="💬"
        />
        <QuickActionCard
          title="Billing"
          description="View invoices & payments"
          href="/portal/billing"
          icon="💳"
        />
      </div>

      {/* Dashboard */}
      {dashboardData && <ClientPortalDashboard data={dashboardData} />}
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </Link>
  );
}
