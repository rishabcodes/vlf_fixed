import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');
  
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
  title: 'Accidentes de Auto en Winston-Salem, NC | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'accidentes de auto Winston-Salem, abogado Winston-Salem, accidentes de auto NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Accidentes de Auto en Winston-Salem, NC | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winston-salem-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Winston-Salem, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-accidentes-de-auto'
      
    }
  }
};