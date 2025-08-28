import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroInmigracionPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Ley de Inmigración en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de ley de inmigración en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'ley de inmigración Greensboro, abogado Greensboro, ley de inmigración NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Ley de Inmigración en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de ley de inmigración en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-inmigracion',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-inmigracion-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Ley de Inmigración en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-inmigracion',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-immigration',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-inmigracion'
      
    }
  }
};