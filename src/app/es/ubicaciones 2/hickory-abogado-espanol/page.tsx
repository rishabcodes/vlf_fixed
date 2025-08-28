import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function HickoryAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('hickory');
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
  title: 'Abogado que Habla Español en Hickory, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'abogado que habla español Hickory, abogado Hickory, abogado que habla español NC, abogado español Hickory, servicios legales Hickory',
  openGraph: {
    title: 'Abogado que Habla Español en Hickory, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Hickory, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/hickory-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Hickory, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/hickory-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/hickory-abogado-espanol'
      
    }
  }
};