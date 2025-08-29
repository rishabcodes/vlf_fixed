#!/usr/bin/env node
import RssParser from 'rss-parser';

// Potential replacement feeds to test
const REPLACEMENT_FEEDS = [
  // Migration Policy Institute alternatives
  {
    name: 'Migration Policy Institute - Main Feed',
    url: 'https://www.migrationpolicy.org/rss/articles.xml',
    category: 'immigration',
    replaces: 'Migration Policy Institute',
  },
  {
    name: 'Migration Policy Institute - News',
    url: 'https://www.migrationpolicy.org/newsroom/feed',
    category: 'immigration',
    replaces: 'Migration Policy Institute',
  },

  // JD Supra alternatives
  {
    name: 'JD Supra - Business Immigration',
    url: 'https://www.jdsupra.com/xml/lawfirms/rss/immigration-law.xml',
    category: 'immigration',
    replaces: 'JD Supra Immigration',
  },
  {
    name: 'JD Supra - Immigration Law',
    url: 'https://www.jdsupra.com/services/xml/rss/topic/immigration-law-263.xml',
    category: 'immigration',
    replaces: 'JD Supra Immigration',
  },

  // CBP alternatives
  {
    name: 'CBP Newsroom - All',
    url: 'https://www.cbp.gov/newsroom/rss',
    category: 'immigration',
    replaces: 'CBP Border News',
  },
  {
    name: 'CBP Media Releases',
    url: 'https://www.cbp.gov/newsroom/media-releases/all/rss.xml',
    category: 'immigration',
    replaces: 'CBP Border News',
  },

  // Congressional alternatives
  {
    name: 'Congress.gov - Immigration Bills',
    url: 'https://www.congress.gov/rss/most-viewed-bills.xml',
    category: 'congress',
    replaces: 'Congressional Research Service',
  },

  // House Judiciary alternatives
  {
    name: 'House GOP - Judiciary',
    url: 'https://republicans-judiciary.house.gov/feed/',
    category: 'congress',
    replaces: 'House Judiciary',
  },

  // Senate Judiciary alternatives
  {
    name: 'Senate Democrats - Judiciary',
    url: 'https://www.judiciary.senate.gov/rss',
    category: 'senate',
    replaces: 'Senate Judiciary',
  },

  // NC State Bar alternatives
  {
    name: 'NC State Bar - Main',
    url: 'https://www.ncbar.gov/feed/',
    category: 'state-nc',
    replaces: 'NC State Bar',
  },
  {
    name: 'NC State Bar News',
    url: 'https://www.ncbar.gov/news/rss/',
    category: 'state-nc',
    replaces: 'NC State Bar',
  },

  // Charlotte Observer alternatives
  {
    name: 'Charlotte Observer - News',
    url: 'https://www.charlotteobserver.com/news/rss',
    category: 'local-nc',
    replaces: 'Charlotte Observer',
  },
  {
    name: 'Charlotte Observer - Local',
    url: 'https://www.charlotteobserver.com/news/local/rss',
    category: 'local-nc',
    replaces: 'Charlotte Observer',
  },

  // News & Observer alternatives
  {
    name: 'News & Observer - News',
    url: 'https://www.newsobserver.com/news/rss',
    category: 'local-nc',
    replaces: 'News & Observer',
  },
  {
    name: 'News & Observer - NC',
    url: 'https://www.newsobserver.com/news/state/north-carolina/rss',
    category: 'local-nc',
    replaces: 'News & Observer',
  },

  // NC Policy Watch alternatives
  {
    name: 'NC Policy Watch - Main',
    url: 'https://ncpolicywatch.com/feed/',
    category: 'state-nc',
    replaces: 'NC Policy Watch',
  },
  {
    name: 'NC Policy Watch - Articles',
    url: 'https://ncpolicywatch.com/category/articles/feed/',
    category: 'state-nc',
    replaces: 'NC Policy Watch',
  },

  // Florida Bar alternatives
  {
    name: 'Florida Bar - News',
    url: 'https://www.floridabar.org/news/feed/',
    category: 'state-fl',
    replaces: 'Florida Bar',
  },
  {
    name: 'Florida Bar - RSS',
    url: 'https://www.floridabar.org/rss/',
    category: 'state-fl',
    replaces: 'Florida Bar',
  },

  // FL Governor alternatives
  {
    name: 'FL Governor - News',
    url: 'https://www.flgov.com/news/feed/',
    category: 'state-fl',
    replaces: 'FL Governor',
  },
  {
    name: 'FL Governor RSS',
    url: 'https://www.flgov.com/rss/',
    category: 'state-fl',
    replaces: 'FL Governor',
  },

  // FL Legislature alternatives
  {
    name: 'FL Senate - Bills',
    url: 'https://www.flsenate.gov/Tracker/RSS/Bills',
    category: 'state-fl',
    replaces: 'FL Legislature',
  },
  {
    name: 'FL House - News',
    url: 'https://www.myfloridahouse.gov/RSS/Bills',
    category: 'state-fl',
    replaces: 'FL Legislature',
  },

  // Miami Herald alternatives
  {
    name: 'Miami Herald - News',
    url: 'https://www.miamiherald.com/news/rss',
    category: 'local-fl',
    replaces: 'Miami Herald',
  },
  {
    name: 'Miami Herald - Local',
    url: 'https://www.miamiherald.com/news/local/rss',
    category: 'local-fl',
    replaces: 'Miami Herald',
  },

  // Tampa Bay Times alternatives
  {
    name: 'Tampa Bay Times - News',
    url: 'https://www.tampabay.com/news/rss',
    category: 'local-fl',
    replaces: 'Tampa Bay Times',
  },
  {
    name: 'Tampa Bay Times - Florida',
    url: 'https://www.tampabay.com/news/florida/rss',
    category: 'local-fl',
    replaces: 'Tampa Bay Times',
  },

  // Additional reliable immigration news sources
  {
    name: 'Boundless Immigration',
    url: 'https://www.boundless.com/blog/feed/',
    category: 'immigration',
    replaces: 'new',
  },
  {
    name: 'Immigrant Legal Resource Center',
    url: 'https://www.ilrc.org/rss-feed',
    category: 'immigration',
    replaces: 'new',
  },
  {
    name: 'AILA - InfoNet',
    url: 'https://www.aila.org/rss',
    category: 'immigration',
    replaces: 'new',
  },
  {
    name: 'Immigration Nerds Podcast',
    url: 'https://immigrationnerds.com/feed/',
    category: 'immigration',
    replaces: 'new',
  },
  {
    name: 'Lexis Immigration Law',
    url: 'https://www.lexisnexis.com/LegalNewsRoom/rss/immigration.xml',
    category: 'immigration',
    replaces: 'new',
  },
];

async function testFeed(feed: (typeof REPLACEMENT_FEEDS)[0]) {
  const parser = new RssParser({
    timeout: 5000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Vasquez Law Firm News Monitor/1.0)',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });

  try {
    const feedData = await parser.parseURL(feed.url);
    return {
      ...feed,
      status: 'success' as const,
      itemCount: feedData.items?.length || 0,
      latestItem: feedData.items?.[0]?.title,
    };
  } catch (error: any) {
    return {
      ...feed,
      status: 'error' as const,
      error: error.message || 'Unknown error',
    };
  }
}

async function main() {
  console.log('🔍 Finding Replacement RSS Feeds\n');
  console.log(`Testing ${REPLACEMENT_FEEDS.length} potential replacement feeds...\n`);

  const results = await Promise.all(REPLACEMENT_FEEDS.map(testFeed));

  // Group results by what they replace
  const replacements = new Map<string, typeof results>();
  const newFeeds: typeof results = [];

  results.forEach(result => {
    if (result.replaces === 'new') {
      newFeeds.push(result);
    } else {
      if (!replacements.has(result.replaces)) {
        replacements.set(result.replaces, []);
      }
      replacements.get(result.replaces)!.push(result);
    }
  });

  console.log('✅ FOUND REPLACEMENTS:');
  console.log('='.repeat(80));

  replacements.forEach((feeds, originalFeed) => {
    const workingFeeds = feeds.filter(f => f.status === 'success');
    if (workingFeeds.length > 0) {
      console.log(`\n✓ ${originalFeed} → Found ${workingFeeds.length} working replacement(s):`);
      workingFeeds.forEach(feed => {
        console.log(`  • ${feed.name} (${feed.itemCount} items)`);
        console.log(`    URL: ${feed.url}`);
        if (feed.latestItem) {
          console.log(`    Latest: "${feed.latestItem.substring(0, 60)}..."`);
        }
      });
    } else {
      console.log(`\n✗ ${originalFeed} → No working replacements found`);
    }
  });

  console.log('\n\n🆕 ADDITIONAL WORKING FEEDS:');
  console.log('='.repeat(80));

  const workingNewFeeds = newFeeds.filter(f => f.status === 'success');
  workingNewFeeds.forEach(feed => {
    console.log(`\n✓ ${feed.name} (${feed.itemCount} items)`);
    console.log(`  URL: ${feed.url}`);
    if (feed.latestItem) {
      console.log(`  Latest: "${feed.latestItem.substring(0, 60)}..."`);
    }
  });

  // Generate updated feeds configuration
  console.log('\n\n📝 RECOMMENDED FEED UPDATES:');
  console.log('='.repeat(80));
  console.log('Copy these working feeds to replace the failing ones:\n');

  const recommendedFeeds: any[] = [];

  replacements.forEach((feeds, originalFeed) => {
    const workingFeed = feeds.find(f => f.status === 'success');
    if (workingFeed) {
      recommendedFeeds.push({
        name: workingFeed.name,
        url: workingFeed.url,
        category: workingFeed.category,
        priority: 2,
        note: `Replaces: ${originalFeed}`,
      });
    }
  });

  workingNewFeeds.forEach(feed => {
    recommendedFeeds.push({
      name: feed.name,
      url: feed.url,
      category: feed.category,
      priority: 2,
      note: 'New addition',
    });
  });

  console.log(JSON.stringify(recommendedFeeds, null, 2));
}

main().catch(console.error);
