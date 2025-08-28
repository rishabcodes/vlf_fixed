#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Script to migrate remaining pages that don't have templates
 */

async function checkIfNeedsTemplate(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const templateImports = [
      'Template',
      'MasterLayout',
      'HomePage',
      'ContactPageContent',
      'AttorneysPageContent',
    ];

    return !templateImports.some(template => content.includes(template));
  } catch {
    return true;
  }
}

async function migrateGeneralPage(filePath: string): Promise<void> {
  const fileName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');

  // Extract metadata if exists
  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch
    ? metadataMatch[0]
    : `export const metadata: Metadata = {
  title: '${formatTitle(fileName)} - Vasquez Law Firm, PLLC',
  description: 'Vasquez Law Firm - Professional legal services',
};`;

  const newContent = `import { MasterLayout } from '@/design-system/templates/MasterLayout';
import { Metadata } from 'next';

${metadata}

export default function ${toPascalCase(fileName)}Page() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">${formatTitle(fileName)}</h1>
        {/* TODO: Add page content here */}
      </div>
    </MasterLayout>
  );
}
`;

  await fs.copyFile(filePath, `${filePath}.backup`);
  await fs.writeFile(filePath, newContent);
}

async function migrateAttorneyPage(filePath: string): Promise<void> {
  const fileName = path.basename(path.dirname(filePath));
  const content = await fs.readFile(filePath, 'utf-8');

  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch ? metadataMatch[0] : '';

  // For the main attorneys page
  if (fileName === 'attorneys') {
    const newContent = `import { MasterLayout } from '@/design-system/templates/MasterLayout';
import AttorneysPageContent from '@/components/AttorneysPageContent';
import { Metadata } from 'next';

${metadata}

export default function AttorneysPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <AttorneysPageContent />
    </MasterLayout>
  );
}
`;
    await fs.copyFile(filePath, `${filePath}.backup`);
    await fs.writeFile(filePath, newContent);
    return;
  }

  // For individual attorney pages - keep the original structure if complex
  const hasComplexStructure = content.includes('AttorneyPageClient') || content.includes('motion');
  if (!hasComplexStructure) {
    await migrateGeneralPage(filePath);
  }
}

async function migrateContactPage(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8');
  const metadataMatch = content.match(/export const metadata[^}]+}/s);
  const metadata = metadataMatch ? metadataMatch[0] : '';

  const newContent = `import { MasterLayout } from '@/design-system/templates/MasterLayout';
import ContactPageContent from '@/components/ContactPageContent';
import { Metadata } from 'next';

${metadata}

export default function ContactPage() {
  return (
    <MasterLayout variant="default" showBreadcrumbs={true}>
      <ContactPageContent />
    </MasterLayout>
  );
}
`;

  await fs.copyFile(filePath, `${filePath}.backup`);
  await fs.writeFile(filePath, newContent);
}

async function migrateHomePage(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8');

  // Home page likely already has proper structure
  if (content.includes('HomePage') || content.includes('MasterLayout')) {
    console.log('✅ Home page already has proper structure');
    return;
  }

  await migrateGeneralPage(filePath);
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

async function main() {
  console.log('🚀 Migrating remaining pages...\n');

  // Get all page files
  const allPages = await glob('src/app/**/page.tsx');

  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of allPages) {
    try {
      // Skip API routes and special pages
      if (file.includes('/api/') || file.includes('/_')) {
        continue;
      }

      const needsTemplate = await checkIfNeedsTemplate(file);
      if (!needsTemplate) {
        skipped++;
        continue;
      }

      const fileName = path.basename(path.dirname(file));

      // Special handling for specific pages
      if (file.includes('/contact/page.tsx') && !file.includes('/es/')) {
        await migrateContactPage(file);
        console.log(`✅ Migrated contact page: ${file}`);
      } else if (file.includes('/attorneys/') || fileName === 'attorneys') {
        await migrateAttorneyPage(file);
        console.log(`✅ Migrated attorney page: ${file}`);
      } else if (fileName === 'page' && file === 'src/app/page.tsx') {
        await migrateHomePage(file);
        console.log(`✅ Migrated home page: ${file}`);
      } else {
        await migrateGeneralPage(file);
        console.log(`✅ Migrated general page: ${file}`);
      }

      migrated++;
    } catch (error) {
      console.error(`❌ Error migrating ${file}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Final Summary:`);
  console.log(`✅ Migrated: ${migrated}`);
  console.log(`⏭️  Skipped (already has template): ${skipped}`);
  console.log(`❌ Errors: ${errors}`);
}

main().catch(console.error);
