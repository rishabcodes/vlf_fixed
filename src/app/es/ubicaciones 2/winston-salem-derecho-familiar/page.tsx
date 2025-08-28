import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemDerechoFamiliarPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
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
  title: 'Derecho Familiar en Winston-Salem, NC | Vasquez Law Firm',
  description: 'Servicios legales de derecho familiar en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'derecho familiar Winston-Salem, abogado Winston-Salem, derecho familiar NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Derecho Familiar en Winston-Salem, NC | Vasquez Law Firm',
    description: 'Servicios legales de derecho familiar en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-derecho-familiar',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winston-salem-derecho-familiar-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Derecho Familiar en Winston-Salem, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-derecho-familiar',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-family-law',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-derecho-familiar'
      
    }
  }
};