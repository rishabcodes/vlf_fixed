import { Metadata } from 'next';

// Power words categorized by intent and impact
export const POWER_WORDS = {
  trust: [
    'Trusted',
    'Proven',
    'Award-Winning',
    'Elite',
    'Premier',
    'Top-Rated',
    'Certified',
    'Accredited',
    'Recognized',
    'Leading',
    'Renowned',
  ],
  urgency: [
    'Immediate',
    'Emergency',
    'Now',
    'Today',
    'Instant',
    'Same-Day',
    'Fast',
    'Rapid',
    'Quick',
    'Urgent',
    '24/7',
  ],
  results: [
    'Maximum',
    'Winning',
    'Successful',
    'Guaranteed',
    'Proven Results',
    'Record-Breaking',
    'Highest',
    'Best',
    'Superior',
    'Unmatched',
  ],
  expertise: [
    'Expert',
    'Specialist',
    'Master',
    'Professional',
    'Experienced',
    'Skilled',
    'Qualified',
    'Veteran',
    'Senior',
    'Board-Certified',
  ],
  aggression: [
    'Aggressive',
    'Fighting',
    'Fierce',
    'Relentless',
    'Tenacious',
    'Determined',
    'Powerful',
    'Strong',
    'Bold',
    'Fearless',
  ],
  value: [
    'Free',
    'No-Cost',
    'Affordable',
    'No Fee Unless We Win',
    'Risk-Free',
    'Complimentary',
    'Budget-Friendly',
    'Cost-Effective',
  ],
  locality: [
    'Local',
    'Nearby',
    'Area',
    'Regional',
    'Community',
    'Neighborhood',
    'Downtown',
    "North Carolina's",
    "NC's",
    'Serving',
  ],
};

// Title templates by page type with power word placeholders
export const TITLE_TEMPLATES = {
  practiceArea: {
    immigration: [
      '{urgency} Immigration Lawyer NC | {trust} {expertise} | {value}',
      '{aggression} Immigration Attorney | {results} in North Carolina',
      "NC's {trust} Immigration Law Firm | {expertise} Since 2011",
    ],
    personalInjury: [
      '{aggression} Personal Injury Lawyers | {results} Settlements | NC',
      '{trust} Injury Attorneys | {value} | {urgency} Help Available',
      "Get {results} Compensation | NC's {expertise} Injury Law Firm",
    ],
    criminalDefense: [
      '{aggression} Criminal Defense | {trust} NC Lawyers | {urgency} Help',
      '{expertise} Criminal Attorney | {results} Defense Strategies',
      "NC's {trust} Defense Lawyers | {value} | Available {urgency}",
    ],
    workersComp: [
      '{results} Workers Comp Settlements | {trust} NC Attorneys',
      '{aggression} Work Injury Lawyers | {expertise} | {value}',
      'NC Workers Compensation {expertise} | {urgency} Claims Help',
    ],
  },
  location: {
    city: [
      '{trust} {city} Lawyers | {expertise} Legal Team | {results}',
      "{city}'s {aggression} Law Firm | {urgency} Legal Help | {value}",
      'Best Lawyers in {city}, NC | {trust} Since 2011 | {expertise}',
    ],
    neighborhood: [
      '{neighborhood} {trust} Lawyers | {locality} {expertise} | {urgency}',
      '{aggression} {neighborhood} Attorneys | {results} | {value}',
      "{neighborhood}'s #1 Law Firm | {trust} {locality} Team",
    ],
    nearMe: [
      '{service} Near Me {city} | {trust} {urgency} Help | {results}',
      "{urgency} {service} Near You | {city}'s {expertise} | {value}",
      'Find {trust} {service} Near Me | {aggression} {city} Team',
    ],
  },
  attorney: [
    '{name} | {trust} {expertise} {practice} Attorney | {results}',
    '{aggression} {practice} Lawyer {name} | {trust} in NC',
    '{name} - {expertise} {practice} Attorney | {locality} {results}',
  ],
  main: {
    home: [
      "{trust} Immigration & Injury Lawyers | NC's {expertise} Firm | {urgency}",
      '{aggression} Legal Team | {results} | Vasquez Law Firm NC',
      "NC's {trust} Law Firm | Immigration & Personal Injury {expertise}",
    ],
    about: [
      "About NC's {trust} Law Firm | {expertise} Since 2011 | {results}",
      'Meet {aggression} Legal Team | {trust} {locality} Lawyers',
      'Why Choose Us | {results} | {expertise} NC Attorneys',
    ],
    contact: [
      'Get {urgency} Legal Help | {value} Case Review | Contact Us',
      "{urgency} Response Guaranteed | Call NC's {trust} Lawyers",
      'Contact {expertise} Attorneys | {value} Consultation | {urgency}',
    ],
  },
};

// Description enhancers with power phrases
export const DESCRIPTION_ENHANCERS = {
  openings: [
    'Stop searching and start winning with',
    'Get immediate results from',
    'Experience the difference with',
    'Join thousands who chose',
    "Discover why we're",
  ],
  credibility: [
    '60+ years combined experience',
    '30,000+ successful cases',
    '98% success rate',
    '$100M+ recovered for clients',
    '5-star rated on Google',
  ],
  urgency: [
    'Available 24/7 for emergencies',
    'Same-day appointments available',
    'Immediate response guaranteed',
    'Get help in 30 seconds',
    'Call now for instant assistance',
  ],
  localTrust: [
    'Serving all of North Carolina',
    'Trusted by {city} families since 2011',
    "{county} County's #1 choice",
    'Local {neighborhood} legal experts',
    'Your neighborhood law firm',
  ],
  callToAction: [
    'Free consultation - Call 1-844-YO-PELEO',
    'No fee unless we win your case',
    'Se habla español - Llamanos ahora',
    'Get your free case review today',
    'Start your winning case now',
  ],
};

// Function to generate optimized title
export function generateOptimizedTitle(
  pageType: string,
  subType: string,
  variables: Record<string, string>
): string {
  // Get appropriate templates
  const templates = TITLE_TEMPLATES[pageType as keyof typeof TITLE_TEMPLATES];
  let template: string;

  if (typeof templates === 'object' && !Array.isArray(templates)) {
    const subTemplates = templates[subType as keyof typeof templates] as unknown;
    if (Array.isArray(subTemplates) && subTemplates.length > 0) {
      template = subTemplates[Math.floor(Math.random() * subTemplates.length)];
    } else {
      template = '{trust} Lawyers NC | Vasquez Law Firm';
    }
  } else if (Array.isArray(templates)) {
    template = templates[Math.floor(Math.random() * templates.length)] || '{trust} Lawyers NC | Vasquez Law Firm';
  } else {
    template = '{trust} Lawyers NC | Vasquez Law Firm';
  }

  // Replace power word placeholders
  Object.keys(POWER_WORDS).forEach(category => {
    const words = POWER_WORDS[category as keyof typeof POWER_WORDS];
    const word = words[Math.floor(Math.random() * words.length)] || words[0] || '';
    template = template.replace(new RegExp(`{${category}}`, 'g'), word);
  });

  // Replace variable placeholders
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  // Ensure title length is optimal (50-60 characters)
  if (template.length > 60) {
    template = template.substring(0, 57) + '...';
  }

  return template;
}

// Function to generate optimized description
export function generateOptimizedDescription(
  pageType: string,
  variables: Record<string, string>
): string {
  const parts: string[] = [];

  // Add opening
  const opening =
    DESCRIPTION_ENHANCERS.openings[
      Math.floor(Math.random() * DESCRIPTION_ENHANCERS.openings.length)
    ] || 'Stop searching and start winning with';
  parts.push(opening);

  // Add main content based on page type
  if (pageType === 'practiceArea') {
    parts.push(
      `NC's most ${(POWER_WORDS.aggression[0] || 'aggressive').toLowerCase()} ${variables.service || 'legal'} team.`
    );
  } else if (pageType === 'location') {
    parts.push(
      `${variables.city || 'North Carolina'}'s ${(POWER_WORDS.trust[0] || 'trusted').toLowerCase()} law firm.`
    );
  } else {
    parts.push("North Carolina's premier legal team.");
  }

  // Add credibility
  const credibility =
    DESCRIPTION_ENHANCERS.credibility[
      Math.floor(Math.random() * DESCRIPTION_ENHANCERS.credibility.length)
    ] || '60+ years combined experience';
  parts.push(credibility + '.');

  // Add local trust with variables
  let localTrust =
    DESCRIPTION_ENHANCERS.localTrust[
      Math.floor(Math.random() * DESCRIPTION_ENHANCERS.localTrust.length)
    ] || 'Serving all of North Carolina';
  Object.entries(variables).forEach(([key, value]) => {
    if (localTrust) {
      localTrust = localTrust.replace(`{${key}}`, value);
    }
  });
  parts.push(localTrust + '.');

  // Add urgency
  const urgency =
    DESCRIPTION_ENHANCERS.urgency[Math.floor(Math.random() * DESCRIPTION_ENHANCERS.urgency.length)] || 'Available 24/7 for emergencies';
  parts.push(urgency + '.');

  // Add call to action
  const cta =
    DESCRIPTION_ENHANCERS.callToAction[
      Math.floor(Math.random() * DESCRIPTION_ENHANCERS.callToAction.length)
    ] || 'Free consultation - Call 1-844-YO-PELEO';
  parts.push(cta);

  const description = parts.join(' ');

  // Ensure description length is optimal (150-160 characters)
  if (description.length > 160) {
    return description.substring(0, 157) + '...';
  }

  return description;
}

// Main optimization function
export function optimizeMetadata(
  currentMetadata: Metadata,
  pageType: string,
  subType?: string,
  variables?: Record<string, string>
): Metadata {
  const vars = variables || {};

  // Generate optimized title
  const optimizedTitle = generateOptimizedTitle(pageType, subType || '', vars);

  // Generate optimized description
  const optimizedDescription = generateOptimizedDescription(pageType, vars);

  // Enhance keywords with power words
  const currentKeywords = typeof currentMetadata.keywords === 'string' ? currentMetadata.keywords : '';
  const enhancedKeywords = [
    ...currentKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0),
    ...POWER_WORDS.trust.slice(0, 2).map(w => `${w.toLowerCase()} lawyers`),
    ...POWER_WORDS.urgency.slice(0, 2).map(w => `${w.toLowerCase()} legal help`),
    `best ${vars.service || 'lawyers'} ${vars.city || 'NC'}`.toLowerCase(),
  ].join(', ');

  return {
    ...currentMetadata,
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: enhancedKeywords,
    openGraph: {
      ...currentMetadata.openGraph,
      title: optimizedTitle,
      description: optimizedDescription,
    },
    twitter: {
      ...currentMetadata.twitter,
      title: optimizedTitle,
      description: optimizedDescription,
    },
  };
}

// A/B testing function to rotate between different optimized versions
export function generateABTestMetadata(
  baseMetadata: Metadata,
  pageType: string,
  subType?: string,
  variables?: Record<string, string>,
  variant?: 'A' | 'B' | 'C'
): Metadata {
  // Store different optimization strategies
  const strategies = {
    A: () => optimizeMetadata(baseMetadata, pageType, subType, variables),
    B: () => {
      // More aggressive variant
      const aggressiveVars = {
        ...variables,
        trust: POWER_WORDS.trust[0] || 'Trusted',
        aggression: POWER_WORDS.aggression[0] || 'Aggressive',
        urgency: POWER_WORDS.urgency[0] || 'Immediate',
      };
      return optimizeMetadata(baseMetadata, pageType, subType, aggressiveVars);
    },
    C: () => {
      // Local-focused variant
      const localVars = {
        ...variables,
        locality: POWER_WORDS.locality[0] || 'Local',
        trust: POWER_WORDS.trust[1] || 'Proven',
        expertise: POWER_WORDS.expertise[0] || 'Expert',
      };
      return optimizeMetadata(baseMetadata, pageType, subType, localVars);
    },
  };

  // Use variant or randomly select
  const selectedVariant =
    variant || (['A', 'B', 'C'][Math.floor(Math.random() * 3)] as 'A' | 'B' | 'C');
  return strategies[selectedVariant]();
}

// Structured data enhancement for better SERP display
export function enhanceStructuredData(metadata: Metadata): Metadata {
  return {
    ...metadata,
    other: {
      ...(metadata.other as Record<string, string>),
      'og:locale': 'en_US',
      'og:locale:alternate': 'es_ES',
      'article:author': 'Vasquez Law Firm, PLLC',
      'article:publisher': 'https://www.vasquezlawnc.com',
      'twitter:card': 'summary_large_image',
      'twitter:site': '@VasquezLawNC',
      'twitter:creator': '@VasquezLawNC',
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
  };
}
