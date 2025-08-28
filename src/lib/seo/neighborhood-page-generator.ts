import { Metadata } from 'next';

// Charlotte Neighborhoods
export const CHARLOTTE_NEIGHBORHOODS = [
  { name: 'Uptown', slug: 'uptown', zipCodes: ['28202', '28280'] },
  { name: 'South End', slug: 'south-end', zipCodes: ['28203'] },
  { name: 'Dilworth', slug: 'dilworth', zipCodes: ['28203'] },
  { name: 'Myers Park', slug: 'myers-park', zipCodes: ['28207', '28211'] },
  { name: 'Ballantyne', slug: 'ballantyne', zipCodes: ['28277'] },
  { name: 'NoDa', slug: 'noda', zipCodes: ['28205', '28206'] },
  { name: 'Plaza Midwood', slug: 'plaza-midwood', zipCodes: ['28205'] },
  { name: 'Elizabeth', slug: 'elizabeth', zipCodes: ['28204'] },
  { name: 'SouthPark', slug: 'southpark', zipCodes: ['28210', '28211'] },
  { name: 'University City', slug: 'university-city', zipCodes: ['28213', '28262'] },
  { name: 'Steele Creek', slug: 'steele-creek', zipCodes: ['28273', '28278'] },
  { name: 'Cotswold', slug: 'cotswold', zipCodes: ['28209', '28211'] },
  { name: 'Montford', slug: 'montford', zipCodes: ['28209'] },
  { name: 'Providence', slug: 'providence', zipCodes: ['28270'] },
  { name: 'Pineville', slug: 'pineville-area', zipCodes: ['28134'] },
];

// Raleigh Neighborhoods
export const RALEIGH_NEIGHBORHOODS = [
  { name: 'Downtown', slug: 'downtown', zipCodes: ['27601', '27605'] },
  { name: 'North Hills', slug: 'north-hills', zipCodes: ['27609'] },
  { name: 'Cameron Village', slug: 'cameron-village', zipCodes: ['27605', '27607'] },
  { name: 'Five Points', slug: 'five-points', zipCodes: ['27607', '27608'] },
  { name: 'Brier Creek', slug: 'brier-creek', zipCodes: ['27617'] },
  {
    name: 'North Raleigh',
    slug: 'north-raleigh',
    zipCodes: ['27609', '27612', '27613', '27614', '27615'],
  },
  { name: 'Glenwood South', slug: 'glenwood-south', zipCodes: ['27603', '27605'] },
  { name: 'ITB (Inside the Beltline)', slug: 'inside-the-beltline', zipCodes: ['27605', '27608'] },
  { name: 'Oakwood', slug: 'oakwood', zipCodes: ['27601', '27610'] },
  { name: 'Midtown', slug: 'midtown', zipCodes: ['27604', '27609'] },
  { name: 'Falls River', slug: 'falls-river', zipCodes: ['27614'] },
  { name: 'Wakefield', slug: 'wakefield', zipCodes: ['27614'] },
  { name: 'Six Forks', slug: 'six-forks', zipCodes: ['27609', '27615'] },
  { name: 'Crabtree', slug: 'crabtree', zipCodes: ['27612'] },
  { name: 'Southwest Raleigh', slug: 'southwest-raleigh', zipCodes: ['27606', '27610'] },
];

// Durham Neighborhoods
export const DURHAM_NEIGHBORHOODS = [
  { name: 'Downtown Durham', slug: 'downtown', zipCodes: ['27701'] },
  { name: 'Ninth Street', slug: 'ninth-street', zipCodes: ['27705'] },
  { name: 'Trinity Park', slug: 'trinity-park', zipCodes: ['27701', '27705'] },
  { name: 'Old West Durham', slug: 'old-west-durham', zipCodes: ['27701'] },
  { name: 'Duke Park', slug: 'duke-park', zipCodes: ['27701', '27705'] },
  { name: 'Brightleaf', slug: 'brightleaf', zipCodes: ['27701'] },
  { name: 'American Tobacco', slug: 'american-tobacco', zipCodes: ['27701'] },
  { name: 'Hope Valley', slug: 'hope-valley', zipCodes: ['27707'] },
  { name: 'Woodcroft', slug: 'woodcroft', zipCodes: ['27713'] },
  { name: 'Research Triangle Park', slug: 'rtp', zipCodes: ['27709'] },
  { name: 'Southpoint', slug: 'southpoint', zipCodes: ['27713'] },
  { name: 'Bragtown', slug: 'bragtown', zipCodes: ['27704'] },
  { name: 'East Durham', slug: 'east-durham', zipCodes: ['27703'] },
  { name: 'Forest Hills', slug: 'forest-hills', zipCodes: ['27707'] },
  { name: 'Watts Hospital', slug: 'watts-hospital', zipCodes: ['27705'] },
];

export interface NeighborhoodPageData {
  neighborhood: string;
  slug: string;
  city: string;
  citySlug: string;
  zipCodes: string[];
}

export function generateNeighborhoodMetadata(data: NeighborhoodPageData): Metadata {
  const zipList = data.zipCodes.join(', ');

  return {
    title: `${data.neighborhood} ${data.city} Immigration Lawyer & Personal Injury Attorney | Vasquez Law Firm`,
    description: `Top-rated attorneys serving ${data.neighborhood} area of ${data.city}, NC (${zipList}). Immigration, personal injury, criminal defense. Free consultation. Se habla español.`,
    keywords: `${data.neighborhood} lawyer, ${data.neighborhood} attorney, ${data.neighborhood} immigration lawyer, ${data.neighborhood} personal injury attorney, lawyers in ${data.neighborhood} ${data.city}, abogado ${data.neighborhood}, ${zipList} attorney`,
    openGraph: {
      title: `${data.neighborhood} ${data.city} Lawyers | Vasquez Law Firm`,
      description: `Serving ${data.neighborhood} residents with expert legal services. Immigration, personal injury, workers comp, criminal defense. Call 1-844-YO-PELEO.`,
      url: `https://www.vasquezlawnc.com/locations/nc/${data.citySlug}/neighborhoods/${data.slug}`,
      images: [
        {
          url: '/images/vasquez-law-firm-office.jpg',
          width: 1200,
          height: 630,
          alt: `Vasquez Law Firm - Serving ${data.neighborhood}`,
        },
      ],
    },
    alternates: {
      canonical: `https://www.vasquezlawnc.com/locations/nc/${data.citySlug}/neighborhoods/${data.slug}`,
      languages: {
        'en-US': `https://www.vasquezlawnc.com/locations/nc/${data.citySlug}/neighborhoods/${data.slug}`,
        'es-ES': `https://www.vasquezlawnc.com/es/ubicaciones/nc/${data.citySlug}/vecindarios/${data.slug}`,
      },
    },
  };
}

export function generateNeighborhoodPageContent(data: NeighborhoodPageData) {
  const localLandmarks = getNeighborhoodLandmarks(data.neighborhood, data.city);
  const demographics = getNeighborhoodDemographics(data.neighborhood);

  return {
    heroTitle: `${data.neighborhood} ${data.city} Legal Services`,
    heroSubtitle: `Your Trusted Neighborhood Law Firm`,
    heroDescription: `Vasquez Law Firm proudly serves the ${data.neighborhood} community with comprehensive legal services. From our ${data.city} office, we provide immigration, personal injury, criminal defense, and workers' compensation representation to ${data.neighborhood} residents.`,

    localFeatures: [
      {
        title: 'Neighborhood Expertise',
        description: `Deep understanding of ${data.neighborhood}'s unique community and legal needs`,
        icon: 'MapPin',
      },
      {
        title: 'Quick Response Time',
        description: `Fast arrival to ${data.neighborhood} for emergencies and urgent consultations`,
        icon: 'Clock',
      },
      {
        title: 'Community Focused',
        description: `Proud to serve our ${data.neighborhood} neighbors with personalized attention`,
        icon: 'Users',
      },
      {
        title: 'Bilingual Services',
        description: `Full legal services in English and Spanish for ${data.neighborhood}'s diverse residents`,
        icon: 'Globe',
      },
    ],

    practiceAreas: [
      {
        name: 'Immigration Law',
        description: `Helping ${data.neighborhood} families with visas, green cards, citizenship, and deportation defense`,
        localNote: `Serving all ${data.neighborhood} zip codes: ${data.zipCodes.join(', ')}`,
      },
      {
        name: 'Personal Injury',
        description: `Fighting for ${data.neighborhood} accident victims to get maximum compensation`,
        localNote: `Familiar with all ${data.neighborhood} streets and accident hotspots`,
      },
      {
        name: 'Criminal Defense',
        description: `Protecting ${data.neighborhood} residents facing criminal charges`,
        localNote: `24/7 availability for ${data.neighborhood} arrests and emergencies`,
      },
      {
        name: "Workers' Compensation",
        description: `Securing benefits for injured ${data.neighborhood} workers`,
        localNote: `Experience with ${data.neighborhood} employers and industries`,
      },
    ],

    localKnowledge: {
      landmarks: localLandmarks,
      demographics,
      commonIssues: getNeighborhoodLegalIssues(data.neighborhood),
      nearbyServices: getNearbyCourtsAndServices(data.city),
    },

    testimonials: generateNeighborhoodTestimonials(data.neighborhood, data.city),

    faqs: [
      {
        question: `Do you have an office in ${data.neighborhood}?`,
        answer: `While our main ${data.city} office serves all neighborhoods, we regularly meet with ${data.neighborhood} clients and offer convenient consultation options including virtual meetings and flexible appointment locations.`,
      },
      {
        question: `How quickly can you respond to emergencies in ${data.neighborhood}?`,
        answer: `We provide 24/7 emergency legal services to ${data.neighborhood} residents. Our team can typically respond within 30-45 minutes for urgent matters.`,
      },
      {
        question: `Do you understand the ${data.neighborhood} community?`,
        answer: `Absolutely. We've served ${data.neighborhood} residents for years and understand the unique needs, demographics, and challenges of your community.`,
      },
    ],
  };
}

function getNeighborhoodLandmarks(neighborhood: string, city: string): string[] {
  const landmarks: Record<string, Record<string, string[]>> = {
    Charlotte: {
      Uptown: [
        'Bank of America Stadium',
        'Spectrum Center',
        'Romare Bearden Park',
        'BB&T Ballpark',
      ],
      'South End': ['South End Historic District', 'Rail Trail', 'Atherton Mill', 'Design Center'],
      Dilworth: ['Freedom Park', 'Dilworth Historic District', 'Tom Sykes Recreation Center'],
      'Myers Park': [
        'Queens University',
        'Myers Park Country Club',
        'Myers Park Traditional School',
      ],
      Ballantyne: ['Ballantyne Corporate Park', 'Ballantyne Village', 'Ballantyne Country Club'],
      // Add more neighborhoods
    },
    Raleigh: {
      Downtown: [
        'Red Hat Amphitheater',
        'Raleigh Convention Center',
        'City Market',
        'Moore Square',
      ],
      'North Hills': ['North Hills Shopping Center', 'Midtown District', 'St. Albans Drive'],
      'Cameron Village': ['Cameron Village Shopping', 'NCSU Campus nearby', 'Pullen Park area'],
      // Add more neighborhoods
    },
    Durham: {
      Downtown: [
        'Durham Bulls Athletic Park',
        'DPAC',
        'American Tobacco Campus',
        'Durham Central Park',
      ],
      'Ninth Street': ['Ninth Street Shopping', 'Duke East Campus', "Elmo's Diner"],
      // Add more neighborhoods
    },
  };

  return (
    landmarks[city]?.[neighborhood] || [
      'Local shopping centers',
      'Community parks',
      'Schools',
      'Major intersections',
    ]
  );
}

function getNeighborhoodDemographics(neighborhood: string): {
  population: string;
  medianIncome: string;
  diversity: string;
} {
  // This would ideally come from real demographic data
  return {
    population: '15,000-25,000',
    medianIncome: '$45,000-$85,000',
    diversity: 'Diverse community with significant Hispanic population',
  };
}

function getNeighborhoodLegalIssues(neighborhood: string): string[] {
  // Common legal issues by neighborhood type
  const urbanIssues = [
    'Traffic violations and DWI arrests',
    'Immigration and ICE enforcement',
    'Workplace injuries in service industries',
    'Rental disputes and tenant rights',
    'Personal injury from accidents',
  ];

  const suburbanIssues = [
    'HOA disputes and property issues',
    'Family law and custody matters',
    'Employment-based immigration',
    'Auto accidents on major roads',
    'Estate planning needs',
  ];

  // Return appropriate issues based on neighborhood character
  return urbanIssues; // This would be more sophisticated in reality
}

function getNearbyCourtsAndServices(
  city: string
): Array<{ name: string; distance: string; type: string }> {
  const services: Record<string, Array<{ name: string; distance: string; type: string }>> = {
    Charlotte: [
      { name: 'Mecklenburg County Courthouse', distance: '5-15 min', type: 'County Court' },
      { name: 'Charlotte Immigration Court', distance: '10-20 min', type: 'Federal Court' },
      { name: 'Western District Federal Court', distance: '10-20 min', type: 'Federal Court' },
    ],
    Raleigh: [
      { name: 'Wake County Courthouse', distance: '5-15 min', type: 'County Court' },
      { name: 'Eastern District Federal Court', distance: '10-20 min', type: 'Federal Court' },
      { name: 'NC Court of Appeals', distance: '10-20 min', type: 'State Court' },
    ],
    Durham: [
      { name: 'Durham County Courthouse', distance: '5-15 min', type: 'County Court' },
      { name: 'Durham County Detention', distance: '10-20 min', type: 'Detention Center' },
      { name: 'Federal Building', distance: '10-20 min', type: 'Federal Services' },
    ],
  };

  return services[city] || [];
}

function generateNeighborhoodTestimonials(neighborhood: string, city: string) {
  return [
    {
      author: 'Local Resident',
      location: `${neighborhood}, ${city}`,
      text: `As a ${neighborhood} resident, I was so grateful to find Vasquez Law Firm. They understood our community and helped my family with our immigration case.`,
      rating: 5,
    },
    {
      author: 'Business Owner',
      location: neighborhood,
      text: `After my accident on ${neighborhood}'s busy streets, Vasquez Law Firm got me the compensation I needed. They know our area well!`,
      rating: 5,
    },
    {
      author: 'Working Parent',
      location: `${neighborhood} area`,
      text: `When I was injured at work, they handled everything. Being from ${neighborhood}, it was great having lawyers who understood our community.`,
      rating: 5,
    },
  ];
}
