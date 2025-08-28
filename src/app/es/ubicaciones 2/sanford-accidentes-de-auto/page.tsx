import { LocationServiceTemplate } from '@/components/templates/LocationServiceTemplate';
import { getLocationServiceCityBySlug, getLocationServiceByKey } from '@/data/location-services';

export default function SanfordAccidentesDeAutoPage() {
  const cityData = getLocationServiceCityBySlug('sanford');
  const serviceData = getLocationServiceByKey('accidentes-de-auto');
  
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
  title: 'Accidentes de Auto en Sanford, FL | Vasquez Law Firm',
  description: 'Servicios legales de accidentes de auto en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
  keywords: 'accidentes de auto Sanford, abogado Sanford, accidentes de auto FL, abogado español Sanford, servicios legales Sanford',
  openGraph: {
    title: 'Accidentes de Auto en Sanford, FL | Vasquez Law Firm',
    description: 'Servicios legales de accidentes de auto en Sanford, FL. Abogados locales experimentados. Consultas gratuitas. Llame (407) 955-5000.',
    url: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-accidentes-de-auto',
    images: [{
      url: 'https://www.vasquezlawnc.com/images/sanford-accidentes-de-auto-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Accidentes de Auto en Sanford, FL'
    }]
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-accidentes-de-auto',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/locations/sanford-car-accidents',
      'es-ES': 'https://www.vasquezlawnc.com/es/ubicaciones/sanford-accidentes-de-auto'
      
    }
  }
};