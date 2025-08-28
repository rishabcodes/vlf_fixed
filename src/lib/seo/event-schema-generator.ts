// Event schema generator for free consultations and legal events
import { Event, WithContext } from 'schema-dts';

export interface ConsultationEventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  isVirtual?: boolean;
  language?: string[];
  practiceArea?: string;
  attorney?: {
    name: string;
    title: string;
  };
}

// Generate Event schema for free consultations
export function generateConsultationEventSchema(data: ConsultationEventData): WithContext<Event> {
  const schema: WithContext<Event> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: data.isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: data.isVirtual
      ? {
          '@type': 'VirtualLocation',
          url: 'https://www.vasquezlawnc.com/virtual-consultation',
        }
      : {
          '@type': 'Place',
          name: data.location.name,
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.location.address.street,
            addressLocality: data.location.address.city,
            addressRegion: data.location.address.state,
            postalCode: data.location.address.zip,
            addressCountry: 'US',
          },
        },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://www.vasquezlawnc.com/contact',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://www.vasquezlawnc.com',
      telephone: '+1-844-967-3536',
      email: 'info@vasquezlawnc.com',
    },
    performer: data.attorney
      ? {
          '@type': 'Person',
          name: data.attorney.name,
          jobTitle: data.attorney.title,
          worksFor: {
            '@type': 'LegalService',
            name: 'Vasquez Law Firm, PLLC',
          },
        }
      : undefined,
    inLanguage: data.language || ['en-US', 'es-ES'],
    isAccessibleForFree: true,
    maximumAttendeeCapacity: data.isVirtual ? 100 : 20,
    image: [
      'https://www.vasquezlawnc.com/images/consultation-event-1x1.jpg',
      'https://www.vasquezlawnc.com/images/consultation-event-4x3.jpg',
      'https://www.vasquezlawnc.com/images/consultation-event-16x9.jpg',
    ],
  };

  return schema;
}

// Generate recurring consultation events
export function generateRecurringConsultationEvents(
  baseEvent: ConsultationEventData,
  recurrence: {
    frequency: 'daily' | 'weekly' | 'monthly';
    count: number;
    daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
  }
): WithContext<Event>[] {
  const events: WithContext<Event>[] = [];
  const startDate = new Date(baseEvent.startDate);

  for (let i = 0; i < recurrence.count; i++) {
    const eventDate = new Date(startDate);

    switch (recurrence.frequency) {
      case 'daily':
        eventDate.setDate(startDate.getDate() + i);
        break;
      case 'weekly':
        eventDate.setDate(startDate.getDate() + i * 7);
        break;
      case 'monthly':
        eventDate.setMonth(startDate.getMonth() + i);
        break;
    }

    // Skip if not on specified days of week
    if (recurrence.daysOfWeek && !recurrence.daysOfWeek.includes(eventDate.getDay())) {
      continue;
    }

    const endDate = new Date(eventDate);
    endDate.setHours(eventDate.getHours() + 1); // 1 hour consultation

    events.push(
      generateConsultationEventSchema({
        ...baseEvent,
        startDate: eventDate.toISOString(),
        endDate: endDate.toISOString(),
      })
    );
  }

  return events;
}

// Pre-configured event types
export const CONSULTATION_EVENT_TYPES = {
  immigration: {
    name: 'FREE Immigration Law Consultation - Emergency Help Available 24/7',
    description:
      'Get immediate help with deportation defense, green cards, citizenship, work visas, and all immigration matters. Our aggressive attorneys fight ICE and USCIS to protect your American dream. Same-day appointments available. Se habla español.',
    practiceArea: 'Immigration Law',
  },
  personalInjury: {
    name: 'FREE Personal Injury Case Review - Maximum Compensation Guaranteed',
    description:
      'Injured in an accident? Our elite attorneys fight insurance companies to get you MAXIMUM compensation. Car accidents, truck crashes, slip & fall, medical malpractice. No fee unless we win. Get help NOW!',
    practiceArea: 'Personal Injury',
  },
  criminalDefense: {
    name: 'FREE Criminal Defense Consultation - Former Prosecutors Fighting for YOU',
    description:
      'Arrested? Charged? Our aggressive criminal defense team includes former prosecutors who know how to WIN. DWI/DUI, drug charges, assault, theft. Available 24/7 for jail release. Protect your freedom NOW!',
    practiceArea: 'Criminal Defense',
  },
  workersComp: {
    name: 'FREE Workers Compensation Consultation - Get Every Dollar You Deserve',
    description:
      'Hurt at work? Employer denying your claim? We FIGHT for injured workers and get MAXIMUM benefits. Medical bills, lost wages, permanent disability. No upfront costs. Call before you lose your rights!',
    practiceArea: 'Workers Compensation',
  },
  general: {
    name: "FREE Legal Consultation - North Carolina's Most Aggressive Law Firm",
    description:
      "Need legal help? Get a FREE consultation with NC's most aggressive attorneys. Immigration, personal injury, criminal defense, workers comp. 60+ years experience. 30,000+ cases won. Available 24/7!",
    practiceArea: 'All Legal Services',
  },
};

// Generate office-specific consultation events
export function generateOfficeConsultationEvents(
  office: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  },
  eventType: keyof typeof CONSULTATION_EVENT_TYPES = 'general'
): ConsultationEventData[] {
  const baseEvent = CONSULTATION_EVENT_TYPES[eventType];
  const events: ConsultationEventData[] = [];

  // In-person consultations (weekdays)
  for (let i = 0; i < 5; i++) {
    // Monday-Friday
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(9, 0, 0, 0); // 9 AM

    events.push({
      ...baseEvent,
      name: `${baseEvent.name} - ${office.address.city} Office`,
      startDate: date.toISOString(),
      endDate: new Date(date.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour
      location: {
        name: `Vasquez Law Firm - ${office.name}`,
        address: office.address,
      },
      isVirtual: false,
    });
  }

  // Virtual consultations (available 24/7)
  const virtualDate = new Date();
  virtualDate.setHours(0, 0, 0, 0);

  events.push({
    ...baseEvent,
    name: `${baseEvent.name} - Virtual/Phone Consultation`,
    startDate: virtualDate.toISOString(),
    endDate: new Date(virtualDate.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    location: {
      name: 'Virtual Consultation',
      address: office.address, // Use office address as organizer location
    },
    isVirtual: true,
  });

  return events;
}

// Generate emergency consultation event (always available)
export function generateEmergencyConsultationEvent(): WithContext<Event> {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setFullYear(endDate.getFullYear() + 1); // Available for 1 year

  return generateConsultationEventSchema({
    name: '🚨 EMERGENCY Legal Consultation - Available 24/7/365',
    description:
      "URGENT legal emergency? Arrested? Facing deportation? Injured? Our emergency response team is available 24/7/365. Get IMMEDIATE help from NC's most aggressive attorneys. Call NOW: 1-844-YO-PELEO",
    startDate: now.toISOString(),
    endDate: endDate.toISOString(),
    location: {
      name: 'All Vasquez Law Firm Offices & Virtual',
      address: {
        street: '333 Fayetteville Street, Suite 810',
        city: 'Raleigh',
        state: 'NC',
        zip: '27601',
      },
    },
    isVirtual: true,
    language: ['en-US', 'es-ES'],
  });
}

// Generate special event schema
export function generateSpecialEventSchema(eventData: {
  type: 'workshop' | 'seminar' | 'clinic' | 'webinar';
  title: string;
  description: string;
  date: Date;
  duration: number; // in hours
  location?: ConsultationEventData['location'];
  isVirtual?: boolean;
  speakers?: Array<{ name: string; title: string }>;
  registrationUrl?: string;
  maxAttendees?: number;
}): WithContext<Event> {
  const endDate = new Date(eventData.date);
  endDate.setHours(endDate.getHours() + eventData.duration);

  return {
    '@context': 'https://schema.org',
    '@type': eventData.type === 'workshop' ? 'EducationEvent' : 'Event',
    name: eventData.title,
    description: eventData.description,
    startDate: eventData.date.toISOString(),
    endDate: endDate.toISOString(),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: eventData.isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: eventData.isVirtual
      ? {
          '@type': 'VirtualLocation',
          url: eventData.registrationUrl || 'https://www.vasquezlawnc.com/events',
        }
      : eventData.location
        ? {
            '@type': 'Place',
            name: eventData.location.name,
            address: {
              '@type': 'PostalAddress',
              streetAddress: eventData.location.address.street,
              addressLocality: eventData.location.address.city,
              addressRegion: eventData.location.address.state,
              postalCode: eventData.location.address.zip,
              addressCountry: 'US',
            },
          }
        : undefined,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: eventData.registrationUrl || 'https://www.vasquezlawnc.com/contact',
      validFrom: new Date().toISOString(),
    },
    organizer: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      url: 'https://www.vasquezlawnc.com',
    },
    performer: eventData.speakers?.map(speaker => ({
      '@type': 'Person',
      name: speaker.name,
      jobTitle: speaker.title,
    })),
    maximumAttendeeCapacity: eventData.maxAttendees,
    isAccessibleForFree: true,
    inLanguage: ['en-US', 'es-ES'],
  };
}
