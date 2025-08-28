#!/usr/bin/env node

/**
 * Migration script to help convert existing practice area pages to use the StandardizedPracticeAreaTemplate
 *
 * Usage: node scripts/migrate-practice-areas.js
 */

const fs = require('fs');
const path = require('path');

// Template for new practice area pages
const practiceAreaTemplate = `import { Metadata } from 'next';
import StandardizedPracticeAreaTemplate from '@/components/templates/StandardizedPracticeAreaTemplate';

export const metadata: Metadata = {
  title: '{{TITLE}} | Vasquez Law Firm',
  description: '{{DESCRIPTION}}',
  keywords: '{{KEYWORDS}}',
};

const services = [
  {
    title: 'Service 1',
    description: 'Description of service 1',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  },
  // Add more services as needed
];

const faqs = [
  {
    question: 'Question 1?',
    answer: 'Answer 1',
  },
  {
    question: 'Question 2?',
    answer: 'Answer 2',
  },
  // Add more FAQs as needed
];

export default function {{COMPONENT_NAME}}() {
  return (
    <StandardizedPracticeAreaTemplate
      title="{{PAGE_TITLE}}"
      subtitle="{{SUBTITLE}}"
      description="{{PAGE_DESCRIPTION}}"
      
      overview={{
        content: "{{OVERVIEW_CONTENT}}",
        highlights: [
          'Highlight 1',
          'Highlight 2',
          'Highlight 3',
        ]
      }}
      
      services={services}
      faqs={faqs}
      
      isSpanish={{{IS_SPANISH}}}
    />
  );
}`;

// Helper function to extract metadata from existing files
function extractMetadata(content) {
  const metadata = {
    title: '',
    description: '',
    keywords: '',
  };

  // Try to extract title
  const titleMatch = content.match(/title:\s*['"`](.*?)['"`]/);
  if (titleMatch) metadata.title = titleMatch[1];

  // Try to extract description
  const descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
  if (descMatch) metadata.description = descMatch[1];

  // Try to extract keywords
  const keywordMatch = content.match(/keywords:\s*['"`](.*?)['"`]/);
  if (keywordMatch) metadata.keywords = keywordMatch[1];

  return metadata;
}

// Helper function to generate component name from file path
function generateComponentName(filePath) {
  const parts = filePath.split('/');
  const relevantParts = parts.slice(parts.indexOf('practice-areas') + 1, -1);

  return (
    relevantParts
      .map(part =>
        part
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      )
      .join('') + 'Page'
  );
}

// Main migration function
function migrateFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf8');
  const metadata = extractMetadata(content);
  const componentName = generateComponentName(filePath);
  const isSpanish = filePath.includes('/es/');

  // Check if already using new template
  if (content.includes('StandardizedPracticeAreaTemplate')) {
    console.log('✓ Already using StandardizedPracticeAreaTemplate');
    return;
  }

  // Generate new content
  let newContent = practiceAreaTemplate
    .replace('{{TITLE}}', metadata.title)
    .replace('{{DESCRIPTION}}', metadata.description)
    .replace('{{KEYWORDS}}', metadata.keywords)
    .replace('{{COMPONENT_NAME}}', componentName)
    .replace('{{PAGE_TITLE}}', metadata.title.split('|')[0].trim())
    .replace('{{SUBTITLE}}', 'Professional Legal Services') // Default subtitle
    .replace('{{PAGE_DESCRIPTION}}', metadata.description)
    .replace('{{OVERVIEW_CONTENT}}', metadata.description)
    .replace('{{IS_SPANISH}}', isSpanish.toString());

  // Create backup
  const backupPath = filePath.replace('.tsx', '.backup.tsx');
  fs.copyFileSync(filePath, backupPath);
  console.log(`✓ Created backup: ${backupPath}`);

  // Create new file
  const newFilePath = filePath.replace('.tsx', '.new.tsx');
  fs.writeFileSync(newFilePath, newContent);
  console.log(`✓ Created new file: ${newFilePath}`);

  console.log('  → Review the new file and manually migrate custom content');
  console.log('  → When satisfied, rename .new.tsx to .tsx');
}

// Find all practice area files
function findPracticeAreaFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && item === 'page.tsx') {
        if (fullPath.includes('practice-areas') || fullPath.includes('areas-de-practica')) {
          files.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return files;
}

// Main execution
function main() {
  console.log('Practice Area Migration Tool');
  console.log('===========================\n');

  const rootDir = path.join(__dirname, '../src/app');
  const files = findPracticeAreaFiles(rootDir);

  console.log(`Found ${files.length} practice area files\n`);

  // Show files that will be processed
  console.log('Files to process:');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file.replace(rootDir, '~')}`);
  });

  console.log('\nStarting migration...');

  // Process each file
  files.forEach(migrateFile);

  console.log('\n✅ Migration complete!');
  console.log('\nNext steps:');
  console.log('1. Review each .new.tsx file');
  console.log('2. Manually migrate custom content from the backup');
  console.log('3. Add appropriate services, FAQs, and attorney information');
  console.log('4. Test the page');
  console.log('5. When satisfied, replace the original with: mv page.new.tsx page.tsx');
  console.log('6. Delete the backup file when done');
}

// Run the migration
if (require.main === module) {
  main();
}
