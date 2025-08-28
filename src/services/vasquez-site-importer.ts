import { logger } from '@/lib/safe-logger';

// Vasquez site importer temporarily disabled for launch
export class VasquezSiteImporter {
  async initialize() {
    logger.info('Site importer initialized (stub)');
  }

  async importFullSite() {
    logger.info('Full site import skipped (stub)');
    return {
      pages: [],
      attorneys: [],
      practiceAreas: [],
    };
  }

  async importPage(url: string) {
    return {
      url,
      title: 'Imported Page',
      content: 'Content placeholder',
      images: [],
    };
  }

  async importAttorneys() {
    return [];
  }

  async importPracticeAreas() {
    return [];
  }

  async close() {
    logger.info('Site importer closed');
  }
}

export default VasquezSiteImporter;
