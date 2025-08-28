import { securityLogger } from '@/lib/safe-logger';

// Federal Register Listener
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class FederalRegisterListener {
  constructor() {
    this.checkInterval = 2 * 60 * 60 * 1000; // 2 hours
    this.agencies = ['homeland-security-department', 'justice-department', 'state-department'];
  }

  async start() {
    securityLogger.info('Federal Register Listener Started');
    this.check();
    setInterval(() => this.check(), this.checkInterval);
  }

  async check() {
    for (const agency of this.agencies) {
      try {
        const docs = await this.getAgencyDocuments(agency);
        for (const doc of docs) {
          await this.processDocument(doc);
        }
      } catch (error) {
        securityLogger.error(`Error checking ${agency}:`, error.message);
      }
    }
  }

  async getAgencyDocuments(agency) {
    const url = `https://www.federalregister.gov/api/v1/documents.json?conditions[agencies][]=${agency}&per_page=10`;
    try {
      const response = await fetch(url).then(res => res.json());
      return response.data.results || [];
    } catch (e) {
      return [];
    }
  }

  async processDocument(doc) {
    const processed = {
      title: doc.title,
      agency: doc.agencies?.[0]?.name,
      documentNumber: doc.document_number,
      publicationDate: doc.publication_date,
      summary: doc.abstract,
      url: doc.html_url,
      processedAt: new Date().toISOString(),
    };

    const dir = path.join(process.cwd(), 'content', 'federal-updates');
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(
      path.join(dir, `fed-${doc.document_number}.json`),
      JSON.stringify(processed, null, 2)
    );
  }
}

module.exports = FederalRegisterListener;

if (require.main === module) {
  new FederalRegisterListener().start();
}
