export interface LocationServiceCity {
  id: string;
  name: string;
  state: string;
  nearestOffice: {
    name: string;
    address: string;
    phone: string;
    distance: string;
  };
}

export interface ServiceInfo {
  key: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
}

export const locationServiceCities: LocationServiceCity[] = [
  // Major NC Cities (Tier 1 - All Services)
  {
    id: 'charlotte',
    name: 'Charlotte',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '0.5 miles',
    },
  },
  {
    id: 'raleigh',
    name: 'Raleigh',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '1.2 miles',
    },
  },
  {
    id: 'greensboro',
    name: 'Greensboro',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '85.2 miles',
    },
  },
  {
    id: 'durham',
    name: 'Durham',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '12.3 miles',
    },
  },
  {
    id: 'winston-salem',
    name: 'Winston-Salem',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '92.1 miles',
    },
  },
  {
    id: 'fayetteville',
    name: 'Fayetteville',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '68.4 miles',
    },
  },
  {
    id: 'cary',
    name: 'Cary',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '8.5 miles',
    },
  },
  {
    id: 'wilmington',
    name: 'Wilmington',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '125.7 miles',
    },
  },
  {
    id: 'high-point',
    name: 'High Point',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '75.3 miles',
    },
  },
  {
    id: 'concord',
    name: 'Concord',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '18.6 miles',
    },
  },
  {
    id: 'gastonia',
    name: 'Gastonia',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '25.4 miles',
    },
  },
  {
    id: 'rocky-mount',
    name: 'Rocky Mount',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '78.3 miles',
    },
  },
  {
    id: 'burlington',
    name: 'Burlington',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '65.2 miles',
    },
  },
  {
    id: 'wilson',
    name: 'Wilson',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '45.7 miles',
    },
  },
  {
    id: 'hickory',
    name: 'Hickory',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '68.5 miles',
    },
  },
  {
    id: 'huntersville',
    name: 'Huntersville',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '15.2 miles',
    },
  },
  {
    id: 'kannapolis',
    name: 'Kannapolis',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '22.1 miles',
    },
  },
  {
    id: 'chapel-hill',
    name: 'Chapel Hill',
    state: 'NC',
    nearestOffice: {
      name: 'Raleigh Office',
      address: '4426 Louisburg Road, Raleigh, NC 27616',
      phone: '(919) 533-7000',
      distance: '25.3 miles',
    },
  },
  {
    id: 'matthews',
    name: 'Matthews',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '12.8 miles',
    },
  },
  {
    id: 'mint-hill',
    name: 'Mint Hill',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '18.9 miles',
    },
  },
  {
    id: 'cornelius',
    name: 'Cornelius',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '25.7 miles',
    },
  },
  {
    id: 'mooresville',
    name: 'Mooresville',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '35.4 miles',
    },
  },
  {
    id: 'davidson',
    name: 'Davidson',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '22.3 miles',
    },
  },
  {
    id: 'pineville',
    name: 'Pineville',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '8.7 miles',
    },
  },
  {
    id: 'indian-trail',
    name: 'Indian Trail',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '23.5 miles',
    },
  },
  {
    id: 'monroe',
    name: 'Monroe',
    state: 'NC',
    nearestOffice: {
      name: 'Charlotte Office',
      address: '5701 Executive Center Dr, Suite 103, Charlotte, NC 28212',
      phone: '(704) 533-7000',
      distance: '32.1 miles',
    },
  },
  // FL Cities - Orlando Area
  {
    id: 'orlando',
    name: 'Orlando',
    state: 'FL',
    nearestOffice: {
      name: 'Orlando Office',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 955-5000',
      distance: '0.8 miles',
    },
  },
  {
    id: 'kissimmee',
    name: 'Kissimmee',
    state: 'FL',
    nearestOffice: {
      name: 'Orlando Office',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 955-5000',
      distance: '18.2 miles',
    },
  },
  {
    id: 'winter-park',
    name: 'Winter Park',
    state: 'FL',
    nearestOffice: {
      name: 'Orlando Office',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 955-5000',
      distance: '7.5 miles',
    },
  },
  {
    id: 'sanford',
    name: 'Sanford',
    state: 'FL',
    nearestOffice: {
      name: 'Orlando Office',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 955-5000',
      distance: '22.4 miles',
    },
  },
  {
    id: 'oviedo',
    name: 'Oviedo',
    state: 'FL',
    nearestOffice: {
      name: 'Orlando Office',
      address: '1111 E Amelia Street, Orlando, FL 32803',
      phone: '(407) 955-5000',
      distance: '25.1 miles',
    },
  },
];

// Main services we offer
export const locationServices: ServiceInfo[] = [
  {
    key: 'inmigracion',
    name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
    description: {
      en: 'Comprehensive immigration legal services including family reunification, deportation defense, citizenship applications, and work authorization assistance.',
      es: 'Servicios legales integrales de inmigración incluyendo reunificación familiar, defensa contra deportación, solicitudes de ciudadanía y asistencia para autorización de trabajo.',
    },
    icon: '🌐',
  },
  {
    key: 'lesiones-personales',
    name: { en: 'Personal Injury', es: 'Lesiones Personales' },
    description: {
      en: 'Expert representation for accident victims seeking maximum compensation for medical expenses, lost wages, and pain and suffering.',
      es: 'Representación experta para víctimas de accidentes que buscan compensación máxima por gastos médicos, salarios perdidos y dolor y sufrimiento.',
    },
    icon: '🏥',
  },
  {
    key: 'defensa-criminal',
    name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
    description: {
      en: 'Aggressive criminal defense representation for all charges including DUI, drug crimes, assault, theft, and traffic violations.',
      es: 'Representación agresiva en defensa criminal para todos los cargos incluyendo DUI, crímenes de drogas, asalto, robo y violaciones de tráfico.',
    },
    icon: '⚖️',
  },
  {
    key: 'accidentes-de-auto',
    name: { en: 'Car Accidents', es: 'Accidentes de Auto' },
    description: {
      en: 'Specialized car accident legal services including insurance negotiations, medical expense coverage, and property damage claims.',
      es: 'Servicios legales especializados en accidentes de auto incluyendo negociaciones con seguros, cobertura de gastos médicos y reclamos por daños a la propiedad.',
    },
    icon: '🚗',
  },
  {
    key: 'compensacion-laboral',
    name: { en: 'Workers Compensation', es: 'Compensación Laboral' },
    description: {
      en: 'Protecting injured workers rights and securing rightful benefits including medical coverage, disability payments, and return-to-work programs.',
      es: 'Protegiendo los derechos de trabajadores lesionados y asegurando beneficios justos incluyendo cobertura médica, pagos por discapacidad y programas de regreso al trabajo.',
    },
    icon: '👷',
  },
  {
    key: 'derecho-familiar',
    name: { en: 'Family Law', es: 'Derecho Familiar' },
    description: {
      en: 'Compassionate family law representation including divorce, child custody, support matters, and domestic violence protection.',
      es: 'Representación compasiva en derecho familiar incluyendo divorcio, custodia de menores, asuntos de manutención y protección contra violencia doméstica.',
    },
    icon: '👨‍👩‍👧‍👦',
  },
  {
    key: 'dui',
    name: { en: 'DUI Defense', es: 'Defensa DUI' },
    description: {
      en: 'Expert DUI/DWI defense to protect your driving privileges, freedom, and future opportunities with aggressive legal representation.',
      es: 'Defensa experta de DUI/DWI para proteger sus privilegios de conducir, libertad y oportunidades futuras con representación legal agresiva.',
    },
    icon: '🚫',
  },
  {
    key: 'abogado-espanol',
    name: { en: 'Spanish Speaking Attorney', es: 'Abogado que Habla Español' },
    description: {
      en: 'Bilingual legal services with native Spanish speakers who understand Latino culture and provide culturally sensitive representation.',
      es: 'Servicios legales bilingües con hablantes nativos de español que entienden la cultura latina y brindan representación culturalmente sensible.',
    },
    icon: '🗣️',
  },
  {
    key: 'bancarrota',
    name: { en: 'Bankruptcy', es: 'Bancarrota' },
    description: {
      en: 'Debt relief solutions including Chapter 7 and Chapter 13 bankruptcy filings to help you get a fresh financial start.',
      es: 'Soluciones de alivio de deudas incluyendo presentaciones de bancarrota Capítulo 7 y Capítulo 13 para ayudarle a obtener un nuevo comienzo financiero.',
    },
    icon: '💳',
  },
];

export const getLocationServiceCityBySlug = (slug: string): LocationServiceCity | undefined => {
  return locationServiceCities.find(city => city.id === slug);
};

export const getLocationServiceByKey = (key: string): ServiceInfo | undefined => {
  return locationServices.find(service => service.key === key);
};