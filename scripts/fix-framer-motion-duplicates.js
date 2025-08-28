#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');

// Function to fix duplicate imports and other issues
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix duplicate AnimatePresence imports
  if (content.includes("import { AnimatePresence } from 'framer-motion';\nimport { AnimatePresence } from 'framer-motion';")) {
    content = content.replace(
      "import { AnimatePresence } from 'framer-motion';\nimport { AnimatePresence } from 'framer-motion';",
      "import { AnimatePresence } from 'framer-motion';"
    );
    modified = true;
  }
  
  // Fix duplicate imports in combined statements
  const importRegex = /import\s*{([^}]+)}\s*from\s*['"]framer-motion['"]/g;
  const imports = content.match(importRegex);
  
  if (imports && imports.length > 1) {
    // Collect all imported items
    const allImports = new Set();
    imports.forEach(imp => {
      const matches = imp.match(/{([^}]+)}/);
      if (matches) {
        const items = matches[1].split(',').map(item => item.trim());
        items.forEach(item => allImports.add(item));
      }
    });
    
    // Replace all imports with a single one
    const firstImportIndex = content.indexOf(imports[0]);
    const lastImportIndex = content.lastIndexOf(imports[imports.length - 1]) + imports[imports.length - 1].length;
    
    const beforeImports = content.substring(0, firstImportIndex);
    const afterImports = content.substring(lastImportIndex);
    
    const combinedImport = `import { ${Array.from(allImports).join(', ')} } from 'framer-motion';`;
    
    content = beforeImports + combinedImport + afterImports;
    modified = true;
  }
  
  // Fix broken useSpring calls (leftover from incomplete conversion)
  if (content.includes('useSpring(')) {
    // Remove any remaining useSpring references
    content = content.replace(/const\s+\w+\s*=\s*useSpring\([^)]+\);?\n?/g, '');
    modified = true;
  }
  
  // Fix animate={{ opacity: 1, scale: 1, y: 0 }} patterns that should have proper values
  content = content.replace(
    /animate={{ opacity: 1, scale: 1, y: 0 }}/g,
    'animate={{ opacity: 1, scale: 1, y: 0 }}'
  );
  
  // Fix incorrect animate={{ opacity: 1 }} that should be animate={{ x: 0 }}
  content = content.replace(
    /animate={{ opacity: 1 }}\s*exit={{ x: '-100%' }}/g,
    'animate={{ x: 0 }}\n        exit={{ x: "-100%" }}'
  );
  
  // Fix rotateY animations
  content = content.replace(
    /animate={{ opacity: 1, scale: 1, y: 0 }}\s*exit={{ rotateY: 90/g,
    'animate={{ rotateY: 0, opacity: 1 }}\n        exit={{ rotateY: 90'
  );
  
  // Fix liquid transition animations
  content = content.replace(
    /animate={{ opacity: 1, scale: 1, y: 0 }}\s*exit={{ y: '100%' }}/g,
    'animate={{ y: "0%" }}\n        exit={{ y: "100%" }}'
  );
  
  // Fix multi-layer transition animations
  content = content.replace(
    /animate={{ opacity: 1 }}\s*exit={{ x: '-100%' }}/g,
    'animate={{ x: 0 }}\n        exit={{ x: "-100%" }}'
  );
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main function
function main() {
  console.log('Fixing duplicate imports and syntax issues...\n');
  
  // Find all TypeScript/TSX files
  const files = glob.sync('src/**/*.{ts,tsx}');
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixFile(file)) {
      console.log(`Fixed: ${file}`);
      fixedCount++;
    }
  });
  
  console.log('\n========================================');
  console.log('Cleanup Complete!');
  console.log(`Files fixed: ${fixedCount}`);
}

main();