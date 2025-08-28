#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const LOGGER_IMPORT = "import { componentLogger as logger } from '@/lib/safe-logger';";
const API_LOGGER_IMPORT = "import { apiLogger as logger } from '@/lib/safe-logger';";

async function replaceConsoleInFile(filePath: string) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    const originalContent = content;
    
    // Skip if already has logger import
    if (content.includes("from '@/lib/safe-logger'")) {
      return { path: filePath, status: 'already-optimized' };
    }
    
    // Skip test files, scripts, and config files
    if (
      filePath.includes('.test.') ||
      filePath.includes('.spec.') ||
      filePath.includes('/scripts/') ||
      filePath.includes('/test/') ||
      filePath.includes('.config.') ||
      filePath.includes('next.config') ||
      filePath.includes('tailwind.config')
    ) {
      return { path: filePath, status: 'skipped-test-or-config' };
    }
    
    // Check if file has console statements
    const hasConsole = /console\.(log|error|warn|info|debug)/.test(content);
    if (!hasConsole) {
      return { path: filePath, status: 'no-console' };
    }
    
    // Determine if it's an API route
    const isApiRoute = filePath.includes('/api/') || filePath.includes('/pages/api/');
    const importToUse = isApiRoute ? API_LOGGER_IMPORT : LOGGER_IMPORT;
    
    // Add import after the first import or at the top
    const importMatch = content.match(/^import .* from .*/m);
    if (importMatch) {
      const insertPos = importMatch.index! + importMatch[0].length;
      content = content.slice(0, insertPos) + '\n' + importToUse + content.slice(insertPos);
    } else {
      // Add at the very top if no imports found
      content = importToUse + '\n\n' + content;
    }
    
    // Replace console statements, preserving the arguments
    content = content.replace(/console\.log\(/g, 'logger.info(');
    content = content.replace(/console\.error\(/g, 'logger.error(');
    content = content.replace(/console\.warn\(/g, 'logger.warn(');
    content = content.replace(/console\.info\(/g, 'logger.info(');
    content = content.replace(/console\.debug\(/g, 'logger.debug(');
    
    // Only write if content changed
    if (content !== originalContent) {
      await fs.writeFile(filePath, content, 'utf-8');
      return { path: filePath, status: 'updated' };
    }
    
    return { path: filePath, status: 'no-changes' };
  } catch (error) {
    return { path: filePath, status: 'error', error };
  }
}

async function main() {
  console.log('🚀 Starting console.log optimization...\n');
  
  // Find all TypeScript and JavaScript files
  const files = await glob('src/**/*.{ts,tsx,js,jsx}', {
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/safe-logger.ts', // Don't modify the logger itself
      '**/optimize-console-logs.ts' // Don't modify this script
    ]
  });
  
  console.log(`Found ${files.length} files to process\n`);
  
  const results = {
    updated: [] as string[],
    skipped: [] as string[],
    errors: [] as string[],
    alreadyOptimized: [] as string[]
  };
  
  // Process files in batches to avoid overwhelming the system
  const batchSize = 10;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(replaceConsoleInFile));
    
    batchResults.forEach(result => {
      if (result.status === 'updated') {
        results.updated.push(result.path);
        console.log(`✅ Updated: ${result.path}`);
      } else if (result.status === 'error') {
        results.errors.push(result.path);
        console.log(`❌ Error: ${result.path}`);
      } else if (result.status === 'already-optimized') {
        results.alreadyOptimized.push(result.path);
      } else {
        results.skipped.push(result.path);
      }
    });
  }
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`✅ Updated: ${results.updated.length} files`);
  console.log(`⏭️  Skipped: ${results.skipped.length} files`);
  console.log(`✓  Already optimized: ${results.alreadyOptimized.length} files`);
  console.log(`❌ Errors: ${results.errors.length} files`);
  
  if (results.updated.length > 0) {
    console.log('\n✨ Console optimization complete!');
    console.log('The logger will handle rate limiting and proper error formatting.');
  }
}

main().catch(console.error);