const fs = require('fs');
const path = require('path');

console.log('🔧 Patching pdf-parse to prevent test file loading...');

try {
  // Find the pdf-parse module
  const pdfParsePath = path.join(process.cwd(), 'node_modules', 'pdf-parse', 'index.js');

  if (fs.existsSync(pdfParsePath)) {
    // Read the file
    let content = fs.readFileSync(pdfParsePath, 'utf8');

    // Replace the test file loading line
    content = content.replace(
      /fs\.readFileSync\(['"]\.\/test\/data\/05-versions-space\.pdf['"]\)/g,
      'Buffer.from("")'
    );

    // Write the patched file
    fs.writeFileSync(pdfParsePath, content);
    console.log('✅ pdf-parse patched successfully!');
  } else {
    console.log('⚠️  pdf-parse module not found, skipping patch');
  }
} catch (error) {
  console.error('❌ Failed to patch pdf-parse:', error.message);
  // Don't fail the build
  process.exit(0);
}
