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

// Function to find and remove location directories
function cleanLocationDirectories(basePath, skipDirs = ['[...slug]']) {
  if (!fs.existsSync(basePath)) return 0;

  let removedCount = 0;

  fs.readdirSync(basePath).forEach(item => {
    const fullPath = path.join(basePath, item);

    // Skip dynamic routes and specific files
    if (skipDirs.includes(item) || item.endsWith('.tsx') || item.endsWith('.ts')) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      try {
        removeDirectory(fullPath);
        console.log(`✓ Removed ${fullPath}`);
        removedCount++;
      } catch (error) {
        console.error(`✗ Error removing ${fullPath}:`, error.message);
      }
    }
  });

  return removedCount;
}

// Clean English locations
console.log('=== Cleaning English location pages ===');
const englishLocationsPath = path.join(__dirname, '../src/app/locations');
const englishRemoved = cleanLocationDirectories(englishLocationsPath);
console.log(`Removed ${englishRemoved} English location directories\n`);

// Clean Spanish locations
console.log('=== Cleaning Spanish location pages ===');
const spanishLocationsPath = path.join(__dirname, '../src/app/es/ubicaciones');
const spanishRemoved = cleanLocationDirectories(spanishLocationsPath);
console.log(`Removed ${spanishRemoved} Spanish location directories\n`);

console.log(`Total directories removed: ${englishRemoved + spanishRemoved}`);
console.log('Location pages have been replaced with dynamic routes.');
