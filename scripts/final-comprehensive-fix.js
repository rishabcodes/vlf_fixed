const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Running final comprehensive syntax fix...\n');

// Find all TypeScript/JavaScript files
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**', '**/.next/**']
});

let totalFixed = 0;
let filesFixed = [];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixCount = 0;
  
  // Fix missing closing braces in onClick, onChange, etc.
  // Pattern: onClick={() => something) className= (missing closing brace)
  content = content.replace(/(\s+)(on[A-Z]\w+)=\{(\([^)]*\)\s*=>\s*[^}]+)\)\s+(className|style|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={$3)}\n$1$4=');
  
  // Pattern: onClick={() => setFunction(...)) className= (missing closing brace)
  content = content.replace(/(\s+)(on[A-Z]\w+)=\{(\([^)]*\)\s*=>\s*\w+\([^)]*\))\s+(className|style|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={$3}\n$1$4=');
  
  // Pattern: href={something className= (missing closing brace)
  content = content.replace(/(\s+)(href|src|alt|key|ref)=\{([^}]+)\s+(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={$3}\n$1$4=');
  
  // Pattern: showLabels={true className= (missing closing brace)
  content = content.replace(/(\s+)(\w+)=\{(true|false|\d+|'[^']*'|"[^"]*")\s+(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={$3}\n$1$4=');
  
  // Pattern: key={variable.property className= (missing closing brace)
  content = content.replace(/(\s+)(key|id|ref)=\{(\w+(?:\.\w+)?)\s+(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={$3}\n$1$4=');
  
  // Pattern: onClick={() => { ... }) className= (missing space/newline)
  content = content.replace(/\}\)\s*(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '})\n        $1=');
  
  // Pattern: href={`tel:${...}` className= (missing closing brace)
  content = content.replace(/(\s+)(href|src)=\{`([^`]+)`\s+(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '$1$2={`$3`}\n$1$4=');
  
  // Pattern: onClick={() => functionCall(); className= (missing closing braces)
  content = content.replace(/onClick=\{(\([^)]*\)\s*=>\s*\{[^}]+);(\s+)(className|style|onClick|onChange|onSubmit|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    'onClick={$1;\n        }}$2$3=');
  
  // Pattern: key={index} onClick={...} className= (ensure proper spacing)
  content = content.replace(/\}\s*\n\s*(on[A-Z]\w+|className|style|href|src|alt|id|key|ref|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role|aria-\w+|data-\w+)=/gm, 
    '}\n                $1=');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    filesFixed.push(filePath);
    totalFixed++;
  }
});

console.log('\n=== Final Comprehensive Fix Complete ===');
console.log(`Files checked: ${files.length}`);
console.log(`Files fixed: ${totalFixed}`);

if (filesFixed.length > 0) {
  console.log('\nFixed files:');
  filesFixed.forEach(file => console.log(`  ✓ ${file}`));
}