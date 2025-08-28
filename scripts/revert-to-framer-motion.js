#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to skip (already fixed or special cases)
const SKIP_FILES = [
  'src/components/ChatWidget/UnifiedModernChatbot.tsx',
];

// Function to convert react-spring to framer-motion
function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Skip if file doesn't use react-spring
  if (!content.includes('@react-spring/web')) {
    return false;
  }
  
  console.log(`Converting: ${filePath}`);
  
  // Replace imports
  if (content.includes("import { animated, useSpring, useTransition, useChain, config } from '@react-spring/web';")) {
    content = content.replace(
      "import { animated, useSpring, useTransition, useChain, config } from '@react-spring/web';",
      "import { motion, AnimatePresence } from 'framer-motion';"
    );
    modified = true;
  } else if (content.includes("from '@react-spring/web'")) {
    // Handle other import patterns
    content = content.replace(
      /import\s*{[^}]+}\s*from\s*['"]@react-spring\/web['"]/g,
      "import { motion, AnimatePresence } from 'framer-motion'"
    );
    modified = true;
  }
  
  // Replace animated.div with motion.div
  content = content.replace(/animated\.div/g, 'motion.div');
  content = content.replace(/animated\.button/g, 'motion.button');
  content = content.replace(/animated\.span/g, 'motion.span');
  content = content.replace(/animated\.section/g, 'motion.section');
  content = content.replace(/animated\.article/g, 'motion.article');
  content = content.replace(/animated\.header/g, 'motion.header');
  content = content.replace(/animated\.footer/g, 'motion.footer');
  content = content.replace(/animated\.nav/g, 'motion.nav');
  content = content.replace(/animated\.main/g, 'motion.main');
  content = content.replace(/animated\.aside/g, 'motion.aside');
  content = content.replace(/animated\.img/g, 'motion.img');
  content = content.replace(/animated\.svg/g, 'motion.svg');
  content = content.replace(/animated\.path/g, 'motion.path');
  content = content.replace(/animated\.circle/g, 'motion.circle');
  content = content.replace(/animated\.rect/g, 'motion.rect');
  content = content.replace(/animated\.h1/g, 'motion.h1');
  content = content.replace(/animated\.h2/g, 'motion.h2');
  content = content.replace(/animated\.h3/g, 'motion.h3');
  content = content.replace(/animated\.p/g, 'motion.p');
  content = content.replace(/animated\.ul/g, 'motion.ul');
  content = content.replace(/animated\.li/g, 'motion.li');
  content = content.replace(/animated\.a/g, 'motion.a');
  content = content.replace(/animated\.form/g, 'motion.form');
  content = content.replace(/animated\.input/g, 'motion.input');
  content = content.replace(/animated\.textarea/g, 'motion.textarea');
  
  // Replace useSpring with motion props
  // This is a simplified conversion - may need manual adjustment
  content = content.replace(
    /style={useSpring\({([^}]+)}\)}/g,
    (match, props) => {
      // Extract animation values
      if (props.includes('opacity') || props.includes('scale') || props.includes('y')) {
        return 'animate={{ opacity: 1, scale: 1, y: 0 }}';
      }
      return 'animate={{ opacity: 1 }}';
    }
  );
  
  // Remove standalone useSpring calls
  content = content.replace(
    /const\s+\w+\s*=\s*useSpring\([^)]+\);?\n/g,
    ''
  );
  
  // Add AnimatePresence if not present but needed
  if (content.includes('<motion.') && !content.includes('AnimatePresence') && !content.includes('framer-motion')) {
    // Already has motion elements but missing import
    const importMatch = content.match(/import\s+{[^}]*motion[^}]*}\s+from\s+['"]framer-motion['"]/);
    if (importMatch) {
      content = content.replace(
        /import\s+{\s*motion\s*}\s+from\s+['"]framer-motion['"]/,
        "import { motion, AnimatePresence } from 'framer-motion'"
      );
    }
  }
  
  if (modified || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

// Main function
function main() {
  console.log('Starting reversion from react-spring to framer-motion...\n');
  
  // Find all TypeScript/TSX files
  const files = glob.sync('src/**/*.{ts,tsx}', {
    ignore: SKIP_FILES
  });
  
  let convertedCount = 0;
  let errorCount = 0;
  const errors = [];
  
  files.forEach(file => {
    try {
      if (convertFile(file)) {
        convertedCount++;
      }
    } catch (error) {
      errorCount++;
      errors.push({ file, error: error.message });
    }
  });
  
  console.log('\n========================================');
  console.log('Conversion Complete!');
  console.log(`Files converted: ${convertedCount}`);
  console.log(`Files with errors: ${errorCount}`);
  
  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(({ file, error }) => {
      console.log(`  ${file}: ${error}`);
    });
  }
  
  console.log('\n⚠️  Note: Some conversions may need manual adjustment:');
  console.log('  - Complex useSpring animations');
  console.log('  - useTransition and useChain usage');
  console.log('  - Custom spring configs');
  console.log('\nPlease review the changes and test your animations.');
}

// Check if glob is installed
try {
  require.resolve('glob');
  main();
} catch (e) {
  console.log('Installing required dependency...');
  require('child_process').execSync('npm install glob', { stdio: 'inherit' });
  main();
}