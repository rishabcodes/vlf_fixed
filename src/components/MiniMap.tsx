'use client';

import React, { useEffect, useRef, useState } from 'react';
import { officeLocations } from '@/data/locations';
import { logger } from '@/lib/safe-logger';
import { Loader } from '@googlemaps/js-api-loader';
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from '@/lib/google-maps-config';
import type { GoogleMap } from '@/types/google-maps';

interface MiniMapProps {
  height?: string;
  className?: string;
}

export default function MiniMap({ height = '200px', className = '' }: MiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = getGoogleMapsApiKey();

    if (!apiKey || !isGoogleMapsConfigured()) {
      setError('Google Maps is not configured. Please set up your Google Maps API key.');
      setLoading(false);
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
        if (!mapRef.current || !google.maps) return;

        // Calculate center based on all office locations
        const latSum = officeLocations.reduce((sum, office) => sum + office.lat, 0);
        const lngSum = officeLocations.reduce((sum, office) => sum + office.lng, 0);
        const centerLat = latSum / officeLocations.length;
        const centerLng = lngSum / officeLocations.length;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom: 6,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        const bounds = new google.maps.LatLngBounds();

        // Create simple markers for each office
        officeLocations.forEach(office => {
          if (!google.maps) return;

          const marker = new google.maps.Marker({
            position: { lat: office.lat, lng: office.lng },
            map: mapInstance,
            title: office.name,
            icon: {
              url:
                'data:image/svg+xml;charset=UTF-8,' +
                encodeURIComponent(`
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" fill="#C9974D" stroke="#6B1F2E" strokeWidth="2"/>
                  <circle cx="10" cy="10" r="3" fill="#6B1F2E"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
            },
          });

          bounds.extend(new google.maps.LatLng(office.lat, office.lng));

          // Add click handler to open location page
          marker.addListener('click', () => {
            window.open(`/contact/${office.slug}`, '_blank');
          });
        });

        // Fit map to show all markers with some padding
        mapInstance.fitBounds(bounds, 20);

        setMap(mapInstance);
        setLoading(false);
      })
      .catch(err => {
        logger.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        setLoading(false);
      });

    // Cleanup
    return () => {
      // React handles ref cleanup
    };
  }, []);

  // Fallback for when JavaScript is disabled or map fails to load
  const fallbackContent = (
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">Our Locations</h4>
      <div className="text-xs text-gray-600 space-y-1">
        {officeLocations.map(office => (
          <div key={office.id}>
            {office.city}, {office.state}
          </div>
        ))}
      </div>
      <a
        href="/contact"
        className="inline-block mt-2 text-xs text-burgundy-700 hover:text-burgundy-900"
      >
        View All Locations →
      </a>
    </div>
  );

  if (error) {
    return fallbackContent;
  }

  return (
    <div className={`relative ${className}`}
 style={{ minHeight: height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
          <span className="ml-2 text-sm text-gray-700">Loading map...</span>
        </div>
      )}

      <div
        ref={mapRef}

        style={{ height, width: '100%' }}

        className="rounded-lg bg-gray-100"
        role="region"
        aria-label="Mini map showing Vasquez Law Firm office locations"
      />

      {/* NoScript fallback */}
      <noscript>{fallbackContent}</noscript>
    </div>
  );
}
