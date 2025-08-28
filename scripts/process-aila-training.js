#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 AILA Training Materials Processor\n');

// Function to safely list directory contents
function listDirectory(dirPath) {
  try {
    // Use ls command to handle special characters
    const result = execSync(`ls -la "${dirPath}" 2>/dev/null || echo "FAILED"`, {
      encoding: 'utf8',
    });
    if (result.includes('FAILED')) {
      return null;
    }
    return result;
  } catch (error) {
    return null;
  }
}

// Try different path variations
const homePath = require('os').homedir();
const desktopPath = path.join(homePath, 'Desktop');
const possiblePaths = [
  path.join(desktopPath, 'AILA CLE'),
  path.join(desktopPath, 'AILA'),
  path.join(desktopPath, 'AILA 2016'),
  // Try with space variations
  `${desktopPath}/AILA\\ CLE`,
  `${desktopPath}/AILA`,
  // Try with quotes
  `"${desktopPath}/AILA CLE"`,
  `"${desktopPath}/AILA"`,
];

console.log('Searching for AILA folders...\n');

let foundPath = null;
for (const testPath of possiblePaths) {
  console.log(`Checking: ${testPath}`);
  const contents = listDirectory(testPath);
  if (contents) {
    console.log('✅ Found!\n');
    foundPath = testPath;
    break;
  }
}

if (!foundPath) {
  console.log('\n❌ Could not access AILA folders.');
  console.log('\nTo manually process AILA materials:');
  console.log('1. Copy AILA training PDFs to: vasquez-law-website/training-materials/');
  console.log('2. Run: npm run process-training');
  process.exit(1);
}

// Process found directory
console.log(`\n📂 Processing: ${foundPath}\n`);

try {
  // Get list of files
  const filesOutput = execSync(
    `find ${foundPath} -type f \\( -name "*.pdf" -o -name "*.epub" -o -name "*.zip" \\) 2>/dev/null | head -100`,
    { encoding: 'utf8' }
  );
  const files = filesOutput
    .trim()
    .split('\n')
    .filter(f => f);

  console.log(`Found ${files.length} training files:\n`);

  // Categorize by topic
  const categories = {
    removal: [],
    business: [],
    family: [],
    fundamentals: [],
    practice: [],
    other: [],
  };

  files.forEach(file => {
    const basename = path.basename(file).toLowerCase();

    if (
      basename.includes('removal') ||
      basename.includes('deportation') ||
      basename.includes('asylum') ||
      basename.includes('detention') ||
      basename.includes('bond') ||
      basename.includes('eoir')
    ) {
      categories.removal.push(file);
    } else if (
      basename.includes('h-1b') ||
      basename.includes('h1b') ||
      basename.includes('perm') ||
      basename.includes('business') ||
      basename.includes('employment') ||
      basename.includes('eb-')
    ) {
      categories.business.push(file);
    } else if (
      basename.includes('family') ||
      basename.includes('i-130') ||
      basename.includes('adjustment') ||
      basename.includes('consular') ||
      basename.includes('k-1')
    ) {
      categories.family.push(file);
    } else if (
      basename.includes('fundamental') ||
      basename.includes('navigating') ||
      basename.includes('basics')
    ) {
      categories.fundamentals.push(file);
    } else if (
      basename.includes('practice') ||
      basename.includes('toolbox') ||
      basename.includes('handbook')
    ) {
      categories.practice.push(file);
    } else {
      categories.other.push(file);
    }
  });

  // Display categorized files
  console.log('📚 Training Materials by Category:\n');

  console.log('🚨 REMOVAL DEFENSE & LITIGATION:');
  categories.removal.forEach(f => console.log(`  - ${path.basename(f)}`));

  console.log('\n💼 BUSINESS IMMIGRATION:');
  categories.business.forEach(f => console.log(`  - ${path.basename(f)}`));

  console.log('\n👨‍👩‍👧‍👦 FAMILY IMMIGRATION:');
  categories.family.forEach(f => console.log(`  - ${path.basename(f)}`));

  console.log('\n📖 FUNDAMENTALS:');
  categories.fundamentals.forEach(f => console.log(`  - ${path.basename(f)}`));

  console.log('\n🏢 PRACTICE MANAGEMENT:');
  categories.practice.forEach(f => console.log(`  - ${path.basename(f)}`));

  // Generate training data structure
  const trainingData = {
    source: 'AILA CLE Materials',
    date: new Date().toISOString(),
    categories: {
      removal_defense: {
        files: categories.removal.map(f => path.basename(f)),
        topics: [
          'Bond hearings and detention',
          'Cancellation of removal',
          'Asylum and withholding',
          'Appeals to BIA and Circuit Courts',
          'Motions to reopen',
          'Prosecutorial discretion',
        ],
        key_materials: categories.removal
          .filter(
            f => path.basename(f).includes('handbook') || path.basename(f).includes('toolbox')
          )
          .map(f => path.basename(f)),
      },
      business_immigration: {
        files: categories.business.map(f => path.basename(f)),
        topics: [
          'H-1B process and cap',
          'PERM labor certification',
          'L-1 intracompany transfers',
          'Employment-based green cards',
          'O-1 extraordinary ability',
          'E-2 treaty investors',
        ],
        key_materials: categories.business
          .filter(f => path.basename(f).includes('handbook') || path.basename(f).includes('guide'))
          .map(f => path.basename(f)),
      },
      family_immigration: {
        files: categories.family.map(f => path.basename(f)),
        topics: [
          'I-130 family petitions',
          'Adjustment of status',
          'Consular processing',
          'K-1 fiancé visas',
          'Provisional waivers',
          'CSPA age-out protection',
        ],
        key_materials: categories.family
          .filter(
            f => path.basename(f).includes('toolbox') || path.basename(f).includes('practice')
          )
          .map(f => path.basename(f)),
      },
      fundamentals: {
        files: categories.fundamentals.map(f => path.basename(f)),
        description: 'Core immigration law concepts and procedures',
      },
      practice_management: {
        files: categories.practice.map(f => path.basename(f)),
        description: 'Law practice management and ethics',
      },
    },
  };

  // Save training data
  const outputDir = path.join(process.cwd(), 'src/config/agents/training-data');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, 'aila-training-index.json');
  fs.writeFileSync(outputFile, JSON.stringify(trainingData, null, 2));

  console.log(`\n✅ Training data index saved to: ${outputFile}`);

  // Generate recommendations
  console.log('\n📋 Next Steps:');
  console.log('1. Extract text from key PDFs using pdf-to-text tools');
  console.log('2. Create scenario-based training from practice advisories');
  console.log('3. Build FAQ responses from fundamentals materials');
  console.log('4. Extract forms guidance from toolbox materials');
  console.log('5. Create case strategy templates from handbooks');

  // Create extraction script
  const extractScript = `#!/bin/bash
# AILA PDF Text Extraction Script

echo "Extracting text from AILA training materials..."

# Create output directory
mkdir -p ./training-materials/extracted

# Extract text from PDFs (requires pdftotext)
# Install with: brew install poppler (Mac) or apt-get install poppler-utils (Linux)

for pdf in ${foundPath}/*.pdf; do
  if [ -f "$pdf" ]; then
    filename=$(basename "$pdf" .pdf)
    echo "Processing: $filename"
    pdftotext "$pdf" "./training-materials/extracted/$filename.txt" 2>/dev/null || echo "  ⚠️  Failed to extract"
  fi
done

echo "✅ Extraction complete!"
`;

  fs.writeFileSync(path.join(process.cwd(), 'scripts/extract-aila-pdfs.sh'), extractScript);
  execSync('chmod +x scripts/extract-aila-pdfs.sh');

  console.log('\n✅ Created PDF extraction script: scripts/extract-aila-pdfs.sh');
} catch (error) {
  console.error('\n❌ Error processing files:', error.message);
}

console.log('\n🎯 Training Integration Summary:');
console.log('- Immigration agents will be enhanced with AILA knowledge');
console.log('- Focus on practical scenarios and current law');
console.log('- Regular updates as new materials are added');
console.log('\nRun the PDF extraction script to process document content.');
