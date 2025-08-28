const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/JavaScript files in src
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**']
});

let fixedCount = 0;
let totalIssues = 0;

console.log(`Checking ${files.length} files for syntax issues...`);

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fileIssues = 0;
  
  // Pattern 1: Remove multiple closing braces before className or other JSX attributes
  // This handles cases like:
  //   <h1
  //    }
  //    }
  //    className="..."
  content = content.replace(/(\s*<\w+[^>]*)\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref|href|src|alt|width|height|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role))/gm, '$1\n$2');
  
  // Pattern 2: Remove triple closing braces before attributes
  content = content.replace(/(\s*<\w+[^>]*)\n\s*}\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref|href|src|alt|width|height|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role))/gm, '$1\n$2');
  
  // Pattern 3: Remove single closing brace before attributes when it's clearly wrong
  content = content.replace(/(\s*<\w+[^>]*)\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref|href|src|alt|width|height|type|name|value|placeholder|disabled|checked|selected|multiple|required|readOnly|autoFocus|tabIndex|role)=)/gm, '$1\n$2');
  
  // Pattern 4: Fix closing braces in the middle of JSX opening tags
  content = content.replace(/(<\w+[^>]*)\n\s*}\n\s*}\n\s*}\n\s*}/gm, '$1');
  
  // Pattern 5: Fix pattern where braces appear after component name but before attributes
  content = content.replace(/(<\w+)\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref))/gm, '$1\n$2');
  
  // Pattern 6: Clean up any remaining double/triple closing braces on consecutive lines that shouldn't be there
  // But be careful not to remove legitimate closing braces for functions/conditionals
  content = content.replace(/^(\s*)}\n\s*}\n\s*}\n(\s*(?:className|style|onClick|onChange|onSubmit|aria-\w+|data-\w+|id|key|ref))/gm, '$1$2');
  
  // Pattern 7: Remove framer-motion related comments
  content = content.replace(/\s*\/\/ PERFORMANCE: Framer Motion[^\n]*/g, '');
  content = content.replace(/\s*\/\/ TODO: Convert[^\n]*to react-spring/g, '');
  
  // Pattern 8: Clean up empty lines that may have been left
  content = content.replace(/\n\s*\n\s*\n+/g, '\n\n');
  
  // Check if we made any changes
  if (content !== originalContent) {
    // Count the number of issues fixed
    const matches = originalContent.match(/}\n\s*}\n\s*(?:className|style|onClick)/g);
    if (matches) {
      fileIssues = matches.length;
      totalIssues += fileIssues;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed ${filePath} (${fileIssues} issues)`);
    fixedCount++;
  }
});

console.log(`\n=== Framer Motion Syntax Cleanup Complete ===`);
console.log(`Files checked: ${files.length}`);
console.log(`Files fixed: ${fixedCount}`);
console.log(`Total issues fixed: ${totalIssues}`);