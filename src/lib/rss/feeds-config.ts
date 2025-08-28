// RSS Feed Configuration for News Monitoring
// Last updated: 2025-01-25
// Tested and verified working feeds only

export interface RSSFeed {
  name: string;
  url: string;
  category: string;
  priority: number;
  enabled: boolean;
  timeout?: number; // Custom timeout in ms
}

export const RSS_FEEDS: RSSFeed[] = [
  // ============================================
  // GOVERNMENT FEEDS - Most reliable
  // ============================================
  {
    name: 'Federal Register - DHS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=homeland-security-department',
    category: 'immigration',
    priority: 1,
    enabled: true,
  },
  {
    name: 'Federal Register - USCIS',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=citizenship-and-immigration-services',
    category: 'immigration',
    priority: 1,
    enabled: true,
  },
  {
    name: 'Federal Register - DOJ',
    url: 'https://www.federalregister.gov/api/v1/documents.rss?conditions[agencies][]=justice-department&conditions[term]=immigration',
    category: 'immigration',
    priority: 1,
    enabled: true,
  },

  // ============================================
  // IMMIGRATION NEWS SOURCES
  // ============================================
  {
    name: 'Immigration Impact - News',
    url: 'https://immigrationimpact.com/feed/',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },
  {
    name: 'American Immigration Council',
    url: 'https://www.americanimmigrationcouncil.org/rss.xml',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },
  {
    name: 'National Immigration Forum',
    url: 'https://immigrationforum.org/feed/',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },
  {
    name: 'Immigration Legal Resource Center',
    url: 'https://www.ilrc.org/rss.xml',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // LEGAL NEWS SOURCES
  // ============================================
  {
    name: 'Law360 Immigration',
    url: 'https://www.law360.com/immigration/rss',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // GOVERNMENT AGENCY NEWS
  // ============================================
  {
    name: 'DOJ Immigration',
    url: 'https://www.justice.gov/news/rss?topics=257551',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },
  {
    name: 'ICE News',
    url: 'https://www.ice.gov/rss/news/all.xml',
    category: 'immigration',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // CONGRESSIONAL SOURCES
  // ============================================
  {
    name: 'Congress.gov - Immigration Bills',
    url: 'https://www.congress.gov/rss/most-viewed-bills.xml',
    category: 'congress',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // NORTH CAROLINA STATE NEWS
  // ============================================
  {
    name: 'NC Governor',
    url: 'https://governor.nc.gov/news/feed',
    category: 'state-nc',
    priority: 2,
    enabled: true,
  },
  {
    name: 'NC Legislature',
    url: 'https://www.ncleg.gov/News/RSS',
    category: 'state-nc',
    priority: 2,
    enabled: true,
  },
  {
    name: 'NC Policy Watch - Main',
    url: 'https://ncpolicywatch.com/feed/',
    category: 'state-nc',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // FLORIDA STATE NEWS
  // ============================================
  {
    name: 'Florida Bar - RSS',
    url: 'https://www.floridabar.org/rss/',
    category: 'state-fl',
    priority: 2,
    enabled: true,
  },

  // ============================================
  // LOCAL NEWS - May have limited immigration content
  // ============================================
  {
    name: 'Orlando Sentinel',
    url: 'https://www.orlandosentinel.com/news/immigration/rss',
    category: 'local-fl',
    priority: 2,
    enabled: true,
    timeout: 8000, // Slower feed, needs more time
  },
];

// Feeds that are currently failing but may be restored
export const DISABLED_FEEDS: RSSFeed[] = [
  // 403 Forbidden - Need authentication
  {
    name: 'Migration Policy Institute',
    url: 'https://www.migrationpolicy.org/rss.xml',
    category: 'immigration',
    priority: 2,
    enabled: false,
  },

  // 404 Not Found - URLs no longer exist
  {
    name: 'JD Supra Immigration',
    url: 'https://www.jdsupra.com/rss/immigration.xml',
    category: 'immigration',
    priority: 2,
    enabled: false,
  },
  {
    name: 'CBP Border News',
    url: 'https://www.cbp.gov/newsroom/national-media-release/rss.xml',
    category: 'immigration',
    priority: 2,
    enabled: false,
  },
  {
    name: 'House Judiciary',
    url: 'https://judiciary.house.gov/news/rss.xml',
    category: 'congress',
    priority: 2,
    enabled: false,
  },
  {
    name: 'Senate Judiciary',
    url: 'https://www.judiciary.senate.gov/rss/newsroom',
    category: 'senate',
    priority: 2,
    enabled: false,
  },
  {
    name: 'NC State Bar',
    url: 'https://www.ncbar.gov/news/feed/',
    category: 'state-nc',
    priority: 1,
    enabled: false,
  },

  // Timeout issues - May work with longer timeout
  {
    name: 'Charlotte Observer',
    url: 'https://www.charlotteobserver.com/news/local/immigration/rss',
    category: 'local-nc',
    priority: 2,
    enabled: false,
  },
  {
    name: 'News & Observer',
    url: 'https://www.newsobserver.com/news/local/immigration/rss',
    category: 'local-nc',
    priority: 2,
    enabled: false,
  },
  {
    name: 'Miami Herald',
    url: 'https://www.miamiherald.com/news/local/immigration/rss',
    category: 'local-fl',
    priority: 2,
    enabled: false,
  },
];

// Helper function to get enabled feeds
export function getEnabledFeeds(category?: string): RSSFeed[] {
  const enabledFeeds = RSS_FEEDS.filter(feed => feed.enabled);
  if (category) {
    return enabledFeeds.filter(feed => feed.category === category);
  }
  return enabledFeeds;
}

// Helper function to get feeds by priority
export function getFeedsByPriority(priority: number): RSSFeed[] {
  return getEnabledFeeds().filter(feed => feed.priority === priority);
}

// Categories available
export const FEED_CATEGORIES = [
  'immigration',
  'congress',
  'senate',
  'state-nc',
  'state-fl',
  'local-nc',
  'local-fl',
] as const;

export type FeedCategory = (typeof FEED_CATEGORIES)[number];
