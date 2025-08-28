import { logger } from '@/lib/safe-logger';

// Competition Monitoring Agent
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;
const path = require('path');

class CompetitionMonitor {
  constructor() {
    this.competitors = [
      'https://www.visalawgroup.com',
      'https://www.immigrationlawyernc.com',
      'https://www.ncimmigrationattorney.com',
    ];
    this.checkInterval = 6 * 60 * 60 * 1000; // 6 hours
  }

  async start() {
    logger.info('Competition Monitor Started');
    this.monitor();
    setInterval(() => this.monitor(), this.checkInterval);
  }

  async monitor() {
    for (const competitor of this.competitors) {
      try {
        const blogs = await this.getCompetitorBlogs(competitor);
        for (const blog of blogs) {
          await this.analyzeBlog(blog);
        }
      } catch (error) {
        logger.error(`Error monitoring ${competitor}:`, error.message);
      }
    }
  }

  async getCompetitorBlogs(url) {
    const blogs = [];
    try {
      const blogUrl = `${url}/blog`;
      const response = await fetch(blogUrl, { timeout: 10000 }).then(res => res.json());
      const $ = cheerio.load(response.data);

      $('article a, .blog-post a, h2 a').each((i, elem) => {
        const href = $(elem).attr('href');
        const title = $(elem).text().trim();
        if (href && title) {
          blogs.push({
            url: href.startsWith('http') ? href : new URL(href, url).href,
            title,
            competitor: url,
          });
        }
      });
    } catch (e) {}

    return blogs.slice(0, 5);
  }

  async analyzeBlog(blog) {
    const analysis = {
      competitor: blog.competitor,
      originalUrl: blog.url,
      title: blog.title,
      analyzedAt: new Date().toISOString(),
      insights: [],
    };

    // Save analysis
    const dir = path.join(process.cwd(), 'content', 'competitor-insights');
    await fs.mkdir(dir, { recursive: true });

    const filename = `insight-${Date.now()}.json`;
    await fs.writeFile(path.join(dir, filename), JSON.stringify(analysis, null, 2));
  }
}

module.exports = CompetitionMonitor;

if (require.main === module) {
  new CompetitionMonitor().start();
}
