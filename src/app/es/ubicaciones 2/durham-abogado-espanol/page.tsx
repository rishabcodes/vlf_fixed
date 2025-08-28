import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DurhamAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('durham');
  const serviceData = getLocationServiceByKey('abogado-espanol');
  
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
  title: 'Abogado que Habla Español en Durham, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'abogado que habla español Durham, abogado Durham, abogado que habla español NC, abogado español Durham, servicios legales Durham',
  openGraph: {
    title: 'Abogado que Habla Español en Durham, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Durham, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/durham-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Durham, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/durham-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/durham-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/durham-abogado-espanol'
      
    }
  }
};