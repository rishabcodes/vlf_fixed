import { locationServiceCities, locationServices } from '../data/location-services';
import fs from 'fs';
import path from 'path';

const generateLocationServicePage = (cityId: string, serviceKey: string) => {
  const cityData = locationServiceCities.find(c => c.id === cityId);
  const serviceData = locationServices.find(s => s.key === serviceKey);
  
  if (!cityData || !serviceData) {
    throw new Error(`City ${cityId} or service ${serviceKey} not found`);
  }

  const slug = `${cityId}-${serviceKey}`;
  const title = `${serviceData.name.es} en ${cityData.name}, ${cityData.state}`;
  const description = `Servicios legales de ${serviceData.name.es.toLowerCase()} en ${cityData.name}, ${cityData.state}. Abogados locales experimentados. Consultas gratuitas. Llame ${cityData.nearestOffice.phone}.`;

  return `'use client';

import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ${cityId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}${serviceKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  const cityData = getLocationServiceCityBySlug('${cityId}');
  const serviceData = getLocationServiceByKey('${serviceKey}');
  
  if (!cityData || !serviceData) {
    return <div>Page not found</div>;
  }

  return (
    <LocationServiceTemplate
      city={cityData.name}
      state={cityData.state}
      service={serviceData}
      nearestOffice={cityData.nearestOffice}
      language="es"
    />
  );
}

export const metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${description}',
  keywords: '${serviceData.name.es.toLowerCase()} ${cityData.name}, abogado ${cityData.name}, ${serviceData.name.es.toLowerCase()} ${cityData.state}, abogado español ${cityData.name}, servicios legales ${cityData.name}',
  openGraph: {
    title: '${title} | Vasquez Law Firm',
    description: '${description}',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/${slug}',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/${cityId}-${serviceKey}-og.jpg',
      width: 1200,
      height: 630,
      alt: '${title}'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/${slug}',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/${cityId}-${serviceKey.replace('inmigracion', 'immigration').replace('lesiones-personales', 'personal-injury').replace('defensa-criminal', 'criminal-defense').replace('accidentes-de-auto', 'car-accidents').replace('compensacion-laboral', 'workers-compensation').replace('derecho-familiar', 'family-law').replace('abogado-espanol', 'spanish-speaking-lawyer').replace('bancarrota', 'bankruptcy')}',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/${slug}'
    }
    }
};`;
};

// Generate all combinations
const generateAllLocationServicePages = () => {
  const baseDir = '/Users/williamvasquez/Documents/VLF Website/src/app/es/ubicaciones';
  let count = 0;
  
  // Create base directory
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  locationServiceCities.forEach(city => {
    locationServices.forEach(service => {
      const slug = `${city.id}-${service.key}`;
      const dirPath = path.join(baseDir, slug);
      const filePath = path.join(dirPath, 'page.tsx');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Generate and write the page content
      const pageContent = generateLocationServicePage(city.id, service.key);
      fs.writeFileSync(filePath, pageContent);
      
      count++;
      console.log(`Generated: ${slug} (${count})`);
    });
  });
  
  return count;
};

// Run the generator
if (require.main === module) {
  const totalPages = generateAllLocationServicePages();
  console.log(`All ${totalPages} Spanish location service pages generated successfully!`);
}
