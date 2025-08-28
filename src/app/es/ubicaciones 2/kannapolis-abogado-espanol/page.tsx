import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function KannapolisAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('kannapolis');
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
  title: 'Abogado que Habla Español en Kannapolis, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'abogado que habla español Kannapolis, abogado Kannapolis, abogado que habla español NC, abogado español Kannapolis, servicios legales Kannapolis',
  openGraph: {
    title: 'Abogado que Habla Español en Kannapolis, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Kannapolis, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/kannapolis-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Kannapolis, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/kannapolis-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/kannapolis-abogado-espanol'
      
    }
  }
};