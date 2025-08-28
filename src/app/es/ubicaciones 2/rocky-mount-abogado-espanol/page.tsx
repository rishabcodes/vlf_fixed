import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function RockyMountAbogadoEspanolPage() {
  const cityData = getLocationServiceCityBySlug('rocky-mount');
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
  title: 'Abogado que Habla Español en Rocky Mount, NC | Vasquez Law Firm',
  description: 'Servicios legales de abogado que habla español en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'abogado que habla español Rocky Mount, abogado Rocky Mount, abogado que habla español NC, abogado español Rocky Mount, servicios legales Rocky Mount',
  openGraph: {
    title: 'Abogado que Habla Español en Rocky Mount, NC | Vasquez Law Firm',
    description: 'Servicios legales de abogado que habla español en Rocky Mount, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-abogado-espanol',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/rocky-mount-abogado-espanol-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Abogado que Habla Español en Rocky Mount, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-abogado-espanol',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/rocky-mount-spanish-speaking-lawyer',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/rocky-mount-abogado-espanol'
      
    }
  }
};