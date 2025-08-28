import { logger } from '@/lib/safe-logger';

// Legal Update Auto-Blogger
const fs = require('fs').promises;
const path = require('path');

class LegalUpdateBlogger {
  constructor() {
    this.checkInterval = 30 * 60 * 1000; // 30 minutes
  }

  async start() {
    logger.info('Legal Update Auto-Blogger Started');
    this.process();
    setInterval(() => this.process(), this.checkInterval);
  }

  async process() {
    // Check for new updates
    const updates = await this.getUpdates();

    for (const update of updates) {
      await this.createBlog(update);
    }
  }

  async getUpdates() {
    const updates = [];

    // Check federal updates
    const fedDir = path.join(process.cwd(), 'content', 'federal-updates');
    try {
      const files = await fs.readdir(fedDir);
      for (const file of files.slice(-5)) {
        const content = JSON.parse(await fs.readFile(path.join(fedDir, file), 'utf-8'));
        if (!content.blogged) {
          updates.push({ type: 'federal', data: content, file });
        }
      }
    } catch (e) {}

    return updates;
  }

  async createBlog(update) {
    const slug = `legal-update-${Date.now()}`;
    const blogDir = path.join(process.cwd(), 'src', 'app', 'blog', slug);
    await fs.mkdir(blogDir, { recursive: true });

    const pageContent = `export default function LegalUpdate() {
  return (
    <article className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-[#6B1F2E] mb-4">
        Legal Update: ${update.data.title || 'Important Changes'}
      </h1>
      <p className="text-gray-700">
        Stay informed about the latest legal developments affecting North Carolina.
      </p>
      <div className="mt-8 p-4 bg-[#6B1F2E] text-white rounded">
        <p className="font-bold">Need Help Understanding These Changes?</p>
        <p>Call 1-844-YO-PELEO for a free consultation.</p>
      </div>
    </article>
  );
}`;

    await fs.writeFile(path.join(blogDir, 'page.tsx'), pageContent);

    // Mark as blogged
    if (update.file) {
      update.data.blogged = true;
      await fs.writeFile(
        path.join(process.cwd(), 'content', 'federal-updates', update.file),
        JSON.stringify(update.data, null, 2)
      );
    }
  }
}

module.exports = LegalUpdateBlogger;

if (require.main === module) {
  new LegalUpdateBlogger().start();
}
