import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function WilsonLesionesPersonalesPage() {
  const cityData = getLocationServiceCityBySlug('wilson');
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
  title: 'Lesiones Personales en Wilson, NC | Vasquez Law Firm',
  description: 'Servicios legales de lesiones personales en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
  keywords: 'lesiones personales Wilson, abogado Wilson, lesiones personales NC, abogado español Wilson, servicios legales Wilson',
  openGraph: {
    title: 'Lesiones Personales en Wilson, NC | Vasquez Law Firm',
    description: 'Servicios legales de lesiones personales en Wilson, NC. Abogados locales experimentados. Consultas gratuitas. Llame (919) 533-7000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-lesiones-personales',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/wilson-lesiones-personales-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Lesiones Personales en Wilson, NC'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-lesiones-personales',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/wilson-personal-injury',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/wilson-lesiones-personales'
      
    }
  }
};