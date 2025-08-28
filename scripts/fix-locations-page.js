const fs = require('fs');

const filePath = 'src/app/locations/LocationsPageClient.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of multiple closing braces between JSX elements
content = content.replace(/}\n\s*}\n\s*}+/g, '');

// Fix specific patterns where animation props were removed
content = content.replace(/(<div[^>]*)\n\s*}\n\s*}\n\s*}\n(\s*>)/g, '$1\n$2');
content = content.replace(/(<div[^>]*)\n\s*}\n\s*}\n(\s*className)/g, '$1\n$2');
content = content.replace(/(<[A-Za-z]+[^>]*)\n\s*}\n\s*}+\n(\s*>)/g, '$1\n$2');

// Fix the specific line patterns
content = content.replace(/(\s+<div)\n\s+}\n\s+}\n\s+}\n(\s+>)/g, '$1$2');
content = content.replace(/(\s+<div)\n\s+}\n\s+}\n\s+}\n\s+}\n(\s+className)/g, '$1\n$2');

fs.writeFileSync(filePath, content);
console.log('✓ Fixed LocationsPageClient.tsx');