'use client';

import { useEffect, useState, useCallback } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { formatDate } from '@/lib/utils/date';

interface TimelineEvent {
  id: string;
  type:
    | 'case_filed'
    | 'document_uploaded'
    | 'hearing_scheduled'
    | 'status_changed'
    | 'message_sent'
    | 'payment_made'
    | 'other';
  title: string;
  description: string;
  date: string;
  user: {
    name: string;
    role: 'client' | 'attorney' | 'system';
  };
  metadata?: {
    documentName?: string;
    hearingType?: string;
    oldStatus?: string;
    newStatus?: string;
    amount?: number;
  };
}

interface CaseTimelineProps {
  caseId: string;
}

export default function CaseTimeline({ caseId }: CaseTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTimeline = useCallback(async () => {
    try {
      const response = await fetch(`/api/portal/cases/${caseId}/timeline`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      }
    } catch (error) {
      logger.error('Failed to fetch timeline:', error);
    } finally {
      setIsLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'case_filed':
        return '📋';
      case 'document_uploaded':
        return '📄';
      case 'hearing_scheduled':
        return '⚖️';
      case 'status_changed':
        return '🔄';
      case 'message_sent':
        return '💬';
      case 'payment_made':
        return '💳';
      default:
        return '📌';
        }
};

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'case_filed':
        return 'bg-blue-100 text-blue-800';
      case 'document_uploaded':
        return 'bg-green-100 text-green-800';
      case 'hearing_scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'status_changed':
        return 'bg-purple-100 text-purple-800';
      case 'message_sent':
        return 'bg-gray-100 text-gray-800';
      case 'payment_made':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
        }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getEventColor(event.type)}`}
                  >
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>

                    {/* Event-specific metadata */}
                    {event.metadata && (
                      <div className="mt-2 text-sm text-gray-600">
                        {event.metadata.documentName && (
                          <p>Document: {event.metadata.documentName}</p>
                        )}
                        {event.metadata.hearingType && (
                          <p>Hearing Type: {event.metadata.hearingType}</p>
                        )}
                        {event.metadata.oldStatus && event.metadata.newStatus && (
                          <p>
                            Status: {event.metadata.oldStatus} → {event.metadata.newStatus}
                          </p>
                        )}
                        {event.metadata.amount && (
                          <p>Amount: ${event.metadata.amount.toLocaleString()}</p>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      by {event.user.name} ({event.user.role})
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.date}>{formatDate(event.date)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
