import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function MooresvilleInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('mooresville');
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
  title: 'Ley de Inmigración en Mooresville, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'ley de inmigración Mooresville, abogado Mooresville, ley de inmigración NC, abogado español Mooresville, servicios legales Mooresville',
  openGraph: {
    title: 'Ley de Inmigración en Mooresville, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Mooresville, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/mooresville-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Mooresville, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/mooresville-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/mooresville-inmigracion'
      
    }
  }
};