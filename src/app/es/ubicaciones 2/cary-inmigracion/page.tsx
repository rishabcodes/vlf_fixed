import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CaryInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('cary');
  const serviceData = getLocationServiceByKey('inmigracion');
  
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
  title: 'Ley de Inmigración en Cary, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'ley de inmigración Cary, abogado Cary, ley de inmigración NC, abogado español Cary, servicios legales Cary',
  openGraph: {
    title: 'Ley de Inmigración en Cary, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Cary, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/cary-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Cary, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/cary-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/cary-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/cary-inmigracion'
      
    }
  }
};