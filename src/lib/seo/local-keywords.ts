// Local SEO keyword optimization utilities

export interface LocalKeywords {
  city: string;
  state: string;
  stateAbbr: string;
  neighborhoods?: string[];
  nearbyAreas?: string[];
  practiceAreaKeywords: Record<string, string[]>;
}

// North Carolina locations
export const ncLocations: Record<string, LocalKeywords> = {
  charlotte: {
    city: 'Charlotte',
    state: 'North Carolina',
    stateAbbr: 'NC',
    neighborhoods: [
      'Uptown Charlotte',
      'South End',
      'Myers Park',
      'Dilworth',
      'Plaza Midwood',
      'NoDa',
      'Elizabeth',
      'Ballantyne',
    ],
    nearbyAreas: [
      'Matthews',
      'Mint Hill',
      'Pineville',
      'Huntersville',
      'Cornelius',
      'Davidson',
      'Gastonia',
      'Rock Hill',
    ],
    practiceAreaKeywords: {
      immigration: [
        'Charlotte immigration lawyer',
        'immigration attorney Charlotte NC',
        'Charlotte deportation defense',
        'green card lawyer Charlotte',
        'Charlotte citizenship attorney',
        'immigration law firm Charlotte NC',
        'Charlotte visa attorney',
        'Charlotte NC immigration help',
      ],
      personalInjury: [
        'Charlotte personal injury lawyer',
        'car accident attorney Charlotte NC',
        'Charlotte truck accident lawyer',
        'slip and fall lawyer Charlotte',
        'Charlotte injury attorney',
        'accident lawyer Charlotte NC',
        'Charlotte workers comp attorney',
        'personal injury law firm Charlotte',
      ],
      criminalDefense: [
        'Charlotte criminal defense lawyer',
        'DWI attorney Charlotte NC',
        'criminal lawyer Charlotte',
        'Charlotte defense attorney',
        'drug charges lawyer Charlotte',
        'Charlotte NC criminal attorney',
        'traffic lawyer Charlotte',
        'Charlotte criminal law firm',
      ],
    },
  },
  raleigh: {
    city: 'Raleigh',
    state: 'North Carolina',
    stateAbbr: 'NC',
    neighborhoods: [
      'Downtown Raleigh',
      'North Hills',
      'Cameron Village',
      'Five Points',
      'Oakwood',
      'Mordecai',
      'Brier Creek',
      'Falls River',
    ],
    nearbyAreas: [
      'Cary',
      'Apex',
      'Holly Springs',
      'Wake Forest',
      'Garner',
      'Knightdale',
      'Durham',
      'Chapel Hill',
    ],
    practiceAreaKeywords: {
      immigration: [
        'Raleigh immigration lawyer',
        'immigration attorney Raleigh NC',
        'Raleigh deportation defense',
        'green card lawyer Raleigh',
        'Raleigh citizenship attorney',
        'immigration law firm Raleigh NC',
        'Raleigh visa attorney',
        'Raleigh NC immigration help',
      ],
      personalInjury: [
        'Raleigh personal injury lawyer',
        'car accident attorney Raleigh NC',
        'Raleigh truck accident lawyer',
        'slip and fall lawyer Raleigh',
        'Raleigh injury attorney',
        'accident lawyer Raleigh NC',
        'Raleigh workers comp attorney',
        'personal injury law firm Raleigh',
      ],
      criminalDefense: [
        'Raleigh criminal defense lawyer',
        'DWI attorney Raleigh NC',
        'criminal lawyer Raleigh',
        'Raleigh defense attorney',
        'drug charges lawyer Raleigh',
        'Raleigh NC criminal attorney',
        'traffic lawyer Raleigh',
        'Raleigh criminal law firm',
      ],
    },
  },
  durham: {
    city: 'Durham',
    state: 'North Carolina',
    stateAbbr: 'NC',
    neighborhoods: [
      'Downtown Durham',
      'Ninth Street',
      'Trinity Park',
      'Forest Hills',
      'Hope Valley',
      'Brightleaf',
      'American Tobacco District',
      'Southpoint',
    ],
    nearbyAreas: [
      'Chapel Hill',
      'Carrboro',
      'Morrisville',
      'Research Triangle Park',
      'Hillsborough',
      'Raleigh',
      'Cary',
    ],
    practiceAreaKeywords: {
      immigration: [
        'Durham immigration lawyer',
        'immigration attorney Durham NC',
        'Durham deportation defense',
        'green card lawyer Durham',
        'Durham citizenship attorney',
        'immigration law firm Durham NC',
        'Durham visa attorney',
        'Durham NC immigration help',
      ],
      personalInjury: [
        'Durham personal injury lawyer',
        'car accident attorney Durham NC',
        'Durham truck accident lawyer',
        'slip and fall lawyer Durham',
        'Durham injury attorney',
        'accident lawyer Durham NC',
        'Durham workers comp attorney',
        'personal injury law firm Durham',
      ],
      criminalDefense: [
        'Durham criminal defense lawyer',
        'DWI attorney Durham NC',
        'criminal lawyer Durham',
        'Durham defense attorney',
        'drug charges lawyer Durham',
        'Durham NC criminal attorney',
        'traffic lawyer Durham',
        'Durham criminal law firm',
      ],
    },
  },
  smithfield: {
    city: 'Smithfield',
    state: 'North Carolina',
    stateAbbr: 'NC',
    nearbyAreas: [
      'Selma',
      'Clayton',
      'Four Oaks',
      'Benson',
      'Princeton',
      'Wilson Mills',
      'Pine Level',
      'Kenly',
    ],
    practiceAreaKeywords: {
      immigration: [
        'Smithfield immigration lawyer',
        'immigration attorney Smithfield NC',
        'Johnston County immigration lawyer',
        'Smithfield deportation defense',
        'green card lawyer Smithfield',
        'Smithfield citizenship attorney',
        'immigration help Johnston County',
        'Smithfield NC visa attorney',
      ],
      personalInjury: [
        'Smithfield personal injury lawyer',
        'car accident attorney Smithfield NC',
        'Johnston County injury lawyer',
        'Smithfield truck accident attorney',
        'slip and fall lawyer Smithfield',
        'Smithfield NC accident attorney',
        'workers comp lawyer Johnston County',
        'Smithfield injury law firm',
      ],
      criminalDefense: [
        'Smithfield criminal defense lawyer',
        'DWI attorney Smithfield NC',
        'Johnston County criminal lawyer',
        'Smithfield defense attorney',
        'drug charges lawyer Smithfield',
        'Smithfield NC criminal attorney',
        'traffic lawyer Johnston County',
        'Smithfield criminal law firm',
      ],
    },
  },
};

// Florida locations
export const flLocations: Record<string, LocalKeywords> = {
  orlando: {
    city: 'Orlando',
    state: 'Florida',
    stateAbbr: 'FL',
    neighborhoods: [
      'Downtown Orlando',
      'Winter Park',
      'College Park',
      'Thornton Park',
      'Mills 50',
      'Dr. Phillips',
      'Lake Nona',
      'Baldwin Park',
    ],
    nearbyAreas: [
      'Kissimmee',
      'Winter Garden',
      'Altamonte Springs',
      'Sanford',
      'Oviedo',
      'Apopka',
      'Maitland',
      'Casselberry',
    ],
    practiceAreaKeywords: {
      immigration: [
        'Orlando immigration lawyer',
        'immigration attorney Orlando FL',
        'Orlando deportation defense',
        'green card lawyer Orlando',
        'Orlando citizenship attorney',
        'immigration law firm Orlando FL',
        'Orlando visa attorney',
        'Orlando FL immigration help',
      ],
      personalInjury: [
        'Orlando personal injury lawyer',
        'car accident attorney Orlando FL',
        'Orlando truck accident lawyer',
        'slip and fall lawyer Orlando',
        'Orlando injury attorney',
        'accident lawyer Orlando FL',
        'Orlando workers comp attorney',
        'personal injury law firm Orlando',
      ],
      criminalDefense: [
        'Orlando criminal defense lawyer',
        'DUI attorney Orlando FL',
        'criminal lawyer Orlando',
        'Orlando defense attorney',
        'drug charges lawyer Orlando',
        'Orlando FL criminal attorney',
        'traffic lawyer Orlando',
        'Orlando criminal law firm',
      ],
    },
  },
};

// Helper function to generate location-specific content
export function generateLocalContent(
  location: LocalKeywords,
  practiceArea: string
): {
  title: string;
  metaDescription: string;
  h1: string;
  keywords: string[];
} {
  const keywords = location.practiceAreaKeywords[practiceArea] || [];

  const templates = {
    immigration: {
      title: `${location.city} Immigration Lawyer | Immigration Attorney ${location.city}, ${location.stateAbbr}`,
      metaDescription: `Top-rated immigration lawyers in ${location.city}, ${location.stateAbbr}. Free consultation for green cards, citizenship, deportation defense, and visa applications. Se habla español.`,
      h1: `Immigration Lawyers in ${location.city}, ${location.state}`,
    },
    personalInjury: {
      title: `${location.city} Personal Injury Lawyer | Accident Attorney ${location.city}, ${location.stateAbbr}`,
      metaDescription: `Experienced personal injury attorneys in ${location.city}, ${location.stateAbbr}. No fee unless we win. Free consultation for car accidents, slip & fall, and workplace injuries.`,
      h1: `Personal Injury Attorneys in ${location.city}, ${location.state}`,
    },
    criminalDefense: {
      title: `${location.city} Criminal Defense Lawyer | Criminal Attorney ${location.city}, ${location.stateAbbr}`,
      metaDescription: `Aggressive criminal defense lawyers in ${location.city}, ${location.stateAbbr}. 24/7 availability for DWI, drug charges, and traffic violations. Protect your rights.`,
      h1: `Criminal Defense Lawyers in ${location.city}, ${location.state}`,
    },
    workersComp: {
      title: `${location.city} Workers Compensation Lawyer | Work Injury Attorney ${location.city}, ${location.stateAbbr}`,
      metaDescription: `Fighting for injured workers in ${location.city}, ${location.stateAbbr}. Get the workers comp benefits you deserve. Free consultation with experienced attorneys.`,
      h1: `Workers Compensation Attorneys in ${location.city}, ${location.state}`,
    },
  };

  const template = templates[practiceArea as keyof typeof templates] || templates.immigration;

  return {
    ...template,
    keywords: [
      ...keywords,
      `${location.city} lawyer`,
      `${location.city} attorney`,
      `law firm ${location.city} ${location.stateAbbr}`,
      `abogado ${location.city}`,
      ...(location.nearbyAreas?.map(area => `${area} attorney`) || []),
    ],
  };
}

// Generate schema markup for local business
export function generateLocalBusinessSchema(
  location: LocalKeywords,
  address: {
    street: string;
    zip: string;
    phone: string;
    lat: number;
    lng: number;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: `Vasquez Law Firm - ${location.city}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: location.city,
      addressRegion: location.stateAbbr,
      postalCode: address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: address.lat,
      longitude: address.lng,
    },
    telephone: address.phone,
    areaServed: [
      {
        '@type': 'City',
        name: location.city,
      },
      ...(location.nearbyAreas?.map(area => ({
        '@type': 'City',
        name: area,
      })) || []),
    ],
  };
}
