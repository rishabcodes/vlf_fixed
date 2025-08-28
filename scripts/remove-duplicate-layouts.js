#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

// Files to process - from the grep results
const filesToProcess = [
  'src/app/locations/nc/cary/page.tsx',
  'src/app/locations/charlotte/criminal-defense-lawyer/page.tsx',
  'src/app/locations/charlotte/immigration-lawyer/page.tsx',
  'src/app/locations/charlotte/personal-injury-attorney/page.tsx',
  'src/app/locations/charlotte/workers-comp-attorney/page.tsx',
  'src/app/locations/raleigh/immigration-lawyer/page.tsx',
  'src/app/locations/raleigh/personal-injury-attorney/page.tsx',
  'src/app/locations/charlotte/page.tsx',
  'src/app/locations/durham/page.tsx',
  'src/app/locations/orlando/page.tsx',
  'src/app/locations/raleigh/page.tsx',
  'src/app/locations/smithfield/page.tsx',
  'src/app/locations/winston-salem/page.tsx',
  'src/app/page.tsx',
  'src/app/es/preguntas-frecuentes/page.tsx',
  'src/app/es/abogados/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/blog/BlogPageClient.tsx',
  'src/app/attorneys/page.tsx',
  'src/app/cookie-policy/page.tsx',
  'src/app/accessibility/page.tsx',
  'src/app/legal-disclaimer/page.tsx',
  'src/app/test-ticker-hero/page.tsx',
  'src/app/es/page.tsx',
  'src/app/es/citas/gestionar/page.tsx',
  'src/app/es/nuestro-equipo/NuestroEquipoPageClient.tsx',
  'src/app/es/dashboard/page.tsx',
  'src/app/es/blog/layout.tsx',
  'src/app/es/agentes/page.tsx',
  'src/app/es/contacto/page.tsx',
  'src/app/es/auth/forgot-password/page.tsx',
  'src/app/es/auth/signin/page.tsx',
  'src/app/es/auth/signup/page.tsx',
  'src/app/es/calculadoras/page.tsx',
  'src/app/our-team/OurTeamPageClient.tsx',
  'src/app/locations/LocationsPageClient.tsx',
  'src/app/faq/page.tsx',
  'src/app/scholarship/ScholarshipPageClient.tsx',
  // Template files that use MasterLayout but shouldn't be modified
  // 'src/components/templates/*.tsx', // We'll handle these separately
];

// Template files to check but not modify
const templateFiles = [
  'src/components/templates/ModernPracticeAreaTemplate.tsx',
  'src/components/About/AboutPageClient.tsx',
  'src/components/templates/CityPageTemplate.tsx',
  'src/components/templates/BlogPageTemplate.tsx',
  'src/components/templates/NeighborhoodPageTemplate.tsx',
  'src/components/templates/SpanishLocationPageTemplate.tsx',
  'src/components/templates/PracticeAreaTemplate.tsx',
  'src/components/templates/HomePageTemplate.tsx',
  'src/components/templates/ModernPracticeAreaTemplateV2.tsx',
  'src/components/templates/LocationServicePageTemplate.tsx',
  'src/components/templates/LocationPageTemplate.tsx',
  'src/components/Scholarships/ScholarshipsPageClient.tsx',
  'src/components/attorneys/AttorneyPageTemplate.tsx',
];

async function processFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    
    let modified = content;
    let changes = [];
    
    // Remove MasterLayout and SSRSafeMasterLayout imports
    const importRegex = /import\s*{[^}]*(?:MasterLayout|SSRSafeMasterLayout)[^}]*}\s*from\s*['"][^'"]+['"];\s*\n?/g;
    const importMatches = modified.match(importRegex);
    if (importMatches) {
      importMatches.forEach(match => {
        modified = modified.replace(match, '');
        changes.push(`Removed import: ${match.trim()}`);
      });
    }
    
    // Remove MasterLayout wrapper - handle multi-line patterns
    const layoutWrapperRegex = /<(?:MasterLayout|SSRSafeMasterLayout)[^>]*>[\s\S]*?<\/(?:MasterLayout|SSRSafeMasterLayout)>/g;
    const wrapperMatches = modified.match(layoutWrapperRegex);
    if (wrapperMatches) {
      wrapperMatches.forEach(match => {
        // Extract the content inside the wrapper
        const contentRegex = /<(?:MasterLayout|SSRSafeMasterLayout)[^>]*>([\s\S]*?)<\/(?:MasterLayout|SSRSafeMasterLayout)>/;
        const contentMatch = match.match(contentRegex);
        if (contentMatch && contentMatch[1]) {
          modified = modified.replace(match, contentMatch[1].trim());
          changes.push('Removed layout wrapper');
        }
      });
    }
    
    // Clean up any double blank lines
    modified = modified.replace(/\n\n\n+/g, '\n\n');
    
    if (changes.length > 0) {
      await fs.writeFile(fullPath, modified, 'utf8');
      console.log(`✅ ${filePath}:`);
      changes.forEach(change => console.log(`   - ${change}`));
      return true;
    } else {
      console.log(`⏭️  ${filePath}: No changes needed`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function checkTemplateFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    
    const hasMasterLayout = content.includes('MasterLayout') || content.includes('SSRSafeMasterLayout');
    
    if (hasMasterLayout) {
      console.log(`📋 Template ${filePath}: Contains MasterLayout (requires manual review)`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error checking template ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Removing duplicate MasterLayout imports and wrappers...\n');
  
  let processedCount = 0;
  let modifiedCount = 0;
  
  // Process regular files
  console.log('📝 Processing page files:\n');
  for (const file of filesToProcess) {
    const wasModified = await processFile(file);
    processedCount++;
    if (wasModified) modifiedCount++;
  }
  
  console.log('\n📋 Checking template files (these need manual review):\n');
  let templateCount = 0;
  for (const file of templateFiles) {
    const hasLayout = await checkTemplateFile(file);
    if (hasLayout) templateCount++;
  }
  
  console.log('\n✅ Summary:');
  console.log(`   - Files processed: ${processedCount}`);
  console.log(`   - Files modified: ${modifiedCount}`);
  console.log(`   - Templates with MasterLayout: ${templateCount}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review the changes using git diff');
  console.log('   2. Test the application to ensure layouts work correctly');
  console.log('   3. Manually review template files if needed');
}

main().catch(console.error);