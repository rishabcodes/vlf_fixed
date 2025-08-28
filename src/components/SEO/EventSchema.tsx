import React from 'react';
import Script from 'next/script';
import type { WithContext, Event } from 'schema-dts';
import {
  generateConsultationEventSchema,
  generateEmergencyConsultationEvent,
  generateOfficeConsultationEvents,
  CONSULTATION_EVENT_TYPES,
  type ConsultationEventData,
} from '@/lib/seo/event-schema-generator';

interface EventSchemaProps {
  eventType?: keyof typeof CONSULTATION_EVENT_TYPES;
  office?: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  customEvent?: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: {
      name: string;
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    };
    isVirtual?: boolean;
  };
  includeEmergency?: boolean;
  pageType?: string;
}

export function EventSchema({
  eventType = 'general',
  office,
  customEvent,
  includeEmergency = true,
  pageType = 'default',
}: EventSchemaProps) {
  // Generate schemas based on props
  const schemas: WithContext<Event>[] = [];

  // Add emergency consultation (always available)
  if (includeEmergency) {
    schemas.push(generateEmergencyConsultationEvent());
  }

  // Add office-specific consultations
  if (office) {
    const officeEvents = generateOfficeConsultationEvents(office, eventType);
    officeEvents.forEach(event => {
      schemas.push(generateConsultationEventSchema(event));
    });
  } else if (!customEvent) {
    // Default virtual consultation
    const now = new Date();
    const endDate = new Date(now);
    endDate.setHours(now.getHours() + 1);

    const defaultEvent = {
      ...CONSULTATION_EVENT_TYPES[eventType],
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      location: {
        name: 'Virtual Consultation - Available Nationwide',
        address: {
          street: '333 Fayetteville Street, Suite 810',
          city: 'Raleigh',
          state: 'NC',
          zip: '27601',
        },
      },
      isVirtual: true,
    };

    schemas.push(generateConsultationEventSchema(defaultEvent));
  }

  // Add custom event if provided
  if (customEvent) {
    const transformedEvent: ConsultationEventData = {
      name: customEvent.name,
      description: customEvent.description,
      startDate: customEvent.startDate,
      endDate: customEvent.endDate,
      location: {
        name: customEvent.location.name,
        address: {
          street: customEvent.location.address || '',
          city: customEvent.location.city || '',
          state: customEvent.location.state || '',
          zip: customEvent.location.zipCode || '',
        },
      },
      isVirtual: customEvent.isVirtual,
    };
    schemas.push(generateConsultationEventSchema(transformedEvent));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`event-schema-${pageType}-${index}` id={`event-schema-${pageType}-${index}` type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}

// Specialized component for practice area pages
export function PracticeAreaEventSchema({
  practiceArea,
}: {
  practiceArea: 'immigration' | 'personalInjury' | 'criminalDefense' | 'workersComp';
}) {
  const offices = [
    {
      name: 'Charlotte Office',
      address: {
        street: '201 N. Tryon St #1250',
        city: 'Charlotte',
        state: 'NC',
        zip: '28202',
      },
    },
    {
      name: 'Raleigh Office',
      address: {
        street: '333 Fayetteville Street, Suite 810',
        city: 'Raleigh',
        state: 'NC',
        zip: '27601',
      },
    },
  ];

  return (
    <>
      {offices.map((office, index) => (
        <EventSchema
          key={`practice-event-${index}`}
          eventType={practiceArea}
          office={office}
          includeEmergency={index === 0} // Only include emergency once
          pageType={`practice-${practiceArea}`}
        />
      ))}
    </>
  );
}

// Component for location pages
export function LocationEventSchema({
  city,
  address,
}: {
  city: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}) {
  const eventTypes: Array<keyof typeof CONSULTATION_EVENT_TYPES> = [
    'immigration',
    'personalInjury',
    'criminalDefense',
    'workersComp',
  ];

  return (
    <>
      {eventTypes.map((type, index) => (
        <EventSchema
          key={`location-event-${index}`}
          eventType={type}
          office={{
            name: `${city} Area Consultations`,
            address,
          }}
          includeEmergency={index === 0}
          pageType={`location-${city.toLowerCase()}`}
        />
      ))}
    </>
  );
}

// Component for displaying event information
export function EventDisplay({
  showUpcoming = true,
  limit = 3,
}: {
  showUpcoming?: boolean;
  limit?: number;
}) {
  // This would typically fetch from a database
  // For now, we'll generate some upcoming events
  const upcomingEvents: Array<{
    date: Date;
    type: keyof typeof CONSULTATION_EVENT_TYPES;
    isVirtual: boolean;
  }> = [];

  for (let i = 0; i < limit; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(14, 0, 0, 0); // 2 PM

    upcomingEvents.push({
      date: date,
      type: Object.keys(CONSULTATION_EVENT_TYPES)[i % 4] as keyof typeof CONSULTATION_EVENT_TYPES,
      isVirtual: i % 2 === 0,
    });
  }

  if (!showUpcoming || upcomingEvents.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🗓️ Upcoming FREE Consultations</h3>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => {
          const eventInfo = CONSULTATION_EVENT_TYPES[event.type];
          return (
            <div key={index}

                className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h4
                className="font-semibold text-gray-900">
                    {eventInfo.practiceArea} Consultation
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.isVirtual ? '💻 Virtual Meeting' : '📍 In-Person'}
                  </p>
                </div>
                <a
                  href="/contact"
                  className="flex-shrink-0 bg-primary text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-300 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <a href="/contact" className="text-primary font-semibold hover:text-primary-300">
          View All Available Times →
        </a>
      </div>
    </div>
  );
}
}
}
