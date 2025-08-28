// Resource exports for easy import throughout the application

// Guides
export { ImmigrationProcessGuide } from './guides/immigration-process-guide';

// Calculators
export { default as ChildSupportCalculator } from './calculators/child-support-calculator';

// Resource type definitions
export interface ResourceMetadata {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'checklist' | 'calculator' | 'template' | 'form';
  category: string;
  practiceArea:
    | 'immigration'
    | 'personal-injury'
    | 'criminal-defense'
    | 'workers-compensation'
    | 'family-law'
    | 'traffic-violations';
  languages: ('en' | 'es')[];
  featured?: boolean;
  downloadUrl?: string;
  interactiveUrl?: string;
  lastUpdated: Date;
  version: string;
}

// Complete resource catalog
export const resourceCatalog: ResourceMetadata[] = [
  // Immigration Resources
  {
    id: 'immigration-process-guide-2024',
    title: '2024 Immigration Process Guide',
    description:
      'Comprehensive guide covering all major visa types, timelines, document requirements, and step-by-step processes for U.S. immigration.',
    type: 'guide',
    category: 'General Immigration',
    practiceArea: 'immigration',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/immigration-process-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '2.0',
  },
  {
    id: 'family-visa-checklist',
    title: 'Family-Based Visa Document Checklist',
    description:
      'Complete checklist of all documents needed for family-based immigration petitions, including I-130 and adjustment of status.',
    type: 'checklist',
    category: 'Family Immigration',
    practiceArea: 'immigration',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/family-visa-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.5',
  },
  {
    id: 'employment-visa-checklist',
    title: 'Employment-Based Visa Document Checklist',
    description:
      'Essential documents required for H-1B, L-1, EB categories, and other employment-based visa applications.',
    type: 'checklist',
    category: 'Employment Immigration',
    practiceArea: 'immigration',
    languages: ['en'],
    downloadUrl: '/api/resources/download/employment-visa-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.3',
  },
  {
    id: 'visa-processing-time-calculator',
    title: 'Visa Processing Time Calculator',
    description:
      'Interactive tool to estimate processing times for different visa categories based on current USCIS data.',
    type: 'calculator',
    category: 'Tools',
    practiceArea: 'immigration',
    languages: ['en'],
    featured: true,
    interactiveUrl: '/resources/calculators/visa-processing-time',
    lastUpdated: new Date('2024-01-15'),
    version: '1.0',
  },
  {
    id: 'asylum-application-guide',
    title: 'Asylum Application Guide',
    description:
      'Step-by-step guide for asylum seekers, including eligibility requirements, interview preparation, and timeline expectations.',
    type: 'guide',
    category: 'Humanitarian',
    practiceArea: 'immigration',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/asylum-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '1.8',
  },
  {
    id: 'citizenship-test-prep',
    title: 'U.S. Citizenship Test Preparation Guide',
    description:
      '100 civics questions with answers, English test tips, and interview preparation strategies.',
    type: 'guide',
    category: 'Citizenship',
    practiceArea: 'immigration',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/citizenship-test-prep',
    lastUpdated: new Date('2024-01-15'),
    version: '3.0',
  },

  // Personal Injury Resources
  {
    id: 'nc-personal-injury-guide',
    title: 'NC Personal Injury Claim Guide',
    description:
      'Step-by-step guide on what to do after an accident, gathering evidence, dealing with insurance companies, and understanding your rights.',
    type: 'guide',
    category: 'Auto Accidents',
    practiceArea: 'personal-injury',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/personal-injury-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '2.1',
  },
  {
    id: 'accident-evidence-checklist',
    title: 'Accident Evidence Collection Checklist',
    description:
      'Comprehensive checklist for gathering crucial evidence after any type of accident to strengthen your personal injury claim.',
    type: 'checklist',
    category: 'Evidence Collection',
    practiceArea: 'personal-injury',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/accident-evidence-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.2',
  },
  {
    id: 'settlement-calculator',
    title: 'Personal Injury Settlement Estimator',
    description:
      'Calculate potential settlement values based on medical costs, lost wages, pain and suffering, and other factors.',
    type: 'calculator',
    category: 'Tools',
    practiceArea: 'personal-injury',
    languages: ['en'],
    featured: true,
    interactiveUrl: '/resources/calculators/settlement-estimator',
    lastUpdated: new Date('2024-01-15'),
    version: '1.5',
  },

  // Criminal Defense Resources
  {
    id: 'know-your-rights-guide',
    title: 'Know Your Rights Guide',
    description:
      'Essential information about your constitutional rights during police encounters, arrests, and criminal proceedings.',
    type: 'guide',
    category: 'Rights & Procedures',
    practiceArea: 'criminal-defense',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/know-your-rights',
    lastUpdated: new Date('2024-01-15'),
    version: '2.5',
  },
  {
    id: 'nc-court-process-guide',
    title: 'NC Criminal Court Process Guide',
    description:
      'Understanding the criminal court process in North Carolina from arrest to trial, including key deadlines and procedures.',
    type: 'guide',
    category: 'Court Procedures',
    practiceArea: 'criminal-defense',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/court-process-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '1.7',
  },
  {
    id: 'expungement-eligibility-checklist',
    title: 'NC Expungement Eligibility Checklist',
    description:
      'Determine if you qualify for criminal record expungement in North Carolina with this comprehensive checklist.',
    type: 'checklist',
    category: 'Expungement',
    practiceArea: 'criminal-defense',
    languages: ['en'],
    downloadUrl: '/api/resources/download/expungement-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.1',
  },

  // Workers' Compensation Resources
  {
    id: 'nc-workers-comp-guide',
    title: "NC Workers' Comp Benefits Guide",
    description:
      "Complete guide to workers' compensation benefits in North Carolina, including claim procedures and benefit calculations.",
    type: 'guide',
    category: 'Benefits & Claims',
    practiceArea: 'workers-compensation',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/workers-comp-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '2.0',
  },
  {
    id: 'workplace-injury-checklist',
    title: 'Workplace Injury Reporting Checklist',
    description:
      "Step-by-step checklist for properly reporting workplace injuries and protecting your workers' compensation rights.",
    type: 'checklist',
    category: 'Injury Reporting',
    practiceArea: 'workers-compensation',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/injury-reporting-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.4',
  },
  {
    id: 'workers-comp-calculator',
    title: "Workers' Comp Benefits Calculator",
    description:
      "Calculate your potential workers' compensation benefits including temporary disability, permanent disability, and medical benefits.",
    type: 'calculator',
    category: 'Tools',
    practiceArea: 'workers-compensation',
    languages: ['en'],
    featured: true,
    interactiveUrl: '/resources/calculators/workers-comp-benefits',
    lastUpdated: new Date('2024-01-15'),
    version: '1.3',
  },

  // Family Law Resources
  {
    id: 'nc-divorce-custody-guide',
    title: 'NC Divorce & Custody Guide',
    description:
      'Comprehensive guide covering divorce procedures, property division, alimony, and child custody laws in North Carolina.',
    type: 'guide',
    category: 'Divorce & Custody',
    practiceArea: 'family-law',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/divorce-custody-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '2.2',
  },
  {
    id: 'child-support-calculator',
    title: 'NC Child Support Calculator',
    description:
      'Calculate estimated child support payments based on North Carolina guidelines, including income shares and additional expenses.',
    type: 'calculator',
    category: 'Child Support',
    practiceArea: 'family-law',
    languages: ['en'],
    featured: true,
    interactiveUrl: '/resources/calculators/child-support',
    lastUpdated: new Date('2024-01-15'),
    version: '2.0',
  },
  {
    id: 'custody-factors-checklist',
    title: 'Best Interest Factors Checklist',
    description:
      'Checklist of factors North Carolina courts consider when determining child custody arrangements.',
    type: 'checklist',
    category: 'Child Custody',
    practiceArea: 'family-law',
    languages: ['en', 'es'],
    downloadUrl: '/api/resources/download/custody-factors-checklist',
    lastUpdated: new Date('2024-01-15'),
    version: '1.2',
  },

  // Traffic Violations Resources
  {
    id: 'nc-traffic-court-guide',
    title: 'NC Traffic Court Guide',
    description:
      'Navigate traffic court in North Carolina with information on the point system, license implications, and court procedures.',
    type: 'guide',
    category: 'Traffic Court',
    practiceArea: 'traffic-violations',
    languages: ['en', 'es'],
    featured: true,
    downloadUrl: '/api/resources/download/traffic-court-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '1.9',
  },
  {
    id: 'dwi-penalty-calculator',
    title: 'DUI/DWI Penalty Calculator',
    description:
      'Calculate potential penalties for DUI/DWI offenses in North Carolina based on BAC level and prior offenses.',
    type: 'calculator',
    category: 'DUI/DWI',
    practiceArea: 'traffic-violations',
    languages: ['en'],
    interactiveUrl: '/resources/calculators/dwi-penalties',
    lastUpdated: new Date('2024-01-15'),
    version: '1.1',
  },
  {
    id: 'license-points-guide',
    title: 'NC License Points System Guide',
    description:
      'Understanding how traffic violations affect your license points and insurance rates in North Carolina.',
    type: 'guide',
    category: 'License Points',
    practiceArea: 'traffic-violations',
    languages: ['en'],
    downloadUrl: '/api/resources/download/license-points-guide',
    lastUpdated: new Date('2024-01-15'),
    version: '1.3',
  },
];

// Helper functions to filter resources
export const getResourcesByPracticeArea = (practiceArea: string) => {
  return resourceCatalog.filter(resource => resource.practiceArea === practiceArea);
};

export const getFeaturedResources = () => {
  return resourceCatalog.filter(resource => resource.featured);
};

export const getResourcesByType = (type: string) => {
  return resourceCatalog.filter(resource => resource.type === type);
};

export const getResourcesByLanguage = (language: 'en' | 'es') => {
  return resourceCatalog.filter(resource => resource.languages.includes(language));
};
