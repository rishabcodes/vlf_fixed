const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing all stray closing braces in the codebase...\n');

let totalFixed = 0;
const fixedFiles = [];

// Find all TypeScript React files
const files = glob.sync('**/*.{tsx,jsx}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**', '**/Zak-backup/**']
});

console.log(`Found ${files.length} files to check\n`);

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixCount = 0;
  
  // Split into lines for processing
  const lines = content.split('\n');
  const linesToRemove = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this line is just a closing brace
    if (trimmed === '}') {
      // Check context to determine if this is a stray brace
      const prevLine = i > 0 ? lines[i - 1] : '';
      const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
      
      // Patterns that indicate this is a stray brace in JSX
      const prevIsJSXElement = /<\w+$/.test(prevLine.trim()) || 
                               /<\w+\s*$/.test(prevLine.trim()) ||
                               /^\s*<\w+$/.test(prevLine.trim());
      
      const nextIsAttribute = /^\s*(className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|ref|key|id|type|value|disabled|placeholder|href|src|alt|fill|viewBox|onMouseEnter|onMouseLeave|role|tabIndex|htmlFor|name|required|autoComplete|maxLength|min|max|step|pattern|accept|multiple)[\s=]/.test(nextLine);
      
      const prevEndsWithAttribute = /\w+="[^"]*"$/.test(prevLine.trim()) ||
                                    /\w+={[^}]*}$/.test(prevLine.trim()) ||
                                    /\w+$/.test(prevLine.trim());
      
      // Check if it's between JSX tags or attributes
      if ((prevIsJSXElement && nextIsAttribute) || 
          (prevEndsWithAttribute && nextIsAttribute)) {
        linesToRemove.push(i);
        fixCount++;
        console.log(`  Found stray } at line ${i + 1} in ${file}`);
      }
    }
  }
  
  // Remove lines marked for removal
  if (linesToRemove.length > 0) {
    const newLines = lines.filter((_, index) => !linesToRemove.includes(index));
    content = newLines.join('\n');
    
    fs.writeFileSync(filePath, content);
    fixedFiles.push(file);
    totalFixed += fixCount;
  }
});

// Also check for specific patterns where } appears in the middle of JSX attributes
console.log('\nChecking for inline stray braces...\n');

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix patterns like: attribute={value} anotherAttribute
  // Should be: attribute={value} anotherAttribute
  // This is already correct, but check for: attribute={value attribute
  
  // Fix patterns where } appears before an attribute without proper spacing
  content = content.replace(/}(\s*)(className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|ref|key|id|type|value|disabled|placeholder|href|src|alt|fill|viewBox)=/g, '}\n$1$2=');
  
  // Fix patterns where there's a stray } in attribute value position
  content = content.replace(/=\s*}\s*(className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|ref|key|id|type|value|disabled|placeholder|href|src|alt|fill|viewBox)=/g, '\n$1=');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    if (!fixedFiles.includes(file)) {
      fixedFiles.push(file);
    }
    console.log(`  Fixed inline issues in ${file}`);
  }
});

console.log('\n=== Summary ===');
console.log(`Files fixed: ${fixedFiles.length}`);
console.log(`Total stray braces removed: ${totalFixed}`);

if (fixedFiles.length === 0) {
  console.log('\n✨ No stray closing braces found!');
} else {
  console.log('\n✅ All stray closing braces have been fixed!');
  console.log('\nFixed files:');
  fixedFiles.forEach(file => console.log(`  - ${file}`));
}