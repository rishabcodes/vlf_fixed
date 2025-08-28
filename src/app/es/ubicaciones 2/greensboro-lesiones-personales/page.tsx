import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function GreensboroLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('greensboro');
  const serviceData = getLocationServiceByKey('lesiones-personales');
  
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
  title: 'Lesiones Personales en Greensboro, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'lesiones personales Greensboro, abogado Greensboro, lesiones personales NC, abogado español Greensboro, servicios legales Greensboro',
  openGraph: {
    title: 'Lesiones Personales en Greensboro, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Greensboro, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/greensboro-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Greensboro, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/greensboro-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/greensboro-lesiones-personales'
      
    }
  }
};