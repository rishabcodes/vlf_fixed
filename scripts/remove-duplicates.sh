#!/bin/bash

# Duplicate Pages Removal Script
# Review each removal before executing!

echo "🧹 Vasquez Law Firm - Duplicate Page Cleanup Script"
echo "=================================================="
echo ""
echo "⚠️  WARNING: This script will remove duplicate pages."
echo "Please review each removal carefully before proceeding."
echo ""
read -p "Have you backed up your project? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Please backup your project first!"
    exit 1
fi

echo ""
echo "📁 Removing top-level Spanish duplicates..."
# These are duplicated in /es/areas-de-practica/
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/compensacion-laboral"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/defensa-criminal"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/derecho-familia"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/inmigracion"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/lesiones-personales"
echo "✅ Removed Spanish practice area duplicates from root"

echo ""
echo "📁 Removing duplicate appointment pages..."
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/appointments"
echo "✅ Consolidated to single appointment page"

echo ""
echo "📁 Removing duplicate category pages..."
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/criminal-defense"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/immigration"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/family-law"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/personal-injury"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/workers-compensation"
echo "✅ Removed duplicate English category pages from Spanish section"

echo ""
echo "📁 Cleaning up payment page duplicates..."
# Keep only one payment page structure
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/make-payment"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/hacer-pago"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/make-payment"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/es/payment"
echo "✅ Consolidated payment pages"

echo ""
echo "📁 Removing test and demo pages..."
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test-deployment"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test-ghl"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test-lang-switch"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test-language-switcher"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/test-ticker"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/ticker-test"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/debug-ticker"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/modern-demo"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/cutting-edge-light"
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/animations-demo"
echo "✅ Removed all test and demo pages"

echo ""
echo "📁 Removing Spanish duplicates in English locations..."
# Remove Spanish location pages that should only exist under /es/
find "/Users/williamvasquez/Documents/VLF Website/src/app/locations" -name "abogado-*" -type d -exec rm -rf {} +
find "/Users/williamvasquez/Documents/VLF Website/src/app/locations" -name "*-español" -type d -exec rm -rf {} +
echo "✅ Removed Spanish pages from English locations"

echo ""
echo "📁 Consolidating near-me pages..."
# Keep only the properly structured ones
rm -rf "/Users/williamvasquez/Documents/VLF Website/src/app/cerca-de-mi"
echo "✅ Consolidated near-me pages"

echo ""
echo "📁 Removing indexet_blog artifacts..."
find "/Users/williamvasquez/Documents/VLF Website/src/app" -name "indexet_blog" -type d -exec rm -rf {} +
echo "✅ Removed indexet_blog artifacts"

echo ""
echo "🎯 Creating redirects configuration..."
cat > "/Users/williamvasquez/Documents/VLF Website/src/app/redirects.ts" << 'EOF'
// Redirect configuration for removed duplicate pages
export const redirects = [
  // Spanish practice areas
  { source: '/compensacion-laboral', destination: '/es/areas-de-practica/compensacion-laboral', permanent: true },
  { source: '/defensa-criminal', destination: '/es/areas-de-practica/defensa-criminal', permanent: true },
  { source: '/derecho-familia', destination: '/es/areas-de-practica/derecho-familia', permanent: true },
  { source: '/inmigracion', destination: '/es/areas-de-practica/inmigracion', permanent: true },
  { source: '/lesiones-personales', destination: '/es/areas-de-practica/lesiones-personales', permanent: true },
  
  // Payment pages
  { source: '/make-payment', destination: '/payment', permanent: true },
  { source: '/hacer-pago', destination: '/es/pago', permanent: true },
  { source: '/es/make-payment', destination: '/es/pago', permanent: true },
  { source: '/es/payment', destination: '/es/pago', permanent: true },
  
  // Appointment pages
  { source: '/es/appointments/:path*', destination: '/es/appointment/:path*', permanent: true },
  
  // Category pages
  { source: '/es/criminal-defense/:path*', destination: '/es/areas-de-practica/defensa-criminal/:path*', permanent: true },
  { source: '/es/immigration/:path*', destination: '/es/areas-de-practica/inmigracion/:path*', permanent: true },
  { source: '/es/family-law/:path*', destination: '/es/areas-de-practica/derecho-familia/:path*', permanent: true },
  { source: '/es/personal-injury/:path*', destination: '/es/areas-de-practica/lesiones-personales/:path*', permanent: true },
  { source: '/es/workers-compensation/:path*', destination: '/es/areas-de-practica/compensacion-laboral/:path*', permanent: true },
];
EOF
echo "✅ Created redirects configuration"

echo ""
echo "✨ Cleanup Summary:"
echo "  - Removed Spanish practice area duplicates from root"
echo "  - Consolidated appointment pages"
echo "  - Removed English category pages from Spanish section"
echo "  - Consolidated payment pages to single structure"
echo "  - Removed all test and demo pages"
echo "  - Cleaned up location page duplicates"
echo "  - Created redirect configuration"
echo ""
echo "🚀 Next Steps:"
echo "  1. Update next.config.js to include the redirects"
echo "  2. Test all navigation links"
echo "  3. Run 'npm run build' to verify no broken imports"
echo "  4. Update sitemap generation"
echo ""
echo "✅ Duplicate removal complete!"