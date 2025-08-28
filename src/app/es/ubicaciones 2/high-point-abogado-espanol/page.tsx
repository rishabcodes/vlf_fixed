import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HighPointAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('high-point');
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
  title: 'Abogado que Habla Español en High Point, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en High Point, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'abogado que habla español High Point, abogado High Point, abogado que habla español NC, abogado español High Point, servicios legales High Point',
  openGraph: {
    title: 'Abogado que Habla Español en High Point, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en High Point, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/high-point-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en High Point, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/high-point-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/high-point-abogado-espanol'
      
    }
  }
};