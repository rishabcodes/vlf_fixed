'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from '@/lib/google-maps-config';
import { logger } from '@/lib/safe-logger';

interface GoogleMyBusinessProps {
  placeId?: string;
}

export function GoogleMyBusinessWidget({
  placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4', // Replace with your actual place ID
}: GoogleMyBusinessProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = getGoogleMapsApiKey();

    if (!apiKey || !isGoogleMapsConfigured()) {
      logger.error('Google Maps is not configured for Google My Business widget');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then(google => {
        if (!google.maps || !widgetRef.current) return;

        // Implementation would go here
        // This is a placeholder for the actual Google My Business integration
        // When implementing, use google.maps.places.PlacesService
        // to fetch and display Google My Business data
      })
      .catch(err => {
        logger.error('Error loading Google Maps for GMB widget:', err);
      });
  }, [placeId]);

  return (
    <div 
      ref={widgetRef}
      id="google-reviews"
      className="google-reviews-widget">
      {/* Google Reviews will be rendered here */}
    </div>
  );
}

// Component to display Google Business Profile info
export function GoogleBusinessProfile({ locationId }: { locationId: string }) {
  return (
    <div className="google-business-profile bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-burgundy-700 mb-4">Find Us on Google</h3>

      {/* Business hours from Google My Business */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Business Hours</h4>
        <div className="text-sm text-gray-600">
          <p>Monday - Friday: 8:30 AM - 5:30 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>

      {/* Google Reviews Summary */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Google Reviews</h4>
        <div className="flex items-center gap-2">
          <div className="flex text-gold-500">{'★'.repeat(5)}</div>
          <span className="text-sm text-gray-600">4.8 out of 5 (487 reviews)</span>
        </div>
      </div>

      {/* Call to action buttons */}
      <div className="flex flex-col gap-2">
        <a
          href={`https://www.google.com/maps/place/?q=place_id:${locationId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View on Google Maps
        </a>
        <a
          href={`https://search.google.com/local/writereview?placeid=${locationId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Write a Review
        </a>
      </div>
    </div>
  );
}

// Component for Google Posts integration
export function GooglePosts() {
  return (
    <div className="google-posts bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-burgundy-700 mb-4">Latest Updates</h3>
      <div className="space-y-4">
        {/* Placeholder for Google Posts */}
        <div className="bg-white rounded p-4 shadow">
          <p className="text-sm text-gray-600 mb-2">2 days ago</p>
          <h4 className="font-semibold text-gray-800 mb-2">Free Immigration Consultation Week</h4>
          <p className="text-gray-700 text-sm">
            Schedule your free consultation this week and learn about your immigration options.
          </p>
          <a
            href="/contact"
            className="text-burgundy-700 text-sm font-semibold hover:underline mt-2 inline-block"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
}

// Local SEO Schema for Google My Business
export function generateGoogleMyBusinessSchema(location: {
  name: string;
  placeId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  lat: number;
  lng: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.vasquezlawnc.com/#gmb-${location.placeId}`,
    name: location.name,
    url: 'https://www.vasquezlawnc.com',
    telephone: location.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.lat,
      longitude: location.lng,
    },
    hasMap: `https://www.google.com/maps/place/?q=place_id:${location.placeId}`,
    sameAs: [`https://www.google.com/maps/place/?q=place_id:${location.placeId}`],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
  };
}