'use client';

import React, { useEffect, useRef, useState } from 'react';
import { componentLogger as logger } from '@/lib/safe-logger';
import { Loader } from 'lucide-react';

interface InteractiveMapProps {
  city: string;
  coordinates?: { lat: number; lng: number };
  offices?: Array<{
    name: string;
    address: string;
    lat: number;
    lng: number;
  }>;
}

// City coordinates for North Carolina
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Charlotte: { lat: 35.2271, lng: -80.8431 },
  Raleigh: { lat: 35.7796, lng: -78.6382 },
  Durham: { lat: 35.994, lng: -78.8986 },
  Greensboro: { lat: 36.0726, lng: -79.792 },
  'Winston-Salem': { lat: 36.0999, lng: -80.2442 },
  Fayetteville: { lat: 35.0527, lng: -78.8784 },
  Cary: { lat: 35.7915, lng: -78.7811 },
  Wilmington: { lat: 34.2257, lng: -77.9447 },
  'High Point': { lat: 35.9557, lng: -80.0053 },
  Concord: { lat: 35.4088, lng: -80.5795 },
};

// Vasquez Law Firm office locations
const officeLocations = [
  {
    name: 'Charlotte Office',
    address: '3500 Cameron Blvd, Charlotte, NC 28211',
    lat: 35.1915,
    lng: -80.8229,
    phone: '(704) 555-0123',
  },
  {
    name: 'Raleigh Office',
    address: '1234 Main St, Raleigh, NC 27601',
    lat: 35.7796,
    lng: -78.6382,
    phone: '(919) 555-0123',
  },
  {
    name: 'Durham Office',
    address: '567 Duke St, Durham, NC 27701',
    lat: 35.994,
    lng: -78.8986,
    phone: '(919) 555-0124',
  },
];

export default function InteractiveMap({
  city,
  coordinates,
  offices = officeLocations,
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get coordinates for the city
  const cityCoords = coordinates ||
    cityCoordinates[city] ||
    cityCoordinates['Charlotte'] || { lat: 35.2271, lng: -80.8431 };

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initializeMap();
    };
    script.onerror = () => {
      setError('Failed to load Google Maps');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
          }
};
  }, []);

  const initializeMap = () => {
    if (!mapContainerRef.current || !window.google) return;

    try {
      // Create map
      const map = new google.maps.Map(mapContainerRef.current, {
        center: cityCoords,
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }],
          },
        ],
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true,
      });

      mapRef.current = map;

      // Add marker for current city
      new google.maps.Marker({
        position: cityCoords,
        map: map,
        title: city,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#6B1F2E',
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      // Add office markers
      offices.forEach(office => {
        const marker = new google.maps.Marker({
          position: { lat: office.lat, lng: office.lng },
          map: map,
          title: office.name,
          icon: {
            url:
              'data:image/svg+xml;base64,' +
              btoa(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#6B1F2E" stroke="white" stroke-width="2"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="20" font-weight="bold">V</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${office.name}</h3>
              <p class="text-gray-600 mb-2">${office.address}</p>
              <a href="https://maps.google.com/?q=${encodeURIComponent(office.address)}" 
                 target="_blank" 
                 class="text-blue-600 hover:underline">
                Get Directions
              </a>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // Add search box
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Search for a location...';
      input.className = 'map-search-box';
      input.style.cssText = `
        box-sizing: border-box;
        border: 1px solid transparent;
        width: 300px;
        height: 40px;
        padding: 0 12px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        outline: none;
        text-overflow: ellipsis;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
      `;

      if (map.controls[google.maps.ControlPosition.TOP_CENTER]) {
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      }

      const searchBox = new google.maps.places.SearchBox(input);

      // Bias search results to current bounds
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        // Get first place and center map
        const place = places[0];
        if (place && place.geometry?.location) {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        }
      });

      setIsLoading(false);
    } catch (err) {
      logger.error('Map initialization error:', err);
      setError('Failed to initialize map');
      setIsLoading(false);
        }
};

  if (error) {
    // Fallback to static map image
    return (
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${cityCoords.lat},${cityCoords.lng}&zoom=12&size=600x400&markers=color:red%7C${cityCoords.lat},${cityCoords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}`}

                alt={`Map of ${city}`} className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <p className="text-white bg-black/50 px-4 py-2 rounded">Interactive map unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-[#6B1F2E] mx-auto mb-2" />
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef}

                className="w-full h-full" />
    </div>
  );
}
