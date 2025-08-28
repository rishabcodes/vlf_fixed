#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Temporarily limiting static page generation for Netlify...\n');

// Directories with many pages
const dirsToLimit = ['src/app/locations', 'src/app/near-me', 'src/app/es/cerca-de-mi'];

let renamedCount = 0;

dirsToLimit.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);

  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  // Rename to .backup to exclude from build
  const backupPath = `${fullPath}.backup`;

  if (fs.existsSync(backupPath)) {
    console.log(`Backup already exists: ${backupPath}`);
    return;
  }

  fs.renameSync(fullPath, backupPath);
  console.log(`✅ Renamed ${dir} to ${dir}.backup`);
  renamedCount++;
});

console.log(`\n✅ Limited ${renamedCount} directories`);
console.log('This reduces the build from 6,562 to ~100 pages for testing');

// Create a restore script
const restoreScript = `#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring all pages...');

const dirsToRestore = ${JSON.stringify(dirsToLimit)};

dirsToRestore.forEach(dir => {
  const backupPath = path.join(__dirname, '..', dir + '.backup');
  const originalPath = path.join(__dirname, '..', dir);
  
  if (fs.existsSync(backupPath)) {
    fs.renameSync(backupPath, originalPath);
    console.log(\`✅ Restored \${dir}\`);
  }
});

console.log('\\n✅ All pages restored');
`;

fs.writeFileSync(path.join(__dirname, 'restore-all-pages.js'), restoreScript);
fs.chmodSync(path.join(__dirname, 'restore-all-pages.js'), '755');

console.log('\nTo restore all pages later, run: node scripts/restore-all-pages.js');
