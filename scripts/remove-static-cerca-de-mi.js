const fs = require('fs');
const path = require('path');

// Function to remove directories recursively
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

// Get all cerca-de-mi and near-me directories
function getCercaDeMiDirs(basePath) {
  if (!fs.existsSync(basePath)) return [];

  return fs
    .readdirSync(basePath)
    .filter(file => {
      const fullPath = path.join(basePath, file);
      return (
        fs.statSync(fullPath).isDirectory() &&
        (file.includes('cerca-de-mi') || file.includes('near-me'))
      );
    })
    .map(dir => path.join(basePath, dir));
}

// Remove English cerca-de-mi pages
const englishCercaDeMiPath = path.join(__dirname, '../src/app/cerca-de-mi');
const englishDirs = getCercaDeMiDirs(englishCercaDeMiPath);

console.log(`Found ${englishDirs.length} English cerca-de-mi directories to remove`);

englishDirs.forEach(dir => {
  // Skip the dynamic route directory
  if (dir.includes('[...slug]')) {
    console.log(`Skipping dynamic route: ${path.basename(dir)}`);
    return;
  }

  try {
    removeDirectory(dir);
    console.log(`✓ Removed ${path.basename(dir)}`);
  } catch (error) {
    console.error(`✗ Error removing ${dir}:`, error.message);
  }
});

// Remove Spanish cerca-de-mi pages
const spanishCercaDeMiPath = path.join(__dirname, '../src/app/es/cerca-de-mi');
const spanishDirs = getCercaDeMiDirs(spanishCercaDeMiPath);

console.log(`\nFound ${spanishDirs.length} Spanish cerca-de-mi directories to remove`);

spanishDirs.forEach(dir => {
  // Skip the dynamic route directory
  if (dir.includes('[...slug]')) {
    console.log(`Skipping dynamic route: ${path.basename(dir)}`);
    return;
  }

  try {
    removeDirectory(dir);
    console.log(`✓ Removed ${path.basename(dir)}`);
  } catch (error) {
    console.error(`✗ Error removing ${dir}:`, error.message);
  }
});

console.log('\nCleanup complete!');
console.log('The static cerca-de-mi pages have been replaced with dynamic routes.');
