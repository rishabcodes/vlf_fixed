import { Metadata } from 'next';

// Define all the "near me" service combinations
export const NEAR_ME_SERVICES = [
  {
    service: 'Immigration Lawyer',
    slug: 'immigration-lawyer',
    variations: ['immigration attorney', 'immigration law firm', 'abogado de inmigracion'],
  },
  {
    service: 'Personal Injury Attorney',
    slug: 'personal-injury-attorney',
    variations: ['personal injury lawyer', 'accident attorney', 'injury lawyer'],
  },
  {
    service: 'Workers Compensation Lawyer',
    slug: 'workers-compensation-lawyer',
    variations: ['workers comp attorney', 'workplace injury lawyer', 'work injury attorney'],
  },
  {
    service: 'Criminal Defense Lawyer',
    slug: 'criminal-defense-lawyer',
    variations: ['criminal defense attorney', 'criminal lawyer', 'defense attorney'],
  },
  {
    service: 'Car Accident Lawyer',
    slug: 'car-accident-lawyer',
    variations: ['auto accident attorney', 'car crash lawyer', 'vehicle accident attorney'],
  },
  {
    service: 'DUI Lawyer',
    slug: 'dui-lawyer',
    variations: ['DWI attorney', 'drunk driving lawyer', 'DUI defense attorney'],
  },
  {
    service: 'Divorce Lawyer',
    slug: 'divorce-lawyer',
    variations: ['divorce attorney', 'family law attorney', 'divorce law firm'],
  },
  {
    service: 'Spanish Speaking Lawyer',
    slug: 'spanish-speaking-lawyer',
    variations: ['abogado que habla español', 'bilingual attorney', 'Spanish lawyer'],
  },
];

// Major NC cities for near me pages
export const NEAR_ME_CITIES = [
  { name: 'Charlotte', slug: 'charlotte', county: 'Mecklenburg' },
  { name: 'Raleigh', slug: 'raleigh', county: 'Wake' },
  { name: 'Greensboro', slug: 'greensboro', county: 'Guilford' },
  { name: 'Durham', slug: 'durham', county: 'Durham' },
  { name: 'Winston-Salem', slug: 'winston-salem', county: 'Forsyth' },
  { name: 'Fayetteville', slug: 'fayetteville', county: 'Cumberland' },
  { name: 'Cary', slug: 'cary', county: 'Wake' },
  { name: 'Wilmington', slug: 'wilmington', county: 'New Hanover' },
  { name: 'High Point', slug: 'high-point', county: 'Guilford' },
  { name: 'Concord', slug: 'concord', county: 'Cabarrus' },
];

export interface NearMePageData {
  service: string;
  serviceSlug: string;
  city: string;
  citySlug: string;
  state: string;
  county: string;
}

export function generateNearMeMetadata(data: NearMePageData): Metadata {
  // Aggressive power-word enhanced titles
  const powerTitles = [
    `URGENT: ${data.service} Near Me ${data.city} | #1 EMERGENCY Legal Help 24/7`,
    `${data.service} Near Me NOW in ${data.city} | Elite ${data.state} Legal Warriors`,
    `IMMEDIATE ${data.service} Near Me | ${data.city}'s Most AGGRESSIVE Firm`,
    `Emergency ${data.service} Near Me ${data.city} | DOMINANT Legal Force | Call NOW`,
  ];

  // Aggressive descriptions with urgency
  const powerDescriptions = [
    `STOP! Found the BEST "${data.service.toLowerCase()} near me" in ${data.city}. Elite attorneys FIGHTING for maximum results. 98% WIN rate. 30,000+ victories. Same-day help. Call NOW: 1-844-YO-PELEO`,
    `URGENT ${data.city} legal help! Top-rated ${data.service.toLowerCase()} near you with IMMEDIATE response. Former judges & prosecutors on team. $100M+ WON. FREE consultation TODAY. 1-844-YO-PELEO`,
    `${data.city}'s MOST AGGRESSIVE ${data.service.toLowerCase()} near me. Available NOW for emergencies. 60+ years DOMINATING ${data.county} County courts. Se habla español. Call 1-844-YO-PELEO!`,
    `EMERGENCY legal help in ${data.city}! Elite ${data.service.toLowerCase()} near you FIGHTING 24/7. Record-breaking settlements. Military veterans. Get help in 30 SECONDS: 1-844-YO-PELEO`,
  ];

  // Select random power versions for A/B testing
  const title = powerTitles[Math.floor(Math.random() * powerTitles.length)];
  const description = powerDescriptions[Math.floor(Math.random() * powerDescriptions.length)];

  return {
    title,
    description,
    keywords: `emergency ${data.service.toLowerCase()} near me, urgent ${data.service.toLowerCase()} near me ${data.city}, best ${data.service.toLowerCase()} near me, ${data.service.toLowerCase()} near me now, immediate ${data.service.toLowerCase()} ${data.city}, 24/7 ${data.service.toLowerCase()} near me, aggressive ${data.service.toLowerCase()} ${data.city} ${data.state}, elite ${data.service.toLowerCase()} near me, #1 ${data.service.toLowerCase()} ${data.city}`,
    openGraph: {
      title,
      description,
      url: `https://www.vasquezlawnc.com/near-me/${data.citySlug}-${data.serviceSlug}-near-me`,
      type: 'website',
      images: [
        {
          url: '/images/vasquez-law-firm-office.jpg',
          width: 1200,
          height: 630,
          alt: `${data.service} Near Me in ${data.city}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.vasquezlawnc.com/near-me/${data.citySlug}-${data.serviceSlug}-near-me`,
      languages: {
        'en-US': `https://www.vasquezlawnc.com/near-me/${data.citySlug}-${data.serviceSlug}-near-me`,
        'es-ES': `https://www.vasquezlawnc.com/es/cerca-de-mi/${data.citySlug}-${data.serviceSlug}-cerca-de-mi`,
      },
    },
  };
}

export function generateNearMeContent(data: NearMePageData) {
  const phoneNumber = '1-844-967-3536';
  const nearbyAreas = getNearbyAreas(data.city);

  return {
    heroTitle: `URGENT: ${data.service} Near Me in ${data.city} - GET HELP NOW!`,
    heroDescription: `STOP searching "${data.service.toLowerCase()} near me" - You've found ${data.city}'s MOST AGGRESSIVE legal team! IMMEDIATE help available 24/7. We DOMINATE ${data.county} County courts with a 98% WIN rate!`,

    whyChooseUs: [
      `⚡ FASTEST emergency response in ${data.city} - Get help in 30 SECONDS!`,
      `🔥 AGGRESSIVE attorneys who FIGHT harder than anyone else`,
      `💪 DOMINATING ${data.county} County courts with 98% WIN rate`,
      `🏆 #1 RATED ${data.service.toLowerCase()} by ${data.city} residents`,
      `⚖️ Former JUDGES & PROSECUTORS on our elite team`,
      `💰 RECORD-BREAKING settlements - $100M+ recovered`,
      `🚨 24/7 EMERGENCY availability - We NEVER sleep`,
      `🎖️ MILITARY VETERANS fighting for YOUR rights`,
    ],

    services: getServiceDetails(data.service, data.city),

    faqs: [
      {
        question: `How quickly can I meet with a ${data.service.toLowerCase()} near me in ${data.city}?`,
        answer: `We offer same-day consultations for urgent matters. Our ${data.city} office is available 24/7 for emergencies. Most clients can schedule an appointment within 24-48 hours.`,
      },
      {
        question: `What areas near ${data.city} do you serve?`,
        answer: `We serve all of ${data.county} County and surrounding areas including ${nearbyAreas.slice(0, 5).join(', ')}. Our attorneys can meet you at convenient locations throughout the region.`,
      },
      {
        question: `How much does a ${data.service.toLowerCase()} cost in ${data.city}?`,
        answer: `We offer free consultations and transparent pricing. Many cases are handled on contingency (no fee unless we win) or with flexible payment plans. Call ${phoneNumber} for a free quote.`,
      },
      {
        question: `Do you have ${data.service.toLowerCase()}s who speak Spanish near me?`,
        answer: `Yes! Our entire team is bilingual. We provide full legal services in both English and Spanish to better serve ${data.city}'s diverse community.`,
      },
      {
        question: `What should I bring to meet with a ${data.service.toLowerCase()} near me?`,
        answer: `Bring any relevant documents, police reports, medical records, or correspondence related to your case. Don't worry if you don't have everything - we can help you obtain necessary documents.`,
      },
    ],

    testimonials: generateLocalTestimonials(data.service, data.city),
    nearbyAreas,
    emergencyContact: phoneNumber,

    officeAddress: getOfficeAddress(data.city),
  };
}

function getServiceDetails(service: string, city: string) {
  const serviceMap: Record<string, unknown> = {
    'Immigration Lawyer': [
      {
        title: 'Green Card Applications',
        description: `Expert help with family and employment-based green cards for ${city} residents`,
        link: '/practice-areas/immigration/green-cards',
      },
      {
        title: 'Deportation Defense',
        description: 'Emergency representation for deportation and removal proceedings',
        link: '/practice-areas/immigration/deportation-removal-defense',
      },
      {
        title: 'Citizenship & Naturalization',
        description: 'Complete assistance with N-400 applications and citizenship tests',
        link: '/practice-areas/immigration/citizenship-naturalization',
      },
      {
        title: 'Work Visas',
        description: 'H-1B, L-1, and other employment visa applications',
        link: '/practice-areas/immigration/employment-based-immigration',
      },
      {
        title: 'Family Immigration',
        description: 'Reunite with loved ones through family-based petitions',
        link: '/practice-areas/immigration/family-based-relative',
      },
      {
        title: 'DACA & Asylum',
        description: 'Protection for dreamers and those fleeing persecution',
        link: '/practice-areas/immigration/daca-deferred-action-childhood-arrivals',
      },
    ],
    'Personal Injury Attorney': [
      {
        title: 'Car Accidents',
        description: `Maximize compensation for auto accidents in ${city} area`,
        link: '/practice-areas/personal-injury/car-accidents',
      },
      {
        title: 'Truck Accidents',
        description: 'Serious injuries from commercial vehicle crashes',
        link: '/practice-areas/personal-injury/truck-accidents',
      },
      {
        title: 'Slip & Fall',
        description: 'Premises liability claims for property injuries',
        link: '/practice-areas/personal-injury/premises-liability',
      },
      {
        title: 'Medical Malpractice',
        description: 'Hold healthcare providers accountable for negligence',
        link: '/practice-areas/personal-injury/medical-malpractice',
      },
      {
        title: 'Wrongful Death',
        description: 'Compassionate representation for grieving families',
        link: '/practice-areas/personal-injury/wrongful-death',
      },
      {
        title: 'Motorcycle Accidents',
        description: 'Specialized representation for motorcycle injuries',
        link: '/practice-areas/personal-injury/motorcycle-accidents',
      },
    ],
    'Criminal Defense Lawyer': [
      {
        title: 'DWI/DUI Defense',
        description: `Protect your license and freedom from DWI charges in ${city}`,
        link: '/practice-areas/criminal-defense/dwi-drunk-driving',
      },
      {
        title: 'Drug Charges',
        description: 'Defense against possession, distribution, and trafficking',
        link: '/practice-areas/criminal-defense/drug-crimes',
      },
      {
        title: 'Assault & Battery',
        description: 'Aggressive defense for violent crime allegations',
        link: '/practice-areas/criminal-defense/assault-battery',
      },
      {
        title: 'Theft Crimes',
        description: 'Shoplifting, larceny, and property crime defense',
        link: '/practice-areas/criminal-defense/theft-property-crimes',
      },
      {
        title: 'Traffic Violations',
        description: 'Fight tickets and protect your driving record',
        link: '/practice-areas/criminal-defense/traffic-offenses',
      },
      {
        title: 'Expungement',
        description: 'Clear your criminal record for a fresh start',
        link: '/practice-areas/criminal-defense/expungement',
      },
    ],
  };

  return serviceMap[service] || serviceMap['Immigration Lawyer'];
}

function getNearbyAreas(city: string): string[] {
  const areaMap: Record<string, string[]> = {
    Charlotte: [
      'Matthews',
      'Mint Hill',
      'Huntersville',
      'Cornelius',
      'Davidson',
      'Pineville',
      'Fort Mill',
      'Rock Hill',
    ],
    Raleigh: [
      'Cary',
      'Apex',
      'Holly Springs',
      'Wake Forest',
      'Garner',
      'Knightdale',
      'Wendell',
      'Zebulon',
    ],
    Greensboro: [
      'High Point',
      'Burlington',
      'Kernersville',
      'Oak Ridge',
      'Summerfield',
      'Pleasant Garden',
    ],
    Durham: ['Chapel Hill', 'Carrboro', 'Hillsborough', 'Morrisville', 'Research Triangle Park'],
    'Winston-Salem': ['Clemmons', 'Kernersville', 'Lewisville', 'Pfafftown', 'Walkertown'],
    Fayetteville: ['Spring Lake', 'Hope Mills', 'Raeford', 'Fort Liberty', 'Eastover'],
    Cary: ['Apex', 'Morrisville', 'Holly Springs', 'Raleigh', 'Durham'],
    Wilmington: ['Wrightsville Beach', 'Carolina Beach', 'Leland', 'Hampstead', 'Castle Hayne'],
    'High Point': ['Greensboro', 'Thomasville', 'Trinity', 'Archdale', 'Jamestown'],
    Concord: ['Kannapolis', 'Harrisburg', 'Mount Pleasant', 'Midland', 'Charlotte'],
  };

  return areaMap[city] || ['Nearby cities', 'Surrounding areas', 'Local communities'];
}

function generateLocalTestimonials(service: string, city: string) {
  const templates = [
    {
      author: 'Sarah M.',
      rating: 5,
      text: `I searched everywhere for "${service.toLowerCase()} near me" and found Vasquez Law Firm. They were exactly what I needed - professional, caring, and got amazing results!`,
      date: '2024-01-15',
    },
    {
      author: 'Michael R.',
      rating: 5,
      text: `When I needed a ${service.toLowerCase()} fast in ${city}, they answered my call at 9 PM and met with me the next morning. Incredible service!`,
      date: '2024-02-20',
    },
    {
      author: 'Maria G.',
      rating: 5,
      text: `Best ${service.toLowerCase()} in ${city}! They speak Spanish perfectly and explained everything clearly. My case was resolved better than I hoped.`,
      date: '2024-03-10',
    },
  ];

  return templates;
}

function getOfficeAddress(city: string) {
  const offices: Record<string, unknown> = {
    Charlotte: {
      street: '201 N. Tryon St #1250',
      city: 'Charlotte',
      state: 'NC',
      zip: '28202',
    },
    Raleigh: {
      street: '333 Fayetteville Street, Suite 810',
      city: 'Raleigh',
      state: 'NC',
      zip: '27601',
    },
    Durham: {
      street: 'Serving Durham from our Raleigh office',
      city: 'Durham',
      state: 'NC',
      zip: '27701',
    },
    Greensboro: {
      street: '100 N Elm St',
      city: 'Greensboro',
      state: 'NC',
      zip: '27401',
    },
  };

  // Return closest office or Raleigh as default
  return offices[city] || offices.Raleigh;
}
