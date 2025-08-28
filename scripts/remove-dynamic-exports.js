const fs = require('fs');
const path = require('path');

// Remove dynamic export from page files to restore static generation
function removeDynamicExport(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if dynamic export exists
    if (!content.includes("export const dynamic = 'force-dynamic'")) {
      return false;
    }

    // Remove the dynamic export lines
    content = content.replace(
      /\n\/\/ Temporarily force dynamic rendering to reduce build memory usage\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 3600; \/\/ 1 hour cache\n/g,
      ''
    );

    // Also remove if it's at the beginning of the file
    content = content.replace(
      /^\/\/ Temporarily force dynamic rendering to reduce build memory usage\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 3600; \/\/ 1 hour cache\n\n/gm,
      ''
    );

    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Directories to process
const dirsToProcess = ['src/app/practice-areas', 'src/app/es/areas-de-practica', 'src/app/near-me'];

let processedCount = 0;

dirsToProcess.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);

  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }

  // Find all page.tsx files recursively
  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item === 'page.tsx') {
        if (removeDynamicExport(itemPath)) {
          console.log(`✓ Removed dynamic export from ${itemPath}`);
          processedCount++;
        }
      }
    });
  }

  processDirectory(fullPath);
});

console.log(`\nProcessed ${processedCount} files.`);
console.log('All pages restored to static generation.');
