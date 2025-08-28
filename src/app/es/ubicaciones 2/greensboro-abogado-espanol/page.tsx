import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
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
  title: 'Abogado que Habla Español en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'abogado que habla español Greensboro, abogado Greensboro, abogado que habla español NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Abogado que Habla Español en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-abogado-espanol'
      
    }
  }
};