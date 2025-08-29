// Fallback mapping for database image IDs to static files
// This allows the app to work without database connection

export const imageFallbackMap: Record<string, string> = {
  // Attorney images
  'cmeublit3000jsfmz573fl78r': '/images/attorneys/william-vasquez.jpg',
  'cmeublswh0015sfmzr1t1zc4k': '/images/william-vasquez-cutout.png',
  
  // Add common attorney images
  'attorney-william': '/images/attorneys/william-vasquez.jpg',
  'attorney-adriana': '/images/attorneys/adriana-ingram.webp',
  'attorney-christopher': '/images/attorneys/christopher-afanador.jpg',
  'attorney-jillian': '/images/attorneys/jillian-baucom.jpg',
  'attorney-judith': '/images/attorneys/judith-parkes.jpg',
  'attorney-kelly': '/images/attorneys/kelly-vega.jpg',
  'attorney-mark': '/images/attorneys/mark-kelsey.jpg',
  'attorney-rebecca': '/images/attorneys/rebecca-sommer.jpg',
  'attorney-roselyn': '/images/attorneys/roselyn-torrellas.jpg',
  
  // Office images
  'office-charlotte': '/images/offices/charlotte-office.jpg',
  'office-orlando': '/images/offices/orlando-office.jpg',
  'office-raleigh': '/images/offices/raleigh-office.jpg',
  'office-smithfield': '/images/offices/smithfield-office.jpg',
  
  // Logo and branding
  'logo-main': '/images/logo.png',
  'logo-trans': '/images/LOGO_TRANS.PNG',
  'banner-trans': '/images/BANNER_TRANS.PNG',
  
  // Default fallback
  'default': '/images/logo.png'
};

// Get static image path from database ID
export function getStaticImagePath(id: string): string {
  return imageFallbackMap[id] || imageFallbackMap['default'];
}

// Check if a static image exists for the given ID
export function hasStaticFallback(id: string): boolean {
  return id in imageFallbackMap;
}