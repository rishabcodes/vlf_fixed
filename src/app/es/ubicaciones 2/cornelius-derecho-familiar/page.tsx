import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CorneliusDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('cornelius');
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
  title: 'Derecho Familiar en Cornelius, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Cornelius, abogado Cornelius, derecho familiar NC, abogado español Cornelius, servicios legales Cornelius',
  openGraph: {
    title: 'Derecho Familiar en Cornelius, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Cornelius, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cornelius-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Cornelius, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cornelius-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cornelius-derecho-familiar'
      
    }
  }
};