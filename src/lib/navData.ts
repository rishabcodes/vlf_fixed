export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
  featured?: boolean;
  description?: string;
}

export interface MegaMenuItem extends NavItem {
  columns?: {
    title: string;
    items: NavItem[];
  }[];
}

export const practiceAreas: MegaMenuItem = {
  name: 'Practice Areas',
  href: '/practice-areas',
  columns: [
    {
      title: 'Immigration Law',
      items: [
        { name: 'Family-Based Immigration', href: '/practice-areas/immigration/family-based' },
        { name: 'Humanitarian Immigration', href: '/practice-areas/immigration/humanitarian' },
        { name: 'Removal Defense', href: '/practice-areas/immigration/removal-defense' },
        { name: 'Business Immigration', href: '/practice-areas/immigration/business' },
      ]
    },
    {
      title: 'Personal Injury',
      items: [
        { name: 'Car Accidents', href: '/practice-areas/personal-injury/car-accidents' },
        { name: 'Motorcycle Accidents', href: '/practice-areas/personal-injury/motorcycle-accidents' },
        { name: 'Truck Accidents', href: '/practice-areas/personal-injury/truck-accidents' },
        { name: 'Pedestrian Accidents', href: '/practice-areas/personal-injury/pedestrian-accidents' },
        { name: 'Bicycle Accidents', href: '/practice-areas/personal-injury/bicycle-accidents' },
        { name: 'Slip and Fall', href: '/practice-areas/personal-injury/slip-and-fall' },
        { name: 'Medical Malpractice', href: '/practice-areas/personal-injury/medical-malpractice' },
        { name: 'Wrongful Death', href: '/practice-areas/personal-injury/wrongful-death' },
        { name: 'Premises Liability', href: '/practice-areas/personal-injury/premises-liability' },
        { name: 'Product Liability', href: '/practice-areas/personal-injury/product-liability' },
      ]
    },
    {
      title: 'Workers\' Compensation',
      items: [
        { name: 'Construction Injuries', href: '/practice-areas/workers-compensation/construction-injuries' },
        { name: 'Workplace Accidents', href: '/practice-areas/workers-compensation/workplace-accidents' },
        { name: 'Repetitive Stress Injuries', href: '/practice-areas/workers-compensation/repetitive-stress' },
        { name: 'Occupational Illness', href: '/practice-areas/workers-compensation/occupational-illness' },
        { name: 'Third-Party Claims', href: '/practice-areas/workers-compensation/third-party-claims' },
        { name: 'Denied Claims', href: '/practice-areas/workers-compensation/denied-claims' },
        { name: 'Return to Work', href: '/practice-areas/workers-compensation/return-to-work' },
        { name: 'Disability Benefits', href: '/practice-areas/workers-compensation/disability-benefits' },
      ]
    },
    {
      title: 'Criminal Defense',
      items: [
        { name: 'DUI/DWI', href: '/practice-areas/criminal-defense/dui-dwi' },
        { name: 'Drug Crimes', href: '/practice-areas/criminal-defense/drug-crimes' },
        { name: 'Assault & Battery', href: '/practice-areas/criminal-defense/assault-battery' },
        { name: 'Domestic Violence', href: '/practice-areas/criminal-defense/domestic-violence' },
        { name: 'Theft & Property Crimes', href: '/practice-areas/criminal-defense/theft-property' },
        { name: 'White Collar Crimes', href: '/practice-areas/criminal-defense/white-collar' },
        { name: 'Federal Crimes', href: '/practice-areas/criminal-defense/federal-crimes' },
        { name: 'Expungement', href: '/practice-areas/criminal-defense/expungement' },
        { name: 'Probation Violation', href: '/practice-areas/criminal-defense/probation-violation' },
        { name: 'Juvenile Defense', href: '/practice-areas/criminal-defense/juvenile-defense' },
      ]
    },
    {
      title: 'Family Law',
      items: [
        { name: 'Divorce', href: '/practice-areas/family-law/divorce' },
        { name: 'Child Custody', href: '/practice-areas/family-law/child-custody' },
        { name: 'Child Support', href: '/practice-areas/family-law/child-support' },
        { name: 'Alimony/Spousal Support', href: '/practice-areas/family-law/alimony' },
        { name: 'Property Division', href: '/practice-areas/family-law/property-division' },
        { name: 'Prenuptial Agreements', href: '/practice-areas/family-law/prenuptial-agreements' },
        { name: 'Adoption', href: '/practice-areas/family-law/adoption' },
        { name: 'Domestic Violence Protection', href: '/practice-areas/family-law/domestic-violence' },
        { name: 'Guardianship', href: '/practice-areas/family-law/guardianship' },
      ]
    },
    {
      title: 'Traffic Violations',
      items: [
        { name: 'Speeding Tickets', href: '/practice-areas/traffic-violations/speeding' },
        { name: 'Reckless Driving', href: '/practice-areas/traffic-violations/reckless-driving' },
        { name: 'License Suspension', href: '/practice-areas/traffic-violations/license-suspension' },
        { name: 'CDL Violations', href: '/practice-areas/traffic-violations/cdl' },
        { name: 'Hit and Run', href: '/practice-areas/traffic-violations/hit-and-run' },
        { name: 'Driving Without License', href: '/practice-areas/traffic-violations/no-license' },
        { name: 'Traffic Court Representation', href: '/practice-areas/traffic-violations/court-representation' },
      ]
    }
  ]
};

export const attorneys: MegaMenuItem = {
  name: 'Attorneys',
  href: '/attorneys',
  columns: [
    {
      title: 'Our Legal Team',
      items: [
        { name: 'William Vasquez', href: '/attorneys/william-vasquez', description: 'Founding Partner' },
        { name: 'Kelly Vega', href: '/attorneys/kelly-vega', description: 'Partner' },
        { name: 'Rebecca Sommer', href: '/attorneys/rebecca-sommer', description: 'Senior Attorney' },
        { name: 'Christopher Afanador', href: '/attorneys/christopher-afanador', description: 'Attorney' },
        { name: 'Jillian Baucom', href: '/attorneys/jillian-baucom', description: 'Attorney' },
        { name: 'Roselyn V. Torrellas', href: '/attorneys/roselyn-v-torrellas', description: 'Attorney' },
        { name: 'Adrianna Ingram', href: '/attorneys/adrianna-ingram', description: 'Attorney' },
      ]
    }
  ]
};

export const mainNavigation: NavItem[] = [
  { name: 'Home', href: '/' },
  practiceAreas,
  attorneys,
  { name: 'Locations', href: '/locations' },
  { 
    name: 'About',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/our-team' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Case Results', href: '/case-results' },
    ]
  },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Scholarship', href: '/scholarship' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export const spanishNavigation: NavItem[] = [
  { name: 'Inicio', href: '/es' },
  {
    name: 'Áreas de Práctica',
    href: '/es/areas-de-practica',
    columns: [
      {
        title: 'Ley de Inmigración',
        items: [
          { name: 'Inmigración Familiar', href: '/es/areas-de-practica/inmigracion/familiar' },
          { name: 'Inmigración Humanitaria', href: '/es/areas-de-practica/inmigracion/humanitaria' },
          { name: 'Defensa de Deportación', href: '/es/areas-de-practica/inmigracion/defensa-deportacion' },
          { name: 'Inmigración de Negocios', href: '/es/areas-de-practica/inmigracion/negocios' },
        ]
      },
      {
        title: 'Lesiones Personales',
        items: [
          { name: 'Accidentes de Auto', href: '/es/areas-de-practica/lesiones-personales/accidentes-auto' },
          { name: 'Accidentes de Motocicleta', href: '/es/areas-de-practica/lesiones-personales/accidentes-motocicleta' },
          { name: 'Accidentes de Camión', href: '/es/areas-de-practica/lesiones-personales/accidentes-camion' },
          { name: 'Resbalones y Caídas', href: '/es/areas-de-practica/lesiones-personales/resbalones-caidas' },
        ]
      },
      {
        title: 'Otros Servicios',
        items: [
          { name: 'Compensación Laboral', href: '/es/areas-de-practica/compensacion-laboral' },
          { name: 'Defensa Criminal', href: '/es/areas-de-practica/defensa-criminal' },
          { name: 'Derecho Familiar', href: '/es/areas-de-practica/derecho-familia' },
          { name: 'Infracciones de Tráfico', href: '/es/areas-de-practica/infracciones-transito' },
        ]
      }
    ]
  },
  {
    name: 'Abogados',
    href: '/es/abogados',
    columns: [
      {
        title: 'Nuestro Equipo Legal',
        items: [
          { name: 'William Vasquez', href: '/es/abogados/william-vasquez' },
          { name: 'Kelly Vega', href: '/es/abogados/kelly-vega' },
          { name: 'Rebecca Sommer', href: '/es/abogados/rebecca-sommer' },
          { name: 'Christopher Afanador', href: '/es/abogados/christopher-afanador' },
          { name: 'Jillian Baucom', href: '/es/abogados/jillian-baucom' },
          { name: 'Roselyn V. Torrellas', href: '/es/abogados/roselyn-v-torrellas' },
          { name: 'Adrianna Ingram', href: '/es/abogados/adrianna-ingram' },
        ]
      }
    ]
  },
  { name: 'Ubicaciones', href: '/es/ubicaciones' },
  { name: 'Acerca de', href: '/es/acerca-de' },
  { name: 'Recursos', href: '/es/recursos' },
  { name: 'Blog', href: '/es/blog' },
  { name: 'Beca', href: '/es/becas' },
  { name: 'Preguntas Frecuentes', href: '/es/preguntas-frecuentes' },
  { name: 'Contacto', href: '/es/contacto' },
];