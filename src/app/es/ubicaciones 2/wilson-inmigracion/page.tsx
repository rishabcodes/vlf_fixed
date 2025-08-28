import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Ley de Inmigración en Wilson, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'ley de inmigración Wilson, abogado Wilson, ley de inmigración NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Ley de Inmigración en Wilson, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilson-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Wilson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-inmigracion'
      
    }
  }
};