import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ChapelHillDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('chapel-hill');
  const serviceData = getLocationServiceByKey('derecho-familiar');
  
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
  title: 'Derecho Familiar en Chapel Hill, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Chapel Hill, abogado Chapel Hill, derecho familiar NC, abogado español Chapel Hill, servicios legales Chapel Hill',
  openGraph: {
    title: 'Derecho Familiar en Chapel Hill, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Chapel Hill, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/chapel-hill-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Chapel Hill, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/chapel-hill-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/chapel-hill-derecho-familiar'
      
    }
  }
};