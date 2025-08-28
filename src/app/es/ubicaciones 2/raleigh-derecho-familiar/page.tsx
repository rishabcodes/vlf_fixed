import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RaleighDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('raleigh');
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
  title: 'Derecho Familiar en Raleigh, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'derecho familiar Raleigh, abogado Raleigh, derecho familiar NC, abogado español Raleigh, servicios legales Raleigh',
  openGraph: {
    title: 'Derecho Familiar en Raleigh, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Raleigh, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/raleigh-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Raleigh, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/raleigh-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/raleigh-derecho-familiar'
      
    }
  }
};