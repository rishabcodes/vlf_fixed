/**
 * Location utilities for managing static generation of location pages
 * This helps optimize build times by only pre-generating high-priority locations
 */

// High-priority locations for static generation at build time
// These are the most important cities/areas that should be immediately available
export const HIGH_PRIORITY_LOCATIONS = [
  // Major NC cities
  'charlotte',
  'raleigh',
  'greensboro',
  'durham',
  'winston-salem',
  'fayetteville',
  'cary',
  'wilmington',
  'high-point',
  'concord',
  
  // Growing NC areas
  'asheville',
  'gastonia',
  'apex',
  'huntersville',
  'chapel-hill',
  
  // Florida locations (if applicable)
  'orlando',
  'kissimmee',
  'tampa',
  'miami',
  'jacksonville'
];

// Counties that should be statically generated
export const HIGH_PRIORITY_COUNTIES = [
  'mecklenburg',
  'wake',
  'guilford',
  'forsyth',
  'durham',
  'cumberland',
  'buncombe',
  'gaston',
  'union',
  'cabarrus'
];

// Regions for static generation
export const HIGH_PRIORITY_REGIONS = [
  'piedmont',
  'charlotte-metro',
  'triangle',
  'triad',
  'western-nc',
  'coastal'
];

// Neighborhoods (for major cities like Charlotte)
export const HIGH_PRIORITY_NEIGHBORHOODS = [
  'uptown',
  'south-end',
  'dilworth',
  'myers-park',
  'ballantyne',
  'university-city',
  'noda',
  'plaza-midwood'
];

interface StaticParamsOptions {
  includeCounties?: boolean;
  includeRegions?: boolean;
  includeNeighborhoods?: boolean;
  customLocations?: string[];
  limit?: number;
}

/**
 * Get location parameters for static generation
 * This function returns only high-priority locations to optimize build time
 * Other locations will be generated on-demand when first requested
 */
export function getStaticLocationParams(options: StaticParamsOptions = {}): string[] {
  const {
    includeCounties = false,
    includeRegions = false,
    includeNeighborhoods = false,
    customLocations = [],
    limit
  } = options;

  let locations: string[] = [...HIGH_PRIORITY_LOCATIONS];

  // Add additional location types if requested
  if (includeCounties) {
    locations = [...locations, ...HIGH_PRIORITY_COUNTIES];
  }

  if (includeRegions) {
    locations = [...locations, ...HIGH_PRIORITY_REGIONS];
  }

  if (includeNeighborhoods) {
    locations = [...locations, ...HIGH_PRIORITY_NEIGHBORHOODS];
  }

  // Add any custom locations
  if (customLocations.length > 0) {
    locations = [...locations, ...customLocations];
  }

  // Remove duplicates
  locations = [...new Set(locations)];

  // Apply limit if specified
  if (limit && limit > 0) {
    locations = locations.slice(0, limit);
  }

  return locations;
}

/**
 * Check if a location should be statically generated
 * Useful for conditional static generation logic
 */
export function shouldStaticallyGenerate(
  location: string,
  options: StaticParamsOptions = {}
): boolean {
  const staticLocations = getStaticLocationParams(options);
  return staticLocations.includes(location.toLowerCase());
}

/**
 * Format location params for generateStaticParams
 * Returns the format expected by Next.js dynamic routes
 */
export function formatLocationStaticParams(options: StaticParamsOptions = {}) {
  const locations = getStaticLocationParams(options);
  
  return locations.map(location => ({
    location: location
  }));
}

/**
 * Get location params for specific states
 * Useful for state-specific location pages
 */
export function getStateLocationParams(state: string): Array<{ state: string; city: string }> {
  // Map of states to their high-priority cities
  const stateLocations: Record<string, string[]> = {
    nc: [
      'charlotte',
      'raleigh',
      'greensboro',
      'durham',
      'winston-salem',
      'fayetteville',
      'cary',
      'wilmington',
      'high-point',
      'concord',
      'asheville',
      'gastonia',
      'apex',
      'huntersville',
      'chapel-hill'
    ],
    fl: [
      'orlando',
      'kissimmee',
      'tampa',
      'miami',
      'jacksonville'
    ]
  };

  const cities = stateLocations[state.toLowerCase()] || [];
  
  return cities.map(city => ({
    state: state.toLowerCase(),
    city: city
  }));
}

/**
 * Get all high-priority location combinations for complex routes
 * e.g., /locations/nc/charlotte/immigration-lawyer
 */
export function getLocationServiceParams(services: string[]) {
  const params: Array<{ state: string; city: string; service: string }> = [];
  
  // Only generate for NC high-priority cities initially
  const ncCities = getStateLocationParams('nc');
  
  for (const cityParam of ncCities) {
    for (const service of services) {
      params.push({
        ...cityParam,
        service
      });
    }
  }
  
  return params;
}

/**
 * Utility to check if we're in build time
 * Helps with conditional logic for static vs dynamic generation
 */
export function isBuildTime(): boolean {
  return process.env.NODE_ENV === 'production' && !process.env.NEXT_PHASE;
}

/**
 * Get a human-readable location name from a slug
 */
export function getLocationDisplayName(slug: string): string {
  const specialCases: Record<string, string> = {
    'winston-salem': 'Winston-Salem',
    'high-point': 'High Point',
    'chapel-hill': 'Chapel Hill',
    'noda': 'NoDa',
    'south-end': 'South End',
    'myers-park': 'Myers Park',
    'plaza-midwood': 'Plaza Midwood',
    'university-city': 'University City',
    'western-nc': 'Western North Carolina',
    'charlotte-metro': 'Charlotte Metro Area'
  };

  if (specialCases[slug]) {
    return specialCases[slug];
  }

  // Default: capitalize each word
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
