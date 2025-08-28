import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Derecho Familiar en Mooresville, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Mooresville, abogado Mooresville, derecho familiar NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Derecho Familiar en Mooresville, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mooresville-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Mooresville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-derecho-familiar'
      
    }
  }
};