const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing JSX closing tag syntax errors...\n');

// Pattern to fix: <ComponentName} should be <ComponentName
const fixPattern = /<(\w+)}/g;

let totalFixed = 0;
const fixedFiles = [];

// Find all TypeScript React files
const files = glob.sync('src/**/*.{tsx,jsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**']
});

console.log(`Found ${files.length} files to check\n`);

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix the pattern
  content = content.replace(fixPattern, '<$1');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    fixedFiles.push(file);
    
    // Count occurrences
    const matches = originalContent.match(fixPattern);
    if (matches) {
      totalFixed += matches.length;
    }
    
    console.log(`  ✓ ${file}`);
  }
});

console.log('\n=== Summary ===');
console.log(`Files fixed: ${fixedFiles.length}`);
console.log(`Total issues fixed: ${totalFixed}`);

if (fixedFiles.length === 0) {
  console.log('\n✨ No JSX closing tag issues found!');
} else {
  console.log('\n✅ All JSX closing tag issues have been fixed!');
}