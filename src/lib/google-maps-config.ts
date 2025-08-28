/**
 * Google Maps API configuration helper
 */

import { envConfig, SERVICE_CONFIGS } from '@/lib/env-config';

export function checkGoogleMapsConfig(): boolean {
  return envConfig.checkService(SERVICE_CONFIGS.GOOGLE_MAPS);
}

export function getGoogleMapsApiKey(): string | undefined {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Check if the API key is valid (not empty and not a placeholder)
  if (apiKey && apiKey !== '' && !apiKey.includes('your-google-maps-api-key')) {
    return apiKey;
  }

  return undefined;
}

export function isGoogleMapsConfigured(): boolean {
  return !!getGoogleMapsApiKey();
}
