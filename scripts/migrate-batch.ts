#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Batch migration script for applying templates to pages
 * This processes a limited number of files at a time to avoid errors
 */

const BATCH_SIZE = 10; // Process 10 files at a time

async function migrateBlogPost(filePath: string): Promise<void> {
  const fileName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');

  // Extract metadata if exists
  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch
    ? metadataMatch[0]
    : `export const metadata: Metadata = {
  title: '${formatTitle(fileName)} - Vasquez Law Firm, PLLC',
  description: 'Legal insights and information from Vasquez Law Firm',
};`;

  // Extract title from the content or filename
  let title = formatTitle(fileName);
  const titleMatch = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (titleMatch) {
    title = titleMatch[1].replace(' - Vasquez Law Firm, PLLC', '').trim();
  }

  const newContent = `import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';

${metadata}

export const runtime = 'nodejs';

export default function ${toPascalCase(fileName)}Page() {
  // TODO: Extract content from original file and format properly
  const post = {
    id: '${fileName}',
    title: '${title}',
    slug: '${fileName}',
    excerpt: 'Blog post excerpt here - TODO: extract from content',
    content: \`
      <div class="prose prose-lg max-w-none">
        <!-- TODO: Migrate content from original file -->
        <p>This content needs to be migrated from the original file.</p>
      </div>
    \`,
    practiceArea: 'general', // TODO: Determine correct practice area
    language: 'en' as const,
    publishedAt: new Date(),
    readTime: 5,
    author: {
      name: 'Vasquez Law Firm',
    },
    tags: [], // TODO: Add relevant tags
  };

  const categories = [
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={[]} // TODO: Add related posts
    />
  );
}
`;

  // Backup original
  await fs.copyFile(filePath, `${filePath}.backup`);

  // Write new content
  await fs.writeFile(filePath, newContent);
}

async function migratePracticeAreaPage(filePath: string): Promise<void> {
  const fileName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');

  // Extract metadata
  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch ? metadataMatch[0] : '';

  const newContent = `import { ModernPracticeAreaTemplateV2 } from '@/components/templates/ModernPracticeAreaTemplateV2';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(fileName)}Page() {
  const pageData = {
    practiceArea: '${formatTitle(fileName)}',
    heroTitle: '${formatTitle(fileName)} Attorneys',
    heroSubtitle: 'Experienced legal representation',
    urgencyLevel: 'medium' as const,
    emergencyMessage: '',
    services: [], // TODO: Add services
    faqs: [], // TODO: Add FAQs
    testimonials: [], // TODO: Add testimonials
    statistics: [],
    processSteps: [],
    language: 'en' as const,
  };

  return <ModernPracticeAreaTemplateV2 {...pageData} />;
}
`;

  await fs.copyFile(filePath, `${filePath}.backup`);
  await fs.writeFile(filePath, newContent);
}

async function migrateLocationPage(filePath: string): Promise<void> {
  const fileName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');

  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch ? metadataMatch[0] : '';

  const newContent = `import { LocationPageTemplate } from '@/components/templates/LocationPageTemplate';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(fileName)}Page() {
  const locationData = {
    city: '${formatTitle(fileName)}',
    state: 'NC',
    heroTitle: 'Legal Services in ${formatTitle(fileName)}',
    heroSubtitle: 'Trusted attorneys serving the local community',
    practiceAreas: [], // TODO: Add practice areas
    attorneys: [], // TODO: Add attorneys
    officeInfo: {
      address: '',
      phone: '1-844-YO-PELEO',
      hours: 'Monday-Friday 9AM-5PM',
    },
    language: 'en' as const,
  };

  return <LocationPageTemplate {...locationData} />;
}
`;

  await fs.copyFile(filePath, `${filePath}.backup`);
  await fs.writeFile(filePath, newContent);
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function formatTitle(str: string): string {
  return str
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function checkIfNeedsTemplate(filePath: string): Promise<boolean> {
  const content = await fs.readFile(filePath, 'utf-8');
  const templateImports = [
    'BlogPageTemplate',
    'ModernPracticeAreaTemplate',
    'LocationPageTemplate',
    'MasterLayout',
    'EnhancedTemplates',
  ];

  return !templateImports.some(template => content.includes(template));
}

async function identifyPageType(filePath: string): Promise<string> {
  if (filePath.includes('/practice-areas/')) return 'practice-area';
  if (filePath.includes('/locations/')) return 'location';
  if (filePath.includes('/near-me/')) return 'near-me';

  // Check content for blog characteristics
  const content = await fs.readFile(filePath, 'utf-8');
  if (content.includes('article') || content.includes('blog')) {
    return 'blog-post';
  }

  return 'blog-post'; // Default to blog post for most pages
}

async function main() {
  console.log('🚀 Starting batch migration...\n');

  // Get list of pages to migrate from the plan
  const planContent = await fs.readFile('TEMPLATE_MIGRATION_PLAN.md', 'utf-8');
  const allMatches = planContent.match(/- \[ \] (src\/app\/[^\n]+page\.tsx)/g) || [];

  // Get all files that need migration
  const allFiles = allMatches.map(match => match.replace('- [ ] ', ''));

  // Filter out files that already have templates
  const filesToCheck = [];
  for (const file of allFiles) {
    try {
      await fs.access(file);
      const needsTemplate = await checkIfNeedsTemplate(file);
      if (needsTemplate) {
        filesToCheck.push(file);
      }
    } catch (error) {
      // File doesn't exist, skip it
    }
  }

  const filesToMigrate = filesToCheck.slice(0, BATCH_SIZE);

  console.log(`Processing ${filesToMigrate.length} files...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of filesToMigrate) {
    try {
      // Check if file exists
      await fs.access(file);

      // Check if it needs migration
      const needsTemplate = await checkIfNeedsTemplate(file);
      if (!needsTemplate) {
        console.log(`✅ ${file} - already has template`);
        successCount++;
        continue;
      }

      const pageType = await identifyPageType(file);

      switch (pageType) {
        case 'blog-post':
          await migrateBlogPost(file);
          break;
        case 'practice-area':
          await migratePracticeAreaPage(file);
          break;
        case 'location':
          await migrateLocationPage(file);
          break;
        default:
          console.log(`⚠️  ${file} - unknown type, using blog template`);
          await migrateBlogPost(file);
      }

      console.log(`✅ ${file} - migrated to ${pageType} template`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${file} - error: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Migration Summary:`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`\n💡 Next steps:`);
  console.log(`1. Review the migrated files`);
  console.log(`2. Update the TODO sections with actual content`);
  console.log(`3. Test the pages in development`);
  console.log(`4. Run again for the next batch`);
}

main().catch(console.error);
