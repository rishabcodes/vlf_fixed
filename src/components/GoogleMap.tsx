'use client';

import React, { useEffect, useRef, useState } from 'react';
import { logger } from '@/lib/safe-logger';
import { Loader } from '@googlemaps/js-api-loader';
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from '@/lib/google-maps-config';
import type { GoogleMap } from '@/types/google-maps';

interface GoogleMapProps {
  address: string;
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  officeName?: string;
  phone?: string;
  hours?: string;
  showDirectionsButton?: boolean;
  className?: string;
}

export default function GoogleMap({
  address,
  lat,
  lng,
  zoom = 16,
  height = '400px',
  officeName,
  phone,
  hours,
  showDirectionsButton = true,
  className = '',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // Map state for potential future use (e.g., map controls)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_map, setMap] = useState<GoogleMap | null>(null);
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

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        // Create marker
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          title: officeName || 'Vasquez Law Firm',
          animation: google.maps.Animation.DROP,
        });

        // Create info window
        const infoWindowContent = `
          <div style="padding: 10px; max-width: 280px;">
            <h3 style="margin: 0 0 10px 0; color: #6B1F2E; font-weight: bold; font-size: 16px;">
              ${officeName || 'Vasquez Law Firm'}
            </h3>
            <p style="margin: 5px 0; font-size: 14px;">
              <strong>Address:</strong><br/>
              ${address}
            </p>
            ${
              phone
                ? `
              <p style="margin: 5px 0; font-size: 14px;">
                <strong>Phone:</strong><br/>
                <a href="tel:${phone.replace(/[^0-9]/g, '')}" style="color: #C9974D; text-decoration: none;">
                  ${phone}
                </a>
              </p>
            `
                : ''
            }
            ${
              hours
                ? `
              <p style="margin: 5px 0; font-size: 14px;">
                <strong>Hours:</strong><br/>
                ${hours}
              </p>
            `
                : ''
            }
            ${
              showDirectionsButton
                ? `
              <a 
                href="https://maps.google.com/?q=${encodeURIComponent(address)}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  margin-top: 10px;
                  padding: 8px 16px;
                  background-color: #C9974D;
                  color: white;
                  text-decoration: none;
                  border-radius: 4px;
                  font-size: 14px;
                  font-weight: bold;
                "
              >
                Get Directions
              </a>
            `
                : ''
            }
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
        });

        // Open info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });

        // Auto-open info window
        infoWindow.open(mapInstance, marker);

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
      // React hook cleanup - map instance will be garbage collected
    };
  }, [lat, lng, zoom, address, officeName, phone, hours, showDirectionsButton]); // Removed 'map' from dependencies to prevent infinite loop

  // Fallback for when JavaScript is disabled or map fails to load
  const fallbackContent = (
    <div className="bg-gray-100 rounded-lg p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {officeName || 'Vasquez Law Firm'}
      </h3>
      <p className="text-gray-700 mb-2">{address}</p>
      {phone && (
        <p className="text-gray-700 mb-2">
          Phone:{' '}
          <a
            href={`tel:${phone.replace(/[^0-9]/g, '')}`}

                className="text-burgundy-700 hover:text-burgundy-900"
          >
            {phone}
          </a>
        </p>
      )}
      {hours && <p className="text-gray-700 mb-4">Hours: {hours}</p>}
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-burgundy-700 text-white px-6 py-3 rounded-md hover:bg-burgundy-800 transition-colors"
      >
        View on Google Maps
      </a>
    </div>
  );

  if (error) {
    return fallbackContent;
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}

      <div
        ref={mapRef}

                style={{ height, width: '100%'}} className="rounded-lg shadow-lg"
        role="region"
                aria-label={`Map showing location of ${officeName || 'Vasquez Law Firm'} at ${address}`}
      />

      {/* NoScript fallback */}
      <noscript>{fallbackContent}</noscript>
    </div>
  );
}
