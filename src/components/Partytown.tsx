'use client';

import { Partytown } from '@builder.io/partytown/react';
import { partytownConfig } from '@/lib/partytown-config';

export function PartytownScripts() {
  return (
    <Partytown
      // Enable debug mode in development
      debug={process.env.NODE_ENV === 'development'}
      // Forward necessary functions that third-party scripts might need
      forward={partytownConfig.forwardedFunctions}
      // Configuration options
      resolveUrl={(url: URL, location: Location) => {
        // Check if this URL should be proxied
        const shouldProxy = partytownConfig.workerScripts.some(domain => url.href.includes(domain));

        if (shouldProxy) {
          const proxyUrl = new URL(`/api/proxy`, location.origin);
          proxyUrl.searchParams.set('url', url.href);
          return proxyUrl;
        }

        return url;
      }}
      // Additional configuration
      loadScriptsOnMainThread={
        [
          // Scripts that must stay on main thread (if any)
        ]
      }
    />
  );
}
