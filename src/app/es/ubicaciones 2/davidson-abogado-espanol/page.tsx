import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function DavidsonAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('davidson');
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
  title: 'Abogado que Habla Español en Davidson, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
  keywords: 'abogado que habla español Davidson, abogado Davidson, abogado que habla español NC, abogado español Davidson, servicios legales Davidson',
  openGraph: {
    title: 'Abogado que Habla Español en Davidson, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Davidson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (704) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/davidson-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Davidson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/davidson-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/davidson-abogado-espanol'
      
    }
  }
};