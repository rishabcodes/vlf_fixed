const fs = require('fs');
const glob = require('glob');

// Find all TypeScript/JavaScript files in src
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**']
});

let fixedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  
  // Fix pattern: Multiple closing braces on consecutive lines  
  modified = modified.replace(/(\s*}\n\s*}\n\s*}\n)/g, '');
  
  // Fix pattern: Extra closing brace before className or other JSX attributes
  modified = modified.replace(/(\n\s*)}\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref))/g, '$1$2');
  
  // Fix pattern: Extra closing brace after JSX opening tag
  modified = modified.replace(/(<\w+[^>]*)\n\s*}\n\s*}\n\s*}\n(\s*>)/g, '$1\n$2');
  
  // Fix pattern: Extra closing brace in self-closing tags
  modified = modified.replace(/(<\w+[^>]*)\n\s*}\n\s*}\n\s*}\n(\s*\/>)/g, '$1\n$2');
  
  // Fix pattern: Extra closing brace before JSX attribute
  modified = modified.replace(/(\s+)}\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)=)/g, '$1$2');
  
  // Fix pattern: Single closing brace before attributes
  modified = modified.replace(/(\s+)}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)=)/g, '$1$2');
  
  if (modified !== content) {
    fs.writeFileSync(filePath, modified);
    console.log(`✓ Fixed: ${filePath}`);
    fixedCount++;
  }
});

console.log(`\n=== Syntax Fix Complete ===`);
console.log(`Files checked: ${files.length}`);
console.log(`Files fixed: ${fixedCount}`);