import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function CharlotteAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('charlotte');
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
  title: 'Abogado que Habla Español en Charlotte, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'abogado que habla español Charlotte, abogado Charlotte, abogado que habla español NC, abogado español Charlotte, servicios legales Charlotte',
  openGraph: {
    title: 'Abogado que Habla Español en Charlotte, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Charlotte, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/charlotte-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Charlotte, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/charlotte-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/charlotte-abogado-espanol'
      
    }
  }
};