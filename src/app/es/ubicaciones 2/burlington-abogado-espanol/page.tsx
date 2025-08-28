import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function BurlingtonAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('burlington');
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
  title: 'Abogado que Habla Español en Burlington, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'abogado que habla español Burlington, abogado Burlington, abogado que habla español NC, abogado español Burlington, servicios legales Burlington',
  openGraph: {
    title: 'Abogado que Habla Español en Burlington, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Burlington, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/burlington-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Burlington, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/burlington-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/burlington-abogado-espanol'
      
    }
  }
};