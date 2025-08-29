const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: process.env.AWS_AMPLIFY ? 'standalone' : undefined,
  
  experimental: {
    serverMinification: false,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 300,
  
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  
  webpack: (config, { isServer, webpack }) => {
    // Module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'axios': path.resolve(__dirname, 'src/lib/axios.ts'),
    };
    
    // Provide axios globally
    config.plugins.push(
      new webpack.ProvidePlugin({
        axios: [path.resolve(__dirname, 'src/lib/axios.ts'), 'default'],
      })
    );
    
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, net: false, tls: false,
        crypto: false, stream: false, os: false,
      };
    }
    
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(pino|winston|thread-stream)$/,
      })
    );
    
    return config;
  },
};

module.exports = nextConfig;
