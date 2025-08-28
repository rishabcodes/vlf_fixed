const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing stray closing braces in JSX attributes...\n');

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
  let fixed = false;
  
  // Split into lines for processing
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this line is just a closing brace
    if (trimmed === '}') {
      // Check if the previous line ends with a quote (attribute value)
      // and the next line starts with a style, className, or other attribute
      if (i > 0 && i < lines.length - 1) {
        const prevLine = lines[i - 1];
        const nextLine = lines[i + 1];
        
        // Common patterns to detect
        const prevEndsWithAttribute = /className="[^"]*"$|style="[^"]*"$|\w+="[^"]*"$/.test(prevLine.trim());
        const nextStartsWithAttribute = /^\s*(style|className|onClick|onChange|onSubmit|aria-\w+|data-\w+|ref|key|id|type|value|disabled|placeholder)[\s=]/.test(nextLine);
        const nextIsClosingTag = /^\s*>/.test(nextLine);
        const nextIsElement = /^\s*</.test(nextLine);
        
        if (prevEndsWithAttribute && (nextStartsWithAttribute || nextIsClosingTag)) {
          // Remove this stray closing brace
          lines[i] = '';
          fixed = true;
          totalFixed++;
          console.log(`  Fixed stray } at line ${i + 1} in ${file}`);
        }
      }
    }
  }
  
  if (fixed) {
    // Remove empty lines that were created
    content = lines.filter((line, idx) => {
      // Keep the line if it's not empty or if it's meant to be empty (between code blocks)
      return !(line === '' && lines[idx - 1] && lines[idx + 1] && 
               lines[idx - 1].trim().endsWith('"') && 
               /^\s*(style|className|onClick|onChange|onSubmit|aria-\w+|data-\w+|ref|key|id|type|value|disabled|placeholder)[\s=]/.test(lines[idx + 1]));
    }).join('\n');
    
    fs.writeFileSync(filePath, content);
    fixedFiles.push(file);
  }
});

console.log('\n=== Summary ===');
console.log(`Files fixed: ${fixedFiles.length}`);
console.log(`Total stray braces removed: ${totalFixed}`);

if (fixedFiles.length === 0) {
  console.log('\n✨ No stray closing braces found!');
} else {
  console.log('\n✅ All stray closing braces have been fixed!');
}