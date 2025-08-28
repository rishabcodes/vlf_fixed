const fs = require('fs');

const filePath = 'src/app/not-found.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of multiple closing braces before attributes
content = content.replace(/\n\s*}\n\s*}\n\s*}\n/g, '\n');

fs.writeFileSync(filePath, content);
console.log('✓ Fixed not-found.tsx');