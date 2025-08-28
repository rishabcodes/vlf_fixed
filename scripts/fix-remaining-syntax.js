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
  
  // Fix pattern: closing braces on separate lines after JSX attributes
  // Pattern 1: Multiple closing braces after attributes
  modified = modified.replace(/(\s+\w+(?:=\{[^}]*\}|="[^"]*"|='[^']*')?)\n\s*}\n\s*}\n\s*}+\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref))/g, '$1\n$2');
  
  // Pattern 2: Single closing brace after attributes  
  modified = modified.replace(/(\s+(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)="[^"]*")\n\s*}\n(\s*>)/g, '$1\n$2');
  modified = modified.replace(/(\s+(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)='[^']*')\n\s*}\n(\s*>)/g, '$1\n$2');
  modified = modified.replace(/(\s+(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)=\{[^}]*\})\n\s*}\n(\s*>)/g, '$1\n$2');
  
  // Pattern 3: Fix components with key prop followed by extra braces
  modified = modified.replace(/(key=\{[^}]*\}|key="[^"]*"|key='[^']*')\n\s*}\n\s*}+\n(\s*className)/g, '$1\n$2');
  
  // Pattern 4: Fix div/span/other elements with broken syntax
  modified = modified.replace(/(<\w+)\n\s*}\n\s*}+\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref))/g, '$1\n$2');
  
  // Pattern 5: Fix self-closing tags with extra braces before />
  modified = modified.replace(/(\s+(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)(?:=\{[^}]*\}|="[^"]*"|='[^']*')?)\n\s*}\n\s*}+\n(\s*\/>)/g, '$1\n$2');
  
  // Pattern 6: TODO comments that got mangled
  modified = modified.replace(/\/\/ TODO: Convert}\s+to/g, '// TODO: Convert to');
  
  if (modified !== content) {
    fs.writeFileSync(filePath, modified);
    console.log(`✓ Fixed: ${filePath}`);
    fixedCount++;
  }
});

console.log(`\n=== Syntax Fix Complete ===`);
console.log(`Files checked: ${files.length}`);
console.log(`Files fixed: ${fixedCount}`);