// ISR (Incremental Static Regeneration) Configuration
// This allows pages to generate on-demand after deployment

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core settings
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // Enable ISR for all pages
  experimental: {
    isrMemoryCacheSize: 0, // Disable in-memory cache
  },
  
  // Image optimization
  images: {
    unoptimized: true,
  },
  
  // Generate only critical pages at build time
  generateStaticParams: async () => {
    // Only pre-build these critical pages
    return [
      { slug: 'home' },
      { slug: 'contact' },
      { slug: 'about' },
      { slug: 'immigration' },
      { slug: 'personal-injury' },
    ];
  },
  
  // All other pages generate on first request
  dynamicParams: true,
  
  output: 'standalone',
};

module.exports = nextConfig;
