'use client';

import React, { useEffect, useRef, useState } from 'react';
import { logger } from '@/lib/safe-logger';
import { Loader } from '@googlemaps/js-api-loader';
import { getGoogleMapsApiKey, isGoogleMapsConfigured } from '@/lib/google-maps-config';
import type { GoogleMap, GoogleInfoWindow } from '@/types/google-maps';

interface Office {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
}

interface AllOfficesMapProps {
  offices: Office[];
  height?: string;
  className?: string;
}

export default function AllOfficesMap({
  offices,
  height = '500px',
  className = '',
}: AllOfficesMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<GoogleMap | null>(null);
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
        const latSum = offices.reduce((sum, office) => sum + office.lat, 0);
        const lngSum = offices.reduce((sum, office) => sum + office.lng, 0);
        const centerLat = latSum / offices.length;
        const centerLng = lngSum / offices.length;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom: 6, // Wider zoom to show all offices
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

        const bounds = new google.maps.LatLngBounds();
        const infoWindows: GoogleInfoWindow[] = [];

        // Create markers for each office
        offices.forEach((office, index) => {
          if (!google.maps) return;

          const marker = new google.maps.Marker({
            position: { lat: office.lat, lng: office.lng },
            map: mapInstance,
            title: office.name,
            animation: google.maps.Animation.DROP,
            label: {
              text: (index + 1).toString(),
              color: 'white',
              fontWeight: 'bold',
            },
          });

          bounds.extend(new google.maps.LatLng(office.lat, office.lng));

          // Create info window for each marker
          const infoWindowContent = `
            <div style="padding: 10px; max-width: 280px;">
              <h3 style="margin: 0 0 10px 0; color: #6B1F2E; font-weight: bold; font-size: 16px;">
                ${office.name}
              </h3>
              <p style="margin: 5px 0; font-size: 14px;">
                <strong>Address:</strong><br/>
                ${office.address}
              </p>
              <p style="margin: 5px 0; font-size: 14px;">
                <strong>Phone:</strong><br/>
                <a href="tel:${office.phone.replace(/[^0-9]/g, '')}" style="color: #C9974D; text-decoration: none;">
                  ${office.phone}
                </a>
              </p>
              <p style="margin: 5px 0; font-size: 14px;">
                <strong>Hours:</strong><br/>
                ${office.hours}
              </p>
              <a 
                href="https://maps.google.com/?q=${encodeURIComponent(office.address)}"
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
            </div>
          `;

          if (!google.maps) return;

          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
          });

          infoWindows.push(infoWindow);

          // Open info window on marker click
          marker.addListener('click', () => {
            // Close all other info windows
            infoWindows.forEach(iw => iw.close());
            // Open this info window
            infoWindow.open(mapInstance, marker);
          });
        });

        // Fit map to show all markers
        mapInstance.fitBounds(bounds);

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
      // No cleanup needed - React handles ref cleanup
    };
  }, [offices]);

  // Fallback for when JavaScript is disabled or map fails to load
  const fallbackContent = (
    <div className="bg-gray-100 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Office Locations</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {offices.map((office, index) => (
          <div key={index}

                className="border border-gray-200 rounded-lg p-4">
            <h4
                className="font-semibold text-gray-900 mb-2">{office.name}</h4>
            <p className="text-sm text-gray-700">{office.address}</p>
            <p className="text-sm text-gray-700">
              Phone:{' '}
              <a
                href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}

                className="text-burgundy-700 hover:text-burgundy-900"
              >
                {office.phone}
              </a>
            </p>
            <p className="text-sm text-gray-700">Hours: {office.hours}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-burgundy-700 hover:text-burgundy-900"
            >
              View on Google Maps →
            </a>
          </div>
        ))}
      </div>
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
                aria-label="Map showing all Vasquez Law Firm office locations"
      />

      {/* NoScript fallback */}
      <noscript>{fallbackContent}</noscript>
    </div>
  );
}
