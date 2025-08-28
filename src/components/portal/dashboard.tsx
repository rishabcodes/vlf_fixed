'use client';

import Link from 'next/link';

interface DashboardData {
  cases: {
    active: number;
    pending: number;
    closed: number;
    total: number;
  };
  documents: {
    recent: number;
    pendingSignature: number;
  };
  messages: {
    unread: number;
  };
  billing: {
    outstandingBalance: number;
    lastPaymentDate?: string;
    nextPaymentDue?: {
      date: string;
      amount: number;
    };
  };
  appointments: {
    upcoming: Array<{
      id: string;
      date: string;
      time: string;
      type: string;
      attorney: string;
    }>;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
  }>;
}

export default function ClientPortalDashboard({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Active Cases"
          value={data.cases.active}
          subtitle={`${data.cases.total} total cases`}
          href="/portal/cases?status=active"
          color="blue"
        />
        <StatCard
          title="Pending Documents"
          value={data.documents.pendingSignature}
          subtitle="Awaiting signature"
          href="/portal/documents?filter=pending"
          color="yellow"
        />
        <StatCard
          title="Unread Messages"
          value={data.messages.unread}
          subtitle="New messages"
          href="/portal/messages?filter=unread"
          color="green"
        />
        <StatCard
          title="Balance Due"
          value={`$${data.billing.outstandingBalance.toLocaleString()}`}
          subtitle={data.billing.nextPaymentDue ? `Due ${new Date(data.billing.nextPaymentDue.date).toLocaleDateString()}` : ''}
          href="/portal/billing"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Link href="/portal/appointments" className="text-sm text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>
          
          {data.appointments.upcoming.length === 0 ? (
            <p className="text-gray-500 text-sm">No upcoming appointments</p>
          ) : (
            <div className="space-y-3">
              {data.appointments.upcoming.slice(0, 3).map((apt) => (
                <div key={apt.id}

                className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p
                className="font-medium text-gray-900">{apt.type}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(apt.date).toLocaleDateString()} at {apt.time} with {apt.attorney}
                    </p>
                  </div>
                  <Link
                    href={`/portal/appointments/${apt.id}`}

                className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/portal/activity" className="text-sm text-blue-600 hover:text-blue-700">
              View all →
            </Link>
          </div>
          
          {data.recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {data.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id}

                className="flex items-start space-x-3 py-2">
                  <ActivityIcon
                type={activity.type} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            title="Schedule Appointment"
            description="Book a consultation with your attorney"
            href="/portal/appointments/new"
            icon="📅"
          />
          <QuickAction
            title="Upload Document"
            description="Submit documents for your case"
            href="/portal/documents/upload"
            icon="📤"
          />
          <QuickAction
            title="Send Message"
            description="Contact your legal team"
            href="/portal/messages/new"
            icon="✉️"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, href, color }: {
  title: string;
  value: string | number;
  subtitle: string;
  href: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className={`inline-flex p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} mb-4`}>
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
      </div>
    </Link>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    case_update: '📋',
    document_uploaded: '📄',
    message_received: '💬',
    payment_processed: '💳',
    appointment_scheduled: '📅',
    status_changed: '🔄',
  };

  return <span className="text-lg">{icons[type] || '📌'}</span>;
}

function QuickAction({ title, description, href, icon }: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
