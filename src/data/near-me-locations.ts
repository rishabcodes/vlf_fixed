export interface NearMeCity {
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

export interface PracticeAreaInfo {
  key: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  icon: string;
}

export const nearMeCities: NearMeCity[] = [
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
];

export const practiceAreas: PracticeAreaInfo[] = [
  {
    key: 'immigration',
    name: { en: 'Immigration Lawyer', es: 'Abogado de Inmigración' },
    description: {
      en: 'Expert immigration law representation for visas, green cards, citizenship, and deportation defense',
      es: 'Representación experta en ley de inmigración para visas, tarjetas verdes, ciudadanía y defensa contra deportación',
    },
    icon: '🌐',
  },
  {
    key: 'personal-injury',
    name: { en: 'Personal Injury Attorney', es: 'Abogado de Lesiones Personales' },
    description: {
      en: 'Dedicated representation for accident victims seeking maximum compensation for injuries',
      es: 'Representación dedicada para víctimas de accidentes que buscan compensación máxima por lesiones',
    },
    icon: '🏥',
  },
  {
    key: 'criminal-defense',
    name: { en: 'Criminal Defense Lawyer', es: 'Abogado de Defensa Criminal' },
    description: {
      en: 'Aggressive defense for all criminal charges with experienced trial attorneys',
      es: 'Defensa agresiva para todos los cargos criminales con abogados experimentados en juicios',
    },
    icon: '⚖️',
  },
  {
    key: 'car-accidents',
    name: { en: 'Car Accident Lawyer', es: 'Abogado de Accidentes de Auto' },
    description: {
      en: 'Specialized representation for motor vehicle accidents and insurance claims',
      es: 'Representación especializada para accidentes de vehículos motorizados y reclamos de seguros',
    },
    icon: '🚗',
  },
  {
    key: 'workers-compensation',
    name: { en: 'Workers Compensation Lawyer', es: 'Abogado de Compensación Laboral' },
    description: {
      en: 'Protecting injured workers and securing rightful benefits and compensation',
      es: 'Protegiendo a trabajadores lesionados y asegurando beneficios y compensación justos',
    },
    icon: '👷',
  },
  {
    key: 'divorce',
    name: { en: 'Divorce Lawyer', es: 'Abogado de Divorcio' },
    description: {
      en: 'Compassionate family law representation for divorce and custody matters',
      es: 'Representación compasiva en derecho familiar para asuntos de divorcio y custodia',
    },
    icon: '👨‍👩‍👧‍👦',
  },
  {
    key: 'dui',
    name: { en: 'DUI Lawyer', es: 'Abogado de DUI' },
    description: {
      en: 'Expert DUI/DWI defense to protect your driving privileges and freedom',
      es: 'Defensa experta de DUI/DWI para proteger sus privilegios de conducir y libertad',
    },
    icon: '🚫',
  },
  {
    key: 'spanish-speaking',
    name: { en: 'Spanish Speaking Lawyer', es: 'Abogado que Habla Español' },
    description: {
      en: 'Bilingual legal services with native Spanish speakers who understand your culture',
      es: 'Servicios legales bilingües con hablantes nativos de español que entienden su cultura',
    },
    icon: '🗣️',
  },
];

export const getNearMeCityBySlug = (slug: string): NearMeCity | undefined => {
  return nearMeCities.find(city => city.id === slug);
};

export const getPracticeAreaByKey = (key: string): PracticeAreaInfo | undefined => {
  return practiceAreas.find(area => area.key === key);
};