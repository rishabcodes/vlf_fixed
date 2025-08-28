const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Specific files that need fixing
const specificFiles = [
  'src/components/FAQPageContent.tsx',
  'src/app/locations/LocationsPageClient.tsx'
];

// Fix specific files first
specificFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Remove all patterns of multiple closing braces before attributes
    // Pattern: any number of closing braces followed by className or other attributes
    content = content.replace(/(\s*)\n\s*}\n\s*}\n\s*}?\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref|href|src|alt|width|height|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|whileTap|whileHover))/gm, '$1\n$2');
    
    // Remove single closing brace before attributes
    content = content.replace(/(\s*)\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref|href|src|alt|width|height|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role)=)/gm, '$1\n$2');
    
    // Fix LocationsPageClient.tsx specific issue - remove motion.a
    content = content.replace(/<motion\.a\b/g, '<a');
    content = content.replace(/<\/motion\.a>/g, '</a>');
    
    // Remove any framer-motion animation props
    content = content.replace(/\s*whileTap=\{[^}]*\}/g, '');
    content = content.replace(/\s*whileHover=\{[^}]*\}/g, '');
    content = content.replace(/\s*initial=\{[^}]*\}/g, '');
    content = content.replace(/\s*animate=\{[^}]*\}/g, '');
    content = content.replace(/\s*exit=\{[^}]*\}/g, '');
    content = content.replace(/\s*transition=\{[^}]*\}/g, '');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed ${filePath}`);
    }
  }
});

// Now fix all other files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**']
});

let fixedCount = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Main pattern to fix: closing braces before attributes
  content = content.replace(/\n\s*}\n\s*}\n\s*}?\n\s*(className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref)=/gm, '\n$1=');
  
  // Fix any remaining motion components
  content = content.replace(/<motion\./g, '<');
  content = content.replace(/<\/motion\./g, '</');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    fixedCount++;
    console.log(`✓ Fixed ${filePath}`);
  }
});

console.log(`\n=== Final Syntax Fix Complete ===`);
console.log(`Total files fixed: ${fixedCount + specificFiles.length}`);