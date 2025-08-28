import { nearMeCities, practiceAreas } from '../data/near-me-locations';
import fs from 'fs';
import path from 'path';

const generateNearMePage = (city: string, practiceAreaKey: string) => {
  const cityData = nearMeCities.find(c => c.id === city);
  const practiceArea = practiceAreas.find(p => p.key === practiceAreaKey);
  
  if (!cityData || !practiceArea) {
    throw new Error(`City ${city} or practice area ${practiceAreaKey} not found`);
  }

  const slug = `${city}-${practiceAreaKey}-cerca-de-mi`;
  const title = `${practiceArea.name.es} Cerca de Mi en ${cityData.name}, ${cityData.state}`;
  const description = `Encuentre el mejor ${practiceArea.name.es.toLowerCase()} cerca de usted en ${cityData.name}, ${cityData.state}. Consultas gratuitas 24/7. Llame ${cityData.nearestOffice.phone}.`;

  return `'use client';

import { NearMeTemplate } from '@/components/templates/NearMeTemplate';
import { getNearMeCityBySlug, getPracticeAreaByKey } from '@/data/near-me-locations';

export default function ${city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}${practiceAreaKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}NearMePage() {
  const cityData = getNearMeCityBySlug('${city}');
  const practiceArea = getPracticeAreaByKey('${practiceAreaKey}');
  
  if (!cityData || !practiceArea) {
    return <div>Page not found</div>;
  }

  return (
    <NearMeTemplate
      city={cityData.name}
      state={cityData.state}
      practiceArea={practiceArea}
      nearestOffice={cityData.nearestOffice}
      language="es"
    />
  );
}

export const metadata = {
  title: '${title} | Vasquez Law Firm',
  description: '${description}',
  keywords: '${practiceArea.name.es.toLowerCase()} cerca de mi, ${practiceArea.name.es.toLowerCase()} ${cityData.name}, abogado ${cityData.name}, ${practiceArea.name.es.toLowerCase()} ${cityData.state}, abogado español ${cityData.name}',
  openGraph: {
    title: '${title} | Vasquez Law Firm',
    description: '${description}',
    url: 'https://www.vasquezlawnc.com/es/cerca-de-mi/${slug}',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/${city}-${practiceAreaKey}-og.jpg',
      width: 1200,
      height: 630,
      alt: '${title}'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/cerca-de-mi/${slug}',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/near-me/${city}-${practiceAreaKey.replace('spanish-speaking', 'immigration')}-near-me',
      'es-ES': 'https://www.vasquezlawnc.com/es/cerca-de-mi/${slug}'
    }
    }
};`;
};

// Generate all combinations
const generateAllPages = () => {
  const baseDir = '/Users/williamvasquez/Documents/VLF Website/src/app/es/cerca-de-mi';
  
  nearMeCities.forEach(city => {
    practiceAreas.forEach(practiceArea => {
      const slug = `${city.id}-${practiceArea.key}-cerca-de-mi`;
      const dirPath = path.join(baseDir, slug);
      const filePath = path.join(dirPath, 'page.tsx');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // Generate and write the page content
      const pageContent = generateNearMePage(city.id, practiceArea.key);
      fs.writeFileSync(filePath, pageContent);
      
      console.log(`Generated: ${slug}`);
    });
  });
};

// Run the generator
if (require.main === module) {
  generateAllPages();
  console.log('All Spanish "cerca de mi" pages generated successfully!');
}
