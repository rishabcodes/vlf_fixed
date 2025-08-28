#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to find all page files
function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.ts') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Get all pages
const appDir = path.join(__dirname, '..', 'src', 'app');
const allPages = findPageFiles(appDir);

// Separate English and Spanish pages
const englishPages = [];
const spanishPages = [];

allPages.forEach(page => {
  const relativePath = path.relative(appDir, page);
  const normalized = relativePath.replace(/\\/g, '/').replace(/\/page\.(tsx|ts)$/, '');
  
  if (normalized.startsWith('es/')) {
    spanishPages.push(normalized);
  } else {
    englishPages.push(normalized);
  }
});

// Function to normalize page paths for comparison
function normalizePath(pagePath) {
  // Remove language prefix
  let normalized = pagePath.replace(/^es\//, '');
  
  // Handle special cases - map Spanish URLs to English equivalents
  const translations = {
    'abogados': 'attorneys',
    'acerca-de': 'about',
    'areas-de-practica': 'practice-areas',
    'defensa-criminal': 'criminal-defense',
    'lesiones-personales': 'personal-injury',
    'compensacion-laboral': 'workers-compensation',
    'derecho-familia': 'family-law',
    'inmigracion': 'immigration',
    'violaciones-de-transito': 'traffic-violations',
    'multas-de-transito': 'traffic-violations',
    'infracciones-transito': 'traffic-violations',
    'infracciones-trafico': 'traffic-violations',
    'contacto': 'contact',
    'resultados-casos': 'case-results',
    'testimonios': 'testimonials',
    'calculadoras': 'calculators',
    'citas/gestionar': 'appointments/manage',
    'consulta-ia': 'ai-consultation',
    'evaluacion-ia': 'ai-evaluation',
    'ubicaciones': 'locations',
    'cerca-de-mi': 'near-me',
    'preguntas-frecuentes': 'faq',
    'politica-privacidad': 'privacy-policy',
    'terminos-servicio': 'terms-of-service',
    'mapa-del-sitio': 'sitemap',
    'medios': 'media',
    'medios-de-comunicacion': 'media',
    'nuestro-equipo': 'attorneys',
    'agentes': 'agents',
    'becas': 'scholarships',
    'pago': 'payment',
    'hacer-pago': 'make-payment',
    'pago-seguro': 'secure-payment',
    'consulta-gratis': 'free-consultation',
    'consulta-gratuita': 'free-consultation',
    'contacto-rapido': 'quick-contact',
    'categoria': 'category',
    'accidentes-de-auto': 'car-accidents',
    'accidentes-auto': 'car-accidents',
    'abogado-espanol': 'spanish-speaking-lawyer',
    'abogado-que-habla-español': 'spanish-speaking-lawyer',
    'bancarrota': 'bankruptcy',
    'derecho-familiar': 'family-law',
    'ubicacion-oficina-charlotte-nc': 'charlotte-nc-office-location',
    'ubicacion-oficina-goldsboro': 'goldsboro-office-location',
    'ubicacion-oficina-orlando-fl': 'orlando-fl-office-location',
    'ubicacion-oficina-raleigh-nc': 'raleigh-nc-office-location',
    'ubicacion-oficina-smithfield': 'smithfield-office-location',
    'cancelar-suscripcion': 'unsubscribe'
  };
  
  // Apply translations to each segment
  const segments = normalized.split('/');
  const translatedSegments = segments.map(segment => translations[segment] || segment);
  
  return translatedSegments.join('/');
}

// Find missing translations
const englishNormalized = new Map();
const spanishNormalized = new Map();

englishPages.forEach(page => {
  const normalized = normalizePath(page);
  englishNormalized.set(normalized, page);
});

spanishPages.forEach(page => {
  const normalized = normalizePath(page);
  spanishNormalized.set(normalized, page);
});

// Find pages without translations
const missingSpanish = [];
const missingEnglish = [];

// Check English pages without Spanish
englishNormalized.forEach((originalPath, normalized) => {
  if (!spanishNormalized.has(normalized)) {
    missingSpanish.push(originalPath);
  }
});

// Check Spanish pages without English
spanishNormalized.forEach((originalPath, normalized) => {
  if (!englishNormalized.has(normalized)) {
    missingEnglish.push(originalPath);
  }
});

// Sort for better readability
missingSpanish.sort();
missingEnglish.sort();

// Create report
let report = '# Missing Translations Report\n\n';
report += `Generated on: ${new Date().toISOString()}\n\n`;
report += '## Summary\n\n';
report += `- Total English pages: ${englishPages.length}\n`;
report += `- Total Spanish pages: ${spanishPages.length}\n`;
report += `- English pages missing Spanish translation: ${missingSpanish.length}\n`;
report += `- Spanish pages missing English translation: ${missingEnglish.length}\n\n`;

// Breakdown by category
const categories = {
  locations: /^locations\//,
  nearMe: /^near-me\//,
  practiceAreas: /^practice-areas\//,
  blog: /^blog\//,
  admin: /^admin\//,
  attorneys: /^attorneys\//,
  auth: /^auth\//,
  dashboard: /^dashboard\//,
  api: /^api\//,
  other: /^/
};

function categorizePages(pages) {
  const categorized = {
    locations: [],
    nearMe: [],
    practiceAreas: [],
    blog: [],
    admin: [],
    attorneys: [],
    auth: [],
    dashboard: [],
    api: [],
    other: []
  };
  
  pages.forEach(page => {
    let added = false;
    for (const [category, regex] of Object.entries(categories)) {
      if (category !== 'other' && regex.test(page)) {
        categorized[category].push(page);
        added = true;
        break;
      }
    }
    if (!added) {
      categorized.other.push(page);
    }
  });
  
  return categorized;
}

report += '## English Pages Missing Spanish Translation\n\n';
const categorizedMissingSpanish = categorizePages(missingSpanish);

for (const [category, pages] of Object.entries(categorizedMissingSpanish)) {
  if (pages.length > 0) {
    report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${pages.length})\n\n`;
    pages.forEach(page => {
      report += `- /${page}\n`;
    });
    report += '\n';
  }
}

report += '## Spanish Pages Missing English Translation\n\n';
const categorizedMissingEnglish = categorizePages(missingEnglish);

for (const [category, pages] of Object.entries(categorizedMissingEnglish)) {
  if (pages.length > 0) {
    report += `### ${category.charAt(0).toUpperCase() + category.slice(1)} (${pages.length})\n\n`;
    pages.forEach(page => {
      report += `- /${page}\n`;
    });
    report += '\n';
  }
}

// Location pages detail
report += '## Location Pages Detail\n\n';
report += '### English Location Pages\n';
const englishLocations = englishPages.filter(p => p.startsWith('locations/'));
report += `Total: ${englishLocations.length}\n\n`;

report += '### Spanish Location Pages\n';
const spanishLocations = spanishPages.filter(p => p.startsWith('es/ubicaciones/'));
report += `Total: ${spanishLocations.length}\n\n`;

report += '### English Near-Me Pages\n';
const englishNearMe = englishPages.filter(p => p.startsWith('near-me/'));
report += `Total: ${englishNearMe.length}\n\n`;

report += '### Spanish Cerca-de-Mi Pages\n';
const spanishNearMe = spanishPages.filter(p => p.startsWith('es/cerca-de-mi/'));
report += `Total: ${spanishNearMe.length}\n\n`;

// Write report
fs.writeFileSync(path.join(__dirname, '..', 'MISSING_TRANSLATIONS.md'), report);

console.log('Report generated: MISSING_TRANSLATIONS.md');
console.log(`\nSummary:`);
console.log(`- English pages missing Spanish: ${missingSpanish.length}`);
console.log(`- Spanish pages missing English: ${missingEnglish.length}`);