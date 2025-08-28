import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WinstonSalemDuiPage() {
  const cityData = getLocationServiceCityBySlug('winston-salem');
  const serviceData = getLocationServiceByKey('dui');
  
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
  title: 'Defensa DUI en Winston-Salem, NC | Vasquez Law Firm',
  description: 'Servicios legales de defensa dui en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'defensa dui Winston-Salem, abogado Winston-Salem, defensa dui NC, abogado español Winston-Salem, servicios legales Winston-Salem',
  openGraph: {
    title: 'Defensa DUI en Winston-Salem, NC | Vasquez Law Firm',
    description: 'Servicios legales de defensa dui en Winston-Salem, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-dui',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/winston-salem-dui-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Defensa DUI en Winston-Salem, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-dui',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/winston-salem-dui',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/winston-salem-dui'
      
    }
  }
};