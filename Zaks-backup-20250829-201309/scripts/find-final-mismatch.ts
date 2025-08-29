#!/usr/bin/env tsx

import { glob } from 'glob';

async function main() {
  const pages = await glob('src/app/**/page.tsx', {
    ignore: ['**/node_modules/**', '**/api/**'],
  });

  const urls = pages.map(file => {
    let urlPath = file.replace('src/app', '').replace('/page.tsx', '');
    if (urlPath === '') urlPath = '/';
    return urlPath;
  });

  const enPages = urls.filter(p => !p.startsWith('/es'));
  const esPages = urls.filter(p => p.startsWith('/es'));

  console.log(`English pages: ${enPages.length}`);
  console.log(`Spanish pages: ${esPages.length}`);

  if (enPages.length === esPages.length) {
    console.log('\n✅ Perfect parity achieved!');
    return;
  }

  // Find the mismatch
  const esSet = new Set(esPages);
  const enSet = new Set(enPages);

  // Check which pages don't have counterparts
  const orphanedEn: string[] = [];
  const orphanedEs: string[] = [];

  for (const enPage of enPages) {
    const expectedEs = enPage === '/' ? '/es' : `/es${enPage}`;
    if (!esSet.has(expectedEs)) {
      orphanedEn.push(enPage);
    }
  }

  for (const esPage of esPages) {
    const expectedEn = esPage === '/es' ? '/' : esPage.substring(3);
    if (!enSet.has(expectedEn)) {
      orphanedEs.push(esPage);
    }
  }

  if (orphanedEn.length > 0) {
    console.log('\n❌ English pages without Spanish counterpart:');
    orphanedEn.forEach(p => console.log(`   ${p} → needs /es${p === '/' ? '' : p}`));
  }

  if (orphanedEs.length > 0) {
    console.log('\n❌ Spanish pages without English counterpart:');
    orphanedEs.forEach(p => {
      const enPath = p === '/es' ? '/' : p.substring(3);
      console.log(`   ${p} → needs ${enPath}`);
    });
  }
}

main().catch(console.error);
