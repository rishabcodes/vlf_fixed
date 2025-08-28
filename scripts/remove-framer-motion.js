const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/JavaScript files in src
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
  ignore: ['**/node_modules/**', '**/Zak-backup/**']
});

let processedCount = 0;
let modifiedCount = 0;
const backupDir = 'Zak-backup/framer-motion-cleanup-2025-08-13';

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file contains framer-motion imports
  if (content.includes('framer-motion')) {
    processedCount++;
    
    // Create backup
    const backupPath = path.join(backupDir, path.basename(filePath));
    fs.writeFileSync(backupPath, content);
    
    let modified = content;
    
    // Remove framer-motion imports
    modified = modified.replace(/import\s+{[^}]*}\s+from\s+['"]framer-motion['"];?\n?/g, '');
    modified = modified.replace(/import\s+\*\s+as\s+\w+\s+from\s+['"]framer-motion['"];?\n?/g, '');
    
    // Replace motion components with regular divs
    // Handle motion.div, motion.span, motion.button, etc.
    modified = modified.replace(/<motion\.(\w+)/g, '<$1');
    modified = modified.replace(/<\/motion\.(\w+)>/g, '</$1>');
    
    // Replace AnimatePresence with Fragment
    modified = modified.replace(/<AnimatePresence[^>]*>/g, '<>');
    modified = modified.replace(/<\/AnimatePresence>/g, '</>');
    
    // Remove animation props (common ones)
    const animationProps = [
      'initial', 'animate', 'exit', 'transition', 'variants',
      'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
      'drag', 'dragConstraints', 'dragElastic', 'dragMomentum',
      'layout', 'layoutId', 'onAnimationStart', 'onAnimationComplete',
      'custom', 'inherit', 'transformTemplate', 'style', 'viewport'
    ];
    
    animationProps.forEach(prop => {
      // Remove props that are objects or strings
      const regex1 = new RegExp(`\\s${prop}={[^}]*}`, 'g');
      const regex2 = new RegExp(`\\s${prop}="[^"]*"`, 'g');
      const regex3 = new RegExp(`\\s${prop}='[^']*'`, 'g');
      modified = modified.replace(regex1, '');
      modified = modified.replace(regex2, '');
      modified = modified.replace(regex3, '');
    });
    
    // Clean up any double spaces or empty lines
    modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (modified !== content) {
      fs.writeFileSync(filePath, modified);
      modifiedCount++;
      console.log(`✓ Processed: ${filePath}`);
    }
  }
});

console.log(`\n=== Framer Motion Cleanup Complete ===`);
console.log(`Files checked: ${files.length}`);
console.log(`Files with framer-motion: ${processedCount}`);
console.log(`Files modified: ${modifiedCount}`);
console.log(`Backups saved to: ${backupDir}`);