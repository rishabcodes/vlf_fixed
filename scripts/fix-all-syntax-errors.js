const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Starting comprehensive syntax error fix...\n');

// Find all TypeScript/JavaScript files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**', '**/.next/**']
});

let totalFixed = 0;
let filesFixed = 0;

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixCount = 0;
  
  // Pattern 1: Multiple closing braces before className or other attributes
  // This handles any number of closing braces with various spacing
  content = content.replace(/(\s*)\n\s*}\s*\n\s*}\s*\n\s*}\s*\n\s*}\s*\n\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, '$1\n$2=');
  
  // Pattern 2: Three closing braces
  content = content.replace(/(\s*)\n\s*}\s*\n\s*}\s*\n\s*}\s*\n\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, '$1\n$2=');
  
  // Pattern 3: Two closing braces
  content = content.replace(/(\s*)\n\s*}\s*\n\s*}\s*\n\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, '$1\n$2=');
  
  // Pattern 4: Single closing brace
  content = content.replace(/(\s*)\n\s*}\s*\n\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, '$1\n$2=');
  
  // Pattern 5: Closing braces on same line before attribute
  content = content.replace(/\s*}\s*}\s*}\s*}\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/g, ' $1=');
  content = content.replace(/\s*}\s*}\s*}\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/g, ' $1=');
  content = content.replace(/\s*}\s*}\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/g, ' $1=');
  content = content.replace(/\s*}\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/g, ' $1=');
  
  // Pattern 6: Space + brace + space + attribute on next line
  content = content.replace(/\n\s*}\n\s+(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, '\n  $1=');
  
  // Remove any remaining motion component references
  content = content.replace(/<motion\./g, '<');
  content = content.replace(/<\/motion\./g, '</');
  
  // Remove framer-motion animation props
  content = content.replace(/\s*whileTap=\{[^}]*\}/g, '');
  content = content.replace(/\s*whileHover=\{[^}]*\}/g, '');
  content = content.replace(/\s*initial=\{[^}]*\}/g, '');
  content = content.replace(/\s*animate=\{[^}]*\}/g, '');
  content = content.replace(/\s*exit=\{[^}]*\}/g, '');
  content = content.replace(/\s*transition=\{[^}]*\}/g, '');
  content = content.replace(/\s*variants=\{[^}]*\}/g, '');
  content = content.replace(/\s*whileInView=\{[^}]*\}/g, '');
  content = content.replace(/\s*viewport=\{[^}]*\}/g, '');
  content = content.replace(/\s*drag\s*=\s*"[^"]*"/g, '');
  content = content.replace(/\s*dragConstraints=\{[^}]*\}/g, '');
  content = content.replace(/\s*dragElastic=\{[^}]*\}/g, '');
  
  // Fix href with extra closing brace
  content = content.replace(/href="([^"]+)"\s*}/g, 'href="$1"');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    filesFixed++;
    console.log(`✓ Fixed ${filePath}`);
  }
});

console.log('\n=== Fix Complete ===');
console.log(`Files checked: ${files.length}`);
console.log(`Files fixed: ${filesFixed}`);