const fs = require('fs');
const path = require('path');

// Define essential pages that every law firm website needs
const ESSENTIAL_PAGES = {
  'Core Pages': [
    { path: '/', name: 'Homepage', status: '✅' },
    { path: '/about', name: 'About Us', status: '✅' },
    { path: '/attorneys', name: 'Our Attorneys', status: '✅' },
    { path: '/practice-areas', name: 'Practice Areas Hub', status: '✅' },
    { path: '/contact', name: 'Contact Us', status: '✅' },
    { path: '/blog', name: 'Blog', status: '✅' },
    { path: '/testimonials', name: 'Client Testimonials', status: '❌' },
    { path: '/case-results', name: 'Case Results', status: '❌' },
    { path: '/faqs', name: 'Frequently Asked Questions', status: '❌' },
    { path: '/resources', name: 'Legal Resources', status: '❌' },
    { path: '/privacy-policy', name: 'Privacy Policy', status: '❌' },
    { path: '/terms-of-service', name: 'Terms of Service', status: '❌' },
    { path: '/disclaimer', name: 'Legal Disclaimer', status: '❌' },
  ],
  'Immigration Pages': [
    { path: '/practice-areas/immigration', name: 'Immigration Overview', status: '✅' },
    { path: '/immigration-resources', name: 'Immigration Resources', status: '❌' },
    { path: '/immigration-forms', name: 'Immigration Forms & Checklists', status: '❌' },
    { path: '/immigration-news', name: 'Immigration News & Updates', status: '❌' },
    { path: '/immigration-faqs', name: 'Immigration FAQs', status: '❌' },
  ],
  'Service Pages': [
    { path: '/free-consultation', name: 'Free Consultation', status: '❌' },
    { path: '/appointment', name: 'Schedule Appointment', status: '❌' },
    { path: '/client-portal', name: 'Client Portal', status: '❌' },
    { path: '/payment-options', name: 'Payment Options', status: '❌' },
    { path: '/legal-fees', name: 'Legal Fees & Costs', status: '❌' },
  ],
  'Marketing Pages': [
    { path: '/reviews', name: 'Client Reviews', status: '❌' },
    { path: '/why-choose-us', name: 'Why Choose Vasquez Law', status: '❌' },
    { path: '/community-involvement', name: 'Community Involvement', status: '❌' },
    { path: '/awards-recognition', name: 'Awards & Recognition', status: '❌' },
    { path: '/press-releases', name: 'Press Releases', status: '❌' },
  ],
};

console.log('🔍 Vasquez Law Website - Missing Pages Analysis\n');
console.log('='.repeat(60) + '\n');

// Check which pages exist
const appDir = path.join(process.cwd(), 'src/app');
let totalPages = 0;
let existingPages = 0;
let missingPages = 0;

Object.entries(ESSENTIAL_PAGES).forEach(([category, pages]) => {
  console.log(`📁 ${category}:`);

  pages.forEach(page => {
    totalPages++;
    const pagePath = path.join(appDir, page.path, 'page.tsx');
    const exists = fs.existsSync(pagePath);

    if (exists || page.status === '✅') {
      existingPages++;
      console.log(`   ✅ ${page.name} (${page.path})`);
    } else {
      missingPages++;
      console.log(`   ❌ ${page.name} (${page.path})`);
    }
  });

  console.log('');
});

console.log('='.repeat(60));
console.log(`📊 Summary:`);
console.log(`   Total Essential Pages: ${totalPages}`);
console.log(`   Existing Pages: ${existingPages}`);
console.log(`   Missing Pages: ${missingPages}`);
console.log(`   Completion: ${Math.round((existingPages / totalPages) * 100)}%\n`);

// Generate migration priority list
const migrationPriority = [];

Object.entries(ESSENTIAL_PAGES).forEach(([category, pages]) => {
  pages.forEach(page => {
    if (page.status === '❌') {
      migrationPriority.push({
        category,
        ...page,
      });
    }
  });
});

console.log('🎯 Migration Priority List:\n');
migrationPriority.forEach((page, index) => {
  console.log(`${index + 1}. ${page.name}`);
  console.log(`   Category: ${page.category}`);
  console.log(`   Path: ${page.path}`);
  console.log('');
});

// Save migration plan
const migrationPlan = {
  date: new Date().toISOString(),
  missingPages: migrationPriority,
  totalMissing: missingPages,
  completionRate: Math.round((existingPages / totalPages) * 100),
  recommendations: [
    'Start with legal compliance pages (Privacy Policy, Terms, Disclaimer)',
    'Add client trust pages (Testimonials, Case Results, Reviews)',
    'Create resource pages for better SEO and user value',
    'Implement service-oriented pages for conversions',
    'Add marketing pages to showcase firm strengths',
  ],
};

fs.writeFileSync(
  path.join(process.cwd(), 'migration-plan.json'),
  JSON.stringify(migrationPlan, null, 2)
);

console.log('✅ Migration plan saved to: migration-plan.json');
