#!/usr/bin/env npx tsx

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

interface AnyTypeUsage {
  file: string;
  line: number;
  content: string;
  context: string;
}

const anyUsages: AnyTypeUsage[] = [];

function shouldSkipFile(filePath: string): boolean {
  const skipPatterns = [
    'node_modules',
    '.next',
    'dist',
    'build',
    '.git',
    'coverage',
    '__tests__',
    '.test.',
    '.spec.',
    'setupTests.ts',
    'pino-logger.ts', // Already has legitimate any usage
    'telemetry/index.ts', // Placeholder file
  ];

  return skipPatterns.some(pattern => filePath.includes(pattern));
}

function findAnyInFile(filePath: string): void {
  if (shouldSkipFile(filePath)) return;

  try {
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Match various any patterns
      const patterns = [
        /:\s*any\b/, // : any
        /<any>/, // <any>
        /as\s+any\b/, // as any
        /\bany\[\]/, // any[]
        /Array<any>/, // Array<any>
        /Record<\w+,\s*any>/, // Record<string, any>
        /\(.*:\s*any\)/, // function params
      ];

      patterns.forEach(pattern => {
        if (pattern.test(line)) {
          // Determine context
          let context = 'unknown';
          if (line.includes('function') || line.includes('=>')) {
            context = 'function-param';
          } else if (line.includes('interface') || line.includes('type')) {
            context = 'type-definition';
          } else if (line.includes('useState') || line.includes('useRef')) {
            context = 'react-hook';
          } else if (line.includes('catch')) {
            context = 'error-handling';
          } else if (line.includes('req') || line.includes('res')) {
            context = 'api-handler';
          } else if (line.includes('Record') || line.includes('object')) {
            context = 'object-type';
          }

          anyUsages.push({
            file: filePath,
            line: index + 1,
            content: line.trim(),
            context,
          });
        }
      });
    });
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
}

function processDirectory(dirPath: string): void {
  const entries = readdirSync(dirPath);

  entries.forEach(entry => {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !shouldSkipFile(fullPath)) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = extname(fullPath);
      if (['.ts', '.tsx'].includes(ext)) {
        findAnyInFile(fullPath);
      }
    }
  });
}

// Analyze and categorize
console.log('🔍 Analyzing any type usage...\n');
processDirectory('./src');

// Group by context
const byContext = anyUsages.reduce(
  (acc, usage) => {
    if (!acc[usage.context]) acc[usage.context] = [];
    acc[usage.context].push(usage);
    return acc;
  },
  {} as Record<string, AnyTypeUsage[]>
);

// Summary
console.log('📊 Summary by context:');
Object.entries(byContext).forEach(([context, usages]) => {
  console.log(`\n${context}: ${usages.length} occurrences`);

  // Show top 5 examples
  usages.slice(0, 5).forEach(usage => {
    console.log(`  ${usage.file}:${usage.line}`);
    console.log(`    ${usage.content}`);
  });

  if (usages.length > 5) {
    console.log(`  ... and ${usages.length - 5} more`);
  }
});

console.log(`\n🔢 Total any usages: ${anyUsages.length}`);

// Recommendations
console.log('\n💡 Recommendations:');
console.log('1. Start with error-handling contexts - replace with unknown');
console.log('2. API handlers - use proper Next.js types');
console.log('3. React hooks - specify proper state types');
console.log('4. Object types - use specific interfaces');
console.log('5. Function params - define proper parameter types');
