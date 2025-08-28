const fs = require('fs');
const path = require('path');

// Map service types from URL to proper names
const serviceMap = {
  'car-accidents': 'Car Accident Lawyer',
  'personal-injury': 'Personal Injury Lawyer',
  'workers-compensation': 'Workers Compensation',
  'criminal-defense': 'Criminal Defense',
  immigration: 'Immigration',
  dui: 'DUI DWI',
  divorce: 'Divorce',
  'spanish-speaking': 'Spanish Speaking Services',
  'abogado-accidente-auto': 'Car Accident Lawyer',
  'abogado-lesiones-personales': 'Personal Injury Lawyer',
  'abogado-compensacion-laboral': 'Workers Compensation',
  'abogado-defensa-criminal': 'Criminal Defense',
  'abogado-inmigracion': 'Immigration',
  'abogado-dui': 'DUI DWI',
  'abogado-divorcio': 'Divorce',
  'abogado-que-habla-español': 'Spanish Speaking Services',
  'compensacion-laboral': 'Workers Compensation',
  'defensa-criminal': 'Criminal Defense',
  inmigracion: 'Immigration',
  'lesiones-personales': 'Personal Injury Lawyer',
};

// City data with coordinates
const cityData = {
  charlotte: { lat: 35.2271, lng: -80.8431 },
  raleigh: { lat: 35.7796, lng: -78.6382 },
  durham: { lat: 35.994, lng: -78.8986 },
  greensboro: { lat: 36.0726, lng: -79.792 },
  'winston-salem': { lat: 36.0999, lng: -80.2442 },
  fayetteville: { lat: 35.0527, lng: -78.8784 },
  cary: { lat: 35.7915, lng: -78.7811 },
  wilmington: { lat: 34.2257, lng: -77.9447 },
  'high-point': { lat: 35.9557, lng: -80.0053 },
  concord: { lat: 35.4088, lng: -80.5795 },
};

// Office distances from each city
const officeDistances = {
  charlotte: [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '165 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '140 miles',
    },
  ],
  raleigh: [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '0 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '25 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '165 miles',
    },
  ],
  durham: [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '0 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '25 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '140 miles',
    },
  ],
  greensboro: [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '55 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '80 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '90 miles',
    },
  ],
  'winston-salem': [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '80 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '80 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '105 miles',
    },
  ],
  fayetteville: [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '65 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '90 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '130 miles',
    },
  ],
  cary: [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '10 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '30 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '160 miles',
    },
  ],
  wilmington: [
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '130 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '155 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '200 miles',
    },
  ],
  'high-point': [
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '60 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '85 miles',
    },
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '95 miles',
    },
  ],
  concord: [
    {
      name: 'Charlotte Main Office',
      address: '3500 Cameron Blvd, Charlotte, NC 28211',
      phone: '(704) 555-0123',
      distance: '20 miles',
    },
    {
      name: 'Durham Office',
      address: '567 Duke St, Durham, NC 27701',
      phone: '(919) 555-0124',
      distance: '120 miles',
    },
    {
      name: 'Raleigh Office',
      address: '1234 Main St, Raleigh, NC 27601',
      phone: '(919) 555-0123',
      distance: '145 miles',
    },
  ],
};

function capitalizeCity(city) {
  return city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractInfoFromPath(filePath) {
  const dirName = path.basename(path.dirname(filePath));
  const parts = dirName.split('-');

  // Extract city (first part)
  const city = parts[0];

  // Extract service (everything between city and "cerca-de-mi")
  const cercaIndex = parts.indexOf('cerca');
  if (cercaIndex === -1) return null;

  const serviceParts = parts.slice(1, cercaIndex);
  const serviceKey = serviceParts.join('-');

  // Check if it's a Spanish page (either in /es/ directory or has 'abogado' in service)
  const isSpanish = filePath.includes('/es/') || serviceKey.includes('abogado');

  return {
    city: city,
    cityName: capitalizeCity(city),
    serviceKey: serviceKey,
    serviceName: serviceMap[serviceKey] || 'Legal Services',
    isSpanish: isSpanish,
  };
}

function generatePageContent(info) {
  const { cityName, serviceName, city, isSpanish } = info;
  const coordinates = cityData[city] || { lat: 35.7796, lng: -78.6382 };
  const nearbyOffices = officeDistances[city] || officeDistances['raleigh'];
  const language = isSpanish ? 'es' : 'en';

  return `import { Metadata } from 'next';
import { componentLogger } from '@/lib/safe-logger';
import NearMePageClient from '@/components/cerca-de-mi/NearMePageClient';

export const metadata: Metadata = {
  title: '${cityName} ${serviceName} ${isSpanish ? 'Cerca De Mi' : 'Near Me'} | Vasquez Law Firm',
  description: '${
    isSpanish
      ? `Encuentra abogados de ${serviceName.toLowerCase()} en ${cityName}, NC. Consulta gratuita, sin cargos por adelantado. Luchamos por tus derechos.`
      : `Find experienced ${serviceName.toLowerCase()} lawyers in ${cityName}, NC. Free consultation, no upfront fees. We fight for your rights.`
  }',
  keywords: '${serviceName.toLowerCase()} ${cityName}, ${isSpanish ? 'abogado' : 'attorney'} near me, ${cityName} NC ${serviceName.toLowerCase()}',
  openGraph: {
    title: '${serviceName} ${isSpanish ? 'Abogados' : 'Lawyers'} in ${cityName}, NC - Free Consultation',
    description: '${
      isSpanish
        ? `¿Necesitas un abogado de ${serviceName.toLowerCase()} en ${cityName}? Consulta gratuita. No pagas si no ganamos.`
        : `Need a ${serviceName.toLowerCase()} lawyer in ${cityName}? Get the legal help you deserve. No fee unless we win.`
    }',
    images: ['/images/${city}-${serviceName.toLowerCase().replace(/ /g, '-')}.jpg'],
  },
};

export default function ${cityName.replace(/ /g, '')}${serviceName.replace(/ /g, '')}NearMePage() {
  componentLogger.info('${city}-${info.serviceKey}-cerca-de-miPage.render', {});

  const nearbyOffices = ${JSON.stringify(nearbyOffices, null, 4)};

  return (
    <NearMePageClient
      city="${cityName}"
      service="${serviceName}"
      language="${language}"
      coordinates={{ lat: ${coordinates.lat}, lng: ${coordinates.lng} }}
      nearbyOffices={nearbyOffices}
    />
  );
}`;
}

// Process both English and Spanish cerca-de-mi pages
function getPageFiles(basePath) {
  try {
    const dirs = fs.readdirSync(basePath).filter(file => {
      const fullPath = path.join(basePath, file);
      return fs.statSync(fullPath).isDirectory();
    });
    return dirs
      .map(dir => path.join(basePath, dir, 'page.tsx'))
      .filter(file => fs.existsSync(file));
  } catch (error) {
    return [];
  }
}

const englishDir = path.join(__dirname, '../src/app/cerca-de-mi');
const spanishDir = path.join(__dirname, '../src/app/es/cerca-de-mi');

const englishFiles = getPageFiles(englishDir);
const spanishFiles = getPageFiles(spanishDir);

const files = [...englishFiles, ...spanishFiles];
console.log(
  `Found ${englishFiles.length} English and ${spanishFiles.length} Spanish files to update`
);

let updatedCount = 0;
let errorCount = 0;

files.forEach(filePath => {
  try {
    const info = extractInfoFromPath(filePath);
    if (!info) {
      console.log(`Skipping ${filePath} - couldn't extract info`);
      return;
    }

    const newContent = generatePageContent(info);
    fs.writeFileSync(filePath, newContent);
    updatedCount++;
    console.log(`✓ Updated ${path.basename(path.dirname(filePath))}`);
  } catch (error) {
    errorCount++;
    console.error(`✗ Error updating ${filePath}:`, error.message);
  }
});

console.log(`\nCompleted: ${updatedCount} files updated, ${errorCount} errors`);
