import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Derecho Familiar en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Charlotte, abogado Charlotte, derecho familiar NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Derecho Familiar en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-derecho-familiar'
      
    }
  }
};