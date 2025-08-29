const path = require('path');

module.exports = {
  reactStrictMode: false,
  poweredByHeader: false,
  
  // Remove the problematic option
  output: 'standalone',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    unoptimized: true,
  },
  
  webpack: (config, { webpack }) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
    };
    
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
};
