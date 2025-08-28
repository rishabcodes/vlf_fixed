// Partytown configuration for third-party scripts

export const partytownConfig = {
  // Scripts that should be moved to Web Worker
  workerScripts: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://www.facebook.com',
    'https://connect.facebook.net',
  ],

  // Functions that need to be forwarded from worker to main thread
  forwardedFunctions: [
    // Google Analytics
    'dataLayer.push',
    'gtag',

    // Google Tag Manager
    'google_tag_manager',

    // Facebook Pixel
    'fbq',

    // Vercel Analytics
    'va',
    '_vercel_insights',

    // Custom event tracking
    'trackEvent',
    'trackPageView',
  ],

  // Configuration for specific scripts
  scriptConfigs: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_ID,
      sendPageViews: true,
      cookieFlags: 'SameSite=None; Secure',
    },
    vercelAnalytics: {
      enabled: process.env.NODE_ENV === 'production',
    },
  },

  // Performance thresholds
  performanceThresholds: {
    mainThreadBlockingTime: 50, // ms
    scriptLoadTimeout: 10000, // ms
    maxWorkerScripts: 10,
  },
};
