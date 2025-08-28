import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function ConcordInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('concord');
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
  title: 'Ley de Inmigración en Concord, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Concord, abogado Concord, ley de inmigración NC, abogado español Concord, servicios legales Concord',
  openGraph: {
    title: 'Ley de Inmigración en Concord, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Concord, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/concord-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Concord, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/concord-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/concord-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/concord-inmigracion'
      
    }
  }
};