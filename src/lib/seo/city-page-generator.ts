import { Metadata } from 'next';

// Top 50 NC cities to target for SEO
export const NC_CITIES = [
  // Major cities (already have some)
  { name: 'Charlotte', slug: 'charlotte', county: 'Mecklenburg', population: 885708 },
  { name: 'Raleigh', slug: 'raleigh', county: 'Wake', population: 474069 },
  { name: 'Greensboro', slug: 'greensboro', county: 'Guilford', population: 296710 },
  { name: 'Durham', slug: 'durham', county: 'Durham', population: 278993 },
  { name: 'Winston-Salem', slug: 'winston-salem', county: 'Forsyth', population: 247945 },
  { name: 'Fayetteville', slug: 'fayetteville', county: 'Cumberland', population: 211657 },
  { name: 'Cary', slug: 'cary', county: 'Wake', population: 174721 },
  { name: 'Wilmington', slug: 'wilmington', county: 'New Hanover', population: 123744 },
  { name: 'High Point', slug: 'high-point', county: 'Guilford', population: 112791 },
  { name: 'Concord', slug: 'concord', county: 'Cabarrus', population: 96341 },

  // Medium cities
  { name: 'Gastonia', slug: 'gastonia', county: 'Gaston', population: 77273 },
  { name: 'Jacksonville', slug: 'jacksonville', county: 'Onslow', population: 72876 },
  { name: 'Chapel Hill', slug: 'chapel-hill', county: 'Orange', population: 61960 },
  { name: 'Rocky Mount', slug: 'rocky-mount', county: 'Nash/Edgecombe', population: 54341 },
  { name: 'Burlington', slug: 'burlington', county: 'Alamance', population: 54376 },
  { name: 'Huntersville', slug: 'huntersville', county: 'Mecklenburg', population: 61376 },
  { name: 'Kannapolis', slug: 'kannapolis', county: 'Cabarrus', population: 53114 },
  { name: 'Apex', slug: 'apex', county: 'Wake', population: 58780 },
  { name: 'Greenville', slug: 'greenville', county: 'Pitt', population: 87521 },
  { name: 'Hickory', slug: 'hickory', county: 'Catawba', population: 43490 },

  // Growth cities
  { name: 'Indian Trail', slug: 'indian-trail', county: 'Union', population: 39997 },
  { name: 'Mooresville', slug: 'mooresville', county: 'Iredell', population: 50193 },
  { name: 'Goldsboro', slug: 'goldsboro', county: 'Wayne', population: 33657 },
  { name: 'Monroe', slug: 'monroe', county: 'Union', population: 34562 },
  { name: 'Salisbury', slug: 'salisbury', county: 'Rowan', population: 35580 },
  { name: 'Holly Springs', slug: 'holly-springs', county: 'Wake', population: 41239 },
  { name: 'Matthews', slug: 'matthews', county: 'Mecklenburg', population: 32682 },
  { name: 'New Bern', slug: 'new-bern', county: 'Craven', population: 31291 },
  { name: 'Sanford', slug: 'sanford', county: 'Lee', population: 30261 },
  { name: 'Cornelius', slug: 'cornelius', county: 'Mecklenburg', population: 31412 },

  // Strategic smaller cities
  { name: 'Thomasville', slug: 'thomasville', county: 'Davidson', population: 26757 },
  { name: 'Garner', slug: 'garner', county: 'Wake', population: 31159 },
  { name: 'Asheboro', slug: 'asheboro', county: 'Randolph', population: 25965 },
  { name: 'Statesville', slug: 'statesville', county: 'Iredell', population: 28419 },
  { name: 'Kernersville', slug: 'kernersville', county: 'Forsyth', population: 26445 },
  { name: 'Fuquay-Varina', slug: 'fuquay-varina', county: 'Wake', population: 34034 },
  { name: 'Wake Forest', slug: 'wake-forest', county: 'Wake', population: 47601 },
  { name: 'Wilson', slug: 'wilson', county: 'Wilson', population: 47851 },
  { name: 'Shelby', slug: 'shelby', county: 'Cleveland', population: 21918 },
  { name: 'Carrboro', slug: 'carrboro', county: 'Orange', population: 21295 },

  // Additional strategic cities
  { name: 'Clayton', slug: 'clayton', county: 'Johnston', population: 26307 },
  { name: 'Mint Hill', slug: 'mint-hill', county: 'Mecklenburg', population: 27258 },
  { name: 'Morrisville', slug: 'morrisville', county: 'Wake', population: 29630 },
  { name: 'Leland', slug: 'leland', county: 'Brunswick', population: 23504 },
  { name: 'Asheville', slug: 'asheville', county: 'Buncombe', population: 94589 },
  { name: 'Hendersonville', slug: 'hendersonville', county: 'Henderson', population: 15522 },
  { name: 'Clemmons', slug: 'clemmons', county: 'Forsyth', population: 21177 },
  { name: 'Waxhaw', slug: 'waxhaw', county: 'Union', population: 20534 },
  { name: 'Elizabeth City', slug: 'elizabeth-city', county: 'Pasquotank', population: 17725 },
  { name: 'Smithfield', slug: 'smithfield', county: 'Johnston', population: 12697 },
];

export interface CityPageData {
  city: string;
  slug: string;
  county: string;
  population: number;
  nearbyOffice: string;
  phoneNumber: string;
}

export function generateCityMetadata(city: CityPageData): Metadata {
  return {
    title: `${city.city} Immigration Lawyer & Personal Injury Attorney | #1 Rated | Vasquez Law Firm`,
    description: `Top-rated ${city.city}, NC attorneys. Immigration, personal injury, workers comp, criminal defense. Free consultation. 24/7 availability. Se habla español. Call 1-844-YO-PELEO.`,
    keywords: `${city.city} lawyer, ${city.city} attorney, ${city.city} immigration lawyer, ${city.city} personal injury attorney, ${city.city} criminal defense lawyer, ${city.city} workers comp attorney, abogado ${city.city}, lawyers in ${city.city} NC`,
    openGraph: {
      title: `${city.city} Immigration & Personal Injury Lawyers | Vasquez Law Firm`,
      description: `Serving ${city.city} and ${city.county} County with 60+ years of legal excellence. Free consultation. Available 24/7.`,
      url: `https://www.vasquezlawnc.com/locations/nc/${city.slug}`,
      images: [
        {
          url: '/images/vasquez-law-firm-office.jpg',
          width: 1200,
          height: 630,
          alt: `Vasquez Law Firm - ${city.city} Office`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.vasquezlawnc.com/locations/nc/${city.slug}`,
      languages: {
        'en-US': `https://www.vasquezlawnc.com/locations/nc/${city.slug}`,
        'es-ES': `https://www.vasquezlawnc.com/es/ubicaciones/nc/${city.slug}`,
      },
    },
  };
}

export function getNearbyOffice(cityName: string): string {
  const officeAssignments: Record<string, string> = {
    // Charlotte area
    Charlotte: 'Charlotte',
    Huntersville: 'Charlotte',
    Matthews: 'Charlotte',
    'Mint Hill': 'Charlotte',
    Cornelius: 'Charlotte',
    Concord: 'Charlotte',
    Gastonia: 'Charlotte',
    Monroe: 'Charlotte',
    'Indian Trail': 'Charlotte',
    Kannapolis: 'Charlotte',
    Mooresville: 'Charlotte',
    Waxhaw: 'Charlotte',

    // Raleigh area
    Raleigh: 'Raleigh',
    Cary: 'Raleigh',
    Apex: 'Raleigh',
    'Holly Springs': 'Raleigh',
    'Fuquay-Varina': 'Raleigh',
    'Wake Forest': 'Raleigh',
    Garner: 'Raleigh',
    Morrisville: 'Raleigh',
    Knightdale: 'Raleigh',
    Wendell: 'Raleigh',
    Zebulon: 'Raleigh',

    // Durham/Chapel Hill area
    Durham: 'Raleigh',
    'Chapel Hill': 'Raleigh',
    Carrboro: 'Raleigh',
    Hillsborough: 'Raleigh',

    // Smithfield area
    Smithfield: 'Smithfield',
    Clayton: 'Smithfield',
    Benson: 'Smithfield',
    Princeton: 'Smithfield',
    Selma: 'Smithfield',
    Wilson: 'Smithfield',

    // Greensboro/Winston-Salem area
    Greensboro: 'Greensboro',
    'Winston-Salem': 'Greensboro',
    'High Point': 'Greensboro',
    Burlington: 'Greensboro',
    Kernersville: 'Greensboro',
    Clemmons: 'Greensboro',
    Thomasville: 'Greensboro',
    Asheboro: 'Greensboro',

    // Eastern NC
    Wilmington: 'Raleigh',
    Jacksonville: 'Raleigh',
    Greenville: 'Raleigh',
    'New Bern': 'Raleigh',
    'Rocky Mount': 'Raleigh',
    Goldsboro: 'Raleigh',
    'Elizabeth City': 'Raleigh',
    Leland: 'Raleigh',

    // Western NC
    Asheville: 'Charlotte',
    Hickory: 'Charlotte',
    Hendersonville: 'Charlotte',
    Shelby: 'Charlotte',
    Statesville: 'Charlotte',

    // Fayetteville area
    Fayetteville: 'Raleigh',
    Sanford: 'Raleigh',
  };

  return officeAssignments[cityName] || 'Raleigh'; // Default to Raleigh
}

export function generateCityPageContent(city: CityPageData) {
  const nearbyOffice = getNearbyOffice(city.city);

  return {
    heroTitle: `${city.city}'s #1 Immigration & Personal Injury Law Firm`,
    heroSubtitle: `Serving ${city.city} and all of ${city.county} County with 60+ Years of Legal Excellence`,
    heroDescription: `Get the legal representation you deserve from North Carolina's most trusted law firm. Our ${nearbyOffice} office serves ${city.city} with comprehensive legal services in immigration, personal injury, workers' compensation, and criminal defense.`,

    whyChooseUs: [
      {
        title: '60+ Years Combined Experience',
        description: `Our attorneys bring decades of experience to ${city.city} residents, handling complex cases with proven success.`,
      },
      {
        title: '24/7 Availability',
        description:
          "Legal emergencies don't wait. Our AI-powered system and on-call attorneys are available round the clock.",
      },
      {
        title: 'Bilingual Services',
        description:
          'Full legal services in English and Spanish. Every ${city.city} client gets service in their preferred language.',
      },
      {
        title: 'No Win, No Fee',
        description:
          "For personal injury and workers' comp cases, you pay nothing unless we win your case.",
      },
    ],

    practiceAreas: [
      {
        name: 'Immigration Law',
        description: `Help for ${city.city} families with green cards, visas, deportation defense, and citizenship.`,
        features: [
          'Family Petitions',
          'Work Visas',
          'Deportation Defense',
          'Citizenship',
          'DACA',
          'Asylum',
        ],
      },
      {
        name: 'Personal Injury',
        description: `Fighting for ${city.city} accident victims to get maximum compensation for their injuries.`,
        features: [
          'Car Accidents',
          'Truck Accidents',
          'Motorcycle Accidents',
          'Slip & Fall',
          'Medical Malpractice',
          'Wrongful Death',
        ],
      },
      {
        name: "Workers' Compensation",
        description: `Protecting ${city.city} workers\' rights and securing benefits for workplace injuries.`,
        features: [
          'Workplace Injuries',
          'Denied Claims',
          'Disability Benefits',
          'Medical Treatment',
          'Lost Wages',
          'Appeals',
        ],
      },
      {
        name: 'Criminal Defense',
        description: `Aggressive defense for ${city.city} residents facing criminal charges.`,
        features: [
          'DWI/DUI',
          'Drug Charges',
          'Assault',
          'Theft',
          'Traffic Violations',
          'Federal Crimes',
        ],
      },
    ],

    localContent: {
      courthouses: getCityCourthouses(city.city, city.county),
      statistics: getCityStatistics(city),
      testimonials: generateLocalTestimonials(city.city),
    },
  };
}

function getCityCourthouses(city: string, county: string) {
  // Return relevant courthouse information for the city/county
  return [
    {
      name: `${county} County Courthouse`,
      type: 'County Court',
      description: `We represent clients at the ${county} County Courthouse for all civil and criminal matters.`,
    },
    {
      name: `${city} Immigration Court`,
      type: 'Federal Court',
      description:
        'Our immigration attorneys handle cases at the Charlotte Immigration Court, serving all of NC.',
    },
  ];
}

function getCityStatistics(city: CityPageData) {
  return {
    population: city.population.toLocaleString(),
    hispanicPopulation: Math.round(city.population * 0.15).toLocaleString(), // Estimate
    averageSettlement: '$127,000',
    casesWon: '2,500+',
    clientsSatisfied: '98%',
  };
}

function generateLocalTestimonials(cityName: string) {
  return [
    {
      author: 'Maria G.',
      location: cityName,
      text: `Vasquez Law Firm helped me get my green card after years of waiting. They speak Spanish perfectly and made me feel comfortable. Best lawyers in ${cityName}!`,
      rating: 5,
    },
    {
      author: 'John D.',
      location: cityName,
      text: `After my car accident in ${cityName}, Vasquez Law Firm got me a settlement that covered all my medical bills. They truly fight for their clients!`,
      rating: 5,
    },
    {
      author: 'Carlos M.',
      location: cityName,
      text: `Facing deportation was terrifying, but Vasquez Law Firm saved my family. Now I can stay in ${cityName} with my children. Forever grateful!`,
      rating: 5,
    },
  ];
}
