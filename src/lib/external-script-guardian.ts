import { componentLogger as logger } from '@/lib/safe-logger';

/**
 * External Script Guardian
 * Handles errors from third-party scripts that are not part of our codebase
 */

// List of known external script errors to suppress
const EXTERNAL_ERROR_PATTERNS = [
  'wb_async_messenger', // WhatsApp Business Messenger
  'pageView.js', // Unknown analytics script
  'gtag', // Google Analytics
  'fbq', // Facebook Pixel
  'twq', // Twitter Pixel
  '_linkedin_partner_id', // LinkedIn
  'snaptr', // Snapchat
  'ttq', // TikTok
];

// Resource loading errors to suppress
const RESOURCE_ERROR_PATTERNS = [
  'chrome-extension://', // Browser extensions
  'safari-extension://', // Safari extensions
  'moz-extension://', // Firefox extensions
  'ms-browser-extension://', // Edge extensions
];

export function initializeExternalScriptGuardian() {
  if (typeof window === 'undefined') return;

  // Handle general JavaScript errors
  window.addEventListener('error', (event) => {
    const message = event.message || '';
    const filename = event.filename || '';
    
    // Check if this is an external script error
    const isExternalError = EXTERNAL_ERROR_PATTERNS.some(pattern => 
      message.includes(pattern) || filename.includes(pattern)
    );
    
    if (isExternalError) {
      // Prevent the error from bubbling up
      event.preventDefault();
      
      // Log it as a warning instead
      logger.warn('[External Script Error Suppressed]', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
      
      return;
    }
  });

  // Handle resource loading errors
  window.addEventListener('error', (event) => {
    // Check if it's a resource loading error
    if (event.target && event.target !== window) {
      const element = event.target as HTMLElement;
      const src = element.getAttribute('src') || element.getAttribute('href') || '';
      
      // Check if this is an extension or external resource
      const isExternalResource = RESOURCE_ERROR_PATTERNS.some(pattern => 
        src.includes(pattern)
      );
      
      if (isExternalResource) {
        event.preventDefault();
        logger.warn('[External Resource Error Suppressed]', src);
        return;
      }
    }
  }, true); // Use capture phase

  // Handle unhandled promise rejections from external scripts
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.toString() || '';
    
    const isExternalError = EXTERNAL_ERROR_PATTERNS.some(pattern => 
      reason.includes(pattern)
    );
    
    if (isExternalError) {
      event.preventDefault();
      logger.warn('[External Promise Rejection Suppressed]', event.reason);
    }
  });

  // Clean up any orphaned global objects
  cleanupOrphanedGlobals();
}

function cleanupOrphanedGlobals() {
  if (typeof window === 'undefined') return;
  
  // Clean up WhatsApp Business Messenger if it exists
  if ('wb_async_messenger' in window) {
    try {
      delete (window as any).wb_async_messenger;
      logger.info('[Cleanup] Removed orphaned wb_async_messenger');
    } catch (error) {
      // Some properties might be non-configurable
      logger.warn('[Cleanup] Could not remove wb_async_messenger:', error);
    }
  }
  
  // Clean up other known orphaned objects
  const orphanedGlobals = [
    'fbq', // Facebook Pixel
    'gtag', // Google Analytics
    'twq', // Twitter
    'ttq', // TikTok
    'snaptr', // Snapchat
  ];
  
  orphanedGlobals.forEach(globalName => {
    if (globalName in window && !(window as any)[globalName]?.loaded) {
      try {
        delete (window as any)[globalName];
        logger.info(`[Cleanup] Removed orphaned ${globalName}`);
      } catch (error) {
        // Ignore if can't delete
      }
    }
  });
}

// Utility to check if a script is from our domain
export function isExternalScript(url: string): boolean {
  if (!url) return false;
  
  try {
    const scriptUrl = new URL(url, window.location.origin);
    const currentUrl = new URL(window.location.href);
    
    // Same origin check
    if (scriptUrl.origin === currentUrl.origin) return false;
    
    // Check for common CDNs we trust
    const trustedDomains = [
      'googleapis.com',
      'gstatic.com',
      'cloudflare.com',
      'jsdelivr.net',
      'unpkg.com',
      'cdnjs.com',
    ];
    
    return !trustedDomains.some(domain => scriptUrl.hostname.includes(domain));
  } catch {
    return true; // If we can't parse it, assume it's external
  }
}

// Export for use in other parts of the app
export default initializeExternalScriptGuardian;